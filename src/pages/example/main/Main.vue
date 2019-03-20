<template>
    <el-container class="main">
        <div class="nav-wrapper" v-show="!isCollapse">
            <div class="nav-title">测试管理系统</div>
            <el-menu :default-openeds="['1', '3']" class="menu-width">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item-group class="nav-li-group">
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2" class="nav-li-group">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                    <el-menu-item-group class="nav-li-group">
                        <template slot="title">分组一</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2" class="nav-li-group">
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                    <el-menu-item-group class="nav-li-group">
                        <template slot="title">分组一</template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2" class="nav-li-group">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </div>
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
            <el-main class="replace-view">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" src="./Main.ts"></script>

<style lang="scss">
    .main {
        height: 100%;
        .nav-wrapper{
            width: 200px;
            background-color: #1E2337;
            overflow: auto
        }
        /*侧边栏*/
        .el-submenu .el-menu-item{
            color: white;
        }
        .el-menu-item:hover, .el-menu-item:focus{
            background-color: #354052;
        }
        .el-submenu__title:hover{
            background-color: #354052;
        }
        .el-submenu__title{
            color: white;
        }
        .el-menu {
            border: none;
            background-color: inherit;
            color: white;
            .nav-li-name{
                color: white;
            }
            .nav-li-group{
                background-color: rgb(30, 35, 55);
                color: white
            }
        }
        .nav-title{
            height: 56px;
            text-align: center;
            line-height: 56px;
            color: white;
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
    }
</style>
