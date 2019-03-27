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
    flex: 1;
    overflow: auto;
    margin: 16px;
    padding: 10px 10px;
    background-color: white;
    .page {
      margin-top: 20px;
    }
    .btn-group {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .list {
    }
  }
</style>