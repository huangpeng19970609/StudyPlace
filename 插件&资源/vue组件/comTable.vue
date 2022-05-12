<template>
  <div style="height: 100%">
    <el-table
      :data="tableData"
      style="width: 100%"
      :highlight-current-row="false"
      tooltip-effect="dark"
      :height="height"
      @selection-change="selectionChange"
    >
      >
      <el-table-column v-if="tableConfig.selection" type="selection">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableCol"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <!-- 可点击 -->
          <el-button
            v-if="item.isClick"
            @click="cellClick(item.prop, scope.row)"
            type="text"
            >{{
              scope.row[item.prop] == null || scope.row[item.prop] == ""
                ? "-"
                : scope.row[item.prop]
            }}</el-button
          >
          <!-- 具名插槽 -->
          <slot v-if="item.slot" :name="item.prop" :info="scope.row"></slot>
          <span v-else>{{
            scope.row[item.prop]
              ? scope.row[item.prop]
              : scope.row[item.prop] === 0
              ? 0
              : "-"
          }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="tableConfig && tableConfig.pagination"
      @current-change="changePage"
      :total="tableConfig.total"
      :page.sync="tableConfig.page"
      :limit.sync="tableConfig.limit"
    />
  </div>
</template>

<script>
export default {
  props: {
    tableCol: {
      default: () => [],
      type: Array,
    },
    tableData: {
      default: () => [],
      type: Array,
    },
    tableConfig: {
      default: () => {},
      type: Object,
    },
    height: {
      default: "32rem",
      type: String,
    },
  },
  created() {},
  data() {
    return {
      curSelectedArr: [],
    };
  },
  methods: {
    changePage(val) {
      this.tableConfig.page = val;
      this.$emit("pagination");
    },
    cellClick(prop, row) {
      this.$emit("cellClick", prop, row);
    },
    selectionChange(val) {
      this.$emit("selectionChange", val);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep ::-webkit-scrollbar {
  width: 8px;
  height: 1px;
}
::v-deep ::-webkit-scrollbar-thumb {
  /* 滑块部分 */
  border-radius: 5px;
  background-color: #dcdee0;
}
::v-deep ::-webkit-scrollbar-track {
  /* 轨道部分 */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: transparent;
  border-radius: 3px;
}
</style>