import { first } from "../data.js";
import { flatten } from "ramda";

const elementNames = (element) => {
  return element.map((el) => Object.values(el)).map((i) => i[1]);
};

const namesList = flatten(first.map((el) => elementNames(el)));

const delay = () => {
  return new Promise((resolve) =>
    // setTimeout(resolve, Math.floor(Math.random() * 3000) + 1000)
    setTimeout(resolve, 3000)
  );
};

const playersList = async (arr) => {
  try {
    await delay();
    const result = arr.map((el) => namesList[Math.floor(Math.random() * namesList.length)]);
    return result;
  } catch {
    console.error('no player list')
  }
}

const getPlayers = async (numberOfPlayers) => {
  try {
    await delay();
    const arr = Array.from({ length: numberOfPlayers }, (x, i) => i);
    console.log('arr', arr)
    await delay();
    const players = await playersList(arr);
    console.log('players', players)
    return players;
  } catch {
    console.error("time is out");
  }
};

const teamsList = async (arr, number) => {
  try {
    await delay();
    const result = await arr.map((el) => getPlayers(number));
    console.log('teamList', result)
    return result;
  } catch {
    console.error('no teams Arr')
  }
};

const populateTeams = async (arr) => {
  try {
    await delay();
    const result = await arr.map((el) =>
      el.map((i, x) => ({ name: i, score: Math.floor(Math.random() * 25) }))
    );
    return result;
  } catch {
    console.error('cant populate')

  }
};

const getTeams = async (numberOfPlayers, numberOfTeams) => {
  try {
    await delay();
    const teamsArr = Array.from({ length: numberOfTeams }, (x, i) => i).map(
      (el) => []
    );
    console.log('teamsArr', teamsArr)
    console.log('now 3');
    await delay();

    const populateTeamsArr = await teamsList(teamsArr, numberOfPlayers);
    console.log('populateTeamsArr', populateTeamsArr);

    await delay();
    const teams = await populateTeams(populateTeamsArr);
    // const teams = populateTeamsArr.map((el) =>
    //   el.map((i, x) => ({ name: i, score: Math.floor(Math.random() * 25) }))
    // );
    await delay();
    return teams;
  } catch {
    console.error("no team, out of time");
  }
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
console.log(getTeams(3, 3));

// console.log(getTeamSummaries(await getTeams(5, 5)));
