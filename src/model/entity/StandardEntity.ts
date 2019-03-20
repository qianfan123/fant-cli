import VersionedEntity from 'model/entity/VersionedEntity'
import Ucn from 'model/entity/Ucn'

export default class StandardEntity extends VersionedEntity {
  // 创建时间
  created: Nullable<Date>
  // 创建人信息
  creator: Ucn = new Ucn()
  // 最后修改时间
  lastModified: Nullable<Date>
  // 最后修改人信息
  lastModifier: Nullable<Ucn>
}
