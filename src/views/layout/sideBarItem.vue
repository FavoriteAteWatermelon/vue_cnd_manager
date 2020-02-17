<template>
  <div v-if="!item.hidden === true">
    <template v-if="(item.children && item.children.length < 2) || (item.meta && item.meta.nav && item.meta.nav === 'last')">
          <router-link :to="item.path">
      <el-menu-item :index="item.path">
        <i :class="item.icon"></i>
       <span slot="title">{{item.name ? item.name : item.title}}</span>
      </el-menu-item>
    </router-link>
    </template>
    <el-submenu v-else :index="item.path" popper-append-to-body >
        <template slot="title">
        <i :class="item.icon"></i>
        <span v-if="!opened">{{item.name}}</span>
      </template>
      <sidebar-item
      :key="index" v-for="(child,index) in item.children"
      :item="child"
      ></sidebar-item>
    </el-submenu>
  </div>
  </template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarItem',
  methods: {
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'opened'
    ])
  },
  created () {
    // console.log(this.item.children)
  },
  components: {
    // alink
  }
}
</script>
<style lang="scss" scoped>

</style>
