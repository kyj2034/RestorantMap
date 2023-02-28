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
      commit('setAddressAct', payload);
    }
  },
  mutations : {
    setAddress(state, address){
      state.address = address;
    },
  },
  getters: {
    getAddress: (state) => state.address,
  },
});
