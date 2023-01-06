<template>
  <svg
    ref="svg"
    :viewBox="`0 0 ${viewbox.x} ${viewbox.y}`"
  >
    <!-- Base Color -->
    <rect
      class="bottom"
      x="0"
      y="0"
      :width="viewbox.x"
      :height="viewbox.y"
      :fill="boardSettings.baseColor"
    ></rect>
    <!-- ############### czarny edytor pozycji ################ -->
    <g class="position-editor-black-squares">
      <!-- <g
        v-for="(squareRow, squareRowIndex) in positionEditorBlack"
        :key="squareRowIndex"
        class="square-row"
      > -->
        <g
          v-for="(square, squareColIndex) in positionEditorBlack"
          :key="square.code"
          :ref="square.code"
          :class="{ square: true, [`square-${square.code}`]: true }"
          id="rect"
          @click="positionEditorSquareClick($event, squareColIndex, 0)"
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
      <!-- </g> -->
    </g>
    <!-- ############### END czarny edytor pozycji ################ -->
    <!-- Square group -->
    <g class="squares"
    >
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
          id="rect"
          @touchstart="squareClick($event, squareRowIndex, squareColIndex)"

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
                : square.color == 'light'
                ? lightSquare
                : darkSquare
            "
          ></rect>
          <g v-if="square.content.piece" class="top">
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
        <!-- <var v-if="castling" /> -->
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

    <!-- ############### biały edytor pozycji ################ -->
    <g class="position-editor-white-squares">
      <!-- <g
        v-for="(squareRow, squareRowIndex) in positionEditorWhite"
        :key="squareRowIndex"
        class="square-row"
      > -->
        <g
          v-for="(square, squareColIndex) in positionEditorWhite"
          :key="square.code"
          :ref="square.code"
          :class="{ square: true, [`square-${square.code}`]: true }"
          id="rect"
          @click="positionEditorSquareClick($event, squareColIndex, 1)"
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
      <!-- </g> -->
    </g>
    <!-- ############### END biały edytor pozycji ################ -->
    <g class="holding-piece">
      <Piece
        v-if="isHoldingChessPiece"
        :name="isHoldingChessPiece.content.piece"
        :x="touchLocation.x"
        :y="touchLocation.y"
        :width="isHoldingChessPiece.content.width"
        :color="isHoldingChessPiece.content.color"
        :height="isHoldingChessPiece.content.height"
      />
    </g>
    <g class="dummy-piece">
      <Piece
        v-if="isDummyChessPiece"
        :name="isDummyChessPiece.content.piece"
        :x="dummyLocation.x"
        :y="dummyLocation.y"
        :width="isDummyChessPiece.content.width"
        :color="isDummyChessPiece.content.color"
        :height="isDummyChessPiece.content.height"
      />
    </g>
  </svg>
</template>
<script setup>
import { computed, onMounted, reactive, ref, toRefs, nextTick } from "vue";
// import { useStore } from "vuex";
import helper from "@/components/Game/GameHelper";
import Piece from "@/components/Game/PieceComponent.vue";
import store from "@/store/index.js";
import { add, navigateSharp } from "ionicons/icons";
// import { defineComponent } from "vue";

// const store = useStore();

const viewbox = { x: 880, y: 1120 };
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
  "finger",
  "kingB",
  "queenB",
  "rookB",
  "bishopB",
  "knightB",
  "pawnB",
  "trash",
  "finger",
  "kingW",
  "queenW",
  "rookW",
  "bishopW",
  "knightW",
  "pawnW",
  "trash",
];
let positionEditorBlack = reactive([]);
let positionEditorWhite = reactive([]);
let positionEditorFlag = 0;
let deletedCords = [];
let addedCords = [];

let darkSquare = computed(() => {
  return store.state.blackSquares;
});
let lightSquare = computed(() => {
  return store.state.whiteSquares;
});

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
      clicked: "#c8a0ff",
    }),
  },
});

const { color } = toRefs(props);

/**
 * Init chessboard squares
 * @returns void
 */
function initSquares() {
  rect = svg.value.getBoundingClientRect();
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
  // positionEditorBlack.push([]);
  // positionEditorWhite.push([]);
  for (let y = 0; y < 8; y++) {
    let squarePosition = {
      x: y * props.boardSettings.square.width,
      y: 0 * props.boardSettings.square.height,
    };
    let code = "black-" + y;
    let squareContent = order[y];
    let pieceSize = {
      width: props.boardSettings.square.width,
      height: (props.boardSettings.square.height * 3) / 4,
    };
    positionEditorBlack.push({
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
      y: 9 * props.boardSettings.square.height + 20,
    };
    code = "white-" + y;
    squareContent = order[y + 8];
    pieceSize = {
      width: props.boardSettings.square.width,
      height: (props.boardSettings.square.height * 3) / 4,
    };
    positionEditorWhite.push({
      isPossibleMove: false,
      code,
      visible: true,
      color: "editor",
      content: {
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
let isDummyChessPiece = ref(false);
let holding = reactive({ row: null, col: null });
let present = reactive({ row: null, col: null });
let touchLocation = reactive({ x: 0, y: 0 });
let dummyLocation = reactive({ x: 0, y: 0 });
let rect;

function getPresent(e) {
  present.row = Math.floor((e.changedTouches[0].clientY - 60 - rect.y) / 50); 
  present.col = Math.floor((e.changedTouches[0].clientX - rect.x) / 50);
}

function getTouchLocation(e) {
  rect = svg.value.getBoundingClientRect();
  touchLocation.x = ((e.changedTouches[0].clientX - rect.x) * viewbox.x) / rect.width - 55;
  touchLocation.y = ((e.changedTouches[0].clientY - rect.y) * viewbox.y) / rect.height - 60;
}

/**
 * Event fire on square click
 * @returns {void}
 */
function squareClick(e, row, col) {
  store.commit("CHANGE_OVERFLOW", false);
  holding.row = row;
  holding.col = col;

  getTouchLocation(e);
  
  if (squares[row][col].content.piece &&
    (positionEditorFlag == 0 || positionEditorFlag == 8)
  ) {
    holdPiece(squares[row][col]);
  } else {
    releaseFromEditor(e, 0);
  }
}

addEventListener('touchmove', (e) => {
  getTouchLocation(e);
  releaseFromEditor(e, 16);
});

function releaseFromEditor(e, n) {
  getPresent(e);
  switch (positionEditorFlag + n) {
    case 0: case 8: case 16: case 24:
      // przesuwanie bierek
      break;
    case 7: case 15:
      // usuwanie pierwszej bierki
      if (squares[present.row][present.col].content.piece) {
        // żeby nie zmienić targetu eventu "touch", zmieniamy tylko widzialność bierki pierwszej bierki, którą chcemy usunąć
        squares[present.row][present.col].visible = false;
        //zapisujemy kordy "usuniętej" bierki
        deletedCords = [present.row, present.col];
      }
      break;
    case 23: case 31:
      // usuwanie bierek, które nie są kliknięte jako pierwsze
      if (squares[present.row][present.col].content.piece && (deletedCords[0] != present.row || deletedCords[1] != present.col)) {
        squares[present.row][present.col].content.piece = null;
        squares[present.row][present.col].content.color = null;
      }
      break;
    case 1: case 2: case 3: case 4: case 5: case 6: case 9: case 10: case 11: case 12: case 13: case 14:
      // dodwanie wybranej bierki na pierwszym klikniętym polu, na którym stoi bierka
      if (squares[present.row][present.col].content.piece != order[positionEditorFlag]) {

        positionEditorFlag < 7 ? isDummyChessPiece.value = positionEditorBlack[positionEditorFlag]: 
                                 isDummyChessPiece.value = positionEditorWhite[positionEditorFlag - 8];

        dummyLocation.x = squares[present.row][present.col].x;
        dummyLocation.y = squares[present.row][present.col].y + 10;

        addedCords = [present.row, present.col];

        squares[present.row][present.col].visible = false;
      }
      break;
    default:
      // dodwanie wybranej bierki
      if (squares[present.row][present.col].content.piece != order[positionEditorFlag] &&
         (present.row != addedCords[0] || present.col != addedCords[1])) {
        squares[present.row][present.col].content.piece = order[positionEditorFlag];
        positionEditorFlag < 8
          ? (squares[present.row][present.col].content.color = "black")
          : (squares[present.row][present.col].content.color = "white");
      }
  }
}

addEventListener('touchend', (e) => {
  store.commit("CHANGE_OVERFLOW", true);
  // jeżeli deletedCords nie jest pustą tablicą, oznacza, że zmieniona zosała widzialność usuwanego pionka,
  // ale nie został on usunięty, dlatego teraz nalży go usunąć i wyzerować tablicę deletedCords
  if (deletedCords.length){
    squares[deletedCords[0]][deletedCords[1]].visible = true;
    squares[deletedCords[0]][deletedCords[1]].content.piece = null;
    squares[deletedCords[0]][deletedCords[1]].content.color = null;
    deletedCords = [];
  }

  // jeżeli addedCords nie jest puste, zmianiamy widzialność pionka (żeby nie zminił się target toucha), w jego miejsu stawiamy atrapę, 
  // jeżeli touch się kończy, to usuwana jest atrapa i aktualizowany jest faktycznie ustawiony pionek
  if (addedCords.length){
    squares[addedCords[0]][addedCords[1]].visible = true;
    squares[addedCords[0]][addedCords[1]].content.piece = isDummyChessPiece.value.content.piece;
    squares[addedCords[0]][addedCords[1]].content.color = isDummyChessPiece.value.content.color;

    isDummyChessPiece.value = false;
    addedCords = [];
  }


  if (isHoldingChessPiece.value && (positionEditorFlag == 0 || positionEditorFlag == 8)) {
    console.log("odkładam pionek, który trzymam w ręce");
    getPresent(e);
    if (present.row < 0 || present.row > 7 || present.col < 0 || present.col > 7) {
      isHoldingChessPiece.value = false;
      squares[holding.row][holding.col].content.piece = null;
      squares[holding.row][holding.col].content.color = null;
      return;
    }
    releasePiece(present.row, present.col);
  }
});

/**
 * Hold a chess piece to a square
 */
function holdPiece(square) {
  console.log("holdPiece");
  isHoldingChessPiece.value = square;
  square.visible = false;
  isHoldingChessPiece.value.content.x = touchLocation.x;
  isHoldingChessPiece.value.content.y = touchLocation.y;
}

function releasePiece(toSquareRow, toSquareCol) {
  let fromSquare = squares[holding.row][holding.col];
  let toSquare = squares[toSquareRow][toSquareCol];

  // odkładanie na inne pole
  if (holding.row != toSquareRow || holding.col != toSquareCol) {
    toSquare.content.piece = fromSquare.content.piece;
    toSquare.content.color = fromSquare.content.color;
    toSquare.content.x = toSquare.x;
    toSquare.content.y = toSquare.y;
    toSquare.content.stepNumber++;
    toSquare.visible = true;

    fromSquare.content.piece = null;
    fromSquare.content.color = null;
    fromSquare.visible = true;

    isHoldingChessPiece.value = false;

    turnNumber.value++;

    updateFen();
    console.log("FEN: ", store.state.fen);
  }
  // odkładanie na to samo pole
  else if (holding.row == toSquareRow && holding.col == toSquareCol) {

    toSquare.content.piece = fromSquare.content.piece;
    toSquare.content.color = fromSquare.content.color;
    toSquare.content.x = toSquare.x;
    toSquare.content.y = toSquare.y;
    toSquare.visible = true;

    isHoldingChessPiece.value = false;
  }
}

/**
 * Event fire on square click
 * @returns {void}
 */
function positionEditorSquareClick($event, colIndex, color) {
  for (let i = 0; i < 8; i++) {
    positionEditorWhite[i].color = "editor";
    positionEditorBlack[i].color = "editor";
  }
  color
    ? ((positionEditorFlag = colIndex + 8),
      colIndex == 0 || colIndex == 7
        ? ((positionEditorWhite[colIndex].color = "clicked"),
          (positionEditorBlack[colIndex].color = "clicked"))
        : (positionEditorWhite[colIndex].color = "clicked"))
    : ((positionEditorFlag = colIndex),
      colIndex == 0 || colIndex == 7
        ? ((positionEditorWhite[colIndex].color = "clicked"),
          (positionEditorBlack[colIndex].color = "clicked"))
        : (positionEditorBlack[colIndex].color = "clicked"));
  console.log("positionEditorFlag = ", positionEditorFlag);

  // holding.row = rowIndex;
  // holding.col = colIndex;
  // if (positionEditorFlag != 13){
  //   isHoldingChessPiece.value = squares
  // }
  // positionEditorFlag == 13
  //   ? (isHoldingChessPiece.value = null)
  //   : (isHoldingChessPiece.value = editSquare);
}

function updateFen() {
  // wypisanie zawartości szachownicy
  let boardMap = {
    rookB: "r",
    knightB: "n",
    bishopB: "b",
    queenB: "q",
    kingB: "k",
    pawnB: "p",
    pawnW: "P",
    rookW: "R",
    knightW: "N",
    bishopW: "B",
    queenW: "Q",
    kingW: "K",
  };
  let fen = "";
  let emptyCounter = 0;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (!squares[i][j].content.piece) {
        emptyCounter++;
      } else {
        if (emptyCounter > 0) {
          fen += emptyCounter;
          emptyCounter = 0;
        }
        squares[i][j].content.piece
          ? (fen += boardMap[squares[i][j].content.piece])
          : "";
      }
    }
    if (emptyCounter > 0) {
      fen += emptyCounter;
      emptyCounter = 0;
    }
    i != 7 ? (fen += "/") : (fen += "");
  }
  store.state.turn == "white" ? (fen += " w ") : (fen += " b ");
  let castleCounter = 0;
  if (squares[7][4].content.piece == "kingW") {
    squares[7][7].content.piece == "rookW" && store.state.castle.ooW == true
      ? (fen += "K")
      : castleCounter++;
    squares[7][0].content.piece == "rookW" && store.state.castle.oooW == true
      ? (fen += "Q")
      : castleCounter++;
  } else {
    castleCounter += 2;
  }
  if (squares[0][4].content.piece == "kingB") {
    squares[0][7].content.piece == "rookB" && store.state.castle.ooB == true
      ? (fen += "k")
      : castleCounter++;
    squares[0][0].content.piece == "rookB" && store.state.castle.oooB == true
      ? (fen += "q")
      : castleCounter++;
  } else {
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
  let i = 0,
    j = 0,
    n = 0;
  while (fen[n] != " ") {
    if (fen[n] != "/") {
      switch (fen[n]) {
        case "r":
          squares[i][j].content.piece = "rookB";
          j++;
          break;
        case "n":
          squares[i][j].content.piece = "knightB";
          j++;
          break;
        case "b":
          squares[i][j].content.piece = "bishopB";
          j++;
          break;
        case "q":
          squares[i][j].content.piece = "queenB";
          j++;
          break;
        case "k":
          squares[i][j].content.piece = "kingB";
          j++;
          break;
        case "p":
          squares[i][j].content.piece = "pawnB";
          j++;
          break;
        case "R":
          squares[i][j].content.piece = "rookW";
          j++;
          break;
        case "N":
          squares[i][j].content.piece = "knightW";
          j++;
          break;
        case "B":
          squares[i][j].content.piece = "bishopW";
          j++;
          break;
        case "Q":
          squares[i][j].content.piece = "queenW";
          j++;
          break;
        case "K":
          squares[i][j].content.piece = "kingW";
          j++;
          break;
        case "P":
          squares[i][j].content.piece = "pawnW";
          j++;
          break;
        case "1":
          squares[i][j].content.piece = null;
          j++;
          break;
        case "2":
          for (let k = 0; k < 2; k++) {
            squares[i][j].content.piece = null;
            j++;
          }
          break;
        case "3":
          for (let k = 0; k < 3; k++) {
            squares[i][j].content.piece = null;
            j++;
          }
          break;
        case "4":
          for (let k = 0; k < 4; k++) {
            squares[i][j].content.piece = null;
            j++;
          }
          break;
        case "5":
          for (let k = 0; k < 5; k++) {
            squares[i][j].content.piece = null;
            j++;
          }
          break;
        case "6":
          for (let k = 0; k < 6; k++) {
            squares[i][j].content.piece = null;
            j++;
          }
          break;
        case "7":
          for (let k = 0; k < 7; k++) {
            squares[i][j].content.piece = null;
            j++;
          }
          break;
        case "8":
          for (let k = 0; k < 8; k++) {
            squares[i][j].content.piece = null;
            j++;
          }
          break;
        default:
          break;
      }
    } else {
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
});

onMounted(() => {
  initSquares();
  updateFen();
  positionEditorWhite[0].color = "clicked";
  positionEditorBlack[0].color = "clicked";
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
