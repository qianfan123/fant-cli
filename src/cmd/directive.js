import Vue from 'vue'
export default class Directive {
    static init(){
        /**
         * 1、只写v-number，则只能输入正负整数
         * 2、只写v-number.3，则代表3位正负小数
         * 3、只写v-number="正则表达式",则代表自定义校验规则
         * 4、只写v-number="{ min: '0', max: '10' }"
         */
        Vue.directive('number', {
            bind: (el, binding, vnode) => {
                /**
                 * 获取元素
                 * @returns {any}
                 */
                function getElement(){
                    let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
                    return ele
                }

                /**
                 * 设置输入按键
                 * @returns {number[]}
                 */
                function setPermitKey() {
                    let numberKey = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105]
                    let plusKey = [109,189]
                    let minusKey = [107,187]
                    let characterKey = [110,190]
                    let backspaceKey = [8]
                    let deleteKey = [46,110]
                    let arrowKey = [37,38,39,40]
                    let enterKey = [13]
                    let allKey = [...numberKey, ...plusKey, ...minusKey,
                        ...characterKey, ...backspaceKey, ...plusKey,
                        ...minusKey, ...deleteKey, ...arrowKey, ...enterKey]
                    return allKey
                }

                /**
                 * 获取指令类型
                 * @param binding
                 * @returns {string}
                 */
                function getType(binding) {
                    if (binding.rawName === 'v-number') {
                        return 'NUMBER'
                    } else if (/v-number\.\d/g.test(binding.rawName) && !binding.expression){
                        return 'FLOAT'
                    } else if (/v-number\.\d/g.test(binding.rawName) && binding.expression) {
                        return 'VALIDATE'
                    } else {
                        console.error('不合法的指令语法，请遵从组件规则')
                    }
                }

                /**
                 * 移除以0开头的数字
                 * @param value
                 * @returns {*}
                 */
                function removeZero(value) {
                    if(value.substring(0,1) === '0' && value.length !== 1){
                        value = value.substring(1, value.length)
                    } else if(((value.substring(0,1) === '+' || value.substring(0,1) === '-') && value.substring(1,2) === '0')){
                        value = value.substring(0,1) + value.substring(2,value.length)
                    }
                    return value
                }

                /**
                 * 获取小数点格式化位数
                 * @param binding
                 * @returns {string}
                 */
                function getFloatNumber(binding) {
                    let bit = 0
                    for(let item in binding.modifiers){
                        if (new RegExp('(\\d*$)').test(Number(item))){// 有小数位
                            bit = Number(item)
                        }
                    }
                    return bit
                }

                /**
                 * 初始化
                 */
                function init(ele, binding, vnode) {
                    if (getType(binding) === 'NUMBER') { // 首次绑定校验v.number
                        validateNumberOnly(ele, binding, vnode, '')
                    } else if(getType(binding) === 'FLOAT') { // 首次绑定校验v.number.3
                        validateNumberWithFloat(ele, binding, vnode, '', getFloatNumber(binding))
                    } else { // 首次绑定校验v.number.3="{ min: '0.000', max: '10000.000' }"
                        validateNumberWithFloat(ele, binding, vnode, '', getFloatNumber(binding))
                        validateMinAndMax(ele, binding, vnode, '', getFloatNumber(binding))
                    }
                }

                /**
                 * 设置绑定值
                 * @param ele
                 * @param binding
                 * @param vnode
                 * @param expression
                 */
                function setModelValue(ele, binding, vnode, expression, value) {
                    // 多层级处理方式
                    if (/[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+/.test(expression)) {
                        ele.value = value
                        vnode.componentInstance.$emit('input', ele.value)
                    } else {
                        // 单层级处理方式
                        vnode.context.$data[expression] = value
                    }
                }

                /**
                 * 设置监听事件
                 * @param ele
                 * @param binding
                 * @param vnode
                 */
                function addListenerEvent(ele, binding, vnode) {
                    if(ele){
                        ele.onkeyup = function ($event) {
                            console.dir($event)
                            let bindModel = vnode.data.model.expression
                            if (setPermitKey().indexOf($event.which) > -1) {
                                if (getType(binding) === 'NUMBER') {
                                    // 1、只写v-number，则只能输入数字
                                    validateNumberOnly(ele, binding, vnode, $event)
                                } else {
                                    // v-number.3 || v-number.3="{ min: '0.000', max: '10000.000' }"
                                    // 以0开头的进行去0处理
                                    if (/^(\-|\+)?0\d+/.test($event.target.value)) {
                                        Vue.nextTick(() => {
                                            setModelValue(ele, binding, vnode, bindModel, removeZero($event.target.value))
                                        })
                                    }
                                    // 中文下的+-。进行处理
                                    if (/。|(?<=\S+)(\-|\+)|=/g.test($event.target.value)) {
                                        Vue.nextTick(() => {
                                            setModelValue(ele, binding, vnode, bindModel, removeZero($event.target.value.replace(/。|(?<=\S+)(\-|\+)|=/g, '')))
                                        })
                                    }
                                }
                            } else {
                                let oValue = ''
                                oValue = $event.target.value.replace(/[\u4E00-\u9FFF]/g,'')
                                if (getType(binding) === 'NUMBER') {
                                    oValue = oValue.replace(/[^0-9]/g,'')
                                } else {
                                    oValue = $event.target.value.replace(/[^0-9\+\-\.]/g,'')
                                }
                                Vue.nextTick(() => {
                                    setModelValue(ele, binding, vnode, bindModel, oValue)
                                })
                            }
                        }
                        ele.onkeydown = function ($event) {
                            console.log($event.which)
                            let index = $event.target.selectionStart
                            let eventKey = $event.key === 'ArrowLeft' || $event.key === 'ArrowRight' || $event.key === 'Backspace' || $event.key === 'Delete' ? '' : $event.key
                            let equalValue = index === 0 ? `${eventKey+$event.target.value}` : `${$event.target.value+eventKey}`
                            // onkeydown与onkeyup在中文输入法下+-.的which值不同
                            if (setPermitKey().concat([229]).indexOf($event.which) > -1) {
                                // v-number
                                if (getType(binding) === 'NUMBER') {
                                    if (/(?<=\S+)(\-|\+|\=|\.)/g.test(equalValue) || !/^(\+|\-)?\d*$/g.test(equalValue)) {
                                        $event.preventDefault()
                                    }
                                } else if (getType(binding) === 'FLOAT' || getType(binding) === 'VALIDATE'){
                                    // v-number.3
                                    if (/(?<=\S+)(\-|\+|\=)/g.test(equalValue)) {
                                        $event.preventDefault()
                                    } else {
                                        if (($event.which === 190 && $event.target.value.indexOf('.') !== -1) || $event.which === 110 && $event.target.value.indexOf('.') !== -1){
                                            $event.preventDefault()
                                        }
                                        if ($event.target.value.indexOf('.') !== -1) {
                                            let arr = $event.target.value.split('.')
                                            if (arr.length >= 2 && arr[1].length === 3 && index >= $event.target.value.length - 3) {
                                                if (($event.which >= 48 && $event.which <= 57) || ($event.which >= 96 && $event.which <= 105)) {
                                                    $event.preventDefault()
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    // v-number.3="{ min: '0.000', max: '10000.000' }"
                                    // todo
                                }
                            } else {
                                $event.preventDefault()
                            }
                        }
                        ele.onblur = function ($event) {
                            if (getType(binding) === 'NUMBER') {
                                validateNumberOnly(ele, binding, vnode, $event)
                            }
                            if (getType(binding) === 'FLOAT' || getType(binding) === 'VALIDATE') {
                                validateNumberWithFloat(ele, binding, vnode, $event, getFloatNumber(binding))
                                if (getType(binding) === 'VALIDATE') {
                                    validateMinAndMax(ele, binding, vnode, $event)
                                }
                            }
                        }
                    } else {
                        console.error('组件不合法???')
                    }
                }
                /**
                 * 只校验是否为数字，不是数字则不能输入
                 * @param ele
                 * @param binding
                 * @param vnode
                 * @param event
                 */
                function validateNumberOnly(ele, binding, vnode, event){
                    if (!binding.expression) {
                        let regExp = new RegExp("^(\\+|\\-)?\\d*$")
                        let value = event ? event.target.value : ele.value
                        let bindModel = vnode.data.model.expression
                        if (value && regExp.test(value)) {
                            setModelValue(ele, binding, vnode, bindModel, removeZero(value))
                        } else {
                            let oValue = value.replace(/(?<=\S+)(\-|\+)|[^0-9\+\-]/g, '')
                            setModelValue(ele, binding, vnode, bindModel, removeZero(oValue))
                        }
                    }
                }

                /**
                 * 校验浮点数
                 * @param ele
                 * @param binding
                 * @param vnode
                 * @param event
                 */
                function validateNumberWithFloat(ele, binding, vnode, event){
                    if (getType(binding) === 'VALIDATE' || getType(binding) === 'FLOAT') {
                        let bit = getFloatNumber(binding)
                        let regExp = new RegExp('^(\\-|\\+)?\\d*\\.?\\d{0,' + bit + '}$')
                        let value = event ? event.target.value : ele.value
                        let bindModel = vnode.data.model.expression
                        if (value && regExp.test(value)) {
                            setModelValue(ele, binding, vnode, bindModel, parseFloat(removeZero(value)).toFixed(bit))
                        } else {
                            if (value) {
                                let oValue = value.replace(/[^\.0-9\+\-]/g, '')
                                if (oValue) {
                                    setModelValue(ele, binding, vnode, bindModel, parseFloat(removeZero(oValue)).toFixed(bit))
                                } else {
                                    setModelValue(ele, binding, vnode, bindModel, '')
                                }
                            }
                            // vnode.$forceUpdate()
                        }
                    }
                }

                /**
                 * 校验最大最小值
                 */
                function validateMinAndMax(ele, binding, vnode, event) {
                    let value = event ? event.target.value : ele.value
                    let bindModel = vnode.data.model.expression
                    console.log(binding.expression.match(/(?<=min:\s*[\'|\"]).*(?=[\'|\"],\s?max)/g))
                    let min = binding.expression.match(/(?<=min:\s*[\'|\"]).*(?=[\'|\"],\s?max)/g)[0].trim()
                    let max = binding.expression.match(/(?<=,\s*max\s*:\s*[\'|\"]).*(?=[\'|\"]\s*})/g)[0].trim()
                    if (typeof Number(min) !== 'number') {
                        console.log('min绑定表达式错误')
                    } else if (typeof  Number(max) !== 'number') {
                        console.log('max绑定表达式错误')
                    } else {
                        console.log('格式正确')
                    }
                    if (parseFloat(value) < parseFloat(min)) {
                        setModelValue(ele, binding, vnode, bindModel, min)
                    } else if (parseFloat(value) > parseFloat(max)) {
                        setModelValue(ele, binding, vnode, bindModel, max)
                    } else {
                        console.log('格式化正常')
                    }
                }
                // 初始化绑定
                init(getElement(), binding, vnode)
                // 增加监听事件
                addListenerEvent(getElement(), binding, vnode)
            },
            unbind: (el, binding, vnode, oldVnode) => {
                console.dir(el.children[0].value)
            }
        })
    }
}