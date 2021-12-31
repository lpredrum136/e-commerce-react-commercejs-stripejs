export const cleanProductDescription = (text: string) =>
  text.replace('<p>', '').replace('</p>', '')
