<template>
    <div class="block-panel-item" :style="getWidth">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "blockPanelItem",
        props: {
            borderStyle: { // 边框样式
                type: String,
                default: '1px solid red'
            }
        },
        data() {
            return {
                blockLength: 0
            }
        },
        inject: ['$this'],
        mounted() {
            this.blockLength = this.$this.$refs.blockPanelLength.children.length
            // console.log(this.$this.$refs.blockPanelLength.children.length)
        },
        computed: {
            getWidth() {
                let percent = 0
                if (this.blockLength > 0) {
                    percent = Math.floor((Math.floor(this.$this.$refs.blockPanelLength.clientWidth) - 32 - (this.blockLength - 1)) / this.blockLength)  + 'px'
                }
                return {
                    width: percent + 'px',
                    borderRight: this.borderStyle
                }
            }
        }
    }
</script>

<style lang="scss">
    .block-panel-item {
        display: inline-block;
        text-align: center;
        &:last-child{
            border-right: none !important;
        }
    }
</style>