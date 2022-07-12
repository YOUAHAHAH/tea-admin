<template>
  <div>
    <el-card shadow="always"> </el-card>
  </div>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style lang="less" scoped>
.el-card.is-always-shadow {
  box-shadow: 0px 7px 6px 0px rgb(0 0 0 / 10%);
}
.el-card__body {
  padding: 10px;
}
.el-card {
  border-radius: 0;
}
</style>
