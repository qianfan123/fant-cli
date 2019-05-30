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
        BlockPanelItem
    }
})
export default class TestComponent extends Vue {
    dialogShow = false
    $refs: any
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
    treeTableData =  [
        {
            id: 0,
            event: '事件0',
            timeLine: 50,
            comment: '无'
        },
        {
            id: 1,
            event: '事件1',
            timeLine: 100,
            comment: '无',
            child: [
                {
                    id: 2,
                    event: '事件2',
                    timeLine: 10,
                    comment: '无'
                },
                {
                    id: 3,
                    event: '事件3',
                    timeLine: 90,
                    comment: '无',
                    child: [
                        {
                            id: 4,
                            event: '事件4',
                            timeLine: 5,
                            comment: '无'
                        },
                        {
                            id: 5,
                            event: '事件5',
                            timeLine: 10,
                            comment: '无'
                        },
                        {
                            id: 6,
                            event: '事件6',
                            timeLine: 75,
                            comment: '无',
                            child: [
                                {
                                    id: 7,
                                    event: '事件7',
                                    timeLine: 50,
                                    comment: '无',
                                    child: [
                                        {
                                            id: 71,
                                            event: '事件71',
                                            timeLine: 25,
                                            comment: 'xx'
                                        },
                                        {
                                            id: 72,
                                            event: '事件72',
                                            timeLine: 5,
                                            comment: 'xx'
                                        },
                                        {
                                            id: 73,
                                            event: '事件73',
                                            timeLine: 20,
                                            comment: 'xx'
                                        }
                                        ]
                                },
                                {
                                    id: 8,
                                    event: '事件8',
                                    timeLine: 25,
                                    comment: '无'
                                }
                                ]
                        }
                        ]
                }
            ]
        },
        {
            id: 2,
            event: '事件2',
            timeLine: 50,
            comment: '无',
            view: true
        }
    ]
    broadcastArray = [
        {
            name: 'window.setInterval([function],[interval]) 设置一个定时器,并且设定了一个等待的时间[interval],当到达时间后,执行对应的方法[function]',
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
                name: 'window.setInterval([function],[interval]) 设置一个定时器,并且设定了一个等待的时间[interval],当到达时间后,执行对应的方法[function]',
                uuid: 'uuid11',
                code: 'code11'
            },
            {
                name: 'window.setInterval([function],[interval]) 设置一个定时器,并且设定了一个等待的时间[interval],当到达时间后,执行对应的方法[function]',
                uuid: 'uuid12',
                code: 'code12'
            }
        ],
        [
            {
                name: 'window.setInterval([function],[interval]) 设置一个定时器,并且设定了一个等待的时间[interval],当到达时间后,执行对应的方法[function]',
                uuid: 'uuid21',
                code: 'code21'
            },
            {
                name: 'window.setInterval([function],[interval]) 设置一个定时器,并且设定了一个等待的时间[interval],当到达时间后,执行对应的方法[function]',
                uuid: 'uuid22',
                code: 'code22'
            }
        ],
        [
            {
                name: 'window.setInterval([function],[interval]) 设置一个定时器,并且设定了一个等待的时间[interval],当到达时间后,执行对应的方法[function]',
                uuid: 'uuid31',
                code: 'code31'
            },
            {
                name: 'window.setInterval([function],[interval]) 设置一个定时器,并且设定了一个等待的时间[interval],当到达时间后,执行对应的方法[function]',
                uuid: 'uuid32',
                code: 'code32'
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
    tableData = [{
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
            name: '重庆火锅',
            score: 99,
            rank: 1,
            percent: 90
        },
        {
            name: '潮汕牛肉火锅',
            score: 88,
            rank: 2,
            percent: 70
        },
        {
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
}