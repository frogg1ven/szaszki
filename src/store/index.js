import Vuex from 'vuex';
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {
    getColorWhite(state) {
      return state.whiteSquares;
    },
    getColorBlack(state) {
      return state.blackSquares;
    },
  },
});
