<template>
  <div class="user">
    <div v-if="isLoading">
      <!-- 表格 -->
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        :highlight-current-row="true"
      >
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="imgUrl" label="头像" width="120">
          <template slot-scope="scope">
            <img
              :src="scope.row.imgUrl"
              style="width: 50px; height: 50px; border-radius: 50%"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="permissions"
          label="权限"
          width="150"
        ></el-table-column>
        <el-table-column label="电话" width="200">
          <template slot-scope="scope">
            <span>{{
              scope.row.phone.slice(0, 3) + "****" + scope.row.phone.slice(7)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="small"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-tooltip
              class="item"
              effect="light"
              content="此操作为模拟操作！"
              placement="bottom-end"
            >
              <el-button
                type="danger"
                plain
                size="small"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑 -->
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
        <el-form
          :model="FormList"
          :rules="rules"
          ref="FormList"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="序号" prop="id">
                <span>{{ FormList.id }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="FormList.nickName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="权限">
                <el-select v-model="FormList.permissions" disabled>
                  <el-option
                    v-for="item in permissions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input v-model="email"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="喜欢的商品">
                <el-select v-model="value1" multiple placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
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
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
    <el-skeleton :rows="14" animated v-else style="padding: 20px" />
  </div>
</template>

<script>
import { selectUser } from "@/api/index.js";
export default {
  name: "SystemUser",
  data() {
    return {
      isLoading: false,
      tableData: [],
      permissions: [
        { id: 1, name: "超级管理员" },
        { id: 2, name: "管理员" },
      ],
      state: [
        { id: 1, name: "正常" },
        { id: 2, name: "禁用" },
      ],
      value: false,
      currentPage: 1,
      pageSize: 5,
      dialogFormVisible: false,
      FormList: [],
      radio: "1",
      selectRadio: "",
      rules: {
        id: [{ required: true }],
      },
      email: "1154090379@qq.com",
      options: [
        {
          value: "选项1",
          label: "绿茶",
        },
        {
          value: "选项2",
          label: "红茶",
        },
        {
          value: "选项3",
          label: "茉莉蜜茶",
        },
        {
          value: "选项4",
          label: "龙井",
        },
      ],
      value1: [],
    };
  },
  created() {
    this.getSelectUser();
  },
  methods: {
    getSelectUser() {
      selectUser().then((res) => {
        this.tableData = res.data;
        this.tableData.forEach((item) => {
          item.permissions = this.permissions[1].name;
          item.state = this.state[0].name;
        });
        if (this.tableData[0].id === 1) {
          this.tableData[0].permissions = this.permissions[0].name;
        }
        this.isLoading = true;
      });
    },
    handleEdit(row) {
      this.FormList = row;
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      this.$confirm("是否删除此用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(this.tableData.indexOf(row), 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // this.getSelectUser();
      this.currentPage = val;
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  width: 100%;
}
.demo-ruleFor {
  .el-input {
    width: 40%;
  }
}
</style>
