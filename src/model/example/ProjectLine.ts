import Entity from 'model/entity/Entity'
import Ucn from 'model/entity/Ucn'
import Product from 'model/example/Product'
import ProductVersion from 'model/example/ProductVersion'

export default class ProjectLine extends Entity {
  // 可升级的版本
  upgradableVersions: Nullable<ProductVersion[]>
  // 版本
  productVersion: Nullable<Ucn>
  // 产品信息，新建时只需要产品信息
  product: Nullable<Product>
  // 上线时间
  upgradeTime: Nullable<Date>
}
