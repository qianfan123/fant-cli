<template>
  <div class="store-rank" :style="{  'width': rankWidth + 'px'  }">
    <div class="title" v-if="title">{{ title }}</div>
    <div class="rank" v-if="leftText || rightText">
      <span>{{ leftText }}</span>
      <span :style="{ 'color': color }">{{ rightText }}</span>
    </div>
    <div class="process">
      <div class="process__order" :style="{ color:  color }" v-if="showRank">{{ rank }}</div>
      <div class="process__bar" :style="barStyle"></div>
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
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100
    },
    showRank: {
      type: Boolean,
      default: true
    },
    rank:{
      type: [String, Number],
      default: 1
    },
    width: {
      type: Number,
      default: 300
    },
    leftText: String,
    rightText: String
  },
  data() {
    return {
      rankWidth: this.width
    }
  },
  mounted() {
    this.rankWidth = this.width || 300
  },
  computed: {
     barStyle() {
      const style = {}
      style.width = this.percentage + '%'
      style.backgroundColor = this.color
      return style
     }
  }
}
</script>
<style lang="scss">
.store-rank{
  width: 300px; // init value
  .title{
    margin: 10px 0;
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

