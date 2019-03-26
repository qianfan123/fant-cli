<template>
  <div class="dtl-wrapper">
    <slot></slot>
  </div>
</template>

<script lang='ts' src='./DtlWrapper.ts'/>

<style lang='scss' scoped>
  .dtl-wrapper {
    .el-card {
      margin: 18px;
      /deep/ .el-select {
        width: 100%;
      }
    }
  }
</style>