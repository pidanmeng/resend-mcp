import { Resend } from 'resend';
import { useLogger } from './logger';
import { validateContent } from './validateContent';
import { createResendClient } from './createResendClient';

// 通用邮件发送函数，支持单个和批量发送
export const sendEmailHelper = async (
  from: string,
  to: string | string[],
  subject: string,
  text: string | undefined,
  html: string | undefined,
  logger: ReturnType<typeof useLogger>
) => {
  validateContent(text, html);
  const { resend, emailHost } = createResendClient();
  try {
    const toArray = Array.isArray(to) ? to : [to];
    logger.info(
      `Sending email to ${toArray.length} recipient(s) with subject "${subject}"`
    );

    const result = await resend.emails.send({
      from: `${from} <no-reply@${emailHost}>`,
      to: toArray,
      subject,
      text,
      html,
      react: null,
    });

    logger.info(`Email sent successfully with ID: ${result.data?.id}`);

    // 如果是单个收件人，返回简单结果；如果是多个收件人，返回详细结果
    return result;
  } catch (error) {
    logger.error(
      `Failed to send email to ${Array.isArray(to) ? to.join(', ') : to}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    throw error;
  }
};
