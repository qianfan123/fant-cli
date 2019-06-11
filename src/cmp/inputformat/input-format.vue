<template>
    <div class="input-format">
        <input type="text" :value="inputValue" @input="onInput" ref="input" v-bind="$props">
    </div>
</template>
<script>
    export default {
        'name': 'ElInputFormat',
        props: {
            value: {
                type: String,
                default: ''
            },
            max: { // 最大值
                type: String,
                default: ''
            },
            min: { // 最小值
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '请输入'
            },
            scale: {
                type: String,
                default: '0' // 默认整数,代表几位小数
            },
            symbol: {
                type: Boolean,
                default: false // 是否允许输入负数，默认不允许
            }
        },
        data() {
            return {
                inputValue: '',
                currentValue: this.inputValue
            }
        },
        watch: {
            'value'(value, oldValue) {
                console.log(value+'------'+oldValue)
                // let reg = new RegExp('^\\d*$')
                // if (!reg.test(value)) {
                //     this.$refs.input.value = ''
                // }
            }
        },
        methods: {
            onInput(event) {
                console.log(event)
                this.$emit('input','123')
            }
        }
    }
</script>
<style lang="scss">
    .input-format{

    }
</style>