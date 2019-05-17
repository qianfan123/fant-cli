<template>
    <div class="rich-text">
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="doEditorBlur($event)"
                      @focus="doEditorFocus($event)"
                      @ready="doEditorReady($event)">
        </quill-editor>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'
    export default {
        components: {
            quillEditor
        },
        props: {
            editorOption: {
                type: Object,
                default: {}
            }
        },
        methods: {
            doEditorBlur(quill) {
                this.$emit('rich-text-blur', quill)
            },
            doEditorFocus(quill) {
                this.$emit('rich-text-focus', quill)
            },
            doEditorReady(quill) {
                this.$emit('rich-text-ready', quill)
            }
        }
    }
</script>

<style>
</style>