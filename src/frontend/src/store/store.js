import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state : {
    address: null,
  },
  actions : {
    setAddressAct({commit},payload) {
      console.log(payload);
      commit('setAddress', payload);
    }
  },
  mutations : {
    setAddress(state, payload){
      state.address = payload;
    },
  },
  getters: {
    getAddress: (state) => state.address,
  },
});
