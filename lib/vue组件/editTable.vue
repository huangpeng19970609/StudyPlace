<template>
  <div>
    <div v-if="operatRoot && canShowOperate">
      <el-button
        v-show="isShowOperation.isShowAdd"
        size="mini"
        @click="handleTool('add')"
        type="text"
        icon="el-icon-circle-plus"
        >{{ addText }}</el-button
      >
      <el-button
        v-show="isShowOperation.isShowDel"
        size="mini"
        @click="handleTool('del')"
        type="text"
        icon="el-icon-delete"
        >删除</el-button
      >
    </div>

    <el-form :model="editTable" ref="editForm" :key="key">
      <el-table
        border
        @selection-change="selectionChange"
        class="mt10"
        :data="tableData"
      >
        <el-table-column
          v-if="canShowOperate"
          align="center"
          type="selection"
          width="110"
        ></el-table-column>
        <el-table-column label="序号" type="index" align="center" width="50">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in columnItem"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :label-class-name="item.required ? 'red-sign' : ''"
          :width="item.width ? item.width : false"
          :fixed="item.fixed ? item.fixed : false"
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="'editTableData.' + scope.$index + '.' + item.prop"
              :rules="editTable.rules[item.prop]"
            >
              <!-- 若是存在插槽，请自行处理readOnly的数据 -->
              <span v-if="!tableIsEdit && !item.slot">{{
                scope.row[item.name] || scope.row[item.prop] || "-"
              }}</span>
              <span v-else-if="!item.isEdit && !item.slot">{{
                scope.row[item.name] || scope.row[item.prop] || "-"
              }}</span>
              <el-input
                v-else-if="item.isEdit && item.type == 'input'"
                v-model="scope.row[item.prop]"
                :type="item.frameType"
                :disabled="item.disabled ? true : false"
                :placeholder="item.placeholder || '请输入'"
                @change="
                  change({
                    index: scope.$index,
                    prop: item.prop,
                    row: scope.row,
                  })
                "
                @input="
                  (val) => {
                    vaildateInput(
                      val,
                      item.vaildateType,
                      item.num,
                      scope.$index,
                      item.prop
                    );
                  }
                "
                :maxlength="item.maxlength ? item.maxlength : 999"
              ></el-input>
              <el-select
                @change="
                  change({
                    prop: item.prop,
                    row: scope.row,
                  })
                "
                v-else-if="item.isEdit && item.type == 'select'"
                v-model="scope.row[item.prop]"
                :disabled="item.disabled ? true : false"
                placeholder="请选择"
                filterable
                style="width: 90%"
              >
                <el-option
                  :disabled="item.disabled ? true : false"
                  v-for="option in item.options"
                  :key="option.dictValue"
                  :label="option.dictLabel"
                  :value="option.dictValue"
                ></el-option>
              </el-select>
              <el-date-picker
                style="width: 90%"
                :disabled="item.disabled ? true : false"
                v-else-if="item.isEdit && item.type == 'date'"
                v-model="scope.row[item.prop]"
                :value-format="item.format ? item.format : 'yyyy-MM-dd'"
                :type="item.frameType ? item.frameType : 'date'"
                placeholder="请选择"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 具名插槽 -->
            <slot v-if="item.slot" :name="item.prop" :info="scope.row"></slot>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
import utils from "./js/index";
export default {
  props: {
    addText: {
      default: "新增",
      type: String,
    },
    needDelTip: {
      //有的时候 子组件不需要父组件给出的提示，所以动态配置
      default: true,
      type: Boolean,
    },
    //   表格赋值
    editTableData: {
      default: [],
      type: Array,
    },
    // 表头数据
    columnItem: {
      default: [],
      type: Array,
    },
    // 当前table名
    curTable: {
      default: null,
      type: String,
    },
    // 当前表格操作权限
    operatRoot: {
      default: false,
      type: Boolean,
    },
    tableIsEdit: {
      default: true,
      type: Boolean,
    },
    canShowOperate: {
      default: true,
      type: Boolean,
    },
    isShowOperation: {
      default() {
        return {
          isShowAdd: true,
          isShowDel: true,
        };
      },
      type: Object,
    },
  },
  data() {
    return {
      editTable: {
        editTableData: [],
        columnItem: [],
        rules: [],
      },
      rules: {},
      chosedSelection: [],
      tableData: [],
      key: 0,
    };
  },
  created() {
    this.tableData = [...this.editTableData];
    this.createRule();
  },
  methods: {
    selectionChange(val) {
      this.chosedSelection = [...val];
      this.$emit("selectionChange", this.chosedSelection);
    },
    //   新增/删除
    handleTool(type) {
      if (type == "del" && this.needDelTip) {
        if (this.chosedSelection.length === 0) {
          this.$message({
            type: "warning",
            message: "请选择删除的数据",
          });
          return false;
        }
        this.chosedSelection.forEach((item) => {
          if (item.id) {
            this.tableData = this.tableData.filter((it) => it.id != item.id);
          } else if (item.dataId) {
            this.tableData = this.tableData.filter(
              (it) => it.dataId != item.dataId
            );
          } else if (item.curId) {
            this.tableData = this.tableData.filter(
              (it) => it.curId != item.curId
            );
          } else if (item.deleteId) {
            this.tableData = this.tableData.filter(
              (it) => it.deleteId != item.deleteId
            );
          }
        });
      }
      this.$emit("handleTool", type, this.curTable, this.tableData);
    },
    saveData() {
      let flag = false;
      this.$refs.editForm.validate((bool, obj) => {
        flag = bool;
      });
      return flag;
    },
    createRule() {
      this.columnItem.forEach((item) => {
        if (item.required) {
          this.rules[item.prop] = [];
          this.rules[item.prop].push({
            required: true,
            message: item.tip ? item.tip : "请输入" + item.label,
            trigger: "change",
          });
        }
        if (item.min && item.max) {
          this.rules[item.prop].push({
            min: item.min,
            max: item.max,
            message: item.tip || `长度在 ${item.min} 到 ${item.max} 个字符`,
            trigger: "change",
          });
        }
      });
      this.editTable = {
        editTableData: this.editTableData,
        columnItem: this.columnItem,
        rules: this.rules,
      };
    },
    vaildateInput(val, vailType, num, index, prop) {
      let value = this.editTableData[index];
      if (!vailType || !value[prop]) {
        return false;
      }
      // 只能输入字母和数字
      else if (vailType == 1) {
        let regInput1 = /[\u4e00-\u9fa5]/gi; //汉字匹配
        let regInput2 = /^[A-Za-z0-9]+$/; //数字和字母匹配
        if (regInput1.test(value[prop]) || !regInput2.test(value[prop])) {
          value[prop] = null;
        }
      }
      // 只能输入数字
      else if (vailType == 2) {
        value[prop] = value[prop].replace(/\D/g, "");
      }
      // 只能输入正数
      else if (vailType == 3) {
        let num2 = num ? Number(num) : 6;
        value[prop] = utils.formatNum(
          value[prop].toString(),
          num2
        );
      }
      // 整数
      else if (vailType == 4) {
        value[prop] = utils.formatNum(value[prop].toString());
      }
      // 数字/负数
      else if (vailType == 5) {
       value[prop] = utils.formatNum(
          value[prop].toString(),
          num,
          true
        );
      }
      this.$emit('change', {
        index,
        prop,
        row: value,
      });
    },
    // 输入监听
    change(obj) {
      this.$emit("change", obj);
    },
  },
  watch: {
    editTableData() {
      this.$set(this, "tableData", [...this.editTableData]);
      this.createRule();
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep th > .red-sign::after {
  content: "*";
  color: rgb(255, 0, 0);
}

::v-deep .el-form-item {
  margin-bottom: 0px;
}
::v-deep .el-table td,
.el-table th {
  padding: 6px 2px;
}
</style>
