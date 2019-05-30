<template>
    <div class="block-panel" ref="blockPanelLength" :style="{'border': borderStyle, 'background': backgroundColor}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "BlockPanel",
        props: {
            borderStyle: {
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
        }
    }
</script>

<style lang="scss">
    .block-panel {
        padding: 15px
    }

</style>