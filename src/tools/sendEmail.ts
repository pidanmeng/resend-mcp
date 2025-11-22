import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { useLogger } from '../utils/logger';
import { Resend } from 'resend';

const name = 'sendEmail';
const description = 'Send an email using Resend service';
const parameters = z.object({
  from: z.string().describe('Sender email name, e.g. "John Doe" or "No Reply"'),
  to: z.string().email().or(z.array(z.string().email())).describe('Recipient email address(es)'),
  subject: z.string().describe('Email subject'),
  text: z.string().optional().describe('Plain text content of the email'),
  html: z.string().optional().describe('HTML content of the email'),
});

const sendEmail: Tool<any, z.ZodType<typeof parameters._type>> = {
  name,
  description,
  parameters,
  execute: async (args, context) => {
    const { to, subject, text, html, from } = args;
    const { log } = context;
    const logger = useLogger(log);

    // 从环境变量获取API密钥和默认发件人
    const apiKey = process.env.RESEND_API_KEY;
    const emailHost = process.env.EMAIL_HOST;

    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    if (!emailHost) {
      throw new Error('EMAIL_HOST environment variable is not set');
    }

    if (!from) {
      throw new Error(
        'From parameter must be set'
      );
    }

    if(!text && !html) {
      throw new Error(
        'Either text or html content must be provided'
      );
    }

    const resend = new Resend(apiKey);

    try {
      logger.info(
        `Sending email to ${
          Array.isArray(to) ? to.join(', ') : to
        } with subject "${subject}"`
      );

      const result = await resend.emails.send({
        from: `${from} <no-reply@${emailHost}>`,
        to: Array.isArray(to) ? to : [to],
        subject,
        text,
        html,
        react: null,
      });

      logger.info(`Email sent successfully with ID: ${result.data?.id}`);
      return JSON.stringify({ success: true, id: result.data?.id });
    } catch (error) {
      logger.error(
        `Failed to send email: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      throw error;
    }
  },
};

export { sendEmail };
