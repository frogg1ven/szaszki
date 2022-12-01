export default {
  /**
   * A function to get every square code based on array indexes
   * @param {Number} row
   * @param {Number} col
   * @returns {String}
   */
  getSquareCode(row, col) {
    let rowMapping = ["8", "7", "6", "5", "4", "3", "2", "1"];
    let colMapping = ["A", "B", "C", "D", "E", "F", "G", "H"];

    return colMapping[col] + rowMapping[row];
  },

  /**
   * Get a square color based on given row and column index
   * @param {Number} row
   * @param {Number} col
   * @returns {String}
   */
  getSquareColor(row, col) {
    if ((row % 2 == 0 && col % 2 == 0) || (row % 2 == 1 && col % 2 == 1))
      return "light";
    else return "dark";
  },

  /**
   * Get Square Position Coordinate (x,y)
   * @param {Number} row square row index
   * @param {Number} col square column index
   */
  getSquarePosition(row, col, option = {}) {
    return {
      // x: col * option.square.width + option.padding,
      // y: (row + 1) * option.square.height + option.padding,
      x: col * option.square.width,
      y: (row + 1) * option.square.height + 10,
    };
  },

  /**
   * Get chess piece mapped by square code.
   * @param {String} squareCode
   * @returns {String} The chess piece name
   */
  getSquareContent(squareCode) {
    let contentMapping = {
      A1: "rookW",
      B1: "knightW",
      C1: "bishopW",
      D1: "queenW",
      E1: "kingW",
      F1: "bishopW",
      G1: "knightW",
      H1: "rookW",
      A2: "pawnW",
      B2: "pawnW",
      C2: "pawnW",
      D2: "pawnW",
      E2: "pawnW",
      F2: "pawnW",
      G2: "pawnW",
      H2: "pawnW",

      A8: "rookB",
      B8: "knightB",
      C8: "bishopB",
      D8: "queenB",
      E8: "kingB",
      F8: "bishopB",
      G8: "knightB",
      H8: "rookB",
      A7: "pawnB",
      B7: "pawnB",
      C7: "pawnB",
      D7: "pawnB",
      E7: "pawnB",
      F7: "pawnB",
      G7: "pawnB",
      H7: "pawnB",
    };
    return contentMapping[squareCode];
  },

  /**
   * Get knight possible moves indexes
   * @param {Number} squareRowIndex
   * @param {Number} squareColIndex
   * @returns
   */
  getKnightPossibleMoves(squareRowIndex, squareColIndex) {
    return [
      { rowIndex: squareRowIndex - 2, colIndex: squareColIndex + 1 },
      { rowIndex: squareRowIndex - 2, colIndex: squareColIndex - 1 },
      { rowIndex: squareRowIndex + 2, colIndex: squareColIndex + 1 },
      { rowIndex: squareRowIndex + 2, colIndex: squareColIndex - 1 },

      { rowIndex: squareRowIndex - 1, colIndex: squareColIndex + 2 },
      { rowIndex: squareRowIndex - 1, colIndex: squareColIndex - 2 },
      { rowIndex: squareRowIndex + 1, colIndex: squareColIndex + 2 },
      { rowIndex: squareRowIndex + 1, colIndex: squareColIndex - 2 },
    ];
  },

  /**
   * Get king possible moves mapping array
   * @param {Number} squareRowIndex The current row index number
   * @param {Number} squareColIndex The current col index number
   * @returns {Array}
   */
  getKingPossibleMoves(squareRowIndex, squareColIndex) {
    return [
      { targetRow: squareRowIndex + 1, targetCol: squareColIndex },
      { targetRow: squareRowIndex - 1, targetCol: squareColIndex },
      { targetRow: squareRowIndex, targetCol: squareColIndex + 1 },
      { targetRow: squareRowIndex, targetCol: squareColIndex - 1 },

      // diagonal
      { targetRow: squareRowIndex + 1, targetCol: squareColIndex + 1 },
      { targetRow: squareRowIndex + 1, targetCol: squareColIndex - 1 },
      { targetRow: squareRowIndex - 1, targetCol: squareColIndex + 1 },
      { targetRow: squareRowIndex - 1, targetCol: squareColIndex - 1 },
    ];
  },

  /**
   * Convert object to chess move notations
   * @param {Object} move
   * @returns String
   */
  notationsFromObject(move) {
    if (!Object.keys(move).length) return "";

    let pieceNotationMapping = {
      king: "K",
      queen: "Q",
      bishop: "B",
      rook: "R",
      knight: "N",
      pawn: "",
    };
    console.log("piece notation: ", pieceNotationMapping[move.piece]);

    let fromKey = move.from.toLowerCase();
    let toKey = move.to.toLowerCase();

    if (fromKey[0] == toKey[0]) fromKey = fromKey.substr(1, 2);
    if (fromKey[1] == toKey[1]) fromKey = fromKey.substr(0, 1);

    return (
      pieceNotationMapping[move.piece] +
      fromKey.toLowerCase() +
      toKey.toLowerCase()
    );
  },
};
