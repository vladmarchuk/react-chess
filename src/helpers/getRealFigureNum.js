module.exports = string => {
  const posArr = string.split("");
  return [String.fromCharCode(parseInt(posArr[0], 10) + 96), posArr[1]].join("");
};
