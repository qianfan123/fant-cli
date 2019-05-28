<template>
  <div class="store-rank-list">
    <div class="title" v-if="title">{{ title }}</div>
    <div v-for="(data, index) in rankData" :key="index">
      <div class="rank">
        <span>{{ data.name }}</span>
        <span :style="{ 'color': color }">{{ data.score }}</span>
      </div>
      <div class="process">
        <div class="process__order" :style="{ color:  color }" v-if="showRank">{{ data.rank }}</div>
        <div class="process__bar" :style="barStyle(data.percent)"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    color: {
      type: String,
      default: '#ff8b6a'
    },
    rankData: {
      type: Array,
      default: [{
            name: '重庆火锅',
            score: 99,
            rank: 1,
            percent: 90
        }]
    },
    showRank: {
      type: Boolean,
      default: true
    },
  },
  computed: {
     barStyle() {
      return (percent) => {
        return {
          width: percent + '%',
          backgroundColor: this.color
        }
      }
     }
  }
}
</script>
<style lang="scss">
.store-rank-list{
  width: 100%;
  min-width: 300px;
  .title{
    margin: 15px 0;
    text-align: center;
  }
  .rank{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    font-size: 13px;
    overflow: hidden;
  }
  .process{
    height: 28px;
    background-color: #f2f2f2;// #ff8b6a;
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
    .process__order{
      position: absolute;
      left: 0;
      top: 0;
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50px;
      z-index: 9;
    }
    .process__bar{
      position: absolute;
      left: 0px;
      top: 0;
      height: 28px;
      border-radius: 14px 8px 8px 14px / 14px 8px 8px 14px
      // animation: process .9s ease-out;
    }

    @keyframes process {
      0% {
        width: 0px;
      }
      100% {
        width: 50%;
      }
    }
  }
}
</style>

