<template>
    <div class="fast-addition">
        <div class="fast-addition-left">
            <ul class="fast-addition-text-content-wrap">
                <li class="fast-addition-text-content" v-for="(item, index )in bandArray" :key="index">
                    <span class="firCircle" @close="onClose(index)">你好</span>
                    <span class="secCircle" @close="onClose(index)">X</span>
                </li>
            </ul>
        </div>
        <div class="fast-addition-right">
            <input v-model="code"
                   @keydown.enter="onAdd"
                   @focus="onFocus"
                   @blur="onBlur"
                   placeholder="输入后按回车确认"/>
        </div>
        <el-tip closable v-if="isShowTip" type="warning">
            <div class="tip">条码{{codeString}}与其它商品条码重复<qf-button type="link" @click="onLink(skus[0].id)">查看</qf-button></div>
        </el-tip>
    </div>
</template>

<script>
    export default {
        name: "fastAddition"
    }
</script>

<style lang="scss">
    .fast-addition {
        margin: 0;
        padding: 0;
        height: 30px;
        border: 1px solid #ccc;
        position: relative;
        .fast-addition-left {
            margin: 0;
            padding: 0;
            border: none;
            color: deepskyblue;
            line-height: 30px;
            font-size: 12px;
            .fast-addition-text-content-wrap {
                margin: 0;
                padding: 0;
                .fast-addition-text-content {
                    padding: 0;
                    list-style: none;
                    margin-left: 5px;
                }
            }
        }
        .fast-addition-right {
            margin: 0;
            padding: 0;
            width: 200px;
            height: 20px;
            position: absolute;
            border-radius: 5px;
            top: 3px;
            left: 105px;
            .fast-addition-right input {
                margin: 0;
                padding: 0;
                display: inline-block;
                width: 160px;
                height: 100%;
            }
        }
    }
</style>