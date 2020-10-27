<template>
    <div id="edit-note">
        <div class="note-header">
            <input class="note-title" type="text" v-model="note.title" placeholder="输入文章标题...">
            <el-checkbox class="permission" @change="onChange" size="medium" :value="!note.is_private">公开</el-checkbox>
            <el-select
                class="select-tag"
                v-model="note.tag_name"
                filterable
                size="medium"
                allow-create
                default-first-option
                placeholder="请选择文章标签">
                <el-option
                    v-for="(item, index) in tag_list"
                    :key="index"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
            <el-button @click="save" class="btn save-btn" type="primary">提交</el-button>
            <el-button @click="cancel" class="btn cancel-btn" type="info">取消</el-button>
        </div>
        <mavon-editor
            ref=md
            v-model="note.content"
            :style="getBrowserHeight()"
            @save="saveEvent"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
            id="edit-markdown"
            :ishljs="true">
        </mavon-editor>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import Bus from "../../js/bus"

    const note_url = global_.URLS.NOTE_URL;
    const upload_url = global_.URLS.FILE_URL;
    const note_save_url = global_.URLS.NOTE_SAVE_URL;
    const token = localStorage.getItem("access_token");
    export default {
        name: "note",
        data() {
            return {
                user: {},
                note: {
                    id: null,
                    title: "",
                    content: "",
                    html_content: "",
                    tag_name: "",
                    is_private: true,
                    file_ids: []
                },
                tag_list: []
            };
        },
        mounted() {
        },
        methods: {
            onChange() {
                this.note.is_private = !this.note.is_private;
            },
            getBrowserHeight() {
                let h = document.documentElement.clientHeight;
                return "height: " + (h - 63) + "px";
            },
            checkUserState() {
                let token = localStorage.getItem("access_token");
                if (!token) {
                    this.$router.push({path: "/login"});
                } else {
                    let user_json = localStorage.getItem("user_info");
                    this.user = JSON.parse(user_json);
                }
            },
            getNoteTags() {
                this.$http.get(note_url + "tags", {
                    headers: {
                        bid: global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    let res = data.body;
                    if (res.code !== 200) {
                        this.$message.error("数据获取失败!");
                        console.log(data);
                        return;
                    }
                    this.tag_list = res.data;
                });
            },
            saveEvent(value, render) {
                this.note.content = value;
                this.note.html_content = render;
                this.save()
            },
            cancel() {
                this.$router.push({path: "/user/" + this.user.id + "/notes"});
            },
            save() {
                if (!this.checkParams()) {
                    return;
                }

                this.$http.post(note_save_url, {
                    body: {
                        id: this.note.id,
                        title: this.note.title,
                        content: this.note.content,
                        html_content: this.note.html_content,
                        is_private: this.note.is_private === false ? 0 : 1,
                        tag_name: this.note.tag_name,
                        type: "NOTE"
                    }
                }, {
                    headers: {
                        bid: global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then((data) => {
                    let res = data.body;
                    if (res.code !== 200) {
                        this.$message.error("保存失败!");
                        console.log(data);
                        return;
                    }
                    this.$message({
                        message: '保存成功!',
                        type: 'success'
                    });
                    this.note = res.data;
                    if (res.data.is_private === 1) {
                        this.note.is_private = true;
                    } else if (res.data.is_private === 0) {
                        this.note.is_private = false;
                    }
                });
            },
            $imgAdd(pos, $file) {
                let formData = new FormData();
                formData.append("file", $file);
                formData.append("key", this.user.nickname + "/");
                let options = {
                    url: upload_url,
                    data: formData,
                    method: "post",
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                };
                axios(options).then((res) => {
                    if (res.data.code === 200) {
                        let fly_file = res.data.data[0];
                        this.$refs.md.$img2Url(pos, fly_file["file_url"]);
                        this.note.file_ids.push(fly_file.id);
                    }
                });
            },
            $imgDel(pos) {
                // delete
            },
            checkParams() {
                if (!this.note.title) {
                    this.$message.error("文章标题不能为空!");
                    return false;
                }

                if (!this.note.content) {
                    this.$message.error("文章内容不能为空!");
                    return false;
                }

                if (!this.note.tag_name) {
                    this.$message.error("文章标签不能为空!");
                    return false;
                }

                return true;
            },
            getUserInfo() {
                let user_info = localStorage.getItem("user_info");
                if (user_info) {
                    this.user = JSON.parse(user_info);
                } else {
                    this.$router.push({path: "/login"});
                }
            },
            getNote() {
                this.note.id = this.$route.query.id;
                if (this.note.id) {
                    this.$http.get(note_url + "subject/" + this.note.id, {
                        headers: {
                            bid: global_.FUNC.getBid(),
                            "X-HASYOU-TOKEN": token
                        }
                    }).then((data) => {
                        let res = data.body;
                        if (res.code === 200) {
                            this.note = res.data;
                            if (res.data.is_private === 0) {
                                this.note.is_private = false;
                            } else {
                                this.note.is_private = true;
                            }
                        }
                    });
                }
            }
        },
        created() {
            this.getNoteTags();
            this.getUserInfo();
            this.getNote();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/editNote'
</style>
