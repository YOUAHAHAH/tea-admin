<template>
  <div>
    <p class="login-tips">
      Tips : 您可以选择注册->
      <el-link type="primary" @click="enorll">注册</el-link>
    </p>

    <el-dialog title="注册" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item
          label="名称"
          :label-width="formLabelWidth"
          prop="nickName"
        >
          <el-input v-model="form.nickName">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button> </template
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone">
            <template #prepend>
              <el-button icon="el-icon-mobile-phone"></el-button> </template
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="form.password">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button> </template
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogFormVisible = false), submitForm(form)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { EnrollUser } from "@/api/index.js";
export default {
  name: "Enorll",
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        nickName: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
        ],
      }, // 表单验证
      form: {
        phone: "",
        password: "",
        nickName: "",
      }, // 登录表单
      formLabelWidth: "80px",
    };
  },
  methods: {
    enorll() {
      this.dialogFormVisible = true;
    },
    submitForm(form) {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          EnrollUser(form).then((res) => {
            if (res.success) {
              this.$message({
                message: res.msg,
                type: "success",
              });
            } else {
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
          this.$refs.formRef.resetFields(); // 重置
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-tips {
  font-size: 12px;
  color: #666;
}
.v-modal {
  z-index: 1;
}
</style>
