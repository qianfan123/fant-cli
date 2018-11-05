import store from 'store/index';
import router from '..//router';
import { sessionStorage } from 'mgr/BrowserMgr.js';

export default class ShortcutMgr {

  /**
   * 统一注销方法
   */
  public static logout() {
    sessionStorage.clearItem('vuex');
    router.push('/login');
    setTimeout(() => {
      store.dispatch('clear');
    }, 300);
  }
}
