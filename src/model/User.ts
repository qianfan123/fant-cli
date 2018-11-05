export default class User {
  // 商户ID
  public merchant: Nullable<string>;
  // 登录用户名
  public login: Nullable<string>;
  // 绑定手机号，员工可自己绑定
  public loginMobile: Nullable<string>;
  // 姓名
  public name: Nullable<string>;
  // 手机
  public mobile: Nullable<string>;
  // 性别male,female
  public sex: Nullable<string>;
  // 备注
  public remark: Nullable<string>;
  // 上一次同步时间
  public lastSynced: Nullable<string>;
  // 状态 0:正常 1：锁定 2：删除
  public status: number = 0;
  // 是否是管理员
  public admin: boolean = false;
}
