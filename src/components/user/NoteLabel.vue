<template>
    <div class="note-label-container">
        <h3>笔记分类</h3>
        <el-tree
            style="color: #666666"
            :data="data"
            node-key="id"
            :default-expand-all=true
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag">
        </el-tree>
    </div>
</template>

<script>
    import global_ from "../config/Global";
    const note_label_tree = global_.URLS.NOTE_LABEL_TREE_URL;
    const note_label_save = global_.URLS.NOTE_LABEL_SAVE_URL;

    export default {
        data() {
            return {
                token: null,
                user: null,
                data: null,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            getNoteLabelTrees() {
                this.$http.get(note_label_tree, {
                    headers: {
                        "bid": global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": this.token
                    }
                }).then((data) => {
                    let response = data.body;
                    if (response.code !== 200) {
                        this.$message.error("标签树结构获取失败");
                        return;
                    }
                    this.data = response.data;
                });
            },
            initToken() {
                this.token = localStorage.getItem("access_token");
                if (!this.token) {
                    return;
                }
                let user = global_.FUNC.getUserInfo();
                this.self = this.user && this.user.uid === user.uid
            },
            handleDragStart(node, ev) {
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log(draggingNode.label);
                if (draggingNode.id === dropNode.id) {
                    this.$message.warning("父级标签不能是自己！");
                    return;
                }
                // 修改分类的上级组织
                this.$http.post(note_label_save, {
                    id: draggingNode.id,
                    name: draggingNode.label,
                    parent_id: dropNode.id
                }, {
                    headers: {
                        bid: global_.FUNC.getBid(),
                        "X-HASYOU-TOKEN": this.token
                    }
                }).then((data) => {
                    let res = data.body;
                    if (res.code !== 200) {
                        this.$message.error("保存失败!");
                        console.log(data);
                        return;
                    }
                    this.$message.success("操作成功！")
                });
            },
            allowDrop(draggingNode, dropNode, type) {
                if (dropNode.data.label === '二级 3-1') {
                    return type !== 'inner';
                } else {
                    return true;
                }
            },
            allowDrag(draggingNode) {
                return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
            }
        },
        mounted() {
            this.initToken();
            this.getNoteLabelTrees();
        }
    };
</script>

<style scoped>
@import './css/noteLabel.scss';
</style>
