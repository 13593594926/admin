<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 用户管理</el-breadcrumb-item>
      <el-breadcrumb-item> 用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片布局 -->
    <el-card class="box-card">
      <!-- 栅格布局 -->
      <el-row>
        <!-- 搜索 -->
        <div class="el-col el-col-8">
          <el-input
            placeholder="请输入内容"
            v-model="keyword"
            class="input-with-select"
            clearable
            @clear="getusers"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getusers"
            ></el-button>
          </el-input>
        </div>
        <!-- 添加 -->
        <el-button type="primary" @click="addUser = true">添加</el-button>
      </el-row>
      <!-- 表格展示 -->
      <el-table :data="list" border stripe style="width: 100%">
        <el-table-column type="index" label="#" width="100"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态" width="60">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="state(scope.row.id, scope.row.mg_state)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="up(scope.row.id)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
            ></el-button>
            <el-tooltip content="分配权限" placement="top">
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="role = true"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="addUser">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addUser = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog title="编辑用户" :visible.sync="update">
      <el-form
        :model="upUser"
        :rules="ruup"
        ref="ruup"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="upUser.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="upUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="upUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="update = false">取 消</el-button>
        <el-button
          type="primary"
          @click="upda(upUser.id, upUser.email, upUser.mobile)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 权限分配弹框 -->

    <el-dialog title="分配角色" :visible.sync="role">
      <el-form>
        <el-form-item label="当前的用户：">{{ upUser.username }}</el-form-item>
        <el-form-item label="当前的角色：">{{ upUser.role_name }}</el-form-item>
        <el-form-item label="分配新角色">
          <el-select placeholder="请选择">
            <el-option
              :label="item.roleName"
              :value="item.roleName"
              v-for="item in roles"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="role = false">取 消</el-button>
        <el-button type="primary" @click="addrole(scope.row.id)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  users,
  adUser,
  remove,
  upDa,
  addUpdate,
  roles,
  upState,
} from "@/utils/api";
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
      keyword: "",
      pagenum: 1,
      pagesize: 2,
      list: [],
      total: 0,
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
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
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^((\+|00)86)?((134\d{4})|((13[0-3|5-9]|14[1|5-9]|15[0-9]|16[2|5|6|7]|17[0-8]|18[0-9]|19[0-2|5-9])\d{8}))$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
      addUser: false,
      update: false,
      upUser: {},
      ruup: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确邮箱", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },

          {
            pattern: /^((\+|00)86)?((134\d{4})|((13[0-3|5-9]|14[1|5-9]|15[0-9]|16[2|5|6|7]|17[0-8]|18[0-9]|19[0-2|5-9])\d{8}))$/,
            message: "请输入正确手机号",
            trigger: "blur",
          },
        ],
      },
      role: false,
      roles: [],
    };
  },
  // 计算属性
  computed: {
    breads() {
      return JSON.parse(localStorage.getItem("bread"));
    },
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //   当前页
    handleSizeChange(val) {
      this.pagesize = val;
      this.getusers();
    },
    // 当前页面个数
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getusers();
    },
    // 获取用户列表
    async getusers() {
      let { data } = await users({
        query: this.keyword,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      // console.log(data);
      this.list = data.users;
      this.total = data.total;
    },
    // 删除
    del(i) {
      console.log(i);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.rem(i);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    async rem(i) {
      let { data } = await remove(i);
      this.$message({
        type: "success",
        message: data.meta.msg,
      });
      this.getusers();
      console.log(data);
    },
    // 添加用户
    async adduser() {
      this.addUser = false;
      let res = await adUser(this.ruleForm);
      console.log(res);
      this.$message({
        type: "success",
        message: res.meta.msg,
      });
      this.ruleForm.username = "";
      this.ruleForm.password = "";
      this.ruleForm.email = "";
      this.ruleForm.mobile = "";
      this.getusers();
    },
    // 状态修改
    async state(id, flag) {
      console.log(id, flag);
      let { data } = await upState(id, flag);
      this.$message({
        type: "success",
        message: data.meta.msg,
      });
    },
    // 读取修改数据
    async updaalog(id) {
      let { data } = await upDa(id);
      console.log(data);
      this.upUser = data;
    },
    up(id) {
      this.updaalog(id);
      this.update = true;
    },
    // 提交修改
    async upda(id, email, mobile, upUser) {
      let { data } = await addUpdate(id, { email, mobile });
      console.log(data);
      this.$message({
        type: "success",
        message: data.meta.msg,
      });
      this.update = false;
      this.getusers();
    },
    async getroles() {
      let { data } = await roles();
      this.roles = data;
      console.log(this.roles);
    },
    addrole(id) {
      this.updaalog(id);
    },
  },
  created() {},
  mounted() {
    this.getusers();
    this.getroles();
  },
};
</script> 
<style scoped lang='scss'>
.el-col {
  margin-right: 20px;
}
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.block {
  margin-top: 20px;
}
</style>
