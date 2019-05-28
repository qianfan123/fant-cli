<template>
    <div class="block-panel" ref="blockPanelLength">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "BlockPanel",
        provide(){
            return {
                $this: this
            }
        }
    }
</script>

<style lang="scss">
    .block-panel {
    }

</style>