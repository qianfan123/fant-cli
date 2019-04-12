<template>
    <div style="overflow: auto">
        <transition name="notification-def">
            <div v-show="showFlag"
                 class="notification-wrap"
                 :class="[horizontalClass]"
                 :style="getPositionStyle">
                <div>
                    {{title}}
                    <i class="el-icon-close" @click="doClose"></i>
                </div>
                <slot></slot>
            </div>
        </transition>
    </div>

</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '提示'
            },
            position: {
                type: String,
                default: 'left-top'// left-top right-top left-bottom right-bottom
            },
            verticalMargin: {
                type: Number,
                default: 50
            },
            horizonMargin: {
                type: Number,
                default: 50
            }
        },
        data() {
            return {
                showFlag: false,
                notificationArray: [],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        watch: {
            showFlag(newVlaue) {
                if (newVlaue) {
                    // 获取每个飘窗的位置信息
                }
            }
        },
        methods: {
            doShow() {
                this.showFlag = true

            },
            doClose() {
                this.showFlag = false
            }
        },
        computed: {
            horizontalClass() {
                return this.position.indexOf('right') > -1 ? 'right' : 'left';
            },
            getPositionStyle() {
                let obj = {}
                if (this.position === 'left-top') {
                    obj = {
                        top: this.verticalMargin + 'px',
                        left: this.horizonMargin + 'px'
                    }
                } else if (this.position === 'left-bottom') {
                    obj = {
                        bottom: this.verticalMargin + 'px',
                        left: this.horizonMargin + 'px'
                    }
                } else if (this.position === 'right-top') {
                    obj = {
                        top: this.verticalMargin + 'px',
                        right: this.horizonMargin + 'px'
                    }
                } else {
                    obj = {
                        bottom: this.verticalMargin + 'px',
                        right: this.horizonMargin + 'px'
                    }
                }
                return obj;
            }
        }
    }
</script>

<style lang="scss">
    .notification-wrap{
        width: 400px;
        height: auto;
        background-color: red;
        position: absolute;
    }
    .notification-def-enter,.notification-def-leave-to{
        opacity: 0;
    }
    .notification-def-enter-active,.notification-def-leave-active{
        transition: all .3s ease;
    }
    .notification-def-enter.left{
        transform: translateX(-100%);
    }
    .notification-def-enter.right{
        transform: translateX(100%);
    }
</style>