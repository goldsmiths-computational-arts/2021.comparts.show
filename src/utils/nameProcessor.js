export const nameProcessor = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace('á', 'a')
    .replace('ü', 'u')
}
