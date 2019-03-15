<template>
  <div class="file-uplod">
    <a-upload
      :action="getUploadUrl()"
      listType="picture-card"
      :fileList="fileList"
      :multiple="getMultiple()"
      :remove="removeFile()"
      @change="handleChange">
      <div v-if="fileList.length < 500">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
  </div>
</template>
<script>
import global_ from "./../config/Global";

const file_upload_url = global_.URLS.FILE_URL;
export default {
  data () {
    return {
      file_ids:[],
      fileList: [],
    }
  },
  methods: {
    getMultiple() {
      return true;
    },
    getUploadUrl() {
      return "https://backend.hasyou.cn/file/upload?bid=" + global_.FUNC.getBid();
    },
    removeFile(f) {
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange ({ file, fileList, event}) {
      if (file.status === "done") {
        this.file_ids.push(file.response.data[0].id);
      } else if (file.status === "removed") {
        let file_ids = [];
        this.file_ids.map((item, key) => {
          if (item !== file.response.data[0].id) {
            file_ids.push(item);
          }
        });
        this.file_ids = file_ids;
      }
      this.fileList = fileList;
      this.$emit("returnFileIds", this.file_ids);
    }
  },
  created() {
  }
}
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
