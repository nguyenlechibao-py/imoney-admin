import API from "@/core/plugins/api";

const state = () => ({
  loading: false,
  error: null,
});

const getters = {};

const actions = {
  async doAsync({ commit }, { email, password }) {
    commit("LOADING");
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      if (res.data.is_success) {
        let data = { user: res.data.user, token: res.data.token };
        const { user, token } = data;
        commit("auth/SET_AUTH", { user, token }, { root: true });
        return true;
      }
    } catch (e) {
      commit("SET_ERROR", e.response.data.message);
      return false;
    } finally {
      commit("LOADED");
    }
  },
};

const mutations = {
  LOADING: (s) => {
    s.loading = true;
    s.error = null;
  },
  LOADED: (s) => (s.loading = false),
  SET_ERROR: (s, error) => (s.error = error),
};

export default {
  namespaced: true,
  state: state(),
  actions,
  mutations,
  getters,
};
