import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const state = () => ({
  address: null,
})

const actions = {
  setAddressAct({commit},payload) {
    commit('setAddressAct', payload);
  }
}

const mutations = {
  setAddress(state, address){
    state.address = address;
  },
};

const getters = {
}

export default new Vuex.Store({
  namespaced: true,
  state : state,
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
