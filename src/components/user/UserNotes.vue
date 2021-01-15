<template>
    <div id="user-note">
        <h1>我的笔记 {{getTitle()}}
            <span class="photos-btn-pic">
                <a target="_blank" class="lnk-create" href="/note/edit"><i>+</i>写笔记</a>
            </span>
        </h1>
        <NoteList v-bind:notes="notes" v-bind:user="user" v-bind:page="page"></NoteList>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :page-size="page.count"
                :total="page.total">
            </el-pagination>
        </div>
        <div class="pop-container" v-show="pop_show">
            <div class="container">
                <img @click="hideModal('pop_show')" class="hide-icon" src="/static/icon/hide-modal.png" alt="delete">
                <label>标签</label>
                <input type="text" class="tag-name" v-model="select_tag.tag_name">
                <div class="album-btn">
                    <span class="btn-save" @click="save()">保存</span>
                    <span class="btn-cancel" @click="hideModal()">取消</span>
                </div>
            </div>
        </div>
        <div class="pop-share-container" v-show="share_show">
            <div class="container">
                <img @click="hideModal('share_show')" class="hide-icon" src="/static/icon/hide-modal.png" alt="delete">
                <el-tag
                    style="margin-left: 10px;margin-bottom: 20px"
                    v-for="tag in tags"
                    :key="tag.name"
                    closable
                    :type="tag.type">
                    {{tag.name}}
                </el-tag><br/>
                <label>共享用户</label>
                <el-select v-model="value" filterable placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="album-btn">
                    <span class="btn-save" @click="save()">保存</span>
                    <span class="btn-cancel" @click="hideModal()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import NoteOperate from "./NoteOperate";
    import Bus from "../../js/bus"
    import NoteList from "./NoteList";

    const note_url = global_.URLS.NOTE_URL;
    const note_update_url = global_.URLS.NOTE_UPDATE_URL;
    const token = localStorage.getItem("access_token");
    export default {
        name: "book",
        data() {
            return {
                tags: [
                    { name: '标签一', type: '' },
                    { name: '标签二', type: 'success' },
                    { name: '标签三', type: 'info' },
                    { name: '标签四', type: 'warning' },
                    { name: '标签四', type: 'warning' },
                    { name: '标签四', type: 'warning' },
                    { name: '标签四', type: 'warning' },
                    { name: '标签五', type: 'danger' }
                ],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                title: "",
                user: {},
                notes: [],
                page: {
                    page: 1,
                    count: 20,
                    total: 0
                },
                pop_show: false,
                share_show: false,
                select_tag: {}
            };
        },
        components: {NoteOperate, NoteList},
        methods: {
            getTitle(title) {
                if (title) {
                    return " - " + title;
                } else {
                    return "";
                }
            },
            handleCurrentChange(val) {
                this.page.page = val;
                this.getNotes();
            },
            save() {
                this.$http.post(note_update_url, {
                    body: {
                        id: this.select_tag.id,
                        tag_name: this.select_tag.tag_name
                    }
                }, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then(data => {
                    let res = data.body;
                    if (res.code === 5006) {
                        this.error_message = "账号或密码错误!";
                        return;
                    }

                    if (res.code === 5001) {
                        this.$router.push({path: "/register"});
                        return;
                    }
                    this.notes.map((item, key) => {
                        if (item.id === res.data.id) {
                            this.notes[key] = res.data;
                            return;
                        }
                    })
                    this.$message.success("操作成功!");
                    this.hideModal();
                });
            },
            hideModal(val) {
                if (val === 'pop_show') {
                    this.pop_show = !this.pop_show;
                } else {
                    this.share_show = !this.share_show;
                }
                Bus.$emit("popover-show", false);
            },
            checkUserStatus() {
                if (!token) {
                    this.$router.push({path: "/login"});
                }
            },
            getUserInfo() {
                let user_info = localStorage.getItem("user_info");
                if (user_info) {
                    this.user = JSON.parse(user_info);
                } else {
                    this.$router.push({path: "/login"});
                }
            },
            getNotes() {
                this.$http.get(note_url + "subjects", {
                    params: {
                        type: "NOTE",
                        tag_name: this.title,
                        p: this.page.page,
                        count: this.page.count
                    },
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then(data => {
                    this.notes = data.body.data.body;
                    this.page.page = data.body.data.page;
                    this.page.count = data.body.data.count;
                    this.page.total = data.body.data.total;
                });
            },
            deleteNote() {
                this.$http.get(note_url + "subject/delete/" + this.select_tag.id, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    }
                }).then(data => {
                    if (data.body.code !== 200) {
                        this.$message.error("删除失败！");
                        return;
                    }
                    this.$message.success("删除成功!");
                    this.diffNote();
                });
            },
            diffNote() {
                let notes = this.notes;
                notes.map((item, index) => {
                    if (item.id === this.select_tag.id) {
                        notes.splice(index, 1);
                    }
                });
                this.notes = notes;
            },
            getMessage() {
                Bus.$on("edit-tag-name", response => {
                    this.pop_show = response;
                });

                Bus.$on("goto-note-tag", response => {
                    this.title = response;
                    this.getNotes();
                });

                Bus.$on("select-tag", response => {
                    this.select_tag = response;
                });

                Bus.$on("note-edit", response => {
                    this.$router.push({path: "/note/edit?id=" + this.select_tag.id});
                });

                Bus.$on("note-detail", response => {
                    this.$router.push({path: "/note/subject/" + this.select_tag.id});
                });

                Bus.$on("note-delete", response => {
                    this.deleteNote();
                });

                Bus.$on("note-share", response => {
                    this.share_show = response;
                });
            }
        },
        created() {
            this.checkUserStatus();
            this.getUserInfo();
            this.getNotes();
            this.getMessage();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/userNotes.scss'
</style>
