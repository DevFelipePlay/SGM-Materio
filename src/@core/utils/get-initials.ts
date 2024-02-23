// ** Returns initials from string
export const getInitials = (string: string) => {
  let words = string.split(/\s/)
  words = words.slice(0, 2)

  return words.reduce((response, word) => (response += word.slice(0, 1)), '')
}
