import { Component, Vue } from 'vue-property-decorator'
import AutoBroadcast from 'cmp/autobroadcast/AutoBroadcast.vue'
import MyDialog from 'pages/testcomponent/MyDialog.vue'
import RichText from 'cmp/richtext/RichText.vue'
import TreeTable from 'cmp/treetable/TreeTable.vue'
import Qrcode from 'cmp/qrcode/Qrcode.vue'
import InputDailog from 'cmp/inputdialog/InputDailog.vue'
import Alert from 'cmp/alert/Alert.vue'
import FastAddition from 'cmp/fastAddition/FastAddition.vue'
import BlockPanel from 'cmp/blockPanel/BlockPanel.vue'
import FantSwitch from 'cmp/switch/Switch.vue'
import MultilevelAddress from 'cmp/multilevelAddress/MultilevelAddress.vue'
import RankList from 'cmp/storeRank/RankList.vue'
import BlockPanelItem from 'cmp/blockPanelItem/BlockPanelItem.vue'
import InputDay from 'cmp/inputday/input-day.vue'
import InputFormat from 'cmp/inputformat/input-format.vue'
import JsonEdit from 'cmp/json-edit/JsonEdit.vue'
@Component({
    name: 'TestComponent',
    components: {
        AutoBroadcast,
        RichText,
        TreeTable,
        Qrcode,
        InputDailog,
        Alert,
        FastAddition,
        BlockPanel,
        FantSwitch,
        MultilevelAddress,
        RankList,
        BlockPanelItem,
        InputDay,
        InputFormat,
        JsonEdit
    }
})
export default class TestComponent extends Vue {
    dialogShow = false
    $refs: any
    inputNumber1 = '0.3'
    inputNumber2 = '4.98'
    inputNumber3 = '555555'
    inputNumber5 = '4.98'
    inputNumber6 = 'fff'
    selectDay = '5'
    inputNumber4 = {
        aa: '4.9'
    }
    option = {
        mode: 'code',
        indentation: 2,
        search: true,
        language: 'zh-CN'
    }
    json = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": {"a": "b", "c": "d"},
        "String": "Hello World"
    }

    columns = [
        {
            text: '事件',
            value: 'event',
            width: 200,
        },
        {
            text: 'ID',
            value: 'id',
            sortable: true
        },
        {
            text: '自定义view',
            value: 'view',
            sortable: false
        }
    ]
    broadcastArray = [
        {
            name: 'window.setInterval([function],[interval]) 设置一个定时器,并且设定了一个等待的时间[interval],当到达时间后,执行对应的方法[function],window.setInterval([function],[interval]) 设置一个定时器,并且设定了一个等待的时间[interval],当到达时间后,执行对应的方法[function],window.setInterval([function],[interval]) 设置一个定时器,并且设定了一个等待的时间[interval],当到达时间后,执行对应的方法[function]',
            uuid: 'uuid1',
            code: 'code1'
        },
        {
            name: 'name2',
            uuid: 'uuid2',
            code: 'code2'
        },
        {
            name: 'name3',
            uuid: 'uuid3',
            code: 'code3'
        }
    ]
    broadcastDoubleArray = [
        [
            {
                name: 'name11',
                uuid: 'uuid11',
                code: 'code11'
            },
            {
                name: 'name12',
                uuid: 'uuid12',
                code: 'code12'
            },
            {
                name: 'name13',
                uuid: 'uuid13',
                code: 'code13'
            }
        ],
        [
            {
                name: 'name21',
                uuid: 'uuid21',
                code: 'code21'
            },
            {
                name: 'name22',
                uuid: 'uuid22',
                code: 'code22'
            },
            {
                name: 'name23',
                uuid: 'uuid23',
                code: 'code23'
            }
        ],
        [
            {
                name: 'name31',
                uuid: 'uuid31',
                code: 'code31'
            },
            {
                name: 'name32',
                uuid: 'uuid32',
                code: 'code32'
            },
            {
                name: 'name33',
                uuid: 'uuid33',
                code: 'code33'
            }
        ]
    ]
    fastAdditionArray = [
        {
            name: 'name1',
            uuid: 'uuid1',
            code: 'code1',
            barcode: 'bar1'
        },
        {
            name: 'name2',
            uuid: 'uuid2',
            code: 'code2',
            barcode: 'bar2'
        },
        {
            name: 'name3',
            uuid: 'uuid3',
            code: 'code3',
            barcode: 'bar3'
        }
    ]
    blockPanelArray = [
        {
            name: '春花秋月',
            uuid: 'uuid1',
            code: 'code1'
        },
        {
            name: '何时了',
            uuid: 'uuid2',
            code: 'code2'
        },
        {
            name: '往事知多少',
            uuid: 'uuid3',
            code: 'code3'
        }
    ]
    editorOption = {}
    switchValue: boolean = true
    inputValue: any = null
    inputDialogShow = false
    tableData = [{
        date: '10.0',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄'
    }, {
        date: '10.3',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1517 弄'
    }, {
        date: '10.6',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1519 弄'
    }, {
        date: '10.8',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1516 弄'
    }]
    inputDialogArray = [{
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄'
    }, {
        date: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1517 弄'
    }, {
        date: '2016-05-01',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1519 弄'
    }, {
        date: '2016-05-03',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1516 弄'
    }]
    gridData = [{
        date: '2016-05-02',
        name: '王小虎111111111111111111111111111111111111111',
        address: '上海市普陀区金沙江路 1518 弄'
    }, {
        date: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1518 弄'
    }, {
        date: '2016-05-01',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1518 弄'
    }, {
        date: '2016-05-03',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1518 弄'
    }]
    tableData11 = [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
    }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
    }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
                id: 311,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
            }]
        }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }]
    }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }]

    rankList = [
        {
            uuid: '001',
            code: 'chongqin',
            name: '重庆火锅',
            score: 99,
            rank: 1,
            percent: 90
        },
        {
            uuid: '002',
            code: 'chaosan',
            name: '潮汕牛肉火锅',
            score: 88,
            rank: 2,
            percent: 70
        },
        {
            uuid: '001',
            code: 'beijing',
            name: '老北京火锅',
            score: 70,
            rank: 3,
            percent: 50
        }
    ]

    onGetSelect(ucn: any) {
        console.log(ucn)
    }
    doShowAnnotation() {
        this.$notify({
            title: '提示',
            view: MyDialog,
            viewData: {
                test: '测试'
            },
            duration: 0,
            position: 'bottom-right'
        })
    }
    onExistArray(arr: any) {
        console.log(arr)
    }
    doShowDialog() {
        this.dialogShow = true
    }
    mounted() {
        this.$nextTick(() => {
            console.log(this.$refs['date'][0].focus())
        })
    }
    onTableKeyDown(event: any, rowIndex: number, colIndex: number, row: any, column: any) {
        if (event.keyCode === 13) {
            this.$nextTick(() => {
                if (column.property === 'date') {
                    this.$refs['name'][rowIndex].focus()
                }
                if (column.property === 'name') {
                    this.$refs['address'][rowIndex].focus()
                }
                if (column.property === 'address' && this.$refs['date'][rowIndex + 1]) {
                    this.$refs['date'][rowIndex + 1].focus()
                }
            })
        }
    }
    onRichTextReady(quill: any) {
        console.log(quill)
    }
    onRichTextFocus(quill: any) {
        console.log(quill)
    }
    onRichTextBlur(quill: any) {
        console.log(quill)
    }
    doItemClick(item: any) {
        this.inputValue = item
        this.inputDialogShow = false
    }
    queryFunc() {
        console.log(this.gridData)
        return this.gridData
    }
    onTableSort(obj: any) {
        console.dir(obj)
    }
    onTableSelect(arr: any) {
        console.log(arr)
    }
    getRank(value: any) {
        console.log(value)
    }
    provinceFunc() {
        return [
            {
                uuid: 'hn',
                name: '河南省',
                code: 'henan'
            },
            {
                uuid: 'sh',
                name: '上海市',
                code: 'shanghai'
            }
        ]
    }
    cityFunc() {
        return [
            {
                uuid: 'xy',
                name: '信阳市',
                code: 'xinyang'
            },
            {
                uuid: 'zz',
                name: '郑州市',
                code: 'zhengzhou'
            }
        ]
    }
    countyFunc() {
        return [
            {
                uuid: 'sc',
                name: '商城县',
                code: 'shangcheng'
            },
            {
                uuid: 'gs',
                name: '固始县',
                code: 'gushi'
            }
        ]
    }
    villageFunc() {
        return [
            {
                uuid: 'hfq',
                name: '河凤桥乡',
                code: 'hefengqiao'
            },
            {
                uuid: 'cg',
                name: '城关乡',
                code: 'chengguan'
            }
        ]
    }
    onVisiable() {
        this.inputDialogShow = true
    }
    onInputDialogConfirm() {
        this.inputDialogShow = false
    }
    onInputDialogCancel() {
        this.inputDialogShow = false
    }
    onBeforeClose() {
        this.inputDialogShow = false
    }
    onClick(item: any) {
        console.log(item)
    }
    onFocus() {
        console.log('focus')
    }
    onBlur() {
        console.log('blur')
    }
    onStreet(value: any) {
        console.log(value)
    }
}