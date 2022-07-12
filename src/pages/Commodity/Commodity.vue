<template>
  <div class="commodity">
    <el-skeleton :rows="15" animated v-if="!isLoading" style="padding: 15px" />
    <div v-else>
      <!-- 添加 -->
      <div style="display: flex; margin-bottom: 10px">
        <Add-Form></Add-Form>
        <el-button
          type="primary"
          icon="el-icon-refresh"
          size="small"
          plain
          style="margin-left: 10px"
          @click="locaReload"
          >刷新</el-button
        >
        <el-button
          type="info"
          icon="el-icon-sort"
          size="small"
          plain
          @click="FormReverse"
          >倒序</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table
        :data="
          goodsList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        :highlight-current-row="true"
        style="width: 100%"
        v-loading="loadings"
      >
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="times" label="上架日期" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.times }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="200">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.imgUrl"
              style="width: 80px; height: 80px; border-radius: 50%"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="240">
        </el-table-column>
        <el-table-column prop="content" label="描述" width="300">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="100"> </el-table-column>
        <el-table-column prop="price" label="打折后的价格" width="150">
          <template slot-scope="scope">
            <span style="color: red; font-weight: 900">{{
              scope.row.price
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pprice" label="原价" width="150">
          <template slot-scope="scope">
            <del>{{ scope.row.pprice }}</del>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleChange(scope.row)" type="text" size="small"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button type="text" size="small" @click="handleDelete(scope.row)"
              ><i class="el-icon-delete">删除</i></el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑 -->
      <el-dialog title="商品信息编辑" :visible.sync="dialogFormVisible">
        <el-form
          :model="FormList"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="序号：" prop="id">
                <span>{{ FormList.id + 1 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="FormList.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="日期：" prop="times">
                <el-date-picker
                  v-model="FormList.times"
                  type="date"
                  :placeholder="'请选择日期'"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="描述：">
                <el-input v-model="FormList.content"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="原价：">
                <del style="font-weight: 900">{{ FormList.pprice }}</del>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="折后价：">
                <el-input v-model="FormList.price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="数量：">
                <el-input-number
                  v-model="FormList.num"
                  controls-position="right"
                  :min="1"
                  :max="99"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="(dialogFormVisible = false), onSubmit(FormList)"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        style="float: right; padding: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 8, 12, 16]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="goodsList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import AddForm from "../../components/AddForm.vue";
import moment from "moment/moment";
import { Throttle } from "../../assets/js/debounce.js";
import {
  selectGoodsList,
  editGoodsList,
  deleteGoodsList,
} from "@/api/index.js";

export default {
  name: "SystemCommodity",
  components: { AddForm },
  data() {
    return {
      isLoading: true, // 是否加载中
      goodsList: [], // 表格数据
      currentPage: 1, // 默认第一页
      pageSize: 4, // 分页
      dialogFormVisible: false, // 模态框
      FormList: [],
      rules: {
        id: [{ required: true }],
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
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
      loadings: false,
    };
  },
  created() {
    this.isLoading = false;
    selectGoodsList().then((res) => {
      this.goodsList = res.data;
      this.goodsList.forEach((item) => {
        item.times = moment(item.times).format(`YYYY-MM-DD`);
      });
      this.isLoading = true;
    });
  },
  methods: {
    // 编辑
    handleChange(row) {
      this.FormList = row;
      this.dialogFormVisible = true;
    },
    // 编辑表单提交
    onSubmit(FormList) {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$message({
            message: "编辑成功，快去看看变化吧！",
            type: "success",
          });
          editGoodsList(FormList);
        } else {
          this.$message({
            showClose: true,
            message: "编辑错误，请检查！",
            type: "error",
          });
          location.reload();
          return false;
        }
      });
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteGoodsList(row.id)
          .then((res) => {
            if (res.success) {
              this.$message({
                showClose: true,
                message: "删除成功！",
                type: "success",
              });
              selectGoodsList().then((res) => {
                this.goodsList = res.data;
                this.goodsList.forEach((item) => {
                  item.times = moment(item.times).format(`YYYY-MM-DD`);
                });
              });
            } else {
              this.$message({
                showClose: true,
                message: "删除失败，请重新尝试！",
                type: "error",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 刷新 (节流)
    locaReload: Throttle(function () {
      this.loadings = true;
      selectGoodsList().then((res) => {
        this.goodsList = [];
        this.goodsList = res.data;
        this.goodsList.forEach((item) => {
          item.times = moment(item.times).format(`YYYY-MM-DD`);
        });
        setTimeout(() => {
          this.loadings = false;
        }, 1000);
      });
    }, 0),
    // 倒序
    FormReverse() {
      this.goodsList.reverse();
    },
  },
};
</script>

<style lang="less" scoped>
.el-table_14_column_124 .el-table__cell {
  color: red;
  font-weight: 900;
}
</style>
