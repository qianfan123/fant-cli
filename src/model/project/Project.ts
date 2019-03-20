import StandardEntity from 'model/entity/StandardEntity'
import ProjectLine from 'model/project/ProjectLine'
import User from 'model/user/User'

export default class Project extends StandardEntity {
  // 产品名称
  name: Nullable<string>
  // 负责人信息，包括联系方式
  manager: User = new User()
  // 业务状态，取值：upgraded,unupgraded
  state: Nullable<string>
  // 描述
  describe: Nullable<string>
  // 备注
  remark: Nullable<string>
  // 产品详情。新建的时候版本为空
  lines: ProjectLine[] = []
}
