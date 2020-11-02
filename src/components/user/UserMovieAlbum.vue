<template>
    <div id="movie-album-creation">
        <h3 id="title">创建片单</h3>
        <el-form ref="form" label-width="80px">
            <el-form-item label="片单名称">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="片单描述">
                <el-input type="textarea" v-model="description"></el-input>
            </el-form-item>
            <el-form-item label="封面图片">
                <FileUpload :multiple="false" v-on:returnFileUrl="returnFileUrl"></FileUpload>
            </el-form-item>
            <el-form-item label="选择片单" >
                <a-input-search autocomplete="off" id="movie-album-item-selector" @focus="showSearchResult()" placeholder="请搜索电影" enter-button @search="onSearch" />
                <div class="search-result" @mouseleave="closeSelector()" v-if="show && search_items && search_items.length > 0">
                    <div class="movie-card" :style="getStyle(index)" @click="selectItem(item)" v-for="(item, index) in search_items">
                        <div class="movie-card-left">
                            <img class="movie-item-image" :src="item.image_url" :alt="item.title" />
                        </div>
                        <div class="movie-card-right">
                            <span class="movie-item-title">{{item.title}}</span>
                            <span class="movie-item-summary">{{item.content}}</span>
                        </div>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="已选片单">
                <div class="selector-image-region" v-if="selector_items && selector_items.length > 0">
                    <div class="selector-image-item-region" v-for="(item, index) in selector_items" :key="item.subject_id">
                        <img style="width: 100px;" :src="item.image_url" class="selector-image">
                        <img @click="deleteSelectorItem(index, item)" class="movie-item-delete-image" src="/static/icon/delete.png" alt="delete">
                    </div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    import FileUpload from "../common/file/FileUpload";

    export default {
        name: "UserMovieAlbum",
        components: {FileUpload},
        data() {
            return {
                id: null,
                name: '',
                description: '',
                search_items:[],
                show: false,
                selector_items: [],
                cover: '',
                delete_ids: []
            }
        },
        methods: {
            onSubmit() {
                let url = global_.URLS.MOVIE_ALBUM_URL;
                let album = {
                    album_id: this.id,
                    name: this.name,
                    description: this.description,
                    items: this.selector_items,
                    cover: this.cover,
                    delete_ids: this.delete_ids
                };
                this.$http.post(url, album, {
                    headers: {
                        bid: global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": localStorage.getItem("access_token")
                    }
                }).then((data) => {
                    let res = data.body;
                    if (res.code !== 200) {
                        this.$message.error("保存失败!");
                        console.log(data);
                        return;
                    }
                    this.$message('您的片单创建成功');
                    this.$router.push({path: "/"});
                });
            },
            onCancel() {
                this.$router.push({path: "/"});
            },
            onSearch(value) {
                this.globalSearch(value);
            },
            globalSearch(keywords) {
                this.$http.get(global_.URLS.GLOBAL_SEARCH_URL, {
                    params: {
                        "keywords": keywords,
                        "p": 1,
                        "count": 5
                    },
                    headers: {
                        "bid": global_.FUNC.getBid()
                    }
                }).then((data) => {
                    if (data.body.code !== 200) {
                        this.$message.error("数据获取失败!");
                        console.log(data);
                        return;
                    }
                    this.search_items = data.body.data.body;
                    if (data.body.data.body.length > 0) {
                        this.show = true;
                    }
                })
            },
            getStyle(index) {
                let i = (index - 1) * 100;
                return "top:" + i + "%";
            },
            selectItem(item) {
                for (let selector_item of this.selector_items) {
                    if (item.subject_id === selector_item.subject_id) {
                        this.$message({message: '该电影已选择', type: 'warning'});
                        return;
                    }
                }
                let index = this.selector_items.length;
                let param = {
                    subject_id: item.subject_id,
                    rank: index,
                    image_url: item.image_url
                };
                this.selector_items.push(param);
                this.show = false;
            },
            closeSelector() {
                this.show = false;
            },
            showSearchResult() {
                if (this.search_items && this.search_items.length > 0) {
                    this.show = true;
                }
            },
            deleteSelectorItem(index, item) {
                let selector_items = this.selector_items;
                for (let selector_item of selector_items) {
                    if (selector_item.subject_id === item.subject_id) {
                        selector_items.splice(index, 1);
                        this.selector_items = selector_items;
                        this.delete_ids.push(item.subject_id);
                        return;
                    }
                }
            },
            returnFileUrl(file_url) {
                this.cover = file_url;
            },
            initData() {
                let id = this.$route.params.id;
                if (!this.isRealNum(id)) {
                    return;
                }
                let url = global_.URLS.MOVIE_ALBUM_DETAIL_URL + id;
                this.$http.get(url, {
                    headers: {
                        "bid": global_.FUNC.getBid()
                    }
                }).then((data) => {
                    if (data.body.code !== 200) {
                        this.$message.error("数据获取失败!");
                        console.log(data);
                        return;
                    }
                    let result = data.body.data;
                    this.id = result.id;
                    this.name = result.name;
                    this.description = result.description;
                    this.cover = result.cover;
                    this.selector_items = result.items;
                })
            },
            isRealNum(val) {
                if (val === "" || val == null) {
                    return false;
                }
                return !isNaN(val);
            }
        },
        created() {
            this.initData();
        }
    }
</script>

<style scoped>
    @import './css/userMovieAlbum.scss';
</style>
