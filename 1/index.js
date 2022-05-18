import { first } from "../data.js";
import { namesList, reducedScore } from "../helpers.js";

const reduceElement = (element) => {
  return {
    totalScore: reducedScore(element),
    names: `Team:  ${namesList(element).join(", ")}`,
  };
};

const solve = (...arr) => arr.map((el) => reduceElement(el));

console.log(solve(...first));
