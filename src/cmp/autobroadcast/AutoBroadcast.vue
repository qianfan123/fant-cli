<template>
    <div class="auto-broadcast-wrap" :style="{'backgroundColor': backgroundColor}">
        <div class="auto-broadcast-absolute">
            <div class="broadcast-icon" :style="{'color': iconColor}"><slot name="icon"></slot></div>
            <div class="broadcast-text" :class="{broadcast_marquee_top:animate}">
                <ul class="broadcast-text-content-wrap">
                    <li class="broadcast-text-content"
                        :style="{'color': textColor}"
                        v-for="(item, index) in broadcastArray"
                        @click="doBroadcast(index)">
                        <a @mouseover="doCancelTimer"
                           @mouseleave="doStartTimer">{{typeof item === 'string' ? item : item.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            backgroundColor: { // 背景颜色
                type: String,
                default: 'white'
            },
            textColor: { // 文字颜色
                type: String,
                default: 'black'
            },
            iconColor: { // 图标颜色
                type: String,
                default: 'inherit'
            },
            broadcastArray: { // 默认示例
                type: Array,
                default: ['上路无压力', '中路有点吃紧', '下路也不行啊', '打野快来GANK啊']
            },
            time: { // 动画时间>=500
                type: Number,
                default: 2000
            }
        },
        data() {
            return {
                timer500: null,
                timer2000: null,
                animate: false
            }
        },
        created: function() {
            this.timer2000 = setInterval(this.showMarquee, this.time < 500 ? 2000 : this.time)
        },
        methods: {
            showMarquee() {
                this.animate = true;
                this.timer500 = setTimeout( () => {
                    this.broadcastArray.push(this.broadcastArray[0]);
                    this.broadcastArray.shift();
                    this.animate = false;
                }, 500)
            },
            doBroadcast(index) {
                this.$emit('get-ucn', this.broadcastArray[index])
            },
            doCancelTimer() {
                console.log('mouseover')
                // this.animate = false
                clearInterval(this.timer2000);
                clearTimeout(this.timer500)
            },
            doStartTimer() {
                console.log('mouseleave')
                this.animate = false
                this.timer2000 = setInterval(this.showMarquee, 2000)
            }
        },
        destroyed: function() {
            clearInterval(this.timer2000);
            clearTimeout(this.timer500)
            this.timer2000 = null
            this.timer500 = null
        }
    }
</script>

<style lang="scss">
    .auto-broadcast-wrap{
        height: 50px;
        background-color: deeppink;
        position: relative;
        overflow: hidden;
        .auto-broadcast-absolute{
            .broadcast-icon{
                position: absolute;

                text-align: center;
                display: inline-block;
                padding: 9px;
                font-size: 25px;
            }
            .broadcast-text{
                position: absolute;
                top: 0;
                left: 0;
                display: inline-block;
                line-height: 50px;
                margin-left: 50px;
                .broadcast-text-content-wrap{
                    margin: 0;
                    padding: 0;
                    .broadcast-text-content{
                        clear: both;
                        height: 100%;
                        overflow: hidden;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                        max-width: 600px;
                        a{
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .broadcast_marquee_top{
            transition: all 0.5s;
            margin-top: -50px
        }
    }
</style>