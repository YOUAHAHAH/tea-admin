<template>
  <div v-loading="loading">
    <div>
      <el-col :span="3">
        <el-card class="box-card" style="color: red"> 商品价格数量 </el-card>
      </el-col>
      <div id="myChart"></div>
    </div>
  </div>
</template>

<script>
import { selectGoodsList } from "@/api/index.js";
export default {
  name: "EchartsUser",
  data() {
    return {
      loading: false,
      goodsList: [],
      dataOne: [],
      dataTwo: [],
      dataThree: [],
      dataFour: [],
      dataFive: [],
    };
  },
  mounted() {
    this.loading = true;
    // 解决切换router时，图形不展示的问题
    setTimeout(() => {
      selectGoodsList().then((res) => {
        res.data.map((item) => {
          if (item.price > 0 && item.price < 50) {
            const data1 = {
              value: item.price,
            };
            return this.dataOne.push(data1);
          } else if (item.price > 50 && item.price < 100) {
            const data2 = {
              value: item.price,
            };
            return this.dataTwo.push(data2);
          } else if (item.price > 100 && item.price < 200) {
            const data3 = {
              value: item.price,
            };
            return this.dataThree.push(data3);
          } else if (item.price > 200 && item.price < 500) {
            const data4 = {
              value: item.price,
            };
            return this.dataFour.push(data4);
          } else {
            const data5 = {
              value: item.price,
            };
            return this.dataFive.push(data5);
          }
        });
        this.goodsList = [
          this.dataOne,
          this.dataTwo,
          this.dataThree,
          this.dataFour,
          this.dataFive,
        ];
        this.$myCharts.User("myChart", this.goodsList);
      });
      this.loading = false;
    }, 500);
  },
};
</script>

<style lang="less" scoped>
#myChart {
  width: 100%;
  height: 550px;
}
</style>
