<template>
    <div class="fast-addition">
        <div class="fast-addition-left">
            <!--<ul class="fast-addition-text-content-wrap">-->
                <!--<li class="fast-addition-text-content" v-for="(item, index) in fastAdditionArray" :key="index">-->
                    <!--<span class="firCircle"  @click="onClose(index)">{{item}}</span>-->
                    <!--<span class="secCircle" @click="onClose(index)">X</span>-->
                <!--</li>-->
            <!--</ul>-->
            <span class="fast-addition-text-content" v-for="(item, index) in fastAdditionArray" :key="index">
                <label class="firCircle" @click="onClose(index)">{{item[prop]}}</label>
                <i class="el-icon-close delete" @click="onClose(index)"></i>
            </span>
            <input v-model="code"
                   @keydown.enter="onAdd"
                   placeholder="输入后按回车确认" v-if="!disabled" :maxlength="maxLength"/>
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
            },
            onRepeat: {
                type: Boolean,
                default: false
            },
            maxLength: {
                type: Number,
                default: 255
            },
            prop: {
                type: String,
                default: 'name'
            }
        },
        data() {
            return {
                code: ''
            }
        },
        methods: {
            onClose(index) {
                if(this.disabled) {
                    return
                }
                this.fastAdditionArray.splice(index, 1)
                this.$emit('existArray',  this.fastAdditionArray)
            },
            onAdd() {
                if (this.fastAdditionArray.length >= 0) {
                    let oArr = this.fastAdditionArray.filter((item) => {
                        return this.code === item[this.prop]
                    })
                    // 自动去除前后空格
                    this.code = this.code.replace(/(^\s*)|(\s*$)/g, '')
                    if (oArr.length > 0 && this.onRepeat === false) {
                        this.$message.warning('不允许添加重复内容')
                    } else {
                        if (this.code) {
                            let obj = ''
                            if (this.fastAdditionArray.length > 0) {
                                obj = JSON.parse(JSON.stringify(this.fastAdditionArray[0]))
                            }
                            for (let item in obj) {
                                obj[item] = ''
                            }
                            obj[this.prop] = this.code
                            this.fastAdditionArray.push(obj) && (this.code = '')
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
            /*height: 30px;*/
            line-height: 30px;
            .fast-addition-text-content {
                margin: 5px 0 5px 8px;
                padding: 0;
                list-style: none;
                background-color: #F1F7FE;
                height: 20px;
                line-height: 20px;
                display: inline-block;
                .delete {
                    margin: 0 5px 0 5px;
                    cursor: pointer;
                }
            }
            input {
                margin: 0 0 0 20px;
                padding: 0 0 0 5px;
                display: inline-block;
                width: 160px;
                height: 70%;
            }
        }
    }
</style>