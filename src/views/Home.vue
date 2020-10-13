<template>
  <div class="home">
    <el-container>
      <el-header>
        <h3>电商后台管理系统</h3>
        <el-button type="info" @click="out">退出</el-button>
      </el-header>
      <el-container>
        <keep-alive>
          <el-aside :width="isCollapse ? '64px' : '200px'">
            <p>
              <i
                :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                @click="isCollapse = !isCollapse"
              ></i>
            </p>
            <el-menu
              class="el-menu-vertical-demo"
              :collapse="isCollapse"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#409EFF"
              unique-opened
              collapse-transition
              router
              :default-active="deAct"
            >
              <el-submenu
                :index="'/home/' + item.path"
                v-for="(item, index) in menu"
                :key="item.id"
              >
                <template slot="title">
                  <i :class="iconMenu[index]"></i>
                  <span>{{ item.authName }}</span>
                </template>
                <el-menu-item-group v-for="(it, i) in item.children" :key="i">
                  <el-menu-item
                    :index="'/home/' + it.path"
                    @click="bread('/home/' + it.path)"
                  >
                    <i class="el-icon-menu"></i>
                    {{ it.authName }}</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
        </keep-alive>
        <el-main>
         
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { menus } from "../utils/api";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],

  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      token: "",
      isCollapse: false,
      menu: [],
      flag: false,
      iconMenu: [
        "el-icon-user-solid",
        "el-icon-s-unfold",
        "el-icon-menu",
        "el-icon-s-order",
        "el-icon-s-marketing",
      ],
      deAct: "",
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    $route(to,from){
      if(to.path=='/home/index'){
        this.deAct=''
      }else{
        this.deAct=to.path
      }
      localStorage.setItem('deAct',this.deAct)
    }
  },
  // 组件方法
  methods: {
    // 退出登录
    out() {
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出登录!",
          });
          sessionStorage.removeItem("user_token");
          localStorage.removeItem("bread");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    // 左侧菜单
    async getmenus() {
      let { data } = await menus();
      // console.log(data);
      this.menu = data;
    },
    bread(path){
      this.deAct=path
      localStorage.setItem('bread',this.deAct)
    }
  },
  created() {
    this.deAct=localStorage.getItem('bread')
    console.log(localStorage.getItem('bread'));
  },
  mounted() {
      this.getmenus();
  },
  filters: {
    string(val) {
      return toString(val);
    },
  },
};
</script>  
<style scoped lang="scss">
html,
body,
.home {
  height: 100%;
}
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;
    align-items: center;
    h3 {
      color: #fff;
    }
  }
  .el-container {
    flex: 1;
    .el-aside {
      transition: all 0s !important;
      background-color: #373d41;
      > p {
        text-align: center;
        font-size: 30px;
        color: #fff;
        cursor: pointer;
      }
    }
    .el-menu {
      width: 100%;
    }
    .el-menu--collapse,
    .el-menu-vertical-demo {
      transition: all 0s !important;
    }
  }
}
.el-main {
  background-color: rgb(234, 237, 241);
}
</style>
