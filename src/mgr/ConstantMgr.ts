export const backendMenus = [
  {
    name: '首页',
    code: 'home',
    icon: 'ic-ic_home',
    url: '/home',
    home: true
  }
]

export const loadingOption = {
  lock: true,
  text: '加载中，请稍后...',
  spinner: 'el-icon-loading',
  background: 'transparent'
}
export default {
  backendMenus,
  loadingOption
}

