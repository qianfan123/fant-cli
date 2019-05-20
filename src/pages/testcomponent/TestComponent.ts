import { Component, Vue } from 'vue-property-decorator'
import AutoBroadcast from 'cmp/autobroadcast/AutoBroadcast.vue'
import MyDialog from 'pages/testcomponent/MyDialog.vue'
import RichText from 'cmp/richtext/RichText.vue'
import TreeTable from 'cmp/treetable/TreeTable.vue'
import Qrcode from 'cmp/qrcode/Qrcode.vue'
@Component({
    name: 'TestComponent',
    components: {
        AutoBroadcast,
        RichText,
        TreeTable,
        Qrcode
    }
})
export default class TestComponent extends Vue {
    dialogShow = false
    $refs: any
    columns = [
        {
            text: '事件',
            value: 'event',
            width: 200
        },
        {
            text: 'ID',
            value: 'id'
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
    editorOption = {}
    tableData = [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
    }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
    }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
    }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }]
    onGetUcn(ucn: any) {
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
}