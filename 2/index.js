import { first } from "../data.js";
import { flatten } from "ramda";

const elementNames = (element) => {
  return element.map((el) => Object.values(el)).map((i) => i[1]);
};

const namesList = flatten(first.map((el) => elementNames(el)));

const delay = async () => {
  return new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 3000) + 1000));
};

const getPlayers = (numberOfPlayers) => {
  // try {
    const arr = Array.from({ length: numberOfPlayers }, (x, i) => i);
    const players = arr.map((el) => namesList[Math.floor(Math.random() * namesList.length)]
    );
    return players;
  // } catch {
  //   console.error("time is out");
  // }
};


const getTeams = (numberOfPlayers, numberOfTeams) => {
  // try {
    const teamsArr = Array.from({ length: numberOfTeams }, (x, i) => i).map(
      (el) => []
    );
    // console.log('teamsArr', teamsArr)
    // console.log('heare 3')

    const populateTeamsArr = teamsArr.map((el) =>
       getPlayers(numberOfPlayers)
    );
    // console.log('populateTeamsArr', populateTeamsArr)

  const teams = populateTeamsArr.map(el => el.map((i, x) => ({name: i, score: Math.floor(Math.random() * 25)})))

   console.log("teams", teams);

    return teams;
  // } catch {
  //   console.error("no team, out of time");
  // };

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
    console.log('now 1')
    const summary = await teamList.map(
      (element) => reduceElement(element)
    );
    console.log('summary', summary)

    console.log('now 2')
    return summary;
  } catch {
    console.error('no summary')
  }
};

//
// console.log(getPlayers(500));
//
// console.log('getteams', getTeams(3, 3));

console.log(getTeamSummaries(getTeams(5, 5)));
