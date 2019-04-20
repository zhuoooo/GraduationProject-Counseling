<template>
  <!-- 帖子列表 -->
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="tableData"
        :expand-row-keys="expendRow"
        :row-key="row => row.index"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="内容">
                <span style="word-wrap: break-word;">{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="评论数" prop="commentNum"></el-table-column>
        <el-table-column label="点赞数" prop="giveLikeNum"></el-table-column>
        <el-table-column label="创建时间" prop="createAt"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
      <el-dialog title="修改帖子信息" v-model="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="标题" label-width="100px">
            <el-input v-model="selectTable.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容" label-width="100px">
            <div class="edit_container">
              <quill-editor v-model="selectTable.content" ref="myQuillEditor" class="editer"></quill-editor>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatePost">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { quillEditor } from "vue-quill-editor";
import { baseUrl, baseImgPath } from "@/config/env";
import { getPostInfo, updatePos,deletePostt } from "@/api/getData";
export default {
  data() {
    return {
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      expendRow: []
    };
  },
  created() {
    this.getPost();
  },
  components: {
    headTop,
    quillEditor
  },
  methods: {
    async getPost() {
      const Posts = await getPostInfo({
        pageSize: this.currentPage,
        pageNum: this.limit
      });
      this.tableData = [];
      Posts.forEach((item, index) => {
        const tableData = {};
        tableData.id = item.id;
        tableData.title = item.title;
        tableData.commentNum = item.commentNum;
        tableData.giveLikeNum = item.giveLikeNum;
        tableData.createAt = item.createAt;
        tableData.index = index;
        this.tableData.push(tableData);
      });
    },
    addspecs() {
      this.specs.push({ ...this.specsForm });
      this.specsForm.specs = "";
      this.specsForm.packing_fee = 0;
      this.specsForm.price = 20;
      this.specsFormVisible = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getPost();
    },
    handleEdit(row) {
      this.selectTable = row;
      this.dialogFormVisible = true;
    },
    async updatePost() {
      this.dialogFormVisible = false;
      try {
        const postData = { ...this.selectTable };
        const res = await updatePost(this.selectTable.postid, postData);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "更新帖子信息成功"
          });
          this.getPost();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      } catch (err) {
        console.log("更新帖子信息失败", err);
      }
    },
    async handleDelete(index, row) {
      try {
        const res = await deletePost(row.item_id);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.tableData.splice(index, 1);
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        this.$message({
          type: "error",
          message: err.message
        });
        console.log("删除失败");
      }
    },
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table_container {
  padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.el-dialog .edit_container {
  padding: 0;
}
</style>
