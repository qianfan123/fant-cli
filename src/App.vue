<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
    html, body {
        width: 100%;
        height: 100%;
        min-width: 1024px;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
    }

    * {
        font-family: Microsoft YaHei;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        background: #f0f2f5;
        font-size: 14px;
        height: 100%;
    }
</style>
