<template>
    <page-body :panelArray="panelArray">
        <list-container>
            <template slot="query">
                <query-condition>
                    <el-row>
                        <el-col :span="16">
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="审批人1">
                                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                    <template slot="opened">
                        <el-row>
                            <el-col :span="8">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="审批人1">
                                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="8">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="审批人2">
                                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="8">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="审批人3">
                                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="审批人4">
                                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="8">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="审批人5">
                                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="8">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="审批人6">
                                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </template>
                    <template slot="openedQuery">
                        <qf-row>
                            <el-col :span="12">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="审批人4">
                                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="12">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="审批人4">
                                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </qf-row>
                    </template>
                </query-condition>
            </template>
            <template slot="toolbar">
                <el-button size="small" type="primary">主要按钮</el-button>
                <el-button size="small" type="success">成功按钮</el-button>
                <el-button size="small" type="info">信息按钮</el-button>
                <el-button size="small" type="warning">警告按钮</el-button>
                <el-button size="small" type="danger">危险按钮</el-button>
            </template>
            <template slot="list">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            type="selection"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            sortable
                            prop="date"
                            label="日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址">
                    </el-table-column>
                </el-table>
            </template>
            <template slot="page">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </template>
        </list-container>
    </page-body>
</template>

<script lang="ts" src="./TestList.ts">
</script>

<style lang="scss">

</style>