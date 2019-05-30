<template>
    <div class="auto-broadcast-wrap" :style="{'backgroundColor': backgroundColor, 'height' : getHeight}">
        <div class="auto-broadcast-absolute">
            <div class="broadcast-icon" :style="{'color': iconColor, 'marginTop' : getMarginTop}"><slot name="icon"></slot></div>
            <div class="broadcast-text" :class="{broadcast_marquee_top:animate}" :style="getStyle">
                <ul class="broadcast-text-content-wrap">
                    <li class="broadcast-text-content"
                        :style="{'color': textColor}"
                        v-for="item in broadcastArray"
                    >
                        <div v-if="mode === 'single'">
                            <a @click="doBroadcast(item)"
                               @mouseover="doCancelTimer"
                               @mouseleave="doStartTimer">{{typeof item === 'string' ? item : item[prop]}}
                            </a>
                        </div>
                        <div v-else>
                            <div v-for="sub in item">
                                <a @click="doBroadcast(sub)" @mouseover="doCancelTimer"
                                    @mouseleave="doStartTimer">{{typeof item === 'string' ? item : sub[prop]}}
                                </a>
                            </div>
                        </div>
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
                default: []
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
        computed: {
            getHeight() {
                if (this.broadcastArray[0]) {
                    let type = Object.prototype.toString.call(this.broadcastArray[0])
                    return type === '[object Array]' ? this.broadcastArray[0].length * 50 + 'px' : 1 * 50 + 'px'
                } else {
                    return 1 * 50 + 'px'
                }

            },
            getMarginTop() {
                if (this.broadcastArray[0]) {
                    let type = Object.prototype.toString.call(this.broadcastArray[0])
                    return type === '[object Array]' ? (this.broadcastArray[0].length - 1) * 25 + 'px' : '0px'
                } else {
                    return '0px'
                }
            },
            getStyle() {
                console.log(`-${this.getHeight}`)
                return {
                    'top' : `-${this.getHeight}`
                }
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