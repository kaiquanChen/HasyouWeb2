<template>
    <div id="book-tag">
        <div class="left"></div>
        <div class="center">
            <div class="center-left">
                <h1>图书热门标签</h1>
                <p class="ul"></p>
                <div class="tag-body">
                    <div class="parent-tag" v-for="parent in data">
                        <h3 class="parent-name">{{parent.tag_name}} · · · · · ·</h3>
                        <div class="child-tag" v-for="child in parent.children">
                            <a :href="gotoBookList(child.id)">{{child.tag_name}}</a><span>({{child.subject_count}})</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center-right"></div>
        </div>  
        <div class="right"></div>
    </div>
</template>

<script>
  import global_ from "../config/Global"

  const book_tag_url = global_.URLS.DOUBAN_BOOK_TAG_URL + "subjects/DOUBAN_BOOK";
    export default {
        name: "book",
        data() {
            return {
                data:[],
                page: {
                    total: 0,
                    page: 1,
                    count: 25
                }
            };
        },
        methods: {
            gotoBookList(id) {
                return "/book/tag/" + id;
            },
            getBookTags() {
                this.$http.get(book_tag_url, {
                    headers: {
                        "bid": global_.FUNC.getBid()
                    }
                }).then((data) => {
                    if (data.status !== 200) {
                        console.log(data);
                        alert("数据获取失败!");
                        return;
                    }
                    this.data = data.body.data;
                });
            }
        },
        created() {
            this.getBookTags();
        }
    }
</script>

<style lang="scss" scoped>
    @import './css/bookTag'
</style>
    