import { first } from "../data.js";
import namesList from "../helpers.js";

const reduceElement = (element) => {
  const reducedScore = element
    .map((el) => {
      const { score } = el;
      return score;
    })
    .reduce((previousScore, nextScore) => previousScore + nextScore);

  return {
    totalScore: reducedScore,
    names: `Team:  ${namesList(element)}`,
  };
};

const solve = (...arr) => arr.map((el) => reduceElement(el));

console.log(solve(...first));
