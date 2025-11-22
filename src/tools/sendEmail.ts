import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { useLogger } from '../utils/logger';
import { sendEmailHelper } from '../utils/sendEmailHelper';

// 单个邮件发送工具
const name = 'sendEmail';
const description = 'Send an email to a single recipient using Resend service';
const parameters = z.object({
  from: z.string().describe('Sender email name, e.g. "John Doe" or "No Reply"'),
  to: z.string().email().describe('Recipient email address'),
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

    const result = await sendEmailHelper(from, to, subject, text, html, logger);
    return JSON.stringify(result);
  },
};

export { sendEmail };

// 注意：sendEmailBatch已被移到单独的文件 sendEmailBatch.ts 中
