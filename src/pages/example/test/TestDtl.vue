<template>
  <page-body :panelArray="panelArray" v-if="project" class="test-dtl">
    <div slot="action">
      <el-button size="small" @click="onDelete">删除</el-button>
      <el-button size="small" type="primary" @click="onModify">修改</el-button>
    </div>

    <el-card>
      <div slot="header">项目详情</div>
      <el-form label-position="right" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="负责人：">{{project.manager.name}}({{project.manager.contact}})</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人：">{{project.creator ? project.creator.name : ''}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间：">{{project.created}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="描述：">{{project.describe}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
      <div slot="header">包含产品</div>
      <el-table :data="project.lines">
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
    </el-card>
  </page-body>
</template>
<script lang="ts" src="./TestDtl.ts"></script>
<style lang="scss" scoped>
  .test-dtl {
    display: block; //  page-body  为何使用 flex ，导致magrin上下无法合并，但事实上也可通过只设置margin-top来解决
    .el-card {
      margin: 18px;
    }
  }
</style>