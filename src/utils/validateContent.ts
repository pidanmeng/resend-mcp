export const validateContent = (text: string | undefined, html: string | undefined) => {
  if (!text && !html) {
    throw new Error('Either text or html content must be provided');
  }
};