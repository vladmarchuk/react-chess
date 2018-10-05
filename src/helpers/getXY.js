module.exports = arr => {
  return arr.map(item => {
    const posArr = item.position.split("");
    const XY = {
      y: parseInt(posArr[1], 10),
      x: posArr[0].charCodeAt() - 96,
    };
    return { ...item, ...XY };
  });
};
