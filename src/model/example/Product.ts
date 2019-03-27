import StandardEntity from 'model/entity/StandardEntity'
import User from 'model/example/User'

export default class Product extends StandardEntity {
  // 产品名称
  name: Nullable<string>
  // 负责人信息，包括联系方式
  manager: User = new User()
  // 描述
  describe: Nullable<string>
  // 备注
  remark: Nullable<string>
  // 业务状态，取值：maintaining,finished。分别表示维护中，已完结
  state: Nullable<string>
  // 产品类型，取值：internal,external。分别表示企业内部的，企业外部的
  type: Nullable<string>
}
