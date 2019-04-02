import { Commit, ActionTree } from 'vuex'
import Project from 'model/example/Project'

// 由于ts要申明变量类型，所以这里定义一个类型
export interface State {
  project: Nullable<Project>;
}
// 定义一个变量state类型是上面的State,默认赋初值
export const state: State = {
  project: null
}

/**
 * 通常不直接调用这个方法，这个方法有action调用，用于同步更新state
 */
export const mutations = {
  // @todo 这里给的是example中的使用举例，在实际项目中，需要根据自己的情况做修改
  project(state: State, user: Project) {
    state.project = user
  },
  // @todo 清除状态，通常在退出应用时执行.这里给的是example中的使用举例，在实际项目中，需要根据自己的情况做修改
  clear(state: State) {
    state.project = null
  }
}
// @todo 这个方法中通常用于获取state变量中的值信息
export const getters = {}

/**
 * 修改状态只提倡用dispatch
 */
export const actions: ActionTree<State, any> = {
  // @todo 这里给的是example中的使用举例，在实际项目中，需要根据自己的情况做修改
  project(context: { commit: Commit }, project: Project) {
    context.commit('project', project)
  },
  // @todo 这里给的是example中的使用举例，在实际项目中，可能需要根据自己的情况做修改
  clear(context: { commit: Commit }) {
    context.commit('clear')
  }
}

export default { state, getters, mutations, actions }
