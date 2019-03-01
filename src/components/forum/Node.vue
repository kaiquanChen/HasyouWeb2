<template>
    <div id="node">
        <div class="node-body">
            <h3>更多节点</h3>
            <div class="pagination">
                <a-pagination simple
                    @change="handleNodeChange"
                    :pageSize="page.count" 
                    :defaultCurrent="page.page" 
                    :total="page.total" />
            </div>
            <div class="node-items">
                <a class="node-item" :href="getNodeRoutes(item.id)" v-for="item in nodes" :key="item.id">
                    {{item.title}}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
  import global_ from "../config/Global"

  const node_url = global_.URLS.NODE_URL;
    export default {
      name: "book",
      data() {
        return {
            nodes: [],
            page: {
                page: 1,
                count: 60,
                total: 0
            }
        };
      },
      methods: {
        handleNodeChange(val) {
            this.page.page = val;
            this.getNodeList();
        },
        checkMedia() {
            return window.matchMedia('(max-width:600px)').matches;
        },
        getNodeRoutes(id) {
            return "/forum/node/" + id;
        },
        getNodeList() {
            let more_node_url = node_url + "list";
            this.$http.get(more_node_url, {
                params:{
                    p:this.page.page,
                    count:this.page.count
                },
                headers: {
                    "bid": global_.FUNC.getBid()
                }
            }).then((data) => {
                if (data.status !== 200) {
                    console.log(data);
                    alert("数据获取失败!");
                    return;
                }

                this.nodes = data.body.data.body;
                this.page.page = data.body.data.page;
                this.page.total = data.body.data.total;
            });
        },
      },
      created() {
          this.getNodeList();
      }
    }
</script>

<style lang="scss" scoped>
  @import './css/node'
</style>
