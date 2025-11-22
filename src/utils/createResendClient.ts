import { Resend } from 'resend';

export const createResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  const emailHost = process.env.EMAIL_HOST;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  if (!emailHost) {
    throw new Error('EMAIL_HOST environment variable is not set');
  }

  return { resend: new Resend(apiKey), emailHost };
};