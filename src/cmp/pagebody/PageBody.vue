<template>
  <div class="page-body">
    <header>
      <sub-header class="title" :panelArray="panelArray"></sub-header>
      <div class="action">
        <slot name="action"></slot>
      </div>
    </header>
    <slot></slot>
    <footer>copyright© 2019 海鼎研发部出品</footer>
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
    header {
      display: flex;
      align-items: center;
      background-color: #FFF;
      .title {
        flex: 1
      }
    }
    footer {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      padding: 32px 0;
      text-align: center;
    }
  }
</style>