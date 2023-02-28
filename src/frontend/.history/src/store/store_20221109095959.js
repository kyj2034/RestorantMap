import Vue from 'vue';
import Vuex from vuex;


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
  getAddress: (state) => state.address,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
