<template>
  <div v-loading="loading">
    <div id="myChart" style="width: 500px; height: 500px"></div>
  </div>
</template>

<script>
import { selectOrder } from "@/api/index.js";
export default {
  name: "OrderData",
  data() {
    return {
      loading: false,
      OrderData: [],
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      selectOrder().then((res) => {
        this.OrderData = res.data;
        this.$myCharts.OrderData("myChart", this.OrderData);
      });
      this.loading = false;
    }, 500);
  },
};
</script>

<style lang="less" scoped>
#myChart {
  margin: auto;
}
</style>
