export default () => ({
  turn: "white",
  turnNumber: 1,
  squares: [],
  movesHistory: [
    {
      black: {},
      white: {},
    },
  ],
  svg: null,
  blackSquares: "#2c2c2c",
  whiteSquares: "#FFFFFF",
  lastPart: 255,
  splitIP: [],
});
