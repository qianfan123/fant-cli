<template>
    <div class="block-panel">
       <el-row>
           <el-col v-for="(item, index) in blockPanelArray" :key="index" :span="24 / blockPanelArray.length">
               <div :style="{'borderRight': index === blockPanelArray.length - 1 ? 'none' : '1px solid #ccc'}">
                   <slot></slot>
               </div>
           </el-col>
       </el-row>
        <!--<span class="block-panel-span" v-for="(item, index) in blockPanelArray" :key="index" :style="{'borderRight': index === blockPanelArray.length - 1 ? 'none' : '1px solid #ccc'}">-->
           <!--<slot></slot>-->
        <!--</span>-->
    </div>
</template>

<script>
    export default {
        name: "BlockPanel",
        props: {
            blockPanelArray: {
                type: Array,
                default: []
            }
        },
        created() {
            // if (this.colCount > 0) {
            //     for (let i = 0; i<this.colCount; i++) {
            //         this.blockPanelArray.push('')
            //     }
            // }
        }
    }
</script>

<style lang="scss">
    .block-panel {
        margin: 0;
        padding: 0;
        height: 100px;
        text-align: center;
        .block-panel-span {
            display: inline-block;
            height: 30px;
            width: 100px;
            border-right: 1px solid #ccc;
            text-align: center;
        }
    }

</style>