export const GENERIC_ERROR_500 = `The system is experiencing an issue. Please try again later or contact support if the issue persists.`;

/**
 * Creates an error message for the user.
 * @param msg
 * @returns
 */
export const buildErrorMsg = (msg: string): string => {
  if (!msg) return GENERIC_ERROR_500;
  return `There was an issue ${msg}. Please try again later or contact support if the issue persists.`;
};
