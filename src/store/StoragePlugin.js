/**
 * 对vuex state进行持久化存储，主要用来跨页面间调用
 *
 * @param store
 */
import ObjectUtil from '../util/ObjectUtil';

const storagePlugin = (store) => {
  var key = 'vuex'

  // 从缓存中读取
  var storageState = JSON.parse(sessionStorage.getItem(key))
  let initState = ObjectUtil.copy(store.state)
  Object.assign(initState, storageState)
  store.replaceState(initState)

  store.subscribe((mutation, state) => {
    console.log(store)
    sessionStorage.setItem(key, JSON.stringify(state))
  })
}

export default storagePlugin
