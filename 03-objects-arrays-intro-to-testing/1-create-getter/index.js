/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathArray = path.split(".");

  return (obj) => {
    let result = obj;

    for (const key of pathArray) {
      if (!result.hasOwnProperty(key)) {
        return undefined;
      }

      result = result[key];
    }

    return result;
  };
}
