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
                    v-for="shared_user in shared_users"
                    size="medium"
                    @close="deleteSharedUser(shared_user)"
                    :key="shared_user.nickname"
                    closable>
                    {{shared_user.nickname}}
                </el-tag><br/>
                <div class="doc-user-selector">
                    <a-input-search autocomplete="off" v-model="keywords" id="doc-share-item-selector" placeholder="请输入共享用户" enter-button @search="searchUserList()" />
                    <div class="search-result"
                         v-if="select_users && select_users.length > 0">
                        <div class="select-user-card" :style="getStyle(index)" @click="selectItem(item)" v-for="(item, index) in select_users">
                            <div class="select-user-card-left">
                                <img class="user-item-image" :src="item.avatar" :alt="item.title" />
                            </div>
                            <div class="select-user-card-right">
                                <span class="user-item-title">{{item.nickname}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="album-btn">
                    <span class="btn-save" @click="saveSharedUsers()">保存</span>
                    <span class="btn-cancel" @click="hideModal('share_show')">取消</span>
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
    const note_share_list_url = global_.URLS.NOTE_SHARE_LIST_URL;
    const note_share_save_url = global_.URLS.NOTE_SHARE_SAVE_URL;
    const user_search_url = global_.URLS.USER_SEARCH_URL;
    const token = localStorage.getItem("access_token");
    export default {
        name: "book",
        data() {
            return {
                keywords: "",
                shared_users:[],
                select_users:[],
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
            getStyle(index) {
                let i = (index - 1) * 100;
                return "top:" + i + "%";
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
                        }
                    })
                    this.$message.success("操作成功!");
                    this.hideModal('pop_show');
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
            getShareNoteList() {
                this.$http.get(note_share_list_url, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    },
                    params: {
                        noteId: this.select_tag.id
                    }
                }).then(data => {
                    if (data.body.code !== 200) {
                        this.$message.error("获取数据失败！");
                        return;
                    }
                    this.shared_users = data.body.data;
                });
            },
            deleteSharedUser(delete_item) {
                this.shared_users.map((item, index) => {
                    if (item.id === delete_item.id) {
                        this.shared_users.splice(index, 1);
                    }
                });
            },
            saveSharedUsers() {
                this.$http.post(note_share_save_url, {
                    note_id: this.select_tag.id,
                    share_user_ids: this.getSharedUserIds()
                }, {
                    headers: {
                        bid: global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    },
                }).then(data => {
                    if (data.body.code !== 200) {
                        this.$message.error("笔记共享操作失败！");
                    }
                    this.$message.success("文档共享功能!");
                    this.hideModal("share_show");
                });
            },
            getSharedUserIds() {
                let user_ids = [];
                for (let user of this.shared_users) {
                    user_ids.push(user.id);
                }
                return user_ids;
            },
            searchUserList() {
                this.$http.get(user_search_url, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": token
                    },
                    params: {
                        count: 15,
                        keywords: this.keywords
                    }
                }).then(data => {
                    if (data.body.code !== 200) {
                        this.$message.error("获取数据失败！");
                        return;
                    }
                    this.select_users = data.body.data;
                });
            },
            selectItem(item) {
                let shared_users = this.shared_users;
                let add = true;
                shared_users.map((user, index) => {
                    if (user.id === item.id) {
                        add = false;
                        this.$message.warning("当前用户已添加。")
                    }
                })
                if (add) {
                    shared_users.push(item);
                    this.shared_users = shared_users;
                }
                let select_users = this.select_users;
                select_users.map((user, index) => {
                    if (user.id === item.id) {
                        select_users.splice(index, 1);
                    }
                })
                this.select_users = select_users;
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
                    if (response) {
                        this.getShareNoteList();
                    }
                });
            }
        },
        mounted() {
            this.checkUserStatus();
            this.getUserInfo();
            this.getNotes();
            this.getMessage();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/userNotes.scss';
</style>
