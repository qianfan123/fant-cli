<template>
    <transition name="transition-item">
        <div v-if="showItem">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            showItem: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
    .notification-item-enter,.notification-item-leave-to{
        opacity: 0;
    }
    .notification-item-enter-active,.notification-item-leave-active{
        transition: all .5s ease;
    }
    .notification-item-enter.left{
        transform: translateX(-100%);
    }
    .notification-item-enter.right{
        transform: translateX(100%);
    }
</style>