<template>
    <div id="forums">
        <div class="left">
            <h1>有你论坛</h1>
            <div class="forums-body">
                <el-tabs id="v2-tabs"
                         v-model="activeName"
                         @tab-click="handleClick">
                    <el-tab-pane
                        :label="node.title"
                        :name="node.name"
                        v-for="node in home_nodes"
                        :key="node.id">
                    </el-tab-pane>
                </el-tabs>
                <div class="post-items">
                    <div class="post-item" v-for="item in posts.body" :key="item.id">
                        <div class="avatar">
                            <a target="_blank" :href="item.member.avatar_normal">
                                <img :src="item.member.avatar_normal" :alt="item.member.username">
                            </a>
                        </div>
                        <div class="post-content">
                            <span class="post-content-top">
                                <a class="post-title" target="_blank" :href="getPostRoutes(item.id)">{{item.title}}</a>
                            </span>
                            <span class="post-info" v-if="checkMedia()">
                                <a :href="getNodeRoutes(item.node.id)" class="post-node">{{item.node.title}}</a>&nbsp;•&nbsp;
                                <a href="javascript:void(0);"
                                   class="post-creator"><strong>{{item.member.username}}</strong></a>&nbsp;•&nbsp;
                                <span class="post-time">{{item.create_time}}</span>
                            </span>
                            <span class="post-info" v-else>
                                <a :href="getNodeRoutes(item.node.id)" class="post-node">{{item.node.title}}</a>&emsp;•&emsp;
                                <a href="javascript:void(0);"
                                   class="post-creator"><strong>{{item.member.username}}</strong></a>&emsp;•&emsp;
                                <span class="post-time">{{item.create_time}}</span>
                            </span>
                        </div>
                        <div class="comment-count">
                            <span class="post-comment-count">{{item.comment_count}}</span>
                        </div>
                    </div>
                    <div class="pagination">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :page-size="posts.page.count"
                            :small="checkMedia()"
                            layout="prev, pager, next"
                            :total="posts.page.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <Node></Node>
        </div>
    </div>
</template>

<script>
    import global_ from "../config/Global"
    import Node from "./Node"

    const post_url = global_.URLS.POST_URL;
    const node_url = global_.URLS.NODE_URL;
    export default {
        name: "forums",
        data() {
            return {
                activeName: 'LATEST',
                label: "LATEST",
                posts: {
                    body: [],
                    page: {
                        total: 0,
                        page: 1,
                        count: 20
                    }
                },
                home_nodes: [],
            }
        },
        components: {Node},
        methods: {
            handleCurrentChange(val) {
                this.posts.page.page = val;
                this.getPostList(this.activeName)
            },
            handleClick(tab, event) {
                if (this.activeName === this.label) {
                    return;
                }
                if (this.activeName === 'HOT' || this.activeName === 'LATEST') {
                    this.posts.page.page = 1;
                    this.label = this.activeName;
                    this.getPostList(this.label);
                    return;
                }
                for (let node of this.home_nodes) {
                    if (node.name === this.activeName) {
                        this.posts.page.page = 1;
                        this.label = this.activeName;
                        this.getPostList(node.id);
                        return;
                    }
                }
            },
            checkMedia() {
                return window.matchMedia('(max-width:600px)').matches;
            },
            getPostRoutes(id) {
                return "/forum/subject/" + id;
            },
            getNodeRoutes(id) {
                return "/forum/node/" + id;
            },
            getNodeList() {
                let node_home_url = node_url + "home";
                this.$http.get(node_home_url, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.home_nodes = data.body.data;
                    if (this.home_nodes.length !== 0) {
                        this.activeName = this.home_nodes[0].name;
                    }
                });
            },
            getPostList(type) {
                let url = post_url + "subjects";
                let param = {
                    type: type,
                    p: this.posts.page.page,
                    count: this.posts.page.count
                };
                if (type !== 'HOT' && type !== 'LATEST') {
                    url = post_url + "subjects/" + type;
                }
                this.$http.get(url, {
                    params: param,
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": sessionStorage.getItem("access_token")
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }

                    this.posts.body = data.body.data.body;
                    this.posts.page.total = data.body.data.total;
                    this.posts.page.page = data.body.data.page;
                    this.posts.page.count = data.body.data.count;
                });
            }
        },
        created() {
            this.getPostList(this.activeName);
            this.getNodeList();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/forums'
</style>
