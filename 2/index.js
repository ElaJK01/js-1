import { first } from "../data.js";
import { flatten } from "ramda";

const elementNames = (element) => {
  return element.map((el) => Object.values(el)).map((i) => i[1]);
};

const namesList = flatten(first.map((el) => elementNames(el)));

const delay = () => {
  return new Promise((resolve, reject) =>
    setTimeout(
      () => (shouldThrowError() ? reject("network error") : resolve()),
      3000
    )
  );
};

const shouldThrowError = () => {
  const number = Math.floor(Math.random() * 10);
  number < 1 ? true : false;
};

const playersList = (arr) => {
  return arr.map(() => namesList[Math.floor(Math.random() * namesList.length)]);
};

const reduceElement = (element) => {
  const arrValue = element.map((el) => Object.values(el)).map((i) => i[1]);
  const reduceScore = arrValue.reduce((a, b) => a + b);
  const namesList = element
    .map((el) => Object.values(el))
    .map((i) => i[0])
    .join(", ");

  return {
    averageScore: reduceScore / element.length,
    names: "Team: " + namesList,
  };
};

const getPlayers = async (numberOfPlayers) => {
  try {
    await delay();
    const arr = Array.from({ length: numberOfPlayers }, (x, i) => i);
    const players = await playersList(arr);
    const result = players.map((el) => ({
      name: el,
      score: Math.floor(Math.random() * 25),
    }));
    return result;
  } catch (e) {
    console.error(e);
  }
};

const getTeams = async (numberOfPlayers, numberOfTeams) => {
  try {
    const arr = await Promise.all(
      new Array(numberOfTeams)
        .fill(0)
        .map(async () => await getPlayers(numberOfPlayers))
    );

    await delay();
    return arr;
  } catch {
    console.error("no teams");
  }
};

const getTeamSummaries = async (teamList) => {
  try {
    await delay();
    return teamList.map((element) => reduceElement(element));
  } catch {
    console.error("no summary");
  }
};

// console.log(await getPlayers(3));
//
console.log(await getTeams(5, 3));

// console.log(await getTeamSummaries(await getTeams(5, 5)));
