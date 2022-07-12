<template>
  <div v-loading="loading"><div id="myChart"></div></div>
</template>

<script>
import { selectGoodsList } from "@/api/index.js";
export default {
  name: "EchartsPrice",
  data() {
    return {
      loading: false,
      PriceData: "",
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      selectGoodsList().then((res) => {
        this.PriceData = res.data;
        this.$myCharts.PriceContrast("myChart", this.PriceData);
      });
      this.loading = false;
    }, 1000);
  },
};
</script>

<style lang="less" scoped>
#myChart {
  width: 100%;
  height: 550px;
}
</style>
