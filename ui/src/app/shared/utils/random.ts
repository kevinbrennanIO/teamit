export function randomString(len: number): string {
  const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = len; i > 0; --i) {
    result += charset[Math.round(Math.random() * (charset.length - 1))];
  }
  return result;
}
