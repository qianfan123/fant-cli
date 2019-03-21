import { Commit, ActionTree } from 'vuex'
import Project from 'model/test/Project'

// state
export interface State {
  project: Nullable<Project>;
}

export const state: State = {
  project: null
}

/**
 * 通常不直接调用这个方法
 */
export const mutations = {
  project(state: State, user: Project) {
    state.project = user
  },
  /**
   * 清除状态，通常在退出应用时执行
   *
   * @param {State} state
   */
  clear(state: State) {
    state.project = null
  }
}

export const getters = {}

/**
 * 修改状态只提倡用dispatch
 */
export const actions: ActionTree<State, any> = {
  project(context: { commit: Commit }, project: Project) {
    context.commit('project', project)
  },
  clear(context: { commit: Commit }) {
    context.commit('clear')
  }
}

export default { state, getters, mutations, actions }
