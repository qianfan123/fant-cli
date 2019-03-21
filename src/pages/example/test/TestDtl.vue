<template>
  <page-body :panelArray="panelArray">
    <div slot="action">
      <el-button size="small" @click="onDelete">删除</el-button>
      <el-button size="small" type="primary" @click="onModify">修改</el-button>
    </div>

    <el-card>
      <div slot="header">项目详情</div>
      <el-form>
        <el-form-item label="负责人：">{{project.manager.name}}({{project.manager.contact}})</el-form-item>
        <el-form-item label="描述：">{{project.describe}}</el-form-item>
        <el-form-item label="创建人：">{{project.creator ? project.creator.name : ''}}</el-form-item>
        <el-form-item label="创建时间：">{{project.created}}</el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-tabs>
        <el-tab-pane label="包含产品">
          <el-table :data="tableData1">
            <el-table-column prop="product.name" label="产品名称" sortable width="180"></el-table-column>
            <el-table-column prop="productVersion.name" label="版本号" width="180">
              <template slot-scope="scope">
                {{scope.row.productVersion ? scope.row.productVersion.name : '--'}}
              </template>
            </el-table-column>
            <el-table-column prop="product.manager.name" label="负责人"></el-table-column>
            <el-table-column prop="product.manager.contact" label="联系方式"></el-table-column>
            <el-table-column prop="upgradeTime" label="升级时间">
              <template slot-scope="scope">
                {{scope.row.upgradeTime ? scope.row.upgradeTime : '--'}}
              </template>
            </el-table-column>
            <el-table-column prop="address" align="center" label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.upgradableVersions" type="text" @click="onUpgrade(scope.row)">升级</el-button>
                <el-button v-if="!scope.row.upgradableVersions" type="text">--</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </page-body>
</template>
<script lang="ts" src="./TestDtl.ts"></script>
<style lang="scss"></style>