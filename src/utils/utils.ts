import Sanscript from "@indic-transliteration/sanscript";

export const vowelMarksRegex = "[्ािीुूृॄेैोौंःँ॒॑]*";

export const removeLastVirama = (keyword: string) => keyword.replace(/्$/, "");

export const removeSvaras = (str: string) =>
  str.replace(new RegExp(vowelMarksRegex, "g"), "");

export const translitToWX = (input: string) =>
  Sanscript.t(input, "devanagari", "wx");

export const translitToDev = (input: string) =>
  Sanscript.t(input, "wx", "devanagari");

export const isArrayEmpty = (array: any[]) => array.length === 0;

export const chunk = (arr: any[], size: number) => {
  const chunks = [];

  for (let i = 0, l = arr.length; i < l; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
};

// export function* chunk(arr: any[], size: number) {
//   for (let i = 0, l = arr.length; i < l; i += size) {
//     yield arr.slice(i, i + size);
//   }
// }
