import { first } from "../data.js";
import { flatten, includes } from "ramda";
import { namesList, reducedScore } from "../helpers.js";

const names = flatten(first.map((el) => namesList(el)));

const shouldThrowError = () => {
  const number = Math.floor(Math.random() * 10);
  return number < 1;
};

const delay = () => {
  return new Promise((resolve, reject) =>
    setTimeout(
      () => (shouldThrowError() ? reject("network error") : resolve()),
      Math.floor(Math.random() * 2000) + 1000
    )
  );
};

const playersList = (arr) => {
  return arr.map(() => names[Math.floor(Math.random() * names.length)]);
};

const getPlayers = async (numberOfPlayers) => {
  try {
    await delay();
    const arr = Array.from({ length: numberOfPlayers }, (x, i) => i);
    const players = await playersList(arr);
    if (!includes(undefined, players)) {
      return players.map((el) => ({
        name: el,
        score: Math.floor(Math.random() * 25),
      }));
    }
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
    if (!includes(undefined, arr)) {
      return arr;
    }
  } catch {
    console.error("no teams");
  }
};

const reduceElement = (element) => {
  return {
    averageScore: reducedScore(element) / element.length,
    names: `Team: ${namesList(element).join(", ")}`,
  };
};

const getTeamSummaries = async (teamList) => {
  try {
    await delay();
    return teamList.map((element) => reduceElement(element));
  } catch (e) {
    console.error("no summary", e);
  }
};

console.log(await getPlayers(3));

console.log(await getTeams(5, 3));

console.log(await getTeamSummaries(await getTeams(2, 3)));
