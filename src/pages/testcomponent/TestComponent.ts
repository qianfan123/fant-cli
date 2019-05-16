import { Component, Vue } from 'vue-property-decorator'
import AutoBroadcast from 'cmp/autobroadcast/AutoBroadcast.vue'
import MyDialog from 'pages/testcomponent/MyDialog.vue'
@Component({
    name: 'TestComponent',
    components: {
        AutoBroadcast
    }
})
export default class TestComponent extends Vue {
    dialogShow = false
    $refs: any
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
}