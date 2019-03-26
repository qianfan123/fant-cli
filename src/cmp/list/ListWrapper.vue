<template>
  <div class="list-wrapper">
    <slot name="query" v-if="$slots.query"></slot>
    <div class="btn-group" v-if="$slots.btn">
      <slot name="btn"></slot>
    </div>
    <div class="btn-group" v-if="$slots.toolbar">
      <slot name="toolbar"></slot>
    </div>
    <div class="list" v-if="$slots.list">
      <slot name="list"></slot>
    </div>
    <div class="page" v-if="$slots.page">
      <slot name="page"></slot>
    </div>
  </div>
</template>

<script lang='ts' src='./ListWrapper.ts'/>

<style lang='scss' scoped>
  .list-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: auto;
    margin: 10px 10px;
    padding: 10px 10px;
    background-color: white;
    .page {
      text-align: right;
      margin-top: 20px;
    }
    .btn-group {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .list {
      /deep/ .el-alert--info {
        margin-bottom: 10px;
        background: rgba(230, 247, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(145, 213, 255, 1);
        height: 32px;
        .el-icon-info {
          color: #108EE9;
        }
        strong {
          color: #108EE9;
          font-weight: normal;
        }
      }
    }
  }
</style>