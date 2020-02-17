<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :key="router" v-for="router in breadcrumbList" :to="{ path: '/'+router }">{{router}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbList: []
    }
  },
  // 将路由循环
  mounted () {
    this.breadcrumbList = [this.$router.currentRoute.fullPath.slice(1)]
  },
  // 观测路由的变化
  watch: {
    $route (now) {
      this.breadcrumbList = now.fullPath.split('/').slice(1)
    }
  }

}
</script>
<style lang="scss" scoped>
.breadcrumb{
  display: inline-block;
  margin-left: 20px;
}
</style>
