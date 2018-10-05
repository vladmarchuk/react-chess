import PawnTurns from "./PawnTurns";
import KnigntTurns from "./KnightTurns"

const getAllowedTurns = (item, allyItems) => {
  let name = item.chessman;
  switch(name) {
    case "pawn":
      return PawnTurns(item, allyItems);
    case "knight":
      return KnigntTurns(item, allyItems);
    default:
      return KnigntTurns(item, allyItems);
  }
};

export default getAllowedTurns;