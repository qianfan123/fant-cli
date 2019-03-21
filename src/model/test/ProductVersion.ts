import StandardEntity from 'model/entity/StandardEntity'
import Product from 'model/test/Product'
import User from 'model/test/User'

export default class ProductVersion extends StandardEntity {
  // 产品
  product: Nullable<Product>
  // 版本code，根据版本号编码得到一个数字，数字越大，版本越高
  versionCode: Nullable<string>
  // 版本
  versionName: Nullable<string>
  // 计划发版时间
  planedTime: Nullable<Date>
  // 实际发版时间。
  releaseTime: Nullable<Date>
  // 发版状态，取值：released,unreleased。分别表示<已发版>、<未发版>
  state: Nullable<string>
  // 联系人，包括联系方式
  contact: Nullable<User>
  // 描述
  describe: Nullable<string>
  // 备注
  remark: Nullable<string>
  // 依赖的版本。依赖图。子节点的子节点会全部返回
  dependencies: ProductVersion[] = []
}
