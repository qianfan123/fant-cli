<template>
    <div class="dividerAddress">
        <el-select class="marginRight" v-model="province" @change="doProvinceChange">
            <el-option v-for="(item, index) in provinceList" :key="index" :label="item.name" :value="item.uuid"></el-option>
        </el-select>
        <el-select class="marginRight" v-model="city" @change="doCityChange">
            <el-option v-for="(item, index) in  cityList" :key="index" :label="item.name" :value="item.uuid"></el-option>
        </el-select>
        <el-select class="marginRight" v-model="county" @change="doCountyChange">
            <el-option v-for="(item,index) in countyList" :key="index" :label="item.name" :value="item.uuid"></el-option>
        </el-select>
        <el-select class="marginRight" v-model="village" @change="doVillageChange">
            <el-option v-for="(item,index) in villageList" :key="index" :label="item.name" :value="item.uuid"></el-option>
        </el-select>
        <el-input class="streetStyle" v-model="street" placeholder="请输入街道，门牌号"></el-input>
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
                this.city = ''
                this.county = ''
                this.village = ''
                this.street = ''
            },
            doCityChange() {
                this.countyList = this.countyFunc()
                this.county = ''
                this.village = ''
                this.street = ''
            },
            doCountyChange() {
                this.villageList = this.villageFunc()
                this.village = ''
                this.street = ''
            },
            doVillageChange() {
                this.street = ''
            }
        }
    }
</script>

<style lang="scss">
    .dividerAddress {
        .marginRight {
            margin-right: 20px;
        }
        .streetStyle {
            width: 350px;
            display: inline-block;
            position: relative;}
    }

</style>