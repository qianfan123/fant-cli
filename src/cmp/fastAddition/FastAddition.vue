<template>
    <div class="fast-addition">
        <div class="fast-addition-left">
            <ul class="fast-addition-text-content-wrap">
                <li class="fast-addition-text-content" v-for="(item, index) in fastAdditionArray" :key="index">
                    <span class="firCircle"  @click="onClose(index)">{{item}}</span>
                    <span class="secCircle" @click="onClose(index)">X</span>
                </li>
            </ul>
            <input v-model="code"
                   @keydown.enter="onAdd"
                   placeholder="输入后按回车确认" v-if="!disabled"/>
        </div>
        <!--<div class="fast-addition-right">-->
            <!---->
        <!--</div>-->
        <el-tip closable v-if="isShowTip" type="warning" :disabled="disabled">
        </el-tip>
    </div>
</template>

<script>
    export default {
        props: {
            fastAdditionArray: { // 默认示例
                type: Array,
                default: []
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                code: ''
            }
        },
        methods: {
            onClose(index) {
                this.fastAdditionArray.splice(index, 1)
                this.$emit('existArray',  this.fastAdditionArray)
            },
            onAdd() {
                if (this.fastAdditionArray.length >= 0) {
                    let oArr = this.fastAdditionArray.filter((item) => {
                        return this.code === item
                    })
                    // 自动去除前后空格
                    this.code = this.code.replace(/(^\s*)|(\s*$)/g, '')
                    if (oArr.length > 0) {
                        this.$message.warning('不允许添加重复内容')
                    } else {
                        if (this.code) {
                            this.fastAdditionArray.push(this.code) && (this.code = '')
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .fast-addition {
        margin: 0;
        padding: 0;
        border: 1px solid #ccc;
        position: relative;
        .fast-addition-left {
            margin: 0;
            padding: 0;
            border: none;
            color: #5090f0;
            font-size: 12px;
            height: 30px;
            line-height: 30px;
            .fast-addition-text-content-wrap {
                margin: 0;
                padding: 0;
                .fast-addition-text-content {
                    margin: 5px 0 5px 8px;
                    padding: 0;
                    list-style: none;
                    float: left;
                    background-color: #F1F7FE;
                    height: 20px;
                    line-height: 20px;
                    display: inline-block;
                    .secCircle {
                        cursor: pointer;
                        font-size: 13px;
                        margin-left: 2px;
                    }
                }
            }
            input {
                margin: 0 0 0 20px;
                padding: 0 0 0 5px;
                display: inline-block;
                width: 160px;
                height: 70%;
                border-radius: 5px;
                border: 1px solid #ccc;
                color: #ccc;
            }
        }
    }
</style>