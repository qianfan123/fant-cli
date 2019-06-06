<template>
    <div>
        <!--飘窗组件-->
        <h1>飘窗内容自定义</h1>
        <el-button @click="doShowAnnotation">飘窗</el-button>
        <h1>弹框重新包装</h1>
        <el-button @click="doShowDialog">弹框</el-button>
        <!--dialog组件-->
        <ElCustomDialog
                title="自定义提示"
                confirmText="自定义确认"
                cancelText="自定义取消"
                width="500px"
                @before-close="dialogShow = false"
                @confirm="dialogShow = false"
                @cancel="dialogShow = false"
                :isDialogShow="dialogShow">
            <div style="height: 40px">11111</div>
            <div style="height: 40px">11111</div>
            <div style="height: 40px">11111</div>
            <div style="height: 40px">11111</div>
            <div style="height: 40px">11111</div>
            <div style="height: 40px">11111</div>
            <div style="height: 40px">11111</div>
            <div style="height: 40px">11111</div>
            <template slot="other">
                <el-button size="small" type="primary" @click="dialogShow = false">其它</el-button>
            </template>
        </ElCustomDialog>
        <!--标准可编辑表格-->
        <h1>可编辑表格</h1>
        <el-table
                @table-keydown="onTableKeyDown"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
            >
                <template slot-scope="scope">
                    <el-input v-model="scope.row.date" ref="date"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
            >
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name" ref="name"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.address" ref="address"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <!--选择天-->
        <h1>选择天{{selectDay}}</h1>
        <input-day v-model="selectDay" month="2" clearable
                   @click="onClick" @focus="onFocus" @blur="onBlur"></input-day>
        <!--自动广播组件-->
        <h1>自动广播组件</h1>
        <auto-broadcast
                prop="name"
                @get-select="onGetSelect"
                :broadcastArray="broadcastDoubleArray">
            <template slot="icon"><i class="el-icon-delete"></i></template>

        </auto-broadcast>
        <br>
        <br>
        <br>
        <auto-broadcast
                prop="name"
                @get-select="onGetSelect"
                :broadcastArray="broadcastArray">
            <template slot="icon"><i class="el-icon-delete"></i></template>

        </auto-broadcast>
        <!--带输入可弹框组件-->
        <h1>带输入可弹框组件{{inputValue}}</h1>
        <input-dailog v-model="inputValue" :query="queryFunc" prop="address" @visiable="onVisiable" clearable>
            <template slot-scope="scope">
                <el-custom-dialog
                        :title="dialogTitle"
                        :confirmText="dialogConfirmText"
                        :cancelText="dialogCancelText"
                        :isConfirmShow="isConfirmShow"
                        :isCancelShow="isCancelShow"
                        :width="500"
                        @before-close="onBeforeClose"
                        @confirm="onInputDialogConfirm"
                        @cancel="onInputDialogCancel"
                        :isDialogShow="inputDialogShow">
                    <div v-for="item in inputDialogArray" @click="doItemClick(item)">{{item[scope.prop]}}</div>
                </el-custom-dialog>
            </template>
        </input-dailog>
        <!--提示组件-->
        <h1>提示组件</h1>
        <alert title="定单异常" :center="false" :closeable="true" type="warning" description="请及时处理！"></alert>
        <!--开关组件-->
        <h1>开关组件</h1>
        <fant-switch v-model="switchValue"
                     width="52"
                     active-inner-text="开启"
                     inactive-inner-text="关闭"
        ></fant-switch>


        <!--<h1>国际化</h1>-->
        <!--见登录模块，登录模块已改造成国际化-->
        <!--需要配置src/locale/Locale.js下面的zh和en-->
        <!--<h1>清理多余代码fant-122</h1>-->
        <!--在文件中备注清楚-->
        <h1>富文本编译器</h1>
        <rich-text :editorOption="editorOption"
                   @rich-text-ready="onRichTextReady"
                   @rich-text-focus="onRichTextFocus"
                   @rich-text-blur="onRichTextBlur">
        </rich-text>
        <!--<h1>表格树</h1>-->
        <!--<tree-table-->
                <!--@table-sort="onTableSort"-->
                <!--@get-select="onTableSelect"-->
                <!--:data="treeTableData"-->
                <!--:columns="columns">-->
            <!--<el-button size="mini" type="primary">审核</el-button>-->
            <!--<el-button size="mini" type="primary">编辑</el-button>-->
            <!--<el-button size="mini" type="primary">查看</el-button>-->
        <!--</tree-table>-->
        <h1>表格树</h1>
        <el-table
                :data="tableData11"
                style="width: 100%;margin-bottom: 20px;"
                border
                row-key="id">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="日期"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="自定义view">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary">审核</el-button>
                    <el-button size="mini" type="primary">编辑</el-button>
                    <el-button size="mini" type="primary">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h1>二维码</h1>
        <!--dark: '#00F'像素点颜色,light: '#0000'透明背景-->
        <qrcode value="http://www.baidu.com" :options="{ width: 200, color: { dark: '#00F', light: '#0000'} }"></qrcode>
        <h1>回车快速新增</h1>
        <fast-addition
                prop="code"
                :fastAdditionArray="fastAdditionArray"
                :disabled="false"
                @existArray="onExistArray"
                :onRepeat="false"
                :maxLength="255"></fast-addition>
        <h1>分块面板</h1>
        <!--分块面板-->
        <block-panel borderStyle="1px solid orange" backgroundColor="pink">
            <block-panel-item borderStyle="1px solid green">春花秋月</block-panel-item>
            <block-panel-item borderStyle="1px solid green">何时了</block-panel-item>
            <block-panel-item borderStyle="1px solid green">往事知多少</block-panel-item>
            <block-panel-item borderStyle="1px solid green">往事知多少</block-panel-item>
        </block-panel>
        <h1>多级地址</h1>
        <MultilevelAddress
                :provinceFunc="provinceFunc"
                :cityFunc="cityFunc"
                :countyFunc="countyFunc"
                :villageFunc="villageFunc"
                :showColNumber="1"
        >
        </MultilevelAddress>
        <br>
        <br>
        <MultilevelAddress
                :provinceFunc="provinceFunc"
                :cityFunc="cityFunc"
                :countyFunc="countyFunc"
                :villageFunc="villageFunc"
                :showColNumber="2"
        >
        </MultilevelAddress>
        <br>
        <br>
        <MultilevelAddress
                :provinceFunc="provinceFunc"
                :cityFunc="cityFunc"
                :countyFunc="countyFunc"
                :villageFunc="villageFunc"
                :showColNumber="3"
        >
        </MultilevelAddress>
        <br>
        <br>
        <MultilevelAddress
                :provinceFunc="provinceFunc"
                :cityFunc="cityFunc"
                :countyFunc="countyFunc"
                :villageFunc="villageFunc"
                :showColNumber="4"
        >
        </MultilevelAddress>
        <br>
        <br>
        <MultilevelAddress
                :provinceFunc="provinceFunc"
                :cityFunc="cityFunc"
                :countyFunc="countyFunc"
                :villageFunc="villageFunc"
                :showColNumber="5"
        >
        </MultilevelAddress>
        <!--门店排行组件-->
        <h1>排行组件</h1>
        <div class="rank-lists">
            <div class="list">
                <rank-list color="#40a798" title="闵行区火锅排行榜" :rankData="rankList" @get-rank="getRank"></rank-list>
            </div>
            <div class="list">
                <rank-list color="#dd6b4d" title="闵行区火锅排行榜" :rankData="rankList"></rank-list>
            </div>
        </div>
        <h1>数字格式化</h1>
        <input type="text" v-model="inputNumber" v-number.3>
    </div>
</template>

<script lang="ts" src="./TestComponent.ts">
</script>

<style lang="scss">
    .rank-lists{
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        .list {
            padding: 0 30px;
            flex: 1;
            &:nth-child(1) {
                border-right: 1px solid #f2f2f2;
            }
        }
    }
</style>