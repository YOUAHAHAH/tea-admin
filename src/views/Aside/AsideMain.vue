<template>
  <div>
    <h3>通用管理后台</h3>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#ccc"
      active-text-color="#409EFF"
      router
      :unique-opened="true"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, index) in noChildren"
        :key="index"
        :index="item.path"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-submenu
        v-for="item in hasChildren"
        :key="item.path"
        :index="item.path"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
        >
          <el-menu-item :index="subItem.path">
            <i :class="subItem.icon"></i>
            <span>{{ subItem.title }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Bus from "@/assets/js/Bus.js";
export default {
  name: "Aside",
  data() {
    return {
      AsideList: [
        {
          title: "首页",
          path: "/Main",
          icon: "el-icon-s-home",
        },
        {
          title: "用户管理",
          path: "/User",
          icon: "el-icon-user-solid",
          children: [
            {
              title: "用户列表",
              path: "/UserList",
              icon: "el-icon-s-operation",
            },
          ],
        },
        {
          title: "商品管理",
          path: "/Commodity",
          icon: "el-icon-s-goods",
          children: [
            {
              title: "商品列表",
              path: "/Commodity",
              icon: "el-icon-s-operation",
            },
            {
              title: "商品数据",
              path: "/EchartsCommodity",
              icon: "el-icon-s-operation",
            },
            {
              title: "商品价格对比",
              path: "/EchartsPrice",
              icon: "el-icon-s-operation",
            },
          ],
        },
        {
          title: "订单管理",
          path: "/Orders",
          icon: "el-icon-s-order",
          children: [
            {
              title: "订单列表",
              path: "/Orders",
              icon: "el-icon-s-operation",
            },
            {
              title: "订单数据",
              path: "/OrderData",
              icon: "el-icon-s-operation",
            },
          ],
        },
        {
          title: "消息中心",
          path: "/message",
          icon: "el-icon-message",
          children: [
            {
              title: "消息列表",
              path: "/message",
              icon: "el-icon-s-operation",
            },
            {
              title: "消息发布",
              path: "/MessagePublish",
              icon: "el-icon-s-operation",
            },
          ],
        },
        {
          title: "错误处理",
          path: "/error",
          icon: "el-icon-warning",
          children: [
            {
              title: "404页面",
              path: "/error",
              icon: "el-icon-error",
            },
            {
              title: "权限测试",
              path: "/Permissions",
              icon: "el-icon-s-opportunity",
            },
          ],
        },
        // {
        //   title: "聊天室",
        //   path: "/chat",
        //   icon: "el-icon-s-comment",
        //   children: [
        //     {
        //       title: "聊天室",
        //       path: "/chat",
        //       icon: "el-icon-chat-line-square",
        //     },
        //   ],
        // },
        // {
        //   title: "数据统计",
        //   path: "/Stats",
        //   icon: "el-icon-s-platform",
        //   children: [
        //     {
        //       title: "数据报表",
        //       path: "/Stats",
        //       icon: "el-icon-s-data",
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.AsideList.filter((item) => !item.children);
    },
    hasChildren() {
      return this.AsideList.filter((item) => item.children);
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      Bus.$emit("AsideSelect", key, keyPath, this.AsideList);
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 0;
}
h3 {
  text-align: center;
  color: #fff;
  padding: 10px;
}
</style>
