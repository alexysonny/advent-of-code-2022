import fs from "fs";

async function getDataFromFile(filePath) {
  const rawData = await fs.promises.readFile(filePath, { encoding: "utf-8" });

  return rawData.split("\n\n").filter((x) => !!x);
}

const WIN_POINTS = 6;
const LOSE_POINTS = 0;
const DRAW_POINTS = 3;

const ROCK_POINTS = 1;
const SCISSORS_POINTS = 3;
const PAPER_POINTS = 2;

const isRock = (option) => option === "A" || option === "X";
const isPaper = (option) => option === "B" || option === "Y";
const isScissors = (option) => option === "C" || option === "Z";

const isWin = (firstPlayerDecision, secondPlayerDecision) =>
  (isRock(secondPlayerDecision) && isScissors(firstPlayerDecision)) ||
  (isScissors(secondPlayerDecision) && isPaper(firstPlayerDecision)) ||
  (isPaper(secondPlayerDecision) && isRock(firstPlayerDecision));

const isDraw = (firstPlayerDecision, secondPlayerDecision) =>
  (isRock(firstPlayerDecision) && isRock(secondPlayerDecision)) ||
  (isScissors(firstPlayerDecision) && isScissors(secondPlayerDecision)) ||
  (isPaper(firstPlayerDecision) && isPaper(secondPlayerDecision));

const getDecisionPoints = (decision) => {
  let points = 0;

  if (isRock(decision)) {
    points += ROCK_POINTS;
  } else if (isScissors(decision)) {
    points += SCISSORS_POINTS;
  } else {
    points += PAPER_POINTS;
  }

  return points;
};

const getRoundPoints = (roundData) => {
  let points = 0;
  const [opponentDecision, yourDecision] = roundData.split(" ");

  if (isWin(opponentDecision, yourDecision)) {
    points += WIN_POINTS;
  } else if (isDraw(opponentDecision, yourDecision)) {
    points += DRAW_POINTS;
  } else {
    points += LOSE_POINTS;
  }

  points += getDecisionPoints(yourDecision);

  return points;
};

const shouldWin = (result) => result === "Z";
const shouldLose = (result) => result === "X";
const shouldDraw = (result) => result === "Y";

const OPPONENT_POSSIBLE_DECISIONS = ["A", "B", "C"];
const YOUR_POSSIBLE_DECISIONS = ["X", "Y", "Z"];

const getDecisionByGuide = (roundData) => {
  const [opponentDecision, expectedRoundResult] = roundData.split(" ");
  let opponentDecisionIndex = OPPONENT_POSSIBLE_DECISIONS.findIndex(
    (decision) => decision === opponentDecision
  );

  let yourDecisionIndex = 0;

  if (shouldWin(expectedRoundResult)) {
    yourDecisionIndex =
      (opponentDecisionIndex + 1) % YOUR_POSSIBLE_DECISIONS.length;
  } else if (shouldDraw(expectedRoundResult)) {
    yourDecisionIndex = opponentDecisionIndex;
  } else {
    yourDecisionIndex =
      (opponentDecisionIndex - 1) % YOUR_POSSIBLE_DECISIONS.length;
  }

  return `${opponentDecision} ${YOUR_POSSIBLE_DECISIONS.at(yourDecisionIndex)}`;
};

const task1Result = (await getDataFromFile("data.txt"))
  .toString()
  .split("\n")
  .reduce((acc, current) => (acc += getRoundPoints(current)), 0);

const task2Result = (await getDataFromFile("data.txt"))
  .toString()
  .split("\n")
  .reduce(
    (acc, current) => (acc += getRoundPoints(getDecisionByGuide(current))),
    0
  );

console.log("task 1 => ", task1Result);
console.log("task 2 => ", task2Result);
