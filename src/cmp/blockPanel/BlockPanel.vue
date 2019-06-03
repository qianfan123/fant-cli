<template>
    <div class="block-panel" ref="blockPanelLength" :style="{'border': borderStyle, 'background': backgroundColor}">
        <slot></slot>
    </div>
</template>

<script>
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
        provide(){
            return {
                $this: this
            }
        },
        mounted() {
            let childLength = 0
            let blockPanelChildren = ''
            window.onresize = () => {
                childLength = this.$refs.blockPanelLength.children.length
                blockPanelChildren = this.$refs.blockPanelLength.children
                for(let i=0;i<childLength;i++) {
                    blockPanelChildren[i].style.width = (this.$refs.blockPanelLength.clientWidth - 32 -(childLength - 1)) / childLength + 'px'
                }
            }
        }
    }
</script>

<style lang="scss">
    .block-panel {
        padding: 15px
    }

</style>