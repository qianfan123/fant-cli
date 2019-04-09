import ObjectUtil from 'util/ObjectUtil.js'
import store from '../store'

export default class PermissionMgr {
  /**
   * 界面权限
   * 方法的原理：
   * 1、用户登录成功后，返回该用户的一个数组，数组中存放的是该用户拥有的权限,存在vuex中的permission字段下
   * 2、后端返回一个数组，该数组存放着菜单的数组，数组中每一条数据中都存在着这个菜单所需要的权限
   * 3、通过对比权限，获取用户能够显示的菜单
   * @param menus
   * 示例代码：
   * 用户登录成功后返回用户的权限数组如：
   *[{
   *     code: "purchase.purchase.view",
   *     name: "采购.进货.查询",
   *     caption: null,
   *     children: null
   *},...]
   * 在main.vue加载的时候，获取菜单数组，这里假设叫做arr：
   [{
     id: "menu2",
     version: 0,
     created: "2018-10-16 19:29:44",…}，
     children:[{id: "menu2-1-3", version: 0, created: "2019-01-30 12:42:04",…},…]，
     code:null，
     created:"2018-10-16 19:29:44"，
     creator:{id: "init", code: "init", name: "init"}，
     firName:"采购"，
     home:false，
     icon:"ic-ic_stock"，
     id:"menu2"，
     lastModified:"2019-03-04 13:34:07"，
     lastModifier:{id: "init", code: "init", name: "init"}，
     name:"采购"，
     permissions:["purchase.purchase.view", "purchase.purchaseReturn.view", "purchase.purchaseOrder.view",purchase.purchaseAdjustment.view]，
     secChildren:null，
     secName:null，
     secUrl:null，
     sequence:1，
     thirdChildren:null，
     thirdName:null，
     upper:null，
     url:null，
     version:0
   },...]
   * 使用方法：
   * PermissionMgr.filterMenus(arr).then((menu: any) => {
          this.backendMenus = menu
        })
   */
  static filterMenus(menus: any[]): any {
    return new Promise((resolve) => {
      let result: any[] = []
      menus = ObjectUtil.copy(menus)
      menus.forEach(group => {
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

  static hasMenuPermissions(permissions: string[] | string) {
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
    console.log(store.state.permission)
    for (let i = 0; i < store.state.permission.length; i++) {
      for (let j = 0; j < permissions.length; j++) {
        if (store.state.permission[i].code === permissions[j]) {
          result.push(store.state.permission[i])
        }
      }
    }
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
