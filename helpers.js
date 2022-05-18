export const namesList = (element) => {
  return element.map((el) => {
    const { name } = el;
    return name;
  });
};

export const reducedScore = (element) => {
  return element
    .map((el) => {
      const { score } = el;
      return score;
    })
    .reduce((prevScore, nextScore) => prevScore + nextScore);
};
