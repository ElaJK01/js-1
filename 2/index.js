import { first } from "../data.js";
import { flatten } from "ramda";

const elementNames = (element) => {
  return element.map((el) => Object.values(el)).map((i) => i[1]);
};

const namesList = flatten(first.map((el) => elementNames(el)));

const delay = () => {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 3000) + 1000)
  );
};

const getPlayers = async (numberOfPlayers) => {
  try {
    const arr = Array.from({ length: numberOfPlayers }, (x, i) => i);
    const players = arr.map((el) => namesList[Math.floor(Math.random() * namesList.length)]
    );
    // await delay();
    console.log('players')
    return players;
  } catch {
    console.error("time is out");
  }
};

const getTeams = async (numberOfPlayers, numberOfTeams) => {
  try {
    const teamsArr = Array.from({ length: numberOfTeams }, (x, i) => i).map(
      (el) => []
    );
    console.log('teamsArr', teamsArr)
    console.log('now 3');

    const populateTeamsArr = teamsArr.map(
      (el) => getPlayers(numberOfPlayers)
    );
    await delay();
    console.log('populateTeamsArr', populateTeamsArr);
    const teams = populateTeamsArr.map((el) =>
      el.map((i, x) => ({ name: i, score: Math.floor(Math.random() * 25) }))
    );
    await delay();
    return teams;
  } catch {
    console.error("no team, out of time");
  };

};

const reduceElement = (element) => {
  const arrValue = element.map((el) => Object.values(el)).map((i) => i[1]);
  const reduceScore = arrValue.reduce((a, b) => a + b);
  const namesList = element
    .map((el) => Object.values(el))
    .map((i) => i[0])
    .join(", ");

  return {
    totalScore: reduceScore / element.length,
    names: "Team: " + namesList,
  };
};

const getTeamSummaries = async (teamList) => {
  try {
    console.log('now 1')
    await delay();
    const summary = teamList.map(
      (element) => reduceElement(element)
    );

    console.log('summary', summary)

    console.log('now 2')
    return summary;
  } catch {
    console.error('no summary')
  }
};

// console.log(getPlayers(500));
//
// console.log('getteams', getTeams(3, 3));

console.log(getTeamSummaries(await getTeams(5, 5)));
