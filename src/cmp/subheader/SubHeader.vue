<template>
    <div class="sub-header-view">
        <el-row>
            <el-col :span="12">
                <div class="panel">
                    <span @click="onToView($event)" v-html="bindPanel"></span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="text-right">
                    <slot name="operate"></slot>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang='ts' src='./SubHeader.ts'>

</script>

<style lang='scss'>
.sub-header-view{
    height: 54px;
    background: white;
    .panel{
        background: white;
        height: 54px;
        line-height: 54px;
        padding-left: 20px;
    }
    .text-right{
        text-align: right;
        line-height: 54px;
        height: 54px;
        /* padding-top: 10px; */
        padding-right: 60px;
    }
    .title{
        /*height: 46px;*/
        background: white;
        font-size: 20px;
        padding-left: 20px;
        font-weight: bold;
        .pro-logo{
            width: 30px;
            height: 30px;
            border-radius: 100%;
            position: relative;
            top: 8px;
            margin-right: 10px;
        }
        .desc{
            font-size: 14px;
            font-weight: normal;
            padding-left: 40px;
            padding-bottom: 20px;
        }
    }
    .selected{
        color: rgba(0, 0, 0, 0.647058823529412);
        font-size: 15px;
        font-weight: 600;
    }
    .unSelected{
        color: rgba(0, 0, 0, 0.447058823529412);
        cursor: pointer;
        &:hover{
            color: rgba(0, 0, 0, 0.647058823529412);
        }
    }
}
</style>