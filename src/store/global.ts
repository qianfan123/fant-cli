import { Commit, ActionTree } from 'vuex';
import User from 'model/User';
// state
export interface State {
  user: Nullable<User>; // 当前用户
}

export const state: State = {
  user: undefined,
};

/**
 * 通常不直接调用这个方法
 */
export const mutations = {
  user(state: State, user: User) {
    state.user = user;
  },
  /**
   * 清除状态，通常在退出应用时执行
   *
   * @param {State} state
   */
  clear(state: State) {
    state.user = undefined;
  },
};

export const getters = {};

/**
 * 修改状态只提倡用dispatch
 */
export const actions: ActionTree<State, any> = {
  user(context: {commit: Commit}, user: User) {
    context.commit('user', user);
  },
  clear(context: {commit: Commit}) {
    context.commit('clear');
  },
};

export default { state, getters, mutations, actions };
