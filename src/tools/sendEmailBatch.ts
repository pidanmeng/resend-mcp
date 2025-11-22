import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { useLogger } from '../utils/logger';
import { sendEmailHelper } from '../utils/sendEmailHelper';

const batchName = 'sendEmailBatch';
const batchDescription = 'Send emails in batch using Resend service';
const batchParameters = z.object({
  from: z.string().describe('Sender email name, e.g. "John Doe" or "No Reply"'),
  to: z
    .array(z.string().email())
    .min(1)
    .max(100)
    .describe('Recipient email addresses (1-100 recipients)'),
  subject: z.string().describe('Email subject'),
  text: z.string().optional().describe('Plain text content of the email'),
  html: z.string().optional().describe('HTML content of the email'),
});

export const sendEmailBatch: Tool<
  any,
  z.ZodType<typeof batchParameters._type>
> = {
  name: batchName,
  description: batchDescription,
  parameters: batchParameters,
  execute: async (args, context) => {
    const { to, subject, text, html, from } = args;
    const { log } = context;
    const logger = useLogger(log);

    logger.info(`Sending batch emails to ${to.length} recipients`);
    // 使用 Resend 的原生批量发送功能
    const result = await sendEmailHelper(from, to, subject, text, html, logger);

    return JSON.stringify(result);
  },
};
