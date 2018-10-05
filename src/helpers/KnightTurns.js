const offsets = [
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1]
];

const KnightTurns = (item, allyItems) => {
  const legalMoves = [];

  for (let o of offsets) {
    const y = item.y + o[0];
    const x = item.x + o[1];
    const allyOnWay = allyItems.filter(obj => {
      return obj.x === x && obj.y === y;
    });
    if (!allyOnWay.length) {
      legalMoves.push({ y, x });
    }
  }
  return legalMoves;
};

export default KnightTurns;
