import { first } from "../data.js";
import { flatten } from "ramda";

const elementNames = (element) => {
  return element.map((el) => Object.values(el)).map((i) => i[1]);
};

const namesList = flatten(first.map((el) => elementNames(el)));

const delay = () => {
  return new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 3000) + 1000) && console.log('waiting...'));
};

const getPlayers = async (numberOfPlayers) => {
  try {
    const arr = Array.from({ length: numberOfPlayers }, (x, i) => i);
    delay();
    const players = arr.map(
    ((el) => namesList[Math.floor(Math.random() * namesList.length)])
    );
    return players;
  } catch {
    console.error("time is out");
  }
};

const getTeams = async (numberOfPlayers, numberOfTeams) => {
  try {
    const teamsArr = Array.from({ length: numberOfTeams }, (x, i) => i).map(
    ((el) => [])
    );
    const populateTeamsArr = await teamsArr.map((el) => {
      getPlayers(numberOfPlayers);
    });
    return await populateTeamsArr.map((el) =>
      el.map((i, x) => ({ name: i, score: Math.floor(Math.random() * 25) }))
    );
  } catch {
    console.error("no team, out of time");
  };

};

const reduceElement = (firstElement) => {
  const arrValue = firstElement.map((el) => Object.values(el)).map((i) => i[1]);
  const reduceScore = arrValue.reduce((a, b) => a + b);
  const namesList = firstElement
    .map((el) => Object.values(el))
    .map((i) => i[0])
    .join(", ");
  return {
    totalScore: reduceScore / firstElement.length,
    names: "Team: " + namesList,
  };
};

const getTeamSummaries = async (teamList) => {
  try {
    const summary = await teamList.map((element) => reduceElement(element));
    delay();
    return summary;
  } catch {
    console.error('no summary')
  }
};


console.log(getPlayers(500));

console.log(getTeams(3, 3));

console.log(getTeamSummaries(getTeams(500, 500)));
