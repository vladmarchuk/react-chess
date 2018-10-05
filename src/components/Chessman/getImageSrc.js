const getImage = (color, figure) => {
  const toUp = str => str[0].toUpperCase() + str.substring(1);
  return require(`./assets/Chess_${toUp(color)}_${toUp(figure)}.svg`);
};

export default getImage;
