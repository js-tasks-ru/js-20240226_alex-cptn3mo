/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return "";
  }

  if (size === undefined) {
    return string;
  }

  let result = "";
  let counter = 0;
  let prevSymbol = "";

  for (const symbol of string) {
    if (symbol === prevSymbol) {
      counter++;
    } else {
      counter = 1;
    }

    if (counter <= size) {
      result += symbol;
    }

    prevSymbol = symbol;
  }

  return result;
}
