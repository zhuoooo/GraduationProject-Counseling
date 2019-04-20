<template>
  <!-- 用户列表 -->
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column property="userId" label="id"></el-table-column>
        <el-table-column property="username" label="用户名"></el-table-column>
        <el-table-column property="email" label="邮箱"></el-table-column>
        <el-table-column property="headUrl" label="头像地址"></el-table-column>
        <el-table-column property="phone" label="联系电话"></el-table-column>
        <el-table-column property="role" label="权限"></el-table-column>
        <el-table-column property="createAt" label="创建时间"></el-table-column>
        <el-table-column property="updateAt" label="更新时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>

      <el-dialog title="修改用户信息" v-model="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="用户名" prop="name" label-width="100px">
            <el-input v-model="selectTable.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" label-width="100px">
            <el-input v-model="selectTable.email"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone" label-width="100px">
            <el-input v-model.number="selectTable.phone"></el-input>
          </el-form-item>
          <el-form-item label="用户权限" prop="role" label-width="100px">
            <el-select v-model="selectTable.role" :placeholder="selectTable.role">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传头像" label-width="100px">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleShopAvatarScucess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="formData.image_path"
                :src="baseImgPath + formData.image_path"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { getUserList, getUserCount } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
export default {
  data() {
    return {
      formData: {},
      dialogFormVisible: false,
      tableData: [
        {
          userId: "2019",
          username: "王小虎",
          email: "123456@139.com",
          headUrl: "http://234",
          phone: "123456",
          role: "管理员",
          createAt: "20190101",
          updateAt: "20190101"
        },
        {
          userId: "2020",
          username: "王小虎2",
          email: "123456@139.com",
          headUrl: "http://234",
          phone: "123456",
          role: "管理员",
          createAt: "20190101",
          updateAt: "20190101"
        }
      ],
      selectTable: {
        userId: "2016-05-02",
        username: "王小虎",
        email: "上海市普陀区金沙江路 1518 弄",
        headUrl: "王小虎",
        phone: "王小虎",
        role: "王小虎",
        createAt: "王小虎",
        updateAt: "王小虎"
      },
      options: [
        {
          value: "0",
          label: "管理员"
        },
        {
          value: "1",
          label: "普通用户"
        },
        {
          value: "2",
          label: "专家"
        }
      ],
      activityValue: "管理员",
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      baseUrl,
      baseImgPath
    };
  },
  components: {
    headTop
  },
  created() {
    this.getUsers();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getUsers();
    },
    async getUsers() {
      // 获取用户
      const Users = await getUserList({
        currentPage: this.currentPage,
        pageSize: this.limit,
        type: 1
      });
      // 获取专家
      const Experts = await getUserList({
        currentPage: this.currentPage,
        pageSize: this.limit,
        type: 2
      });
      Users.push(Experts);
      this.tableData = [];
      Users.forEach(item => {
        const tableData = {};
        tableData.username = item.username;
        tableData.email = item.email;
        tableData.headUrl = item.headUrl;
        tableData.phone = item.phone;
        tableData.role = item.role;
        tableData.createAt = item.createAt;
        tableData.updateAt = item.updateAt;
        this.tableData.push(tableData);
      });
    },
    handleShopAvatarScucess(res, file) {
      if (res.status == 1) {
        this.formData.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    handleEdit(index, row) {
      this.selectTable = row;
      this.dialogFormVisible = true;
    },
    async updateUser() {
      this.dialogFormVisible = false;
      try {
        const postData = { ...this.selectTable };
        const res = await updateCaseInfo(this.selectTable.userId, postData);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: "更新信息成功"
          });
          this.getCaseInfo();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      } catch (err) {
        console.log("更新信息失败", err);
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
</style>
