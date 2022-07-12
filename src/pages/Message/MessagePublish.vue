<template>
  <div style="width: 100%" v-loading="loading">
    <el-card style="padding: 10px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="消息名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker
                v-model="ruleForm.date"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                style="width: 100%"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="消息类型" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="系统消息"></el-radio>
            <el-radio label="个人消息"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="消息内容" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即发布</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { publishMessage } from "@/api/index.js";
export default {
  name: "MessagePublish",
  data() {
    return {
      loading: false,
      ruleForm: {
        name: "",
        date: "",
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入消息名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择消息类型", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写消息内容", trigger: "blur" }],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      value3: "",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          publishMessage(this.ruleForm).then((res) => {
            // console.log(res);
            if (res.success) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.$refs[formName].resetFields();
            } else {
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
            this.loading = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped></style>
