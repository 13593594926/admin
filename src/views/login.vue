<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="from">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="get">立即登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../utils/api";
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
      ruleForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async get() {
      if (this.username == "" || this.password == "") {
        this.$message({
          type: "error",
          message: "用户名或者密码不能为空",
        });
        return false;
      }
      let data = await login(this.ruleForm);
      // console.log(data);
      if (data.meta.status == 200) {
        // 写入本地
        sessionStorage.setItem("user", JSON.stringify(data.data));
        sessionStorage.setItem("user_token", data.data.token);
        localStorage.removeItem("bread");

        this.$router.push("/home");
        location.reload();
        this.$message({
          type: "success",
          message: data.meta.msg,
        });
      } else {
        this.$message({
          type: "error",
          message: data.meta.msg,
        });
      }
    },
  },
  created() {},

  mounted() {},
};
</script> 
<style scoped lang='scss'>
.login {
  background-color: #ccc;
  height: 100%;
  width: 100%;
  position: relative;
  > div {
    background-color: #fff;
    position: absolute;
  }
  .from {
    width: 450px;
    height: 304px;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px #ddd;
    box-sizing: border-box;
    padding: 100px 40px 0px 40px;
  }
  .logo {
    width: 130px;
    height: 130px;
    padding: 10px;
    border: 1px solid #efefef;
    border-radius: 50%;
    top: 33%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #efefef;
    }
  }
}
</style>
