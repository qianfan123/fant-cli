<template>
    <div class="block-panel-item" :style="getWidth">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "blockPanelItem",
        data() {
            return {
                blockLength: 0
            }
        },
        inject: ['$this'],
        mounted() {
            this.blockLength = this.$this.$refs.blockPanelLength.children.length
            console.log(this.$this.$refs.blockPanelLength.children.length)
        },
        computed: {
            getWidth() {
                let percent = 0
                if (this.blockLength > 0) {
                    percent = 100/this.blockLength - (this.blockLength - 1)
                }
                return {
                    width: percent + '%'
                }
            }
        }
    }
</script>

<style lang="scss">
    .block-panel-item {
        border-right: 1px solid #ccc;
        display: inline-block;
        text-align: center;
        &:last-child{
            border-right: none;
        }
    }
</style>