import { DhatuDetails } from "../getDhatupatha";
import { sortOptions } from "../viewInputsData";
import { SortQuery } from "./getSortQuery";

// const ganas: Record<string, number> = {
//   भ्वादिः: 1,
//   अदादिः: 2,
//   जुहोत्यादिः: 3,
//   दिवादिः: 4,
//   स्वादिः: 5,
//   तुदादिः: 6,
//   रुधादिः: 7,
//   तनादिः: 8,
//   क्र्यादिः: 9,
//   चुरादिः: 10,
// };

const collator = new Intl.Collator();

const sortByArtha = (dhatuList: DhatuDetails[]) =>
  [...dhatuList].sort((dhatuDetailsA, dhatuDetailsB) =>
    collator.compare(dhatuDetailsA.meaning, dhatuDetailsB.meaning)
  );

// const sortByGana = (dhatuList: DhatuDetailsWithTags[]) =>
//   [...dhatuList].sort(
//     (dhatuDetailsA, dhatuDetailsB) =>
//       ganas[dhatuDetailsA.gana] - ganas[dhatuDetailsB.gana]
//   );

const sortByGana = (dhatuList: DhatuDetails[]) => dhatuList;

const sortByDhatu = (dhatuList: DhatuDetails[]) =>
  [...dhatuList].sort((dhatuDetailsA, dhatuDetailsB) =>
    collator.compare(dhatuDetailsA.muladhatu, dhatuDetailsB.muladhatu)
  );

export const sortData = (
  dhatuList: DhatuDetails[],
  sortQuery: SortQuery | null
) => {
  if (!sortQuery) return dhatuList;

  const sort = {
    [sortOptions.dhatu]: sortByDhatu,
    [sortOptions.gana]: sortByGana,
    [sortOptions.artha]: sortByArtha,
  }[sortQuery.sort];

  return sort ? sort(dhatuList) : dhatuList;
};
