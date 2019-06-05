<template>
    <div class="auto-broadcast" :style="{'backgroundColor': backgroundColor, 'height' : getHeight, 'borderColor': borderColor}">
        <div class="icon" :style="{'color': iconColor, 'lineHeight' : getLineHeight}"><slot name="icon"></slot></div>
        <div class="text" :class="{broadcast_marquee_top:animate}">
            <ul class="broadcast-text-content-wrap">
                <li class="broadcast-text-content"
                    :style="{'color': textColor}"
                    v-for="item in broadcastArray"
                >
                    <div v-if="getType === 'object'">
                        <div class="a-wrap">
                            <a @click="doBroadcast(item)"
                               @mouseover="doCancelTimer"
                               @mouseleave="doStartTimer">{{typeof item === 'string' ? item : item
                                [prop]}}
                            </a>
                        </div>
                    </div>
                    <div v-else class="a-wrap">
                        <div v-for="sub in item" class="a-wrap">
                            <a @click="doBroadcast(sub)" @mouseover="doCancelTimer"
                               @mouseleave="doStartTimer">{{typeof item === 'string' ? item :
                                sub[prop]}}
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
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
            borderColor: {
                type: String,
                default: '#dcdfe6'
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
                clearInterval(this.timer2000);
                clearTimeout(this.timer500)
            },
            doStartTimer() {
                console.log('mouseleave')
                this.animate = false
                this.timer2000 = setInterval(this.showMarquee, this.time)
            }
        },
        computed: {
            getType() {
                if (this.broadcastArray[0]) {
                    let type = Object.prototype.toString.call(this.broadcastArray[0])
                    if (type === '[object Array]') {
                        return 'array'
                    } else {
                        return 'object'
                    }
                } else {
                    return 'object'
                }
            },
            getHeight() {
                if (this.broadcastArray[0]) {
                    return this.getType === 'array' ? this.broadcastArray[0].length * 50 + 'px' : 50 + 'px'
                } else {
                    return 50 + 'px'
                }

            },
            getLineHeight() {
                if (this.broadcastArray[0]) {
                    return this.getType === 'array' ? this.broadcastArray[0].length * 50 + 'px' : '50px'
                } else {
                    return '50px'
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
    .auto-broadcast{
        display: flex;
        overflow: hidden;
        border: 1px solid transparent;
        .icon{
            width: 50px;
            min-width: 50px;
            font-size: 25px;
            text-align: center;
        }
        .text{
            flex: 1;
            overflow: hidden;
            .broadcast-text-content-wrap{
                margin: 0;
                padding: 0;
                list-style: none;
                .broadcast-text-content{
                    height: 50px;
                    .a-wrap{
                        height: 50px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    a{
                        cursor: pointer;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        line-height: 50px;
                        &:hover{
                            color: blue;
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