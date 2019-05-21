<template>
  <translation name="fant-alert-fade">
    <div class="fant-alert" v-show="visible" :class="typeClass">
      <i class="fant-alert-icon" v-if="showIcon" :class="[ iconClass, isExistDesc ? 'big-icon' : '' ]" ></i>
      <div class="fant-alert-content" :class="{ 'is-center' : center }">
        <span class="fant-alert-title" :class="{ 'bold-title' :  isExistDesc }" v-if="title">{{ title }}</span>
        <slot>
          <div class="fant-alert-description" v-if="description">{{ description }}</div>
        </slot>
       <div class="fant-alert-closebtn" v-show="closeable">
          <i :class="[closeText === '' ? 'el-icon-close' : 'is-Text']"
           @click="closeAlert()">{{closeText}}</i>
       </div>
      </div>
    </div>
  </translation>
</template>
<script>
  const ALERT_TYPE_ICON = {
    success: 'el-icon-success',
    warning: 'el-icon-warning',
    error: 'el-icon-error',
    info: 'el-icon-info'
  }
  export default {
    name: 'FantAlert',
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      center: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'info'
      },
      closeable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      description: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        visible: true
      }
    },
    methods: {
      closeAlert() {
        this.visible = false;
        this.$emit('close')
      }
    },
    computed: {
      typeClass() {
        return `fant-alert-${this.type}`
      },
      iconClass() {
        return ALERT_TYPE_ICON[this.type] || 'el-icon-info'
      },
      isExistDesc() {
        return this.description || this.$slots.default
      }
    }
  }
</script>
<style lang="scss">
  .fant-alert-fade-enter, .fant-alert-fade-leave-active {
    opacity: 0;
  }
  .fant-alert{
    width: 100%;
    padding: 8px 16px;
    margin: 0;
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    opacity: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;

    .fant-alert-icon {
      font-size: 16px;
      width: 16px;
    }

    .big-icon {
      font-size: 28px;
      width: 28px;
    }

    .is-center{
      text-align: center
    }

    .fant-alert-content {
      display: inline-block;
      width: 100%;
      padding: 0 8px;

      .fant-alert-title {
        font-size: 13px;
        line-height: 18px;
      }

      .bold-title{
        font-weight: 700;
      }

      .fant-alert-description {
        font-size: 12px;
        padding: 3px 0;
      }

      .fant-alert-closebtn{
        font-size: 12px;
        color: #c0c4cc;
        opacity: 1;
        position: absolute;
        top: 0px;
        right: 15px;
        cursor: pointer;
        height: 100%;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
      .is-Text{
        font-style: normal;
        font-size: 13px;
        top: 9px;
      }
    }
  }

  .fant-alert-info {
    background-color: #f4f4f5;
    color: #909399;
    border: 1px solid #909399;
  }

  .fant-alert-success {
    background-color: #f0f9eb;
    color: #67c23a;
    border: 1px solid #67c23a;
  }

  .fant-alert-error {
    background-color: #fef0f0;
    color: #f56c6c;
    border: 1px solid #f56c6c;
  }

  .fant-alert-warning {
    background-color: #fdf6ec;
    color: #e6a23c;
    border: 1px solid #e6a23c;
  }
</style>