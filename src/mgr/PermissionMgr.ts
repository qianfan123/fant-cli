import ObjectUtil from 'util/ObjectUtil.js'
import store from '../store'
import Vue from 'vue'

export default class PermissionMgr {
  /**
   * 界面权限
   * 方法的原理：
   * 1、用户登录成功后，返回该用户的一个数组，数组中存放的是该用户拥有的权限,存在vuex中的permission字段下
   * 2、后端返回一个数组，该数组存放着菜单的数组，数组中每一条数据中都存在着这个菜单所需要的权限
   * 3、通过对比权限，获取用户能够显示的菜单
   * @param menus
   */
  static filterMenus(menus: any[]): any {
    return new Promise((resolve) => {
      let result: any[] = []
      menus = ObjectUtil.copy(menus)
      menus.forEach((group) => {
        if (PermissionMgr.hasMenuPermissions(group.permissions)) {
          if (group.children && group.children.length >= 0) {
            let children: any[] = []
            group.children.forEach((item: any) => {
              if (PermissionMgr.hasMenuPermissions(item.permissions)) {
                children.push(item)
              }
            })
            group.children = children
            result.push(group)
          } else {
            result.push(group)
          }
        }
      })
      resolve(result)
    })
  }

  static hasMenuPermissions(permissions: string[]) {
    if (!permissions) {
      return true
    }
    if (permissions.length === 0) {
      return true
    }
    if (!store.state.permission || store.state.permission.length === 0) {
      return false
    }
    let result: any = []
    store.state.permission.forEach((item1: any) => {
      permissions.forEach((item2: any) => {
        if (item1.code === item2) {
          result.push(item1)
        }
      })
    })

    if (result.length > 0) {
      return true
    } else {
      return false
    }
  }

  /**
   * 操作权限
   * @param permission
   * 使用举例：
   * hasPermissions: Function = PermissionMgr.hasPermission(当然也可以放在Vue的prototype上来使用，
   * 如Vue.prototype.hasPermissions = PermissionMgr.hasPermissions)
   * v-if="hasPermissions('finance.receivable.create')"
   */
  static hasPermissions(permission: string) {
    let storePermission = store.state.permission
    if (!permission) {
      return true
    }
    if (!storePermission || storePermission.length === 0) {
      return false
    }
    let filterItem = storePermission.filter((item: any) => {
      return item.code === permission
    })
    if (filterItem.length > 0) {
      return true
    } else {
      return false
    }
  }
}
Vue.prototype.hasPermissions = PermissionMgr.hasPermissions