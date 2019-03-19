<template>
  <div class="page-body">
    <slot></slot>
    <footer>copyright© 2019 海鼎研发部出品</footer>
  </div>
</template>

<script lang='ts' src='./PageBody.ts'/>

<style lang='scss' scoped>
  .page-body {
    background-color: #F0F2F5;
    footer {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      padding: 32px 0;
      text-align: center;
    }
  }
</style>