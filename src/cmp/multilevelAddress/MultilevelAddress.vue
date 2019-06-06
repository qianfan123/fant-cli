<template>
    <div>
        <div class="divider-address" v-if="showColNumber == 1">
            <el-row>
                <el-col :span="24">
                    <el-select class="widthLength marginBottom" v-model="province" @change="doProvinceChange" placeholder="省">
                        <el-option v-for="(item, index) in provinceList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-select class="widthLength marginBottom" v-model="city" @change="doCityChange" placeholder="市">
                        <el-option v-for="(item, index) in  cityList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-select class="widthLength marginBottom" v-model="county" @change="doCountyChange" placeholder="区/县">
                        <el-option v-for="(item,index) in countyList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-select class="widthLength marginBottom" v-model="village" @change="doVillageChange" placeholder="镇/乡">
                        <el-option v-for="(item,index) in villageList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-input class="streetStyle" v-model="street" placeholder="请输入街道，门牌号"></el-input>
                </el-col>

            </el-row>
        </div>
        <div class="divider-address" v-if="showColNumber == 2">
            <el-row class="marginBottom">
                <el-col :span="12">
                    <el-select class="widthLength" v-model="province" @change="doProvinceChange" placeholder="省">
                        <el-option v-for="(item, index) in provinceList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="12">
                    <el-select class="widthLength" v-model="city" @change="doCityChange" placeholder="市">
                        <el-option v-for="(item, index) in  cityList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row class="marginBottom">
                <el-col :span="12">
                    <el-select class="widthLength" v-model="county" @change="doCountyChange" placeholder="区/县">
                        <el-option v-for="(item,index) in countyList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="12">
                    <el-select class="widthLength" v-model="village" @change="doVillageChange" placeholder="镇/乡">
                        <el-option v-for="(item,index) in villageList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-input class="streetStyle" v-model="street" placeholder="请输入街道，门牌号"></el-input>
                </el-col>
            </el-row>
        </div>
        <div class="divider-address" v-if="showColNumber == 3">
            <el-row class="marginBottom">
                <el-col :span="8">
                    <el-select class="widthLength" v-model="province" @change="doProvinceChange" placeholder="省">
                        <el-option v-for="(item, index) in provinceList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-select class="widthLength" v-model="city" @change="doCityChange" placeholder="市">
                        <el-option v-for="(item, index) in  cityList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-select class="widthLength" v-model="county" @change="doCountyChange" placeholder="区/县">
                        <el-option v-for="(item,index) in countyList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-select class="widthLength" v-model="village" @change="doVillageChange" placeholder="镇/乡">
                        <el-option v-for="(item,index) in villageList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="16">
                    <el-input class="streetStyle" v-model="street" placeholder="请输入街道，门牌号"></el-input>
                </el-col>
            </el-row>
        </div>
        <div class="divider-address" v-if="showColNumber == 4">
            <el-row class="marginBottom">
                <el-col :span="6">
                    <el-select class="widthLength" v-model="province" @change="doProvinceChange" placeholder="省">
                        <el-option v-for="(item, index) in provinceList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-select class="widthLength" v-model="city" @change="doCityChange" placeholder="市">
                        <el-option v-for="(item, index) in  cityList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-select class="widthLength" v-model="county" @change="doCountyChange" placeholder="区/县">
                        <el-option v-for="(item,index) in countyList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-select class="widthLength" v-model="village" @change="doVillageChange" placeholder="镇/乡">
                        <el-option v-for="(item,index) in villageList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-input class="streetStyle" v-model="street" placeholder="请输入街道，门牌号"></el-input>
                </el-col>
            </el-row>
        </div>
        <div class="divider-address" v-if="showColNumber == 5">
            <el-row class="marginBottom">
                <el-col :span="4">
                    <el-select class="widthLength" v-model="province" @change="doProvinceChange" placeholder="省">
                        <el-option v-for="(item, index) in provinceList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select class="widthLength" v-model="city" @change="doCityChange" placeholder="市">
                        <el-option v-for="(item, index) in  cityList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select class="widthLength" v-model="county" @change="doCountyChange" placeholder="区/县">
                        <el-option v-for="(item,index) in countyList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select class="widthLength" v-model="village" @change="doVillageChange" placeholder="镇/乡">
                        <el-option v-for="(item,index) in villageList" :key="index" :label="item.name" :value="item.uuid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-input class="streetStyle" v-model="street" placeholder="请输入街道，门牌号"></el-input>
                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ELMultilevelAddress",
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
            },
            showColNumber: {
                type: Number,
                default: 1
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
        },
        watch: {
            street(value) {
                if (value) {
                    this.$emit('street', value)
                }
            }
        },
    }
</script>

<style lang="scss">
    .divider-address {
        .widthLength {
            width: 100%;
        }
        .marginBottom {
            margin-bottom: 20px;
        }
        .marginRight4 {
            margin-right: 20px;
        }
        .el-col{
            padding: 0 5px;
        }
    }

</style>