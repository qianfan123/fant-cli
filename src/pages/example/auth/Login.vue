<template>
    <div class="login-view">
        <div class="login-form">
            <div class="login-left">
                <img src="../../../assets/image/auth/ic_login.png" alt="效果图缺失">
            </div>
            <div class="login-right">
                <header>产品发布管理系统</header>
                <section>
                    <div class="wrap">
                        <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
                            <el-form-item prop="name">
                                <div style="position: relative">
                                    <el-input v-model="ruleForm.name" placeholder="请输入用户名" ref="name" @keydown.native="onConfirm($event,'name')" style="margin-top: 71px;"></el-input>
                                    <img src="../../../assets/image/auth/ic_login_user_hl.svg" style="position: absolute;left: 108px;top:84px;width: 15px">
                                </div>

                            </el-form-item>
                            <el-form-item prop="password">
                                <div style="position: relative">
                                    <el-input v-model="ruleForm.password" placeholder="请输入登录密码" ref="password" type="password" @keydown.native="onConfirm($event,'password')" style="margin-top: 10px"></el-input>
                                    <img src="../../../assets/image/auth/ic_login_psw_hl.svg" style="position: absolute;left: 108px;top:22px;width: 15px">
                                </div>


                            </el-form-item>
                        </el-form>
                    </div>
                </section>
                <section>
                    <el-button class="btn-login" type="primary" :disabled="!ruleForm.name || !ruleForm.password" ref="login" @click="onLogin()">登录</el-button>
                </section>
            </div>
        </div>
        <footer class="page-footer">
            <p>Copyright @ 1997-2018HEADING Co., Ltd. All Rights Reserved. 海鼎公司 版权所有</p>
        </footer>
    </div>
</template>

<script lang="ts" src="./Login.ts"></script>

<style lang="scss">
    .login-view {
        background-color: #fafafa;
        display: flex;
        align-items: center;
        height:100%;
        width: 100%;
        justify-content: center;
        .el-form-item__error {
            margin-left: 105px;
        }
        .el-input {
            width: 284px;
            height: 43px;
            margin-left: 102px;
        }
        .el-input__inner {
            padding-left: 35px;
        }
        .login-form {
            display: flex;
            width: 1138px;
            height: 711px;
            .login-left {
                float: left;
                img {
                    height: 711px;
                    width: 649px;
                }
            }
            .login-right {
                float: left;
                width: 489px;
                height: 533px;
                background-color: white;
                position: relative;
                left: -80px;
                top: 53px;
                .btn-login {
                    width: 284px;
                    height: 43px;
                    margin-left: 102px;
                    margin-top: 10px;
                }
                header {
                    width: 178px;
                    height: 32px;
                    color: #455261;
                    font-size: 21px;
                    font-family: 微软雅黑;
                    margin-top: 71px;
                    margin-left: 156px;
                }
            }
        }
        .page-footer {
            position: absolute;
            bottom: 53px;
            left: 50%;
            margin-left: -270px;
            p {
                text-align: center;
                color: #CED0DA;
                height: 18px;
            }
        }
    }
</style>