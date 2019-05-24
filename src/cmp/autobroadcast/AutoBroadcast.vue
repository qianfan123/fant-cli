<template>
    <div class="auto-broadcast-wrap" :style="{'backgroundColor': backgroundColor, 'height' : mode === 'single' ? '50px' : '100px'}">
        <div class="auto-broadcast-absolute">
            <div class="broadcast-icon" :style="{'color': iconColor, 'marginTop' : mode === 'single' ? '0px' : '20px'}"><slot name="icon"></slot></div>
            <div class="broadcast-text" :class="{broadcast_marquee_top:animate}" :style="{'top' : mode === 'single' ? '-50px' : '-100px'}">
                <ul class="broadcast-text-content-wrap">
                    <li class="broadcast-text-content"
                        v-if="mode === 'single'"
                        :style="{'color': textColor}"
                        v-for="(item, index) in broadcastArray"
                    >
                        <a @click="doBroadcast(item)"
                           @mouseover="doCancelTimer"
                           @mouseleave="doStartTimer">{{typeof item === 'string' ? item : item[prop]}}</a>
                    </li>
                    <li class="broadcast-text-content"
                        v-if="mode === 'double'"
                        :style="{'color': textColor}"
                        v-for="(item, index) in broadcastArray"
                        >
                        <div><a @click="doBroadcast(item[0])" @mouseover="doCancelTimer"
                           @mouseleave="doStartTimer">{{typeof item === 'string' ? item : item[0][prop]}}</a></div>
                        <div><a @click="doBroadcast(item[1])" @mouseover="doCancelTimer"
                           @mouseleave="doStartTimer">{{typeof item === 'string' ? item : item[1][prop]}}</a></div>
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
            },
            prop: {
                type: String,
                default: 'name'
            },
            mode: {
                type: String,
                default: 'single' // single or double
            }
        },
        data() {
            return {
                timer500: null,
                timer2000: null,
                animate: false,
                doubleArray: []
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
            doBroadcast(item) {
                this.$emit('get-select', item)
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