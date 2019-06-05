import Vue from 'vue'
export default class Directive {
    static init(){
        /**
         * 1、只写v-number，则只能输入数字
         * 2、只写v-number.minus，则能输入正负号
         * 3、只写v-number.3，则代表3位小数
         * 4、只写v-number.minus.3，则代表能输入3位小数的正负数
         * 5、只写v-number="正则表达式",则代表自定义校验规则
         * 6、只写v-number="{ min: '0', max: '10' }"
         */
        Vue.directive('number', {
            bind: (el, binding, vnode, oldVnode) => {
                console.dir(binding)
            },
            inserted: (el, binding, vnode, oldVnode) => {
                console.dir(binding)
            },
            // update: (el, binding, vnode, oldVnode) => {
            //     console.dir(binding.value)
            // },
            // componentUpdated: (el, binding, vnode, oldVnode) => {
            //     console.dir(binding.value)
            // },
            unbind: (el, binding, vnode, oldVnode) => {
                console.dir(binding)
            }
        })
    }
}