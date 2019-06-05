<template>
    <div class="input-day">

        <el-input v-model="inputValue" @focus="onFocus" @blur="onBlur" ref="input" :clearable="clearable" :disabled="disabled"></el-input>
        <el-popover
                ref="popover"
                placement="bottom"
                v-model="visiable"
                trigger="manual">
            <ul class="list-wrapper" v-for="(row, rowIndex) in getRows">
                <li v-for="(col, colIndex) in 7"
                    :class="{'selected': rowIndex*7 + 1 + colIndex == inputValue, 'today-select': rowIndex*7 + 1 + colIndex == getToday}"
                    v-if="(rowIndex*7 + 1 + colIndex) <= getMonthData"
                    @click="doSelect($event)">{{rowIndex*7 + 1 + colIndex}}</li>
            </ul>
            <div class="btn-group">
                <el-button size="mini" @click="doCancel">取消</el-button>
                <el-button size="mini" type="primary" @click="doConfirm">确定</el-button>
            </div>
        </el-popover>
    </div>
</template>

<script>
    export default {
        props: {
            month: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            clearable: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visiable: false,
                selectIndex: -1,
                inputValue: '',
                oldNode: ''
            }
        },
        computed: {
            getMonthData() {
                let year = new Date().getFullYear()
                if ([1,3,5,7,8,10,12].includes(this.getMonth())) {
                    return 31
                } else if ([4,6,9,11].includes(this.getMonth())) {
                    return 30
                } else if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                    return 29
                } else {
                    return 28
                }
            },
            getRows() {
                if (this.getMonthData % 7 === 0) {
                    let arr = []
                    for(let i = 0; i < Math.floor(this.getMonthData / 7); i++) {
                        arr.push(null)
                    }
                    return arr
                } else {
                    let arr = []
                    for(let i = 0; i < Math.floor(this.getMonthData / 7) + 1; i++) {
                        arr.push(null)
                    }
                    return arr
                }
            },
            getToday() {
                return new Date().getDate()
            }
        },
        methods: {
            getMonth() {
                if (this.month) {
                    return Number(this.month)
                } else {
                    return (new Date().getMonth() + 1)
                }
            },
            doSelect(event) {
                console.dir(event.target)
                if (this.oldNode) {
                    this.oldNode.classList.remove('selected')
                }
                event.target.classList.add('selected')
                this.oldNode = event.target
                this.$refs.input.focus()
            },
            onFocus() {
                this.visiable = true
                this.oldNode = this.$el.querySelector('.selected')
                this.$emit('focus')
            },
            onBlur() {
                this.$emit('blur')
            },
            doCancel() {
                this.visiable = false
            },
            doConfirm() {
                if (this.oldNode && this.oldNode.textContent) {
                    this.inputValue = this.oldNode.textContent
                } else {
                    this.inputValue = new Date().getDate()
                }
                this.$emit('input', this.inputValue)
                this.visiable = false
                this.$emit('click', this.inputValue)
            }
        },
        watch: {
            inputValue(value) {
                if (!value) {
                    this.inputValue = ''
                    this.oldNode = ''
                    this.$emit('input', '')
                }
            }
        },
        mounted() {
            console.log(this.value)
            this.inputValue = this.value
        }
    }
</script>

<style lang="scss">
.input-day{
    .list-wrapper{
        margin: 0;
        padding: 0;
        list-style: none;
        li{
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
        }
    }
    .el-popover{
        margin-top: 10px;
    }
    .selected{
        background-color: #20A0FF;
        color: white;
    }
    .today-select{
        background-color: #20A0FF;
        opacity: 0.5;
    }
    .btn-group{
        text-align: right;
        margin-top: 10px;
    }
}
</style>