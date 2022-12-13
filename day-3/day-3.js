import fs from "fs";

async function getDataFromFile(filePath) {
  const rawData = await fs.promises.readFile(filePath, { encoding: "utf-8" });

  return rawData.split("\n\n").filter((x) => !!x);
}

const prepareDataForTask1 = (rucksack) => {
  const middle = rucksack.length / 2;
  const left = rucksack.slice(0, middle);
  const right = rucksack.slice(middle);

  return findCommonLetters([left, right]);
};

const prepareDataForTask2 = (rucksacks) => {
  const res = [];

  for (let i = 0; i < rucksacks.length; i += 3) {
    let items = [];
    items.push(rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]);
    res.push(items);
  }
  return res;
};

const findCommonLetters = (rucksacks) => {
  const [firstRucksackSet, ...restRucksacksSet] = rucksacks.map(
    (rucksack) => new Set(rucksack.split(""))
  );

  let commonItem = "";

  for (const item of [...firstRucksackSet]) {
    let found = restRucksacksSet.every((rucksack) => rucksack.has(item));

    if (found) {
      commonItem = item;
      break;
    }
  }

  return commonItem;
};

const MIN_LOWERCASE_CODE = "a".charCodeAt(0);
const MIN_UPPERCASE_CODE = "A".charCodeAt(0);

const LOWERCASE_SHIFT = MIN_LOWERCASE_CODE - 1;
const UPPERCASE_SHIFT = MIN_UPPERCASE_CODE - 27;

const getPriorityPoints = (commonItem) => {
  const pointsShift =
    commonItem === commonItem.toUpperCase() ? UPPERCASE_SHIFT : LOWERCASE_SHIFT;

  return commonItem.charCodeAt(0) - pointsShift;
};

const task1Result = (await getDataFromFile("data.txt"))
  .toString()
  .split("\n")
  .reduce(
    (acc, current) => (acc += getPriorityPoints(prepareDataForTask1(current))),
    0
  );

const task2ResultData = (await getDataFromFile("data.txt"))
  .toString()
  .split("\n");

const task2Result = prepareDataForTask2(task2ResultData).reduce(
  (acc, current) => {
    acc += getPriorityPoints(findCommonLetters(current));
    return acc;
  },
  0
);
console.log("[Day 3] task 1 => ", task1Result);
console.log("[Day 3] task 2 => ", task2Result);
