const namesList = (element) => {
  return element
    .map((el) => {
      const { name } = el;
      return name;
    })
    .join(", ");
};

export default namesList;
