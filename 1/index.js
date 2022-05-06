import { first } from "../data.js";

const reduceElement = (firstElement) => {
  const arrValue = firstElement.map((el) => Object.values(el)).map((i) => i[0]);
  const reduceScore = arrValue.reduce((a, b) => a + b);
  const namesList = firstElement
    .map((el) => Object.values(el))
    .map((i) => i[1])
    .join(", ");
  return {
    totalScore: reduceScore,
    names: "Team: " + namesList,
  };
};

const solve = (...arr) => {
  return arr.map((el) => reduceElement(el));
};

console.log(solve(...first));

