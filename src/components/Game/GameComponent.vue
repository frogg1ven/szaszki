<template >
  <svg
    ref="svg"
    :viewBox="`0 0 ${viewbox.x} ${viewbox.y}`"
    @mousemove="onMouseMove"
  >
  <!-- Base Color -->
  <rect
      x="0"
      y="0"
      :width="viewbox.x"
      :height="viewbox.y"
      :fill="boardSettings.baseColor"
    ></rect>
    <!-- ############### czarny edytor pozycji ################ -->
    <g class="position-editor-black-squares">
      <g
        v-for="(squareRow, squareRowIndex) in positionEditorBlack"
        :key="squareRow"
        class="square-row"
      >
        <g
          v-for="(square, squareColIndex) in squareRow"
          :key="square.code"
          :ref="square.code"
          :class="{ square: true, [`square-${square.code}`]: true }"
          @click="
            positionEditorSquareClick(
              $event,
              squareRowIndex,
              squareColIndex,
              0
            )
          "
        >
          <rect
            :class="`rect-${square.code}`"
            :x="square.x"
            :y="square.y"
            :width="square.width"
            :height="square.height"
            :fill="
              square.isPossibleMove
                ? color['possibleMove']
                : color[square.color]
            "
          ></rect>
          <g v-if="square.content.piece">
            <Piece
              v-show="square.visible"
              :key="square.code"
              :name="square.content.piece"
              :x="square.content.x"
              :y="square.content.y + 10"
              :width="square.content.width"
              :height="square.content.height"
              :color="square.content.color"
            />
          </g>
        </g>
      </g>
    </g>
    <!-- ############### END czarny edytor pozycji ################ -->
    <!-- Square group -->
    <g class="squares">
      <g
        v-for="(squareRow, squareRowIndex) in squares"
        :key="squareRowIndex"
        class="square-row"
      >
        <g
          v-for="(square, squareColIndex) in squareRow"
          :key="square.code"
          :ref="square.code"
          :class="{ square: true, [`square-${square.code}`]: true }"
          @touchstart="squareClick($event, squareRowIndex, squareColIndex)"
          @mouseenter="
            squareMouseEnter($event, squareRowIndex, squareColIndex)
          "
          @mouseleave="
            squareMouseLeave($event, squareRowIndex, squareColIndex)
          "
        >
          <rect
            :class="`rect-${square.color}`"
            :x="square.x"
            :y="square.y"
            :width="square.width"
            :height="square.height"
            :fill="
              square.isPossibleMove
                ? color['possibleMove']
                : square.color == 'light' ? lightSquare : darkSquare
            "
          ></rect>
          <g v-if="square.content.piece">
            <Piece
              v-show="square.visible"
              :id="square.level"
              :key="square.code"
              :name="square.content.piece"
              :x="square.content.x"
              :y="square.content.y + 10"
              :width="square.content.width"
              :height="square.content.height"
              :color="square.content.color"
            />
          </g>
        </g>
        <var v-if="castling"/>
      </g>
    </g>
    <g class="notations">
      <text
        v-for="i in 8"
        :key="i"
        class="notation"
        :fill="i % 2 == 1 ? darkSquare : lightSquare"
        x="0"
        :y="30 + 110 * i"
      >
        {{ 9 - i }}
      </text>
      <text
        v-for="(i, n) in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']"
        :key="i"
        class="notation"
        :fill="n % 2 == 1 ? darkSquare : lightSquare"
        :x="90 + 110 * n"
        :y="viewbox.y - 120"
      >
        {{ i }}
      </text>
    </g>
    <g class="holding-piece">
      <Piece
        v-if="isHoldingChessPiece"
        :name="isHoldingChessPiece.content.piece"
        :x="mouseLocation.x - isHoldingChessPiece.content.width / 2"
        :y="mouseLocation.y - isHoldingChessPiece.content.height / 2"
        :width="isHoldingChessPiece.content.width"
        :color="isHoldingChessPiece.content.color"
        :height="isHoldingChessPiece.content.height"
      />
    </g>
    <!-- ############### biały edytor pozycji ################ -->
    <g class="position-editor-white-squares">
      <g
        v-for="(squareRow, squareRowIndex) in positionEditorWhite"
        :key="squareRowIndex"
        class="square-row"
      >
        <g
          v-for="(square, squareColIndex) in squareRow"
          :key="square.code"
          :ref="square.code"
          :class="{ square: true, [`square-${square.code}`]: true }"
          @click="
            positionEditorSquareClick(
              $event,
              squareRowIndex,
              squareColIndex,
              1
            )
          "
        >
          <rect
            :class="`rect-${square.code}`"
            :x="square.x"
            :y="square.y"
            :width="square.width"
            :height="square.height"
            :fill="
              square.isPossibleMove
                ? color['possibleMove']
                : color[square.color]
            "
          ></rect>
          <g v-if="square.content.piece">
            <Piece
              v-show="square.visible"
              :key="square.code"
              :name="square.content.piece"
              :x="square.content.x"
              :y="square.content.y + 10"
              :width="square.content.width"
              :height="square.content.height"
              :color="square.content.color"
            />
          </g>
        </g>
      </g>
    </g>
    <!-- ############### END biały edytor pozycji ################ -->
  </svg>
</template>
<script setup>
import { computed, onMounted, reactive, ref, toRefs } from "vue";
// import { useStore } from "vuex";
import helper from "@/components/Game/GameHelper";
import Piece from "@/components/Game/PieceComponent.vue";
import store from "@/store/index.js";
// import { defineComponent } from "vue";

// const store = useStore();

const viewbox = { x: 880, y: 1120};
/*eslint no-unused-vars: "off"*/
let playerColor = ref("white");
let turn = computed({
  set(val) {
    return store.commit("CHANGE_TURN", val);
  },
  get() {
    return store.state.turn;
  },
});
let oppositeTurn = computed(() => (turn.value == "black" ? "white" : "black"));
let turnNumber = ref(1);
let squares = reactive([]);
let possibleMoves = reactive([]);
let svg = ref(null);
let order = [
  [
    "finger",
    "kingB",
    "queenB",
    "rookB",
    "bishopB",
    "knightB",
    "pawnB",
    "trash",
  ],
  [
    "finger",
    "kingW",
    "queenW",
    "rookW",
    "bishopW",
    "knightW",
    "pawnW",
    "trash",
  ],
];
let positionEditorBlack = reactive([]);
let positionEditorWhite = reactive([]);
let positionEditorFlag = 0;

let darkSquare = computed(() => {return store.state.blackSquares;})
let lightSquare = computed(() => {return store.state.whiteSquares;})

/*eslint no-undef: "off"*/
const props = defineProps({
  boardSettings: {
    required: false,
    type: Object,
    default: () => ({
      padding: 60,
      showNotation: true,
      baseColor: "#9346ff", // kolor ramki
      square: {
        width: 110,
        height: 110,
      },
    }),
  },
  color: {
    type: Object,
    default: () => ({
      light: store.state.whiteSquares, // białe pola
      dark: store.state.blackSquares, // czarne pola
      possibleMove: "#93c47d", // możliwe ruchy
      possibleStroke: "#e06666", // możliwe bicie
      editor: "#bcbcbc",
    }),
  },
});

const { color } = toRefs(props);

/**
 * Init chessboard squares
 * @returns void
 */
function initSquares() {
  for (let i = 0; i < 8; i++) {
    squares.push([]);
    for (let j = 0; j < 8; j++) {
      let squarePosition = helper.getSquarePosition(i, j, props.boardSettings);
      let code = helper.getSquareCode(i, j);
      let squareContent = helper.getSquareContent(code);
      let pieceSize = {
        width: props.boardSettings.square.width,
        height: (props.boardSettings.square.height * 3) / 4,
      };

      squares[i].push({
        isPossibleMove: false,
        code,
        visible: true,
        color: helper.getSquareColor(i, j),
        content: {
          stepNumber: 1,
          color: i < 2 ? "black" : i > 5 ? "white" : null,
          piece: squareContent,
          ...squarePosition,
          ...pieceSize,
        },
        ...squarePosition,
        ...props.boardSettings.square,
      });
    }
  }

  // ########################################################################
  // ######## edytor pozycji czarnych bierek ################################
  positionEditorBlack.push([]);
  positionEditorWhite.push([]);
  for (let y = 0; y < 8; y++) {
    let squarePosition = {
      x: y * props.boardSettings.square.width ,
      y: 0 * props.boardSettings.square.height,
    };
    let code = "black-" + y;
    let squareContent = order[0][y];
    let pieceSize = {
      width: props.boardSettings.square.width,
      height: (props.boardSettings.square.height * 3) / 4,
    };
    positionEditorBlack[0].push({
      isPossibleMove: false,
      code,
      visible: true,
      color: "editor",
      content: {
        stepNumber: 1,
        color: "black",
        piece: squareContent,
        ...squarePosition,
        ...pieceSize,
      },
      ...squarePosition,
      ...props.boardSettings.square,
    });
    // ######## edytor pozycji białych bierek ################################
    squarePosition = {
      x: y * props.boardSettings.square.width,
      y: 9 * props.boardSettings.square.height + 20
    };
    code = "white-" + y;
    squareContent = order[1][y];
    pieceSize = {
      width: props.boardSettings.square.width,
      height: (props.boardSettings.square.height * 3) / 4,
    };
    positionEditorWhite[0].push({
      isPossibleMove: false,
      code,
      visible: true,
      color: "editor",
      content: {
        level: "bot",
        stepNumber: 1,
        color: "white",
        piece: squareContent,
        ...squarePosition,
        ...pieceSize,
      },
      ...squarePosition,
      ...props.boardSettings.square,
    });
  }
}

let isHoldingChessPiece = ref(false);
let holding = reactive({ row: null, col: null });

let editSquare, clickedSquare;
let isMouseDown = false, x = 0, y = 0;

/**
 * Event fire on square click
 * @returns {void}
 */
function squareClick($event, rowIndex, colIndex) {
  /*eslint no-unused-vars: "off"*/
  store.commit("CHANGE_OVERFLOW", false);
  clickedSquare = squares[rowIndex][colIndex];
  isMouseDown = true;

  if (positionEditorFlag != 0) {
    if (isHoldingChessPiece.value) {
      releasePiece($event, clickedSquare);
    } else {
      holding.row = rowIndex;
      holding.col = colIndex;
      holdPiece($event, clickedSquare);
    }
    return;
  }

  if (isHoldingChessPiece.value) {
    // If user is holding a chess piece, then release it.
    releasePiece($event, clickedSquare);
  } else {
    // If user is not holding chess piece, then hold it.
    holding.row = rowIndex;
    holding.col = colIndex;
    holdPiece($event, clickedSquare);
  }
}

addEventListener('touchmove', (e) => {
  // console.log(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  if (isMouseDown && clickedSquare.content.piece){
    let rect = svg.value.getBoundingClientRect();
    clickedSquare.content.x = ((e.changedTouches[0].clientX - rect.x) * viewbox.x) / rect.width - 55;
    clickedSquare.content.y = ((e.changedTouches[0].clientY - rect.y) * viewbox.y) / rect.height - 60;
    // clickedSquare.content.x = e.changedTouches[0].clientX;
    // clickedSquare.content.y = e.changedTouches[0].clientY;
  }
});

addEventListener('touchend', (e) => {
  if (isMouseDown) {
    isMouseDown = false;
    console.log(isMouseDown);
    store.commit("CHANGE_OVERFLOW", true);

    if (isHoldingChessPiece.value) {
      console.log("release");
      releasePiece(e, squares[Math.floor((e.changedTouches[0].clientY - 60) / 50)][Math.floor(e.changedTouches[0].clientX / 50)]);
    }
  }
});

/**
 * Event fire on square click
 * @returns {void}
 */
function positionEditorSquareClick($event, rowIndex, colIndex, color) {
  /*eslint no-unused-vars: "off"*/
  color
    ? (editSquare = positionEditorWhite[rowIndex][colIndex])
    : (editSquare = positionEditorBlack[rowIndex][colIndex]);
  console.log(editSquare.content.piece);
  switch (editSquare.content.piece) {
    // positionEditorFlag = 0 - brak opcji
    // black
    case order[0][1]:
      positionEditorFlag = 1;
      break;
    case order[0][2]:
      positionEditorFlag = 2;
      break;
    case order[0][3]:
      positionEditorFlag = 3;
      break;
    case order[0][4]:
      positionEditorFlag = 4;
      break;
    case order[0][5]:
      positionEditorFlag = 5;
      break;
    case order[0][6]:
      positionEditorFlag = 6;
      break;
    // white
    case order[1][1]:
      positionEditorFlag = 7;
      break;
    case order[1][2]:
      positionEditorFlag = 8;
      break;
    case order[1][3]:
      positionEditorFlag = 9;
      break;
    case order[1][4]:
      positionEditorFlag = 10;
      break;
    case order[1][5]:
      positionEditorFlag = 11;
      break;
    case order[1][6]:
      positionEditorFlag = 12;
      break;
    // finger
    case order[0][0]:
      positionEditorFlag = 13;
      break;
    // trash
    case order[0][7]:
      positionEditorFlag = 14;
      break;
  }
  console.log("positionEditorFlag = ", positionEditorFlag);

  holding.row = rowIndex;
  holding.col = colIndex;
  positionEditorFlag == 13
    ? (isHoldingChessPiece.value = null)
    : (isHoldingChessPiece.value = editSquare);
}

/*eslint no-unused-vars: "off"*/
function playAgain() {
  initSquares();
  turn.value = "white";
  store.commit("RESET_MOVES_HISTORY");
}

function isCheckmate(squareTo) {
  const isKingEaten = () =>
    squareTo.content.piece == "king"
      ? squareTo.content.color == "white"
        ? "black"
        : "white"
      : null;

  let winner = null;

  if ((winner = isKingEaten())) {
    alert(`${winner} win!`);
  }

  if (winner) {
    let playAgain = confirm("Want to play again?");
    if (playAgain) playAgain();
  }

  // if (squareTo.content.piece == "king") {
  // }
}

function addMoveHistory(fromSquare, toSquare) {
  store.commit("ADD_MOVE_HISTORY", {
    color: fromSquare.content.color,
    from: fromSquare.code,
    to: toSquare.code,
    piece: fromSquare.content.piece,
  });
}


/**
 * Hold a chess piece to a square
 */
 function holdPiece($event, square) {
  console.log("HOLDPIECE");
  // if (
  //   (!square.content.piece ||
  //     square.content.color !== turn.value ||
  //     possibleMoves.length == 0) &&
  //   positionEditorFlag != 13
  // ) {
  //   return;
  // }

  isHoldingChessPiece.value = square;
  // square.visible = false;
}

/**
 * Release a chess piece to a square
 * @returns {void}
 */
function releasePiece($event, toSquare) {
  if (positionEditorFlag > 0 && positionEditorFlag < 13) {
    let fromSquare;
    positionEditorFlag < 7
      ? (fromSquare = positionEditorBlack[0][holding.col])
      : (fromSquare = positionEditorWhite[0][holding.col]);
    console.log("release z edycji");
    toSquare.content.piece = fromSquare.content.piece;
    toSquare.content.color = fromSquare.content.color;
    toSquare.visible = true;
    positionEditorFlag = 0;
    updateFen();
    console.log("FEN: ", store.state.fen);
    return;
  } else if (positionEditorFlag == 13) {
    console.log("przesówanie pionków swobodnie");
    positionEditorFlag = 0;
    let fromSquare = squares[holding.row][holding.col];

    toSquare.content.piece = fromSquare.content.piece;
    toSquare.content.color = fromSquare.content.color;
    toSquare.content.stepNumber++;
    toSquare.visible = true;
    fromSquare.content.piece = null;
    fromSquare.content.color = null;

    isHoldingChessPiece.value = false;
    updateFen();
    console.log("FEN: ", store.state.fen);
    return;
  } else if (positionEditorFlag == 14) {
    console.log("usuwanie pionków");
    toSquare.content.piece = null;
    toSquare.content.color = null;
    // toSquare.visible = false;
    positionEditorFlag = 0;
    updateFen();
    console.log("FEN: ", store.state.fen);
    return;
  }
  
  let fromSquare = squares[holding.row][holding.col];
  console.log(fromSquare);
  // jeśli brak możliwych ruchów, odkładamy bierke
  console.log("RELEASEPIECE");
  // if (!toSquare.isPossibleMove) {
  //   isHoldingChessPiece.value = null;
  //   fromSquare.visible = true;
  //   updateFen();
  //   console.log("FEN: ", store.state.fen);
  //   return clearPossibleMoves();
  // }

  // addMoveHistory(fromSquare, toSquare);
  // isCheckmate(toSquare);

  console.log("release from ", squares[holding.row][holding.col]);
  console.log("to ", toSquare);

  toSquare.content.piece = fromSquare.content.piece;
  toSquare.content.color = fromSquare.content.color;
  toSquare.content.stepNumber++;
  toSquare.visible = true;
  fromSquare.content.piece = null;
  fromSquare.content.color = null;

  isHoldingChessPiece.value = false;

  turnNumber.value++;

  clearPossibleMoves();

  turn.value = turn.value == "black" ? "white" : "black";
  store.commit("CHANGE_TURN", turn.value);
  updateFen();
  console.log("FEN: ", store.state.fen);
}

/**
 * Event trigerred on square onmouseenter
 * @param {MouseEvent} $event
 * @param {Number} squareRowIndex
 * @param {Number} squareColIndex
 * @returns {void}
 */
function squareMouseEnter($event, squareRowIndex, squareColIndex) {
  // If hover on a piece and the color is the current turn, show possible moves
  let square = squares[squareRowIndex][squareColIndex];
  if (
    square.content.piece &&
    square.content.color == turn.value &&
    !isHoldingChessPiece.value
  ) {
    showPossibleMoves(squareRowIndex, squareColIndex);
    document.body.style.cursor = "pointer";
  }
}

function makeItPossible(square) {
  square.isPossibleMove = true;
  possibleMoves.push(square);
}

function pawnPossibleMoves(squareRowIndex, squareColIndex) {
  let square = squares[squareRowIndex][squareColIndex];
  let stepForward = 1;
  if (square.content.stepNumber === 1) stepForward = 2;
  if (square.content.color == "white") stepForward *= -1;

  let nextSquare;

  let i = 0;
  do {
    i += square.content.color == "white" ? -1 : 1;

    nextSquare = squares[squareRowIndex + i][squareColIndex];
    // console.log('pawn possible moves', nextSquare)
    if (nextSquare.content.piece) break;
    makeItPossible(nextSquare);
  } while (i !== stepForward);

  // check for topleft and topright
  if (square.content.color == "white") {
    nextSquare = squares[squareRowIndex - 1][squareColIndex - 1];
    if (
      nextSquare &&
      nextSquare.content.piece &&
      nextSquare.content.color == "black"
    )
      makeItPossible(nextSquare);
    nextSquare = squares[squareRowIndex - 1][squareColIndex + 1];
    if (
      nextSquare &&
      nextSquare.content.piece &&
      nextSquare.content.color == "black"
    )
      makeItPossible(nextSquare);
  } else if (square.content.color == "black") {
    nextSquare = squares[squareRowIndex + 1][squareColIndex - 1];
    if (
      nextSquare &&
      nextSquare.content.piece &&
      nextSquare.content.color == "white"
    )
      makeItPossible(nextSquare);
    nextSquare = squares[squareRowIndex + 1][squareColIndex + 1];
    if (
      nextSquare &&
      nextSquare.content.piece &&
      nextSquare.content.color == "white"
    )
      makeItPossible(nextSquare);
  }
}

/**
 * Show rook possible moves by row and column index
 * @param {Number} squareRowIndex
 * @param {Number} squareColIndex
 * @returns {void}
 */
function rookPossibleMoves(squareRowIndex, squareColIndex) {
  let moveTargets = [];
  let directionMapping = {
    top: { row: "min" },
    bottom: { row: "plus" },
    left: { col: "min" },
    right: { col: "plus" },
  };

  for (let directionName in directionMapping) {
    let direction = directionMapping[directionName];
    for (let i = 1; i <= 8; i++) {
      let getOffset = (direction, value) => {
        if (direction == "row") return value == "min" ? -i : i;
        else return value == "min" ? -i : i;
      };

      let targetRow = !direction.row
        ? squareRowIndex
        : squareRowIndex + getOffset("row", direction.row);
      let targetCol = !direction.col
        ? squareColIndex
        : squareColIndex + getOffset("col", direction.col);

      if (targetRow < 0 || targetCol < 0 || targetRow > 7 || targetCol > 7)
        break;
      let currSquare = squares[targetRow][targetCol];

      if (currSquare.content.color == turn.value) break;
      else if (currSquare.content.color == oppositeTurn.value) {
        moveTargets.push({ rowIndex: targetRow, colIndex: targetCol });
        break;
      } else {
        moveTargets.push({ rowIndex: targetRow, colIndex: targetCol });
      }
    }
  }

  moveTargets.forEach((target) => {
    let { rowIndex, colIndex } = target;
    let targetSquare = squares[rowIndex][colIndex];

    if (targetSquare.content.piece && targetSquare.content.color == turn.value)
      return;
    else makeItPossible(targetSquare);
  });
}

/**
 * Show king's possible moves by row and column index
 * @param {Number} squareRowIndex
 * @param {Number} squareColIndex
 * @returns {void}
 */
function kingPossibleMoves(squareRowIndex, squareColIndex) {
  let possibleMovesIndex = helper.getKingPossibleMoves(
    squareRowIndex,
    squareColIndex
  );

  possibleMovesIndex.forEach((possible) => {
    let { targetRow, targetCol } = possible;

    if (targetRow < 0 || targetCol < 0 || targetRow > 7 || targetCol > 7)
      return;

    let square = squares[targetRow][targetCol];

    if (square.content.color == turn.value) return;
    else if (
      !square.content.color ||
      square.content.color == oppositeTurn.value
    )
      makeItPossible(square);
  });
}

/**
 * Show queen's possible moves by row and column index
 * @param {Number} squareRowIndex
 * @param {Number} squareColIndex
 * @returns {void}
 */
function queenPossibleMoves(squareRowIndex, squareColIndex) {
  bishopPossibleMoves(squareRowIndex, squareColIndex);
  rookPossibleMoves(squareRowIndex, squareColIndex);
}

/**
 * Show knight's possible moves by row and column index
 * @param {Number} squareRowIndex
 * @param {Number} squareColIndex
 * @returns {void}
 */
function knightPossibleMoves(squareRowIndex, squareColIndex) {
  let moveTargets = helper.getKnightPossibleMoves(
    squareRowIndex,
    squareColIndex
  );

  moveTargets.forEach((target) => {
    let { rowIndex, colIndex } = target;
    if (rowIndex < 0 || colIndex < 0 || rowIndex > 7 || colIndex > 7) return;

    let targetSquare = squares[rowIndex][colIndex];

    if (targetSquare.content.piece && targetSquare.content.color == turn.value)
      return;
    else makeItPossible(targetSquare);
  });
}

/**
 * Show bishop's possible moves by row and column index
 * @param {Number} squareRowIndex
 * @param {Number} squareColIndex
 * @returns {void}
 */
function bishopPossibleMoves(squareRowIndex, squareColIndex) {
  /*eslint no-unused-vars: "off"*/
  let square = squares[squareRowIndex][squareColIndex];

  let moveTargets = [];
  let directionMapping = {
    topleft: { row: "min", col: "min" },
    topright: { row: "min", col: "plus" },
    bottomleft: { row: "plus", col: "min" },
    bottomright: { row: "plus", col: "plus" },
  };

  // Check diagonally for every direction
  for (let directionName in directionMapping) {
    let direction = directionMapping[directionName];
    for (let i = 1; i <= 8; i++) {
      let targetRow =
        direction.row == "min" ? squareRowIndex - i : squareRowIndex + i;
      let targetCol =
        direction.col == "min" ? squareColIndex - i : squareColIndex + i;

      if (targetRow < 0 || targetCol < 0 || targetRow > 7 || targetCol > 7)
        break;
      let currSquare = squares[targetRow][targetCol];

      if (currSquare.content.color == turn.value) break;
      else if (currSquare.content.color == oppositeTurn.value) {
        moveTargets.push({ rowIndex: targetRow, colIndex: targetCol });
        break;
      } else {
        moveTargets.push({ rowIndex: targetRow, colIndex: targetCol });
      }
    }
  }

  // console.log("Bishop possible:", moveTargets);

  moveTargets.forEach((target) => {
    let { rowIndex, colIndex } = target;
    let targetSquare = squares[rowIndex][colIndex];
    console.log("target", targetSquare);

    if (targetSquare.content.piece && targetSquare.content.color == turn.value)
      return;
    else makeItPossible(targetSquare);
  });
}

const possibleMovesMapping = {
  pawnW: pawnPossibleMoves,
  rookW: rookPossibleMoves,
  kingW: kingPossibleMoves,
  queenW: queenPossibleMoves,
  knightW: knightPossibleMoves,
  bishopW: bishopPossibleMoves,
  pawnB: pawnPossibleMoves,
  rookB: rookPossibleMoves,
  kingB: kingPossibleMoves,
  queenB: queenPossibleMoves,
  knightB: knightPossibleMoves,
  bishopB: bishopPossibleMoves,
};

/**
 * Show possible moves from a square
 * @param {Object} square
 * @returns {void}
 */
function showPossibleMoves(squareRowIndex, squareColIndex) {
  /*eslint no-unused-vars: "off"*/
  // nie pokazuj koloru możliwego ruchu jeśli możliwe jest
  // ustawianie pozcji
  if (positionEditorFlag != 0) return;

  let square = squares[squareRowIndex][squareColIndex];
  return possibleMovesMapping[square.content.piece](
    squareRowIndex,
    squareColIndex
  );
}

/**
 * Remove all possible moves
 */
function clearPossibleMoves() {
  for (let i = 0; i < possibleMoves.length; i++) {
    possibleMoves[i].isPossibleMove = false;
  }
  possibleMoves = reactive([]);
}

/**
 * Event trigerred on square onmouseleave
 * @param {MouseEvent} $event
 * @param {Object} square
 * @returns {void}
 */
function squareMouseLeave($event, squareRowIndex, squareColIndex) {
  // document.body.style.cursor = "initial";
  // if (!isHoldingChessPiece.value) clearPossibleMoves();
}

/**
 * Cancel current turn move
 */
function cancelTurn(squareTo) {}

let mouseLocation = reactive({ x: 0, y: 0 });

/**
 * onMouseMove fired when the mouse moving
 * @param {Event} e
 */
function onMouseMove(e) {
  let rect = svg.value.getBoundingClientRect();
  mouseLocation.x = ((e.clientX - rect.x) * viewbox.x) / rect.width;
  mouseLocation.y = ((e.clientY - rect.y) * viewbox.y) / rect.height;
  // mouseLocation.x = viewbox.x;
  // mouseLocation.y = viewbox.y;
}

function updateFen() {
  // wypisanie zawartości szachownicy
  let boardMap = {
    "rookB"   : "r",
    "knightB" : "n",
    "bishopB" : "b",
    "queenB"  : "q",
    "kingB"   : "k",
    "pawnB"   : "p",
    "pawnW"   : "P",
    "rookW"   : "R",
    "knightW" : "N",
    "bishopW" : "B",
    "queenW"  : "Q",
    "kingW"   : "K"
  }
  let fen = "";
  let emptyCounter = 0;

  for (let i = 0; i < 8; i++){
    for (let j = 0; j < 8; j++){
      if (!squares[i][j].content.piece){
        emptyCounter ++;
      }
      else{
        if (emptyCounter > 0){ 
          fen += emptyCounter;
          emptyCounter = 0;
        }
        squares[i][j].content.piece ? fen += boardMap[squares[i][j].content.piece] : "";
      }
    }
    if (emptyCounter > 0){
      fen += emptyCounter;
      emptyCounter = 0;
    }
    i != 7 ? fen += "/" : fen += "";
  }
  store.state.turn == "white" ? fen += " w " : fen += " b ";
  let castleCounter = 0;
  if (squares[7][4].content.piece == "kingW"){
    squares[7][7].content.piece == "rookW" && store.state.castle.ooW == true ? fen += "K" : castleCounter++;
    squares[7][0].content.piece == "rookW" && store.state.castle.oooW == true ? fen += "Q" : castleCounter++;
  }
  else {
    castleCounter += 2;
  }
  if (squares[0][4].content.piece == "kingB"){
    squares[0][7].content.piece == "rookB" && store.state.castle.ooB == true ? fen += "k" : castleCounter++;
    squares[0][0].content.piece == "rookB" && store.state.castle.oooB == true  ? fen += "q" : castleCounter++;
  }
  else {
    castleCounter += 2;
  }
  if (castleCounter >= 4) {
    fen += "-";
  }
  castleCounter = 0;
  store.commit("UPDATE_FEN", fen);
}

function updateBoard() {
  turn.value = store.state.turn;
  let fen = store.state.fen;
  let i = 0, j = 0, n = 0;
  while (fen[n] != " "){
    if (fen[n] != '/'){
      switch(fen[n]){
        case 'r': squares[i][j].content.piece = "rookB";    j++; break;
        case 'n': squares[i][j].content.piece = "knightB";  j++; break;
        case 'b': squares[i][j].content.piece = "bishopB";  j++; break;
        case 'q': squares[i][j].content.piece = "queenB";   j++; break;
        case 'k': squares[i][j].content.piece = "kingB";    j++; break;
        case 'p': squares[i][j].content.piece = "pawnB";    j++; break;
        case 'R': squares[i][j].content.piece = "rookW";    j++; break;
        case 'N': squares[i][j].content.piece = "knightW";  j++; break;
        case 'B': squares[i][j].content.piece = "bishopW";  j++; break;
        case 'Q': squares[i][j].content.piece = "queenW";   j++; break;
        case 'K': squares[i][j].content.piece = "kingW";    j++; break;
        case 'P': squares[i][j].content.piece = "pawnW";    j++; break;
        case '1': squares[i][j].content.piece = null;       j++; break;
        case '2': for (let k = 0; k < 2; k++) { squares[i][j].content.piece = null; j++; } break;
        case '3': for (let k = 0; k < 3; k++) { squares[i][j].content.piece = null; j++; } break;
        case '4': for (let k = 0; k < 4; k++) { squares[i][j].content.piece = null; j++; } break;
        case '5': for (let k = 0; k < 5; k++) { squares[i][j].content.piece = null; j++; } break;
        case '6': for (let k = 0; k < 6; k++) { squares[i][j].content.piece = null; j++; } break;
        case '7': for (let k = 0; k < 7; k++) { squares[i][j].content.piece = null; j++; } break;
        case '8': for (let k = 0; k < 8; k++) { squares[i][j].content.piece = null; j++; } break;
        default : break; 
      }
    }
    else {
      i++;
      j = 0;
    }
    n++;
  }
}

// let fenString = computed(() =>  { 
//   updateFen(); 
//   updateBoard(); 
//   return null;
// });

let castling = computed(() => {
  updateFen(); 
  return store.state.castle;
})

onMounted(() => {
  initSquares();
  updateFen();
});
</script>
<style lang="scss">
.holding-piece {
  pointer-events: none;
}
.notation {
  font: bold 1.5rem serif;
}
</style>
