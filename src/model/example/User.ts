import Entity from 'model/entity/Entity'

export default class User extends Entity {
  // 名称
  name: Nullable<string>
  // 联系方式
  contact: Nullable<string>
  // 登录密码
  password: Nullable<string>
}
