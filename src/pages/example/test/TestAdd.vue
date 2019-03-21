<template>
  <page-body :panelArray="panelArray">
    <div slot="action">
      <el-button size="small" @click="onBack">返回</el-button>
      <el-button size="small" type="primary" @click="onSave">提交</el-button>
    </div>
    <el-card>
      <div slot="header">项目信息</div>
      <el-form :model="project" :rules="rules" ref="form" label-position="right" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model.trim="project.name" placeholder="请输入项目名称" maxlength="64" :disabled="!!$route.query.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" prop="manager">
              <el-select v-model="project.manager.name">
                <el-option value="张三">张三</el-option>
                <el-option value="李四">李四</el-option>
                <el-option value="王五">王五</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="manager.contact">
              <el-input clearable class="item" v-model.trim="project.manager.contact" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="描述(选填)">
              <el-input type="textarea" v-model="project.describe" maxlength="1024" placeholder="请输入描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
      <div slot="header">项目包含产品列表</div>
      <el-table :data="project.lines">
        <el-table-column prop="product.name" label="产品名称" width="180"></el-table-column>
        <el-table-column prop="productVersion.name" label="版本号" width="180">
          <template slot-scope="scope">
            {{productVersion ? productVersion.name : '--'}}
          </template>
        </el-table-column>
        <el-table-column prop="product.manager.name" label="负责人"></el-table-column>
        <el-table-column prop="product.manager.contact" label="联系方式"></el-table-column>
        <el-table-column prop="address" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="onDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width: 100%" dashed @click="onAddProduct"><i class="el-icon-plus"></i>添加产品</el-button>
    </el-card>
  </page-body>
</template>
<script lang="ts" src="./TestAdd.ts"></script>
<style lang="scss"></style>