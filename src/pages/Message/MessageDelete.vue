<template>
  <div v-loading="loading">
    <el-table :data="tableData" style="width: 100%" :show-header="status">
      <el-table-column width="1030" prop="content">
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <span>【{{ scope.row.type }}】</span>
            <span>{{ scope.row.content }}</span>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="180" prop="time"> </el-table-column>
    </el-table>
    <el-button
      type="danger"
      size="medium"
      style="margin: 20px"
      @click="AllDeleteMsg"
    >
      清空回收站</el-button
    >
  </div>
</template>

<script>
import moment from "moment/moment";
import { selectMessage, clearMessage } from "@/api/index.js";
import Bus from "@/assets/js/Bus.js";
export default {
  name: "MessageDelete",
  data() {
    return {
      status: false, // 取消表头
      tableData: [],
      loading: false,
      MseeageDataDelete: 0,
    };
  },
  methods: {
    selectMessageGet() {
      this.loading = true;
      selectMessage().then((res) => {
        this.tableData = [];
        res.data.forEach((item) => {
          if (item.status == "3") {
            this.tableData.push(item);
            item.time = moment(item.time)
              .add(8, "hours")
              .format("YYYY-MM-DD HH:mm:ss");
          }
        });
        Bus.$on("MsgLengthDel", () => {
          this.MseeageDataDelete = 0;
          this.tableData = [];
          selectMessage().then((res) => {
            res.data.forEach((item) => {
              if (item.status == "3") {
                this.tableData.push(item);
                item.time = moment(item.time)
                  .add(8, "hours")
                  .format("YYYY-MM-DD HH:mm:ss");
                this.MseeageDataDelete++;
              }
              this.$emit("MsgLengthDelete", this.MseeageDataDelete);
            });
          });
        });
        this.loading = false;
      });
    },
    AllDeleteMsg() {
      if (this.tableData == 0) return this.$message.error("回收站暂无消息");
      this.$confirm("确定清空回收站吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        clearMessage().then((res) => {
          if (res.success) {
            this.$message.success(res.msg);
            this.$emit("MsgLengthDelete", 0);
            this.selectMessageGet();
          } else return this.$message.error(res.msg);
        });
      });
    },
  },
  created() {
    this.selectMessageGet();
  },
};
</script>

<style lang="less" scoped>
/deep/.cell {
  text-align: left;
}
</style>
