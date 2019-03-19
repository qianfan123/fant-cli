<template>
    <el-container class="main">
        <el-menu :collapse="isCollapse">
            <el-header><span>产品发布管理系统</span></el-header>
            <router-link to="/projectList">
                <el-menu-item index="1">
                    <i class="el-icon-location"/>
                    <span slot="title">项目管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/productList">
                <el-menu-item index="2">
                    <i class="el-icon-menu"/>
                    <span slot="title">产品管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/taskList">
                <el-menu-item index="3">
                    <i class="el-icon-message"/>
                    <span slot="title">升级任务管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/versionList">
                <el-menu-item index="4">
                    <i class="el-icon-setting"/>
                    <span slot="title">版本管理</span>
                </el-menu-item>
            </router-link>
        </el-menu>
        <el-container>
            <el-header class="navbar">
                <i class="collapse-btn iconfont" :class="{'icon-ic_menufold':isCollapse,'icon-ic_menuunfold':!isCollapse}" @click="onCollapse"/>
                <el-dropdown class="menu" trigger="click" @command="onMenuClick">
                    <div class="user-name">小白菜</div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" src="./Main.ts"></script>

<style lang="scss" scoped>
    .main {
        height: 100%;
        /*侧边栏*/
        .el-menu {
            background-color: #1E2337;
            .el-header {
                height: 60px;
                background: #20A0FF;
                line-height: 60px;
                text-align: center;
                color: #FFF;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            a {
                text-decoration: none;
                color: #FFF;
            }
            .el-menu-item {
                color: #FFF;
            }
            .el-menu-item:hover, .el-menu-item:focus {
                background-color: #354052;
            }
            .el-menu-item.is-active {
                background-color: #354052;
            }
        }

        /* 头部导航*/
        .navbar {
            background-color: #FFF;
            border-bottom: 1px solid rgba(232, 232, 232, 1);
            line-height: 60px;
            height: 60px;
            display: flex;
            overflow: hidden;
            justify-content: space-between;
            align-items: center;
            .collapse-btn {
                cursor: pointer;
            }
            .user-name {
                width: 100px;
                background: url(~assets/image/auth/ic_user.png) #fff center left no-repeat;
                background-size: 32px;
                padding-left: 47px;
                cursor: pointer;
            }
        }

        /* 内容*/
        .el-main {
            padding: 0;
            /deep/ .el-card {
                margin: 16px;
            }
        }
    }
</style>
