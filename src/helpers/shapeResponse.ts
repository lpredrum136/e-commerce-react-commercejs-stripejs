export const shapeResponse = (obj: { [name: string]: string }) =>
  Object.entries(obj).map(([code, name]) => ({
    value: code,
    label: name
  }))
