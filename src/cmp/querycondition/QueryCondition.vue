<template>
  <div class="query-condition">
    <el-row v-if="!opened" class="query-line" style="padding: 0">
      <el-col :span="16">
        <slot></slot>
      </el-col>
      <el-col :span="8" class="closed-action">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onToggle" trigger="ic-ic_xiangxia" type="link">展开</el-button>
      </el-col>
    </el-row>
    <template v-else>
      <slot name="opened"></slot>
      <el-row class="query-line">
        <el-col :span="16">
          <slot name="openedQuery"></slot>
        </el-col>
        <el-col :span="8">
          <div class="opened-action">
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset">重置</el-button>
            <el-button @click="onToggle" trigger="ic-ic_xiangshang" type="link">收起</el-button>
          </div>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script lang="ts" src="./QueryCondition.ts"/>

<style lang="scss">
  .query-condition {
    padding: 0 0px;

    .el-row {
      padding: 5px;
    }

    .query-line {
      paddinng: 5px;

      .el-row {
        padding: 0px;
      }
    }

    .closed-action {
      padding-left: 12px;
    }
    .opened-action{
      float: right;
    }
  }
</style>
