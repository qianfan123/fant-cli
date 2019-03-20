<template>
    <!--顶层含面包屑wrapper-->
    <page-body :panelArray="panelArray">
        <!--内层含滚动条wrapper-->
        <list-container>
            <!--搜索栏-->
            <template slot="query">
                <query-condition @search="onSearch" @reset="onReset">
                    <el-row>
                        <el-col :span="16">
                            <form-item label="审批人">
                                <el-input v-model="model.user" placeholder="审批人"></el-input>
                            </form-item>
                        </el-col>
                    </el-row>
                    <template slot="opened">
                        <el-row>
                            <el-col :span="8">
                                <form-item label="审批人">
                                    <el-input v-model="model.user" placeholder="审批人"></el-input>
                                </form-item>
                            </el-col>
                            <el-col :span="8">
                                <form-item label="审批人">
                                    <el-input v-model="model.user" placeholder="审批人"></el-input>
                                </form-item>
                            </el-col>
                            <el-col :span="8">
                                <form-item label="审批人">
                                    <el-input v-model="model.user" placeholder="审批人"></el-input>
                                </form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <form-item label="审批人">
                                    <el-input v-model="model.user" placeholder="审批人"></el-input>
                                </form-item>
                            </el-col>
                            <el-col :span="8">
                                <form-item label="高级审批人">
                                    <el-input v-model="model.user" placeholder="审批人"></el-input>
                                </form-item>
                            </el-col>
                            <el-col :span="8">
                                <form-item label="高级审批人">
                                    <el-input v-model="model.user" placeholder="审批人"></el-input>
                                </form-item>
                            </el-col>
                        </el-row>
                    </template>
                    <template slot="openedQuery">
                        <qf-row>
                            <el-col :span="12">
                                <form-item label="审批人">
                                    <el-input v-model="model.user" placeholder="审批人"></el-input>
                                </form-item>
                            </el-col>
                            <el-col :span="12">
                                <form-item label="审批人">
                                    <el-input v-model="model.user" placeholder="审批人"></el-input>
                                </form-item>
                            </el-col>
                        </qf-row>
                    </template>
                </query-condition>
            </template>
            <!--操作栏-->
            <template slot="toolbar">
                <el-button size="small" type="primary" @click="doAdd">新建按钮</el-button>
                <el-button size="small" type="success">成功按钮</el-button>
                <el-button size="small" type="info">信息按钮</el-button>
                <el-button size="small" type="warning">警告按钮</el-button>
                <el-button size="small" type="danger">危险按钮</el-button>
                <el-button size="small" type="info" disabled="true">禁用按钮</el-button>
            </template>
            <!--列表栏-->
            <template slot="list">
                <el-table
                        :data="tableData"
                        border
                        @sort-change="onSortChange"
                        @selection-change="onHandleSelectionChange"
                        style="width: 100%">
                    <el-table-column type="selection" width="55"/>
                    <el-table-column prop="name" label="项目名称" sortable width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="doGoDtl(scope.row)">{{scope.row.name}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="manager.name" label="负责人"/>
                    <el-table-column prop="manager.contact" label="联系方式"/>
                    <el-table-column prop="describe" label="描述" width="180"/>
                    <el-table-column prop="address" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="doUpGrade(scope.row)">升级</el-button>
                            <el-button type="text" @click="doDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!--分页栏-->
            <template slot="page">
                <el-pagination
                        background
                        @size-change="onHandleSizeChange"
                        @current-change="onHandleCurrentChange"
                        current-page="page.currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.total">
                </el-pagination>
            </template>
        </list-container>
    </page-body>
</template>

<script lang="ts" src="./TestList.ts">
</script>

<style lang="scss">

</style>