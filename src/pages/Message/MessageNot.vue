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
          <el-button size="small" @click="MarkHas(scope.row)"
            >标记已读</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="primary"
      size="medium"
      style="margin: 20px"
      @click="AllMarkHas"
    >
      全部标记已读</el-button
    >
  </div>
</template>

<script>
import moment from "moment/moment";
import { selectMessage, readMessage, readAllMessage } from "@/api/index.js";
import Bus from "@/assets/js/Bus.js";
export default {
  name: "MessageNot",
  data() {
    return {
      status: false, // 取消表头
      tableData: [],
      tableDataRead: [],
      MseeageData: 0,
      MseeageDataAlready: 0,
      MseeageDataDelete: 0,
      loading: false,
    };
  },
  methods: {
    selectMessageGet() {
      this.loading = true;
      selectMessage().then((res) => {
        (this.tableData = []),
          (this.MseeageData = 0),
          (this.MseeageDataAlready = 0);
        this.MseeageDataDelete = 0;
        res.data.forEach((item) => {
          if (item.status == "1") {
            this.tableData.push(item);
            item.time = moment(item.time)
              .add(8, "hours")
              .format("YYYY-MM-DD HH:mm:ss");
          }
        });
        res.data.map((item) => {
          if (item.status == "1") return (this.MseeageData += 1);
          else if (item.status == "2") {
            this.MseeageDataAlready += 1;
            this.tableDataRead.push(item);
          } else if (item.status == "3") {
            this.MseeageDataDelete += 1;
          }
        });
        this.$emit(
          "MsgLengthNot",
          this.MseeageData,
          this.MseeageDataAlready,
          this.MseeageDataDelete
        );
        Bus.$emit("MsgLengthAlready", this.tableDataRead);
        this.loading = false;
      });
    },
    MarkHas(data) {
      readMessage(data.id).then((res) => {
        if (res.success) {
          this.tableDataRead = [];
          this.selectMessageGet();
        } else return this.$message.error(res.msg);
      });
    },
    AllMarkHas() {
      if (this.MseeageData == 0) return this.$message.error("暂无未读消息");
      else {
        readAllMessage().then((res) => {
          if (res.success) {
            this.tableDataRead = [];
            this.selectMessageGet();
            this.$message.success(res.msg);
          } else return this.$message.error(res.msg);
        });
      }
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
