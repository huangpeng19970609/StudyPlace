<template>
  <div>
    <el-form
      class="comform"
      :model="formData"
      :rules="comRules"
      ref="ruleForm"
      :inline="isInline"
      :label-width="labelWidth"
    >
      <el-form-item
        v-for="(item, index) in realColumnItem"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :style="`width:${item.width}`"
        :class="defaultStyle(item)"
      >
        <el-tooltip
          :disabled="!item.hasTip"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <!-- 一旦给与 item.notReadOnly 便不会渲染 -->
          <div slot="content">{{ formData[item.name] || "-" }}</div>

          <slot v-if="!isEdit && item.slot" :name="item.prop"></slot>
          <slot v-if="item.formEleSlot" :name="item.prop"></slot>
          <span v-if="!isEdit">{{ formData[item.prop] || "-" }}</span>
          <el-input
            :clearable="item.noClear ? false : true"
            :style="{ width: item.addIcon ? 'calc(100% - 30px)' : '100%' }"
            :disabled="item.readonly"
            v-if="item.type == 'input' && isEdit"
            :placeholder="item.tip"
            v-model="formData[item.prop]"
            :type="item.inputType"
            :rows="item.inputType === 'textarea' ? item.rows : ''"
            :maxlength="item.maxlength ? item.maxlength : 999"
            :show-word-limit="item.showWorldLimit ? true : false"
            :resize="item.resize ? item.resize : 'none'"
            @change="changeSelect(item.prop, item.label)"
            @blur="vaildateInput(item.prop, item.vaildateType, item.num)"
            @keyup.native="
              vaildateInput(item.prop, item.vaildateType, item.num)
            "
          >
            <template
              v-if="item.inputSlot"
              :slot="item.slotPosition ? item.slotPosition : 'prepend'"
              >{{ item.slotValue }}</template
            >
          </el-input>
          <el-select
            :ref="item.prop"
            clearable
            :style="{ width: item.addIcon ? 'calc(100% - 30px)' : '100%' }"
            v-else-if="item.type == 'select' && isEdit"
            :disabled="item.readonly"
            v-model="formData[item.prop]"
            :placeholder="item.tip"
            :multiple="item.isMultiple"
            :filterable="
              item.filterable ||
              (item.options && item.options.length > 5) ||
              customizeFilterableFlag
                ? true
                : false
            "
            @change="changeSelect(item.prop, item.label)"
            :collapse-tags="item.noCollapse ? false : true"
          >
            <el-option
              v-for="(it, index) in item.options"
              :key="index"
              :label="it.dictLabel"
              :value="it.dictValue"
            ></el-option>
          </el-select>
          <el-cascader
            v-else-if="item.type == 'cascader' && isEdit"
            :collapse-tags="item.collapseTags"
            :disabled="!item.power"
            :placeholder="item.tip"
            v-model="formData[item.prop]"
            :options.sync="item.options"
            :show-all-levels="!item.noShowLevels ? item.noShowLevels : true"
            filterable
            clearable
            style="width: 100%"
            :props="item.defaultProps"
            ref="cascaderData"
            @change="changeSelect(item.prop, item.label)"
          ></el-cascader>
          <el-radio-group
            v-model="formData[item.prop]"
            v-else-if="item.type == 'radio' && isEdit"
          >
            <el-radio
              clearable
              :disabled="!item.power"
              v-for="it in item.options"
              :key="it.dictValue"
              :label="it.dictValue"
              >{{ it.dictLabel }}</el-radio
            >
          </el-radio-group>
          <el-input
            :style="{ width: item.addIcon ? 'calc(100% - 30px)' : '100%' }"
            :disabled="true"
            v-else-if="item.type === 'disabledInput'"
            :placeholder="item.tip"
            v-model="formData[item.prop]"
          >
          </el-input>
          <el-date-picker
            clearable
            :disabled="!item.power"
            v-else-if="item.type == 'date' && isEdit"
            v-model="formData[item.prop]"
            :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
            :type="item.dateType"
            :placeholder="item.tip"
            :start-placeholder="
              item.dateType == 'datetimerange' ? '开始日期' : ''
            "
            :end-placeholder="
              item.dateType == 'datetimerange' ? '结束日期' : ''
            "
            :picker-options="item.pickerOptions ? item.pickerOptions : ''"
            @change="changeSelect(item.prop, item.label)"
          ></el-date-picker>
          <div
            class="playWrap"
            :class="{ disabled: !item.power }"
            v-else-if="item.type == 'playSelect' && isEdit"
            :style="{ width: item.addIcon ? 'calc(100% - 30px)' : '100%' }"
          >
            <div
              class="playItem"
              v-for="(it, index) in item.options"
              :key="index"
            >
              {{ it.dictLabel }}
              <el-button
                v-if="item.power && isEdit"
                @click="delItem(it.dictValue, item.options)"
                type="text"
                icon="el-icon-error"
              ></el-button>
            </div>
          </div>
        </el-tooltip>
        <el-button
          @click="addFunc(item.prop)"
          type="text"
          class="addIcon"
          icon="el-icon-circle-plus-outline"
          v-if="item.power && item.addIcon && isEdit"
        ></el-button>
        <!-- <el-button
          @click="addFunc(item.prop)"
          type="text"
          class="addIcon iconfont com-edit-d"
          v-if="item.power && item.addIcon &&isEdit"
        ></el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import utils from "@/utils/index.js";
export default {
  props: {
    // 是否行内表单
    isInline: {
      default: true,
      type: Boolean,
    },
    // 编辑还是查看
    isEdit: {
      default: true,
      type: Boolean,
    },
    // 表单验证
    rules: {
      default() {
        return {};
      },
      type: Object,
    },
    // 表单元素
    columnItem: {
      default: [],
      type: Array,
    },
    // 表单数据
    formData: {
      default: {},
      type: Object,
    },
    labelWidth: {
      default: "140px",
      type: String,
    },
    needAutoCreateRules: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    defaultStyle(item) {
      return (item) => {
        return "defaultWidth";
      };
    },
    realColumnItem() {
      return this.columnItem.filter((item) => {
        return !item.disabled;
      });
    },
  },
  data() {
    return {
      cascaderKey: 0,
      selectedStaffKey: 0,
      comRules: {},
      customizeFilterableFlag: false, //用来判断是否自定义搜索  因为清空的时候下拉没数据可能就不让编辑搜索了，这边为了能还原下拉的数据
    };
  },
  created() {
    // 父组件中未定义效验规则
    if (this.needAutoCreateRules) {
      this.columnItem.map((item) => {
        var temp = {};
        let prop = item.prop;
        temp[prop] = [];
        if (item.required) {
          temp[prop].push({
            required: true,
            message: item.tip || "请填写" + item.label,
            trigger: "change",
          });
        }
        if (item.min && item.max) {
          temp[prop].push({
            min: item.min,
            max: item.max,
            message: item.tip || `长度在 ${min} 到 ${max} 个字符`,
            trigger: "change",
          });
        }
        this.rules = Object.assign(this.rules, temp);
      });
    }
    if (this.rules) {
      this.comRules = { ...this.rules };
    }
    // 给select的options中赋值
    this.autoCreateOptions();
  },
  mounted() {},
  methods: {
    autoCreateOptions() {
      this.columnItem.map((item, index) => {
        if (item.type === "select" && item.url) {
          if (item.isDict) {
            this.getDicts(item.url).then((res) => {
              this.columnItem[index].options = [...res.data];
              return;
            });
          }
          if (!item.isDict) {
            let axiosObj = {};
            axiosObj = {
              url: item.url,
              params: item.params || {},
            };
            if (item.postType === "post") {
              axiosObj.method = "POST";
            } else {
              axiosObj.paramsType = 1;
            }
            this.$axios(axiosObj).then((res) => {
              // 若给与name与id，则需要手动将其转换
              if (item.itemName && item.id) {
                this.columnItem[index].options = res.data.map((_item) => {
                  _item["dictLabel"] = _item[item.itemName];
                  _item["dictValue"] = _item[item.id];
                  return _item;
                });
              } else {
                this.columnItem[index].options = res.data;
              }
            });
          }
        }
      });
    },
    saveData() {
      let bool = false;
      this.$refs.ruleForm.validate((valid) => {
        bool = valid;
      });
      return bool;
    },
    changeSelect(prop, label) {
      this.$emit("changeSelect", prop, label);
    },
    // 添加事件icon点击
    addFunc(prop) {
      this.$emit("addFunc", prop);
    },
    // 删除事件
    delItem(id, data) {
      this.$emit("delItem", id);
    },
    // 	移除该表单项的校验结果
    clearValidate() {
      this.$refs.ruleForm.clearValidate();
    },
    vaildateInput(prop, vailType, num) {
      if (!vailType || !this.formData[prop]) {
        return false;
      }
      // 只能输入字母和数字
      if (vailType === 1) {
        let regInput1 = /[\u4e00-\u9fa5]/gi; //汉字匹配
        let regInput2 = /^[A-Za-z0-9]+$/; //数字和字母匹配
        if (
          regInput1.test(this.formData[prop]) ||
          !regInput2.test(this.formData[prop])
        ) {
          this.formData[prop] = null;
        }
        return false;
      }
      // 只能输入数字
      if (vailType === 2) {
        let regInput2 = /\D/; //非数字匹配
        if (this.formData[prop] && this.formData[prop != ""]) {
          if (regInput2.test(this.formData[prop])) {
            this.formData[prop] = null;
          }
        }
        return false;
      }
      // 只能输入正数
      if (vailType === 3) {
        let num2 = num ? Number(num) : 6;
        this.formData[prop] = utils.formatNum(
          this.formData[prop].toString(),
          num2
        );
        return false;
      }
      // 整数
      if (vailType === 4) {
        this.formData[prop] = utils.formatNum(this.formData[prop].toString());
      }
      // 数字/负数
      if (vailType === 5) {
        this.formData[prop] = utils.formatNum(
          this.formData[prop].toString(),
          num,
          true
        );
      }
    },
  },
  watch: {
    isEdit() {
      if (!this.isEdit) {
        this.comRules = {};
        this.columnItem.forEach((item) => {
          if (!item.notReadLabel) {
            item.label =
              item.label && item.label != "" ? item.label + "：" : item.label;
          }
        });
      }
    },
    formData: {
      handler() {
        this.$forceUpdate();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
.comform {
  .mobileStyleLabel {
    display: block !important;
  }
  @media screen and (max-width: 480px) {
    .defaultWidth {
      width: 100% !important;
    }
  }
  .el-form {
    font-size: 0;
  }
  .el-form--inline .el-form-item {
    margin-right: 0;
  }
  .el-form-item {
    min-width: 30%;
    margin-right: 0;
  }
  .el-form-item__content {
    width: calc(100% - 140px) !important;
    min-width: 140px;
    .el-select--medium,
    .el-input--medium,
    .el-date-editor--datetimerange.el-input__inner {
      width: 100%;
    }
  }
  .defaultWidth {
    min-width: 30%;
  }
  .addIcon {
    font-size: 22px;
    padding: 0;
    vertical-align: middle;
  }
  .playWrap {
    width: 100%;
    border: 1px solid #dcdfe6;
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    padding: 0 15px;
    border-radius: 4px;
    overflow: hidden;
    &.disabled {
      color: #999;
      background: #eee;
      border-color: #999;
    }
    &:hover {
      min-height: 30px;
      height: auto;
      overflow: auto;
    }
    .playItem {
      background: #f5f5f5;
      border: 1px solid #dddddd;
      border-radius: 2px;
      display: inline-block;
      height: 24px;
      line-height: 24px;
      padding: 0 2px;
      margin-right: 5px;
      .el-button {
        padding: 0;
        color: #999;
      }
    }
  }
  // .el-form-item.is-error .playWrap{
  // color: ;
  // }
}
.floatBtns {
  left: 0;
  position: fixed;
  bottom: 0px;
  z-index: 999;
  width: 100%;
  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.6);
  .el-button--mini {
    width: 80px;
    height: 34px;
    font-size: 14px;
  }
  .el-button--medium {
    height: 34px;
    font-size: 14px;
  }
}
.floatHeight {
  width: 100%;
  height: 50px;
}
.page-title {
  padding: 10px;
}
.matrialTitle {
  width: 100%;
  text-align: center;
  font-size: 28px;
  padding: 10px 0 0;
}
</style>
