<template>
  <el-select class="user-select" v-model="item" :maxlength="32" :disabled="disabled" placeholder="请输入负责人" display-field="name" value-key="id" filterable remote
             :remote-method="query"
             clearable @input="onChange">
    <el-option v-for="i in items" :key="i.id" :label="i.name" :value="i"/>
  </el-select>
</template>

<script lang="ts" src="./UserSelect.ts"/>

<style lang="scss" scoped>
  .user-select {
  }
</style>
