<template>
    <div class="json-edit" :ref="getRef"></div>
</template>

<script>
    import Jsoneditor from 'jsoneditor'
    import 'jsoneditor/dist/jsoneditor.min.css'
    export default {
        props: {
            value: {
                type: Object,
                default: () => {}
            },
            option: {
                type: Object,
                default: () => {}
            },
            menuAble: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                event: {
                    onChangeText: json => {
                        this.$emit('input', json)
                    }
                },
                options: {}
            }
        },
        computed: {
            getRef() {
                return 'json' + Math.random()*1000 + Math.random()*1000
            }
        },
        mounted() {
            this.options = {...this.option, ...this.event}
            console.dir(this.options)
            const editor = new Jsoneditor(this.$refs[this.getRef], this.options)
            editor.set(this.value)
            if (!this.menuAble) {
                console.dir(this.$refs[this.getRef])
                this.$refs[this.getRef].children[0].children[0].style.display = 'none'
            }
        }
    }
</script>

<style lang="scss">

</style>