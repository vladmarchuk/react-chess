const maxMoveDist = y => {
  if (y === 2 || y === 7) {
    return 2;
  } else {
    return 1;
  }
};

const PawnTurns = (item, allyItems) => {
  const dir = item.color === "white" ? 1 : -1;
  const legalMoves = [];
  let movePath = maxMoveDist(item.y) * dir;
  for (let i = 1; i <= Math.abs(movePath); i++) {
    const x = item.x;
    const y = item.y + i * dir;
    const allyOnWay = allyItems.filter(obj => {
      return obj.x === x && obj.y === y;
    });

    if (!allyOnWay.length) {
      legalMoves.push({ y, x });
    }
  }
  return legalMoves;
};

export default PawnTurns;
