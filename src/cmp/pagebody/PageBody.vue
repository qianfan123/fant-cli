<template>
  <div class="page-body">
    <sub-header title="项目列表" :panelArray="panelArray"></sub-header>
    <slot></slot>
    <!--<footer>copyright© 2019 海鼎研发部出品</footer>-->
  </div>
</template>

<script lang='ts' src='./PageBody.ts'/>

<style lang='scss' scoped>
  .page-body {
    overflow: hidden;
    background-color: #F0F2F5;
    display: flex;
    flex: 1;
    flex-direction: column;
    /*footer {*/
      /*font-size: 14px;*/
      /*color: rgba(0, 0, 0, 0.45);*/
      /*padding: 32px 0;*/
      /*text-align: center;*/
    /*}*/
  }
</style>