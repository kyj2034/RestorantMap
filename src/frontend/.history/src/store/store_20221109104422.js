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
  actions : actions,
  mutations : mutations,
  getters: {
    getAddress: (state) => state.address,
  },
});
