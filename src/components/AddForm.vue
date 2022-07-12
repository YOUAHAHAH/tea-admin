<template>
  <!-- 
  商品添加
 -->
  <div>
    <el-button
      type="success"
      icon="el-icon-plus"
      size="small"
      plain
      @click="dialogFormVisible = true"
      >添加</el-button
    >
    <el-dialog
      title="添加商品信息"
      :visible.sync="dialogFormVisible"
      width="800px"
      top="0vh"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="序号：" prop="id">
              <b>{{ resId + 1 }}</b>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="姓名：" prop="name">
              <el-input
                placeholder="请输入内容"
                v-model="form.name"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="日期：" prop="times">
              <el-date-picker
                v-model="form.times"
                type="date"
                :placeholder="'请选择日期'"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="描述：" prop="content">
              <el-input v-model="form.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="原价：" prop="pprice">
              <el-input v-model.number="form.pprice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="折后价：" prop="price">
              <el-input v-model.number="form.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="数量：" prop="num">
              <el-input-number
                v-model.number="form.num"
                controls-position="right"
                :min="1"
                :max="99"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="图片：" prop="fileList">
              <el-upload
                class="upload-demo"
                action=""
                :file-list="form.fileList"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogFormVisible = false), onSubmit(form)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { selectGoodsList, addGoodsList } from "@/api/index.js";
export default {
  name: "Add",
  data() {
    return {
      resId: "",
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        times: [{ required: true, message: "请选择日期", trigger: "blur" }],
        content: [{ required: true, message: "请描述商品", trigger: "blur" }],
        pprice: [
          { required: true, message: "请输入商品原价", trigger: "blur" },
          { type: "number", message: "价格必须为数字值" },
        ],
        price: [
          { required: true, message: "请输入商品折后价", trigger: "blur" },
          { type: "number", message: "价格必须为数字值" },
        ],
        num: [{ required: true }],
      }, // 表单验证
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
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
      }, // 时间
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        times: "",
        content: "",
        pprice: "",
        price: "",
        num: "",
        fileList: [
          {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
        ],
      }, // 表单
    };
  },
  created() {
    selectGoodsList().then((res) => {
      this.resId = res.data[res.data.length - 1].id;
    });
  },
  methods: {
    onSubmit(form) {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          addGoodsList(form);
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          // location.reload();
          selectGoodsList();
          this.$refs.formRef.resetFields(); // 重置
        } else {
          this.$message({
            showClose: true,
            message: "添加失败！",
            type: "error",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
