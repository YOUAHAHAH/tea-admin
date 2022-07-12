<template>
  <div v-loading="loading">
    <el-table :data="tableData" style="width: 100%" :show-header="status">
      <el-table-column width="920" prop="content">
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <span>【{{ scope.row.type }}】</span>
            <span>{{ scope.row.content }}</span>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column width="180" prop="time"> </el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="DeleteMsg(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="danger"
      size="medium"
      style="margin: 20px"
      @click="AllDeleteMsg"
    >
      全部删除</el-button
    >
  </div>
</template>

<script>
import moment from "moment/moment";
import { selectMessage, deleteMessage, deleteAllMessage } from "@/api/index.js";
import Bus from "@/assets/js/Bus.js";
export default {
  name: "MessageAlready",
  data() {
    return {
      status: false, // 取消表头
      tableData: [],
      loading: false,
      tableDataDel: [],
      MseeageDataDelete: 0,
    };
  },
  methods: {
    selectMessageGet() {
      this.loading = true;
      selectMessage().then((res) => {
        this.tableData = [];
        res.data.forEach((item) => {
          if (item.status == "2") {
            this.tableData.push(item);
            item.time = moment(item.time)
              .add(8, "hours")
              .format("YYYY-MM-DD HH:mm:ss");
          }
        });
        Bus.$on("MsgLengthAlready", (data) => {
          this.tableData = data;
          this.tableData.forEach((item) => {
            item.time = moment(item.time)
              .add(8, "hours")
              .format("YYYY-MM-DD HH:mm:ss");
          });
          this.$emit("MsgLengthAlready", this.tableData.length);
        });
        Bus.$emit("MsgLengthDel");
        this.loading = false;
      });
    },
    DeleteMsg(data) {
      deleteMessage(data.id).then((res) => {
        if (res.success) {
          this.$message.success(res.msg);
          this.$emit("MsgLengthAlready", this.tableData.length - 1);
          this.selectMessageGet();
        } else return this.$message.error(res.msg);
      });
    },
    AllDeleteMsg() {
      if (this.tableData == 0) return this.$message.error("暂无已读消息");
      deleteAllMessage().then((res) => {
        if (res.success) {
          this.$message.success(res.msg);
          this.$emit("MsgLengthAlready", 0);
          this.selectMessageGet();
        } else return this.$message.error(res.msg);
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
