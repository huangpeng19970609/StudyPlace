<!--
 * @Author: 黄鹏
 * @LastEditors: 黄鹏
 * @LastEditTime: 2021-09-22 15:17:54
-->
<template>
  <div>
    <!--        -->
    <el-upload
      ref="upload"
      :action="action"
      list-type="picture-card"
      :auto-upload="false"
      :file-list="fileList"
      :http-request="submitUpload"
      :limit="limit"
      :accept="accept"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :on-start="onStart"
      :on-change="onChange"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }" style="width: 100; height: 100%">
        <img
          v-if="showType === 0"
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        />
        <video
          v-if="showType === 1"
          class="el-upload-list__item-thumbnail"
          :src="file.url"
        ></video>
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      append-to-body
      width="70%"
    >
      <img v-if="showType === 0" :src="file && file.url" alt="" class="img" />
      <video
        v-if="showType === 1"
        controls="controls"
        :src="file && file.url"
        alt=""
        class="img"
      />
    </el-dialog>
  </div>
</template>

<script>
// 警告: 由于element-ui 并不支持批量的上传， 故重写了上传逻辑， 并且由我们自己控制
// 0 图片 1视频
import utils from "@/utils/index.js";
export default {
  props: {
    limit: {
      default: 1,
      type: Number,
    },
    url: {
      default: "",
      type: String,
    },
    fileList: {
      default: () => [],
      type: Array,
    },
    showType: {
      default: 0,
      type: Number,
    },
    action: {
      default: "",
      type: String,
    },
  },
  watch: {
    showType: {
      deep: true,
      handler: function (val) {
        this.$refs["upload"].clearFiles();
        this.$emit("remove");
      },
    },
  },
  computed: {
    accept: function () {
      if (this.showType === 0) {
        return "image/*";
      }
      if (this.showType === 1) {
        return "audio/*";
      }
    },
  },
  data() {
    return {
      dialogVisible: false,
      disabled: false,
      file: null,
    };
  },
  methods: {
    onChange(file) {
      if (!file || !file.raw) return;
      // 图片
      let text = "";
      switch (this.showType) {
        case 0:
          if (file.raw.type.indexOf("image") === -1) {
            text = "图像";
          }
          break;
        case 1:
          if (file.raw.type.indexOf("audio") === -1) {
            text = "视频";
          }
          break;
      }
      if (!!text) {
        this.$message.warning('您上传的文件格式并非是' + text);
        this.clear();
      }
    },
    onStart(file) {
    },
    onProgress(file) {
      return false;
    },
    beforeUpload(file) {
      return false;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    clear() {
      this.$refs["upload"].clearFiles();
    },
    handleRemove(file) {
      let fileList = this.$refs.upload.fileList;
      let index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      fileList.splice(index, 1);
      this.$emit("remove", file);
    },
    handlePictureCardPreview(file) {
      this.dialogVisible = true;
      this.file = file;
    },
    handleDownload(file) {
      downloadFile(file.url);
      function downloadFile(url) {
        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", url);
        a.setAttribute("target", "_blank");
        let clickEvent = document.createEvent("MouseEvents");
        clickEvent.initEvent("click", true, true);
        a.dispatchEvent(clickEvent);
      }
    },
    getFiles() {
      let { uploadFiles } = this.$refs.upload;
      return uploadFiles;
    },
    // 文件上传处理
    submitUpload(data) {
      var p = new Promise((resolve, reject) => {
        let { uploadFiles, action } = this.$refs.upload;
        utils.uploadFiles({
          uploadFiles,
          action,
          data,
          success: (response) => {
            resolve(response);
          },
          error: (error) => {
            reject();
          },
        });
      });

      return p;
    },
  },
};
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: 100%;
}
</style>