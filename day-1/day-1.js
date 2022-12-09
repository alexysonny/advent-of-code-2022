import fs from "fs";

async function getDataFromFile(filePath) {
  const rawData = await fs.promises.readFile(filePath, { encoding: "utf-8" });

  return rawData.split("\n\n").filter((x) => !!x);
}

const countOfCalories = (caloriesForElves, count) =>
  caloriesForElves
    .map((items) => {
      return items.split("\n").reduce((acc, current) => acc + +current, 0);
    })
    .sort((a, b) => a - b)
    .slice(count * -1)
    .reduce((acc, current) => acc + current, 0);

console.log(
  "task 1 => ",
  countOfCalories(await getDataFromFile("data.txt"), 1)
);
console.log(
  "task 2 => ",
  countOfCalories(await getDataFromFile("data.txt"), 3)
);
