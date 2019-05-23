<template>
    <el-table
            ref="multipleTable"
            :data="formatData"
            :row-style="showRow"
            @sort-change="onSortChange"
            v-bind="$attrs">
        <el-table-column :render-header="renderHeader" width="50" align="center">
            <template slot-scope="scope">
                <el-checkbox v-model="scope.row.checks" @change="toselect(scope.row)"></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column v-if="columns.length===0" width="150">
            <template slot-scope="scope">
                <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
                <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus"/>
                    <i v-else class="el-icon-minus"/>
                </span>
                {{ scope.$index }}
            </template>
        </el-table-column>
        <el-table-column v-for="(column, index) in columns" v-else :key="column.value"
                         :sortable="column.sortable"
                         :label="column.text"
                         :width="column.width">
            <template slot-scope="scope">
                <!-- Todo -->
                <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
                <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus"/>
                    <i v-else class="el-icon-minus"/>
                </span>
                <span v-if="column.value !== 'view'">{{ scope.row[column.value] }}</span>
                <div v-if="column.value === 'view'"><slot></slot></div>
            </template>
        </el-table-column>
        <slot/>
    </el-table>
</template>

<script>
    import treeToArray from 'cmp/treetable/eval.js'
    export default {
        name: "TreeTable",
        data() {
            return {
                that: '',
                chooseson: true, //全选
                key: true //单个点击直到全部选中
            };
        },
        props: {
            /* eslint-disable */
            data: {
                type: [Array, Object],
                required: true
            },
            columns: {
                type: Array,
                default: () => []
            },
            evalFunc: Function,
            evalArgs: Array,
            expandAll: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            // 格式化数据源
            formatData: function() {
                let tmp;
                if (!Array.isArray(this.data)) {
                    tmp = [this.data];
                } else {
                    tmp = this.data;
                }
                const func = this.evalFunc || treeToArray;
                const args = this.evalArgs
                    ? [tmp, this.expandAll].concat(this.evalArgs)
                    : [tmp, this.expandAll];
                return func.apply(null, args);
            }
        },
        methods: {
            showRow: function(row) {
                const show = row.row.parent
                    ? row.row.parent._expanded && row.row.parent._show
                    : true;
                row.row._show = show;
                return show
                    ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
                    : "display:none;";
            },
            // 切换下级是否展开
            toggleExpanded: function(trIndex) {
                const record = this.formatData[trIndex];
                record._expanded = !record._expanded;
            },
            // 图标显示
            iconShow(index, record) {
                return index === 0 && record.child && record.child.length > 0;
            },

            //设置表头全选
            renderHeader(h, data) {
                return h("span", [
                    // h("input", {
                    //     attrs: {
                    //         id: "chooseall",
                    //         type: "checkbox",
                    //         style:
                    //             "border: 1px solid #dcdfe6;border-radius: 2px;box-sizing: border-box;width: 14px;height: 14px;background-color: #fff;"
                    //     }
                    // })
                    h('el-checkbox', {
                        attrs: {
                            ref: 'selectAll',
                            id: 'chooseall'
                        }
                    }),
                ]);
            },
            //功能函数:选中部分子集
            setchildtobeselect(arr, key) {
                arr.forEach((v, i) => {
                    // v.checks = key;
                    this.$set(v, 'checks', key)
                    // v._expanded = key;//选中后展开子项
                    if (v.child) {
                        this.setchildtobeselect(v.child, v.checks);
                    }
                });
                console.log(arr)
            },
            setParenttobeselect(arr) {
                let selectArr = arr.child.filter((item) => {
                    return item.checks
                })
                // 2、如果所有一级节点都选中了，则选中父级节点
                if (selectArr.length === arr.child.length) {
                    arr.checks = true
                } else {
                    arr.checks = false
                }
                if (arr.parent) {
                    this.setParenttobeselect(arr.parent)
                }
            },
            //是否所有的都被选中
            isallchecked(arr) {
                arr.forEach((v, i) => {
                    if (!v.checks) {
                        this.key = false;
                    }
                    if (v.child) {
                        this.isallchecked(v.child);
                    }
                });
            },
            //设置父级为 未选中状态（父级的父级没改变-有bug）
            setparentfalse(arr, id, level) {
                arr.forEach((v, i) => {
                    if (v._level == level - 1 && v.child) {
                        v.child.forEach((val, ind) => {
                            if (val.id == id) {
                                v.checks = false;
                                return false; //终止此次循环，减少循环次数
                            }
                        });
                    }
                    if (v.child) {
                        this.setparentfalse(v.child, id, level);
                    }
                });
            },
            //设置父级为 选中状态
            setparenttrue(arr, id, level) {
                arr.forEach((v, i) => {
                    if (v._level == level - 1 && v.child) {
                        let key = true;
                        let sameidkey = false;
                        v.child.forEach((val, ind) => {
                            if (val.id == id) {
                                //确保当前点击的在该父级内
                                sameidkey = true;
                            }
                            if (!val.checks) {
                                key = false;
                            }
                        });
                        if (key && sameidkey) {
                            v.checks = true;
                        }
                    }
                    if (v.child) {
                        this.setparentfalse(v.child, id, level);
                    }
                });
            },
            //某个复选框被点击时
            toselect(row) {
                console.log(row);
                if (row.parent) { // 有父节点
                    this.setParenttobeselect(row.parent)
                }
                if (row.child) { // 有子节点
                    if (row.checks) { // 选中
                        this.setchildtobeselect(row.child, row.checks)
                    } else { // 取消
                        this.setchildtobeselect(row.child, row.checks)
                    }
                }
                let selectAllCount = this.formatData.filter((item) => {
                    return item.checks
                })
                let chooseAll = document.getElementById("chooseall")
                if (selectAllCount.length === this.formatData.length) {
                    chooseAll.classList.add('is-checked')
                    chooseAll.setAttribute('aria-checked', true)
                    chooseAll.children[0].classList.add('is-checked')
                    chooseAll.children[0].children[1].checked = true
                } else {
                    chooseAll.classList.remove('is-checked')
                    chooseAll.setAttribute('aria-checked', false)
                    chooseAll.children[0].classList.remove('is-checked')
                    chooseAll.children[0].children[1].checked = false
                }
                this.$emit('get-select', this.formatData)
            },
            onSortChange(column) {
                this.$emit('table-sort', {
                    column: column,
                    prop: column.column ? column.column.label : '',
                    order: column.column.order === 'ascending' ? 'ASC' : 'DESC'
                })
            }
        },
        mounted() {
            this.$nextTick(() => {
                var that = this;
                const all = document.getElementById("chooseall").children[0].children[1];

                all.onchange = function(e) {
                    console.log(all.checked);
                    if (all.checked == true) {
                        that.setchildtobeselect(that.formatData, true);
                    } else {
                        that.setchildtobeselect(that.formatData, false);
                    }
                };
            });
        }
    };
</script>
<style rel="stylesheet/css">
    @keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @-webkit-keyframes treeTableShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>

<style scoped>
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 18px;
        height: 14px;
    }
    .ms-tree-space::before {
        content: "";
    }
    .processContainer {
        width: 100%;
        height: 100%;
    }
    table td {
        line-height: 26px;
    }
    .tree-ctrl {
        position: relative;
        cursor: pointer;
        color: #2196f3;
        margin-left: -18px;
    }
</style>