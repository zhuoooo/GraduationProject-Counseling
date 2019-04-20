<template>
  <!-- 添加用户 -->
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px;">
      <el-col :span="12" :offset="4">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="110px"
          class="demo-formData"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="formData.phone"></el-input>
          </el-form-item>
          <el-form-item label="用户权限" prop="role">
            <el-select v-model="activityValue" :placeholder="activityValue">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传头像">
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
          <el-form-item class="button_submit">
            <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { cityGuess, addUser, searchplace, foodCategory } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
export default {
  data() {
    return {
      formData: {
        name: "", //用户名
        email: "", //邮箱
        phone: "",
        image_path: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入联系电话" },
          { type: "number", message: "电话号码必须是数字" }
        ]
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
      baseUrl,
      baseImgPath
    };
  },
  components: {
    headTop
  },
  mounted() {},
  methods: {
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
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let result = await addUser(this.formData);
            if (result.status == 1) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.formData = {
                name: "", //用户名
                email: "", //邮箱
                phone: "",
                image_path: ""
              };
              this.activityValue = "管理员";
            } else {
              this.$message({
                type: "error",
                message: result.message
              });
            }
            console.log(result);
          } catch (err) {
            console.log(err);
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请检查输入是否正确",
            offset: 100
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.button_submit {
  text-align: center;
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
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}
</style>
