<template>
  <!-- 添加案例 -->
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
          <el-form-item label="案例标题" prop="title">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="案例内容" prop="content">
            <div class="edit_container">
              <quill-editor v-model="formData.content" ref="myQuillEditor" class="editer"></quill-editor>
            </div>
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
import { quillEditor } from "vue-quill-editor";
import {  searchplace, foodCategory, addPost } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
export default {
  data() {
    return {
      city: {},
      formData: {
        title: "", //标题
        content: "", //内容
        // userId: "",
      },
      rules: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      baseUrl,
      baseImgPath
    };
  },
  components: {
    headTop,
    quillEditor
  },
  mounted() {},
  methods: {
    handleDelete(index) {
      this.activities.splice(index, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let result = await addPost(this.formData);
            if (result.status == 1) {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.formData = {
                title: "",
                content: ""
              }
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
.el-table .edit_container {
  padding: 0;
}
</style>
