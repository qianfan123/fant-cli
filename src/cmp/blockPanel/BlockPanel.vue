<template>
    <div class="block-panel" ref="blockPanelLength" :style="{'border': borderStyle, 'background': backgroundColor}">
        <slot></slot>
    </div>
</template>

<script>
    import { addResizeListener, removeResizeListener } from 'fant3/src/utils/resize-event';
    // import debounce from 'throttle-debounce/debounce';
    import throttle from 'throttle-debounce/throttle';
    export default {
        name: "BlockPanel",
        props: {
            borderStyle: { //边框样式
                type: String,
                default: '1px solid red'
            },
            backgroundColor: {
                type: String,
                default: 'red'
            }
        },
        mounted(){
            console.dir(this.$refs.blockPanelLength)
            let childLength = this.$refs.blockPanelLength.children.length
            addResizeListener(this.$el, () => {
                console.log(this.$refs.blockPanelLength.clientWidth)
                // 函数防抖
                throttle(100, () => {
                    for (let child of this.$refs.blockPanelLength.children) {
                        child.style.width = Math.floor((Math.floor(this.$refs.blockPanelLength.clientWidth) - 32 - (childLength - 1)) / childLength)  + 'px'
                    }
                })()

                // for (let child of this.$refs.blockPanelLength.children) {
                //     child.style.width = Math.floor((Math.floor(this.$refs.blockPanelLength.clientWidth) - 32 - (childLength - 1)) / childLength)  + 'px'
                // }
            })
        },
        provide(){
            return {
                $this: this
            }
        },
        destroyed: function () {
            removeResizeListener(this.$el)
        }
    }
</script>

<style lang="scss">
    .block-panel {
        padding: 15px;
    }

</style>