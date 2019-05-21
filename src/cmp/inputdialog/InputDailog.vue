<template>
    <div class="input-dialog">
        <el-popover
                ref="popover"
                placement="bottom"
                title="标题"
                v-model="visiable"
                trigger="manual">
            <el-table :data="getTableData">
                <el-table-column width="150" property="date" label="日期"></el-table-column>
                <el-table-column width="100" property="name" label="姓名"></el-table-column>
                <el-table-column width="300" property="address" label="地址"></el-table-column>
            </el-table>
        </el-popover>
        <el-input :placeholder="placeholder" v-model="innerValue" v-popover:popover></el-input>
        <i class="el-icon-more more" @click="doDialogShow"></i>
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
                visiable: false,
                innerValue: '',
                tableData: [],
                timer: 0
            }
        },
        methods: {
            doDialogShow() {
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
            }
        },
        watch: {
            value(value) {
                if (value) {
                    this.dialogShow = false
                    console.log(value)
                    this.innerValue = value.name
                }
            },
            innerValue(value) {
                if (value) {
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        console.log(value)
                        this.tableData = this.query()
                        console.log(typeof this.query)
                        this.visiable = true
                    }, 500)
                }
            },
            // query: {
            //     handler(newName, oldName) {
            //         console.log(newName());
            //     },
            //     immediate: true,
            //     deep: true
            // }
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
</style>