/**
 * Generates a random number in the given range.
 * Better to use this then Math.random()
 * Note: will not work in browser code
 * @returns
 */
export function getRandomNumberInRange(range: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return Math.floor((array[0] / (0xffffffff + 1)) * range);
}

export const generateRandomString = (length: number, chars: string): string => {
  const charLength = chars.length;
  let result = "";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += chars.charAt(getRandomNumberInRange(charLength));
  }
  return result;
};
