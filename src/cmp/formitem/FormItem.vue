<template>
    <div class="qf-form-item">
        <label class="qf-form-label" :class="[{'is-required': required}]" v-bind:style="labelStyles"
               v-if="label || $slots.label">
            <slot name="label">{{label}}</slot>
        </label>
        <div class="qf-form-content" :style="fieldStyles">
            <slot ref="field"></slot>
        </div>
    </div>
</template>

<script lang="ts" src="./FormItem.ts">
</script>

<style lang="scss">
    .qf-form-item {
        box-sizing: border-box;

        &:after {
            clear: both;
            display: table;
            content: "";
        }

        .qf-form-label {
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 36px;
            box-sizing: border-box;
            padding-left: 10px;
        }

        .qf-form-label.is-required:after {
            content: "*";
            color: #f56c6c;
        }

        .qf-form-content {
            /*margin-left: 96px;*/
        }
    }

    .qf-form-item + .qf-form-item {
        margin-top: 12px;
    }
</style>