/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} initialArray - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(initialArray, param = 'asc') {
  const arrayToSort = [...initialArray];
  const locales = ['ru', 'en'];
  const options = {caseFirst: 'upper'};

  if (param === 'desc') {
    arrayToSort.sort((nameA, nameB) => nameB.localeCompare(nameA, locales, options));
  } else {
    arrayToSort.sort((nameA, nameB) => nameA.localeCompare(nameB, locales, options));
  }

  return arrayToSort;
}
