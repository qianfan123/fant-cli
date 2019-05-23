<template>
    <div>
        <el-select v-model="province" @change="doProvinceChange">
            <el-option v-for="(item, index) in provinceList" :key="index" :label="item.name" :value="item.uuid"></el-option>
        </el-select>
        <el-select v-model="city" @change="doCityChange">
            <el-option v-for="(item, index) in  cityList" :key="index" :label="item.name" :value="item.uuid"></el-option>
        </el-select>
        <el-select v-model="county" @change="doCountyChange">
            <el-option v-for="(item,index) in countyList" :key="index" :label="item.name" :value="item.uuid"></el-option>
        </el-select>
        <el-select v-model="village">
            <el-option v-for="(item,index) in villageList" :key="index" :label="item.name" :value="item.uuid"></el-option>
        </el-select>
        <el-input class="streetStyle" v-model="street"></el-input>
    </div>
</template>

<script>
    export default {
        name: "multilevelAddress",
        props: {
            provinceFunc: {
                type: Function,
                default: () => {}
            },
            cityFunc: {
                type: Function,
                default: () => {}
            },
            countyFunc: {
                type: Function,
                default: () => {}
            },
            villageFunc: {
                type: Function,
                default: () => {}
            }
        },
        data(){
            return {
                province: '',
                city: '',
                county: '',
                village: '',
                street: '',
                provinceList: [],
                cityList: [],
                countyList: [],
                villageList: []
            }
        },
        mounted() {
            this.provinceList = this.provinceFunc()
        },
        methods: {
            doProvinceChange() {
                this.cityList = this.cityFunc()
            },
            doCityChange() {
                this.countyList = this.countyFunc()
            },
            doCountyChange() {
                this.villageList = this.villageFunc()
            }
        }
    }
</script>

<style>
    .streetStyle {
        width: 50px;
        display: inline-block;
        position: relative;
        left: 888px;
        top: -33px;
    }
</style>