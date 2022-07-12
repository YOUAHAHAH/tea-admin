<template>
  <div class="order">
    <el-skeleton :rows="15" animated v-if="!isLoading" />
    <div v-else>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :highlight-current-row="true"
      >
        <el-table-column label="序号" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderId" label="订单号" width="300">
        </el-table-column>
        <el-table-column prop="detail_name" label="商品名" width="400">
        </el-table-column>
        <el-table-column prop="order_status" label="状态" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.order_status == 2">
              <el-tag type="success">交易成功</el-tag>
            </span>
            <span v-else>
              <el-tag type="danger">交易失败</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="267">
          <template slot-scope="scope">
            <el-button
              @click="handleChange(scope.row), (drawer = true)"
              type="text"
              size="small"
              ><i class="el-icon-zoom-in"></i>详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-drawer
        :visible.sync="drawer"
        :with-header="false"
        @open="openDrawer(drawerData)"
      >
        <div style="padding: 30px 0 0 20px" v-loading="loadings">
          <p>订单号：{{ drawerData.orderId }}</p>
          <p>用户名称：{{ drawerUserData.name }}</p>
          <p>用户电话：{{ drawerUserData.phone }}</p>
          <p>
            用户头像：
            <img :src="drawerUserData.img" style="width: 50px; height: 50px" />
          </p>
          <p>下单时间：{{ orderTime }}</p>
          <p>商品名称：{{ drawerData.detail_name }}</p>
          <p>商品价格：{{ drawerData.detail_price }}</p>
          <p>商品数量：{{ drawerData.detail_num }}</p>
          <p>
            交易状态：
            <el-tag
              size="small"
              type="danger"
              effect="dark"
              v-if="drawerData.order_status == 1"
              >交易失败</el-tag
            >
            <el-tag size="small" type="success" effect="dark" v-else
              >交易成功</el-tag
            >
          </p>
          <p>
            物流信息：
            <el-button
              icon="el-icon-location-information"
              circle
              type="primary"
              @click="openinnerDrawer(drawerData)"
            ></el-button>
          </p>
        </div>
        <el-drawer
          title="物流信息"
          :append-to-body="true"
          :visible.sync="innerDrawer"
        >
          <div class="block" v-loading="loadings">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in address"
                :key="index"
                type="success"
                size="large"
                :timestamp="item.time"
              >
                <span v-if="!item.addressDetail">
                  {{ item.province + "-" + item.city + "-" + item.county }}
                </span>
                <span v-else
                  >{{ item.addressDetail }}
                  <el-tag size="small">已签收</el-tag></span
                >
              </el-timeline-item>
            </el-timeline>
            <el-descriptions title="收货人信息">
              <el-descriptions-item label="姓名" :span="4">{{
                userAddress.name
              }}</el-descriptions-item>
              <el-descriptions-item label="手机号" :span="4">
                {{ userAddress.tel }}</el-descriptions-item
              >
              <el-descriptions-item label="居住地" :span="4">{{
                userAddress.county
              }}</el-descriptions-item>
              <el-descriptions-item label="联系地址" :span="4">{{
                userDetailAddress.addressDetail
              }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-drawer>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  selectOrder,
  selectOrderUser,
  selectOrderAddress,
} from "@/api/index.js";

export default {
  name: "Orders",
  data() {
    return {
      isLoading: true, // 是否加载中
      tableData: [], // 全部订单数据
      goodsListId: [], // 订单id
      drawer: false, // Drawer 抽屉
      innerDrawer: false, // 内部Drawer 抽屉
      drawerData: "", // 单个订单详细信息
      drawerUserData: "", // 用户信息
      orderTime: "", // 订单时间
      address: [], // 物流地址
      userAddress: {}, // 用户地址
      userDetailAddress: {}, // 用户详细地址
      firstAddress: {
        province: "江西省",
        city: "九江市",
        county: "濂溪区",
        time: "2022-05-01 08:00",
      }, // 初始地址(发货地址)
      loadings: false,
    };
  },
  created() {
    this.isLoading = false;
    selectOrder().then((res) => {
      this.tableData = res.data;
      this.tableData.forEach((item, index) => {
        this.goodsListId = index + 1;
        item.id = this.goodsListId;
      });
      this.isLoading = true;
    });
  },
  methods: {
    // 详情
    handleChange(row) {
      this.loadings = true;
      this.drawerData = row;
      selectOrderUser(row.uid).then((res) => {
        if (res.success)
          return (this.drawerUserData = res.data), (this.loadings = false);
      });
    },
    // 打开第一个抽屉的回调
    openDrawer(data) {
      this.orderTime =
        data.orderId.slice(0, 4) +
        "-" +
        data.orderId.slice(4, 6) +
        "-" +
        data.orderId.slice(6, 8) +
        " " +
        data.orderId.slice(8, 10) +
        ":" +
        data.orderId.slice(10, 12);
    },
    // 物流信息
    openinnerDrawer(data) {
      if (data.order_status == 1) {
        this.innerDrawer = false;
        this.$notify.error({
          duration: 1500,
          title: "错误",
          message: "此订单交易失败,无法查看物流信息",
        });
      } else {
        this.loadings = true;
        this.address = [];
        this.innerDrawer = true;
        selectOrderAddress(data.uid).then((res) => {
          if (res.success) {
            this.userAddress = {
              name: res.data[0].name,
              tel: res.data[0].tel,
              province: res.data[0].province,
              city: res.data[0].city,
              county: res.data[0].county,
              time: this.orderTime,
            };
            this.userDetailAddress = {
              addressDetail: res.data[0].addressDetail,
              time: this.orderTime,
            };
            this.address.push(this.firstAddress);
            this.address.push(this.userAddress);
            this.address.push(this.userDetailAddress);
            this.loadings = false;
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
p {
  padding: 15px;
}
.block {
  margin-left: 30px;
}
</style>
