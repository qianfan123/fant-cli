<template>
    <vue-qrcode :value="value" :options="options"></vue-qrcode>
</template>

<script>
    import VueQrcode from '@chenfengyuan/vue-qrcode';
    export default {
        components: {
            VueQrcode
        },
        props: {
            value: 'Hello, World!',
            options: {}
        }
    }
</script>

<style>

</style>