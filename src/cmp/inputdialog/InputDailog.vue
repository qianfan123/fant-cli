<template>
    <div class="input-dialog">
        <el-popover
                ref="popover"
                placement="bottom"
                v-model="visiable"
                trigger="manual">
            <ul class="list-wrapper">
                <li v-for="(item, index) in getTableData"
                    ref="item"
                    tabindex="1"
                    :class="{'select': index === selectIndex}"
                    @click="doSelect(item)">{{item.name}}</li>
            </ul>
        </el-popover>
        <el-input
                ref="input"
                :disabled="disabled"
                :placeholder="placeholder"
                @keyup.native="onKeyup($event)"
                @keydown.native="onKeyDown($event)"
                @blur="onBlur"
                v-model="innerValue"></el-input>
        <i class="el-icon-more more" @click="doDialogShow" :style="{'cursor': disabled ? 'not-allowed' : 'pointer'}"></i>
        <el-custom-dialog
                :title="dialogTitle"
                :confirmText="dialogConfirmText"
                :cancelText="dialogCancelText"
                :isConfirmShow="isConfirmShow"
                :isCancelShow="isCancelShow"
                @before-close="onBeforeClose"
                @confirm="onConfirm"
                @cancel="onCancel"
                :isDialogShow="dialogShow">
            <slot></slot>
        </el-custom-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '请输入'
            },
            dialogShow: {
                type: Boolean,
                default: false
            },
            dialogTitle: {
                type: String,
                default: '提示'
            },
            dialogConfirmText: {
                type: String,
                default: '确认'
            },
            dialogCancelText: {
                type: String,
                default: '取消'
            },
            isConfirmShow: {
                type: Boolean,
                default: true
            },
            isCancelShow: {
                type: Boolean,
                default: true
            },
            value: {
                type: Boolean,
                default: ''
            },
            query: {
                type: Function,
                default: () => {}
            }
        },
        data() {
            return {
                clickFlag: false,
                visiable: false,
                innerValue: '',
                tableData: [],
                timer: 0,
                selectIndex: -1
            }
        },
        methods: {
            doDialogShow() {
                if (this.disabled) {
                    return
                }
                this.dialogShow = true
            },
            onBeforeClose() {
                this.dialogShow = false
                this.$emit('before-close')
            },
            onConfirm() {
                this.dialogShow = false
                this.$emit('confirm')
            },
            onCancel() {
                this.dialogShow = false
                this.$emit('cancel')
            },
            doSelect(item) {
                this.$emit('get-select', item)
                this.$emit('input', item)
                this.clickFlag = true
                this.innerValue = item.name
                this.visiable = false
            },
            onKeyup(event) {
                if (event.which === 38 || event.which === 40 || event.which === 13) {
                    return
                }
                clearTimeout(this.timer)
                if (!this.innerValue) {
                    this.visiable = false
                    return
                }
                this.timer = setTimeout(() => {
                    this.tableData = this.query()
                    this.visiable = true
                    this.selectIndex = -1
                }, 500)
            },
            onKeyDown(event) {
                console.log(event.which)
                if (!this.visiable) {
                    return
                }
                if (event.which === 38) {
                    --this.selectIndex
                    if (this.selectIndex <= -1) {
                        this.selectIndex = -1
                        console.log(this.$refs.input)
                        this.$nextTick(() => {
                            this.$refs.input.focus()
                            this.$refs.input.select()
                        })
                    }
                    console.log(this.selectIndex)
                }

                if (event.which === 40) {
                    ++this.selectIndex
                    if (this.selectIndex === this.getTableData.length) {
                        this.selectIndex = this.getTableData.length - 1
                    }
                    console.log(this.selectIndex)
                }
                if (event.which === 13) {
                    if (this.selectIndex > -1) {
                        this.innerValue = this.getTableData[this.selectIndex].name
                        this.visiable = false
                        this.$emit('input', this.getTableData[this.selectIndex])
                    }
                }
            },
            onBlur() {
                this.visiable = false
            }
        },
        watch: {
            value(value) {
                if (value) {
                    this.clickFlag = true
                    this.dialogShow = false
                    this.innerValue = value.name
                }
            }
        },
        destroyed: function() {
            clearTimeout(this.timer)
            this.timer = null
        },
        computed: {
            getTableData() {
                return this.query()
            }
        }
    }
</script>

<style>
.input-dialog{
    position: relative;
}
.input-dialog>.more{
    position: absolute;
    right: 10px;
    top: 8px;
    cursor: pointer;
}
.input-dialog .list-wrapper{
    padding: 0;
    margin: 0;
    list-style: none;
}
.input-dialog .list-wrapper li{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eeeeee;
    cursor: pointer;
}
.input-dialog .list-wrapper .select{
    background-color:  #e3eefa;
}
.input-dialog .el-popover{
    top: 40px;
}
</style>