<template>
  <div v-loading="loading">
    <el-card class="box-card" style="width: 100%">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="messageNot" name="first"
          ><Message-Not @MsgLengthNot="MsgLengthNot"></Message-Not
        ></el-tab-pane>
        <el-tab-pane :label="messageAlready" name="second">
          <Message-Already
            @MsgLengthAlready="MsgLengthAlready"
          ></Message-Already>
        </el-tab-pane>
        <el-tab-pane :label="messageDelete" name="third">
          <Message-Delete @MsgLengthDelete="MsgLengthDelete"></Message-Delete>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import MessageNot from "./MessageNot.vue";
import MessageAlready from "./MessageAlready.vue";
import MessageDelete from "./MessageDelete.vue";
import { selectMessage } from "@/api/index.js";
export default {
  name: "MessageList",
  components: {
    MessageNot,
    MessageAlready,
    MessageDelete,
  },
  data() {
    return {
      activeName: "first",
      messageNot: "",
      messageAlready: "",
      messageDelete: "",
      NotNum: [],
      AlreadyNum: [],
      DeleteNum: [],
      loading: false,
    };
  },
  methods: {
    handleClick(tab, event) {},
    MsgLengthNot(data1, data2, data3) {
      this.messageNot = "未读消息" + "(" + parseInt(data1) + ")";
      this.messageAlready = "已读消息" + "(" + parseInt(data2) + ")";
      this.messageDelete = "回收站" + "(" + parseInt(data3) + ")";
    },
    MsgLengthAlready(data) {
      this.messageAlready = "已读消息" + "(" + parseInt(data) + ")";
    },
    MsgLengthDelete(data) {
      this.messageDelete = "回收站" + "(" + parseInt(data) + ")";
    },
  },
  mounted() {
    this.loading = true;
    selectMessage().then((res) => {
      res.data.forEach((item) => {
        if (item.status == "1") {
          this.NotNum.push(item);
          this.messageNot = "未读消息" + "(" + this.NotNum.length + ")";
        } else if (item.status == "2") {
          this.AlreadyNum.push(item);
          this.messageAlready = "已读消息" + "(" + this.AlreadyNum.length + ")";
        } else if (item.status == "3") {
          this.DeleteNum.push(item);
          this.messageDelete = "回收站" + "(" + this.DeleteNum.length + ")";
        }
      });
      this.loading = false;
    });
  },
};
</script>

<style lang="less" scoped></style>
