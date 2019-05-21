<template>
    <div class="fast-addition">
        <div class="fast-addition-left">
            <ul class="fast-addition-text-content-wrap">
                <li class="fast-addition-text-content" v-for="(item, index) in fastAdditionArray" :key="index">
                    <span class="firCircle" @close="onClose(index)">{{item}}</span>
                    <span class="secCircle" @close="onClose(index)">X</span>
                </li>
            </ul>
        </div>
        <div class="fast-addition-right">
            <input v-model="code"
                   @keydown.enter="onAdd"
                   placeholder="输入后按回车确认"/>
        </div>
        <el-tip closable v-if="isShowTip" type="warning">
        </el-tip>
    </div>
</template>

<script>
    export default {
        props: {
            fastAdditionArray: { // 默认示例
                type: Array,
                default: []
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
                this.$emit('selectCode', this.fastAdditionArray)
                this.checkBarcode()
            },
            checkBarcode() {
                if (this.fastAdditionArray.length === 0) {
                    this.isShowTip = false
                    return
                }
                if (this.fastAdditionArray.length > 0) {// 长度大于1，重复无疑
                    this.codeString = ''
                    this.barcode = ''
                    for (let i = 0; i < this.fastAdditionArray.length; i++) {
                        for (let j = 0; j < this.fastAdditionArray.length; j++) {
                            if(this.fastAdditionArray[j] === this.fastAdditionArray[i]) {
                                this.barcode = this.fastAdditionArray[j]
                            }
                            if (this.barcode) {
                                this.codeString = this.barcode
                                break
                            }
                        }
                        if (this.codeString) {
                            break
                        }
                    }
                    this.isShowTip = true
                } else { // 没有查到，无重复
                    this.isShowTip = false
                }
            },
            onAdd() {
                if (this.fastAdditionArray.length >= 0) {
                    let oArr = this.fastAdditionArray.filter((item) => {
                        return this.code === item
                    })
                    // 自动去除前后空格
                    this.code = this.code.replace(/(^\s*)|(\s*$)/g, '')
                    let regex = /^[a-z0-9A-Z\-]*$/g
                    if (!regex.test(this.code)) {
                        this.$message.error('内容只能为数字 字母 符号(-) ,且长度不大于25位')
                        this.code = ''
                        return
                    }

                    if (oArr.length > 0) {
                        this.$message.warning('不允许添加重复内容')
                    } else {
                        if (this.code) {
                            this.fastAdditionArray.push(this.code) && (this.code = '')
                            this.fastAdditionArray.push(this.code) && (this.code = '')
                            this.$emit('selectCode', this.fastAdditionArray)
                            this.checkBarcode()
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