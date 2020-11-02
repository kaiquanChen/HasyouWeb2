<template>
    <div class="file-uplod">
        <a-upload
            :action="getUploadUrl()"
            listType="picture-card"
            :fileList="fileList"
            :multiple="getMultiple()"
            @change="handleChange"
        >
            <div v-if="fileList.length < 500 && !upload">
                <a-icon type="plus"/>
                <div class="ant-upload-text">上传</div>
            </div>
        </a-upload>
    </div>
</template>
<script>
    import global_ from "../../config/Global";

    let file_url = global_.URLS.FILE_URL;
    const file_upload_url = global_.URLS.FILE_URL;
    const token = localStorage.getItem("access_token");

    export default {
        props: ["multiple"],
        data() {
            return {
                file_ids: [],
                fileList: [],
                upload: false
            }
        },
        methods: {
            getMultiple() {
                return this.multiple;
            },
            getUploadUrl() {
                return file_url + "?bid=" + global_.FUNC.getBid() + "&X-HASYOU-TOKEN=" + token;
            },
            handleCancel() {
                this.previewVisible = false
            },
            handlePreview(file) {
                this.previewImage = file.url || file.thumbUrl;
                this.previewVisible = true;
            },
            handleChange({file, fileList, event}) {
                let file_url = "";
                if (file.status === "done") {
                    this.file_ids.push(file.response.data[0].id);
                    file_url = file.response.data[0].file_url;
                    this.upload = !this.multiple; // 用于判断是否只需要上传一张图片
                } else if (file.status === "removed") {
                    let file_ids = [];
                    this.file_ids.map((item, key) => {
                        if (item !== file.response.data[0].id) {
                            file_ids.push(item);
                        }
                    });
                    this.file_ids = file_ids;
                    if (this.upload) {
                       this.upload = false;
                    }
                }
                this.fileList = fileList;
                this.$emit("returnFileIds", this.file_ids);
                this.$emit("returnFileUrl", file_url);
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
