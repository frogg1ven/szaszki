export default {
  CHANGE_TURN(state, val) {
    val == "white" ? state.fen = state.fen.replace(/ b /g, ' w ') : state.fen = state.fen.replace(/ w /g, ' b ');
    state.turn = val;
  },
  PUSH_MOVES_HISTORY(state, val) {
    state.movesHistory.push(val);
  },
  RESET_MOVES_HISTORY(state) {
    state.movesHistory = [
      {
        black: {},
        white: {},
      },
    ];
  },
  ADD_MOVE_HISTORY(state, move) {
    let lastMove = state.movesHistory[state.movesHistory.length - 1];
    if (Object.keys(lastMove[move.color]).length) {
      lastMove = {
        black: {},
        white: {},
      };
      state.movesHistory.push(lastMove);
    }

    lastMove[move.color] = move;
  },
  CHANGE_BLACK_SQUARES_COLOR(state, color) {
    state.blackSquares = color;
  },
  CHANGE_WHITE_SQUARES_COLOR(state, color) {
    state.whiteSquares = color;
  },
  CHANGE_LAST_PART(state, part) {
    state.lastPart = part;
  },
  CHANGE_SPLIT_IP(state, ip) {
    state.splitIP = ip;
  },
  CHANGE_IP_COLOR(state, color) {
    state.ipColor = color;
  },
  PUSH_BOARD(state, val){
    state.board.push(val);
  },
  UPDATE_FEN(state, val){
    state.fen = val;
  },
  UPDATE_CASTLE(state, {side, val}){
    switch(side){
      case 0: state.castle.ooW  = val; break;
      case 1: state.castle.oooW = val; break;
      case 2: state.castle.ooB  = val; break;
      case 3: state.castle.oooB = val; break;
    }
  },
  DEFAULT_FEN(state){
    state.turn == "white" ? state.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0" : 
                            state.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 0";
  },
  EMPTY_FEN(state){
    state.turn == "white" ? state.fen = "8/8/8/8/8/8/8/8 w - - 0 0" : 
                            state.fen = "8/8/8/8/8/8/8/8 b - - 0 0";
  },
  CHANGE_OVERFLOW(state, val){
    state.overflow = val;
  }
};
