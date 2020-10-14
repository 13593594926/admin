<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 权限管理</el-breadcrumb-item>
      <el-breadcrumb-item> 角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片布局 -->
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" @click="dialogAddRole = true"
          >添加角色</el-button
        >
      </el-row>
      <el-table :data="roles" border stripe style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :gutter="20"
              v-for="(item, index) in scope.row.children"
              :key="index"
              justify
              align="middle"
              :class="
                index == 0
                  ? 'h-center bdtottom bdright bdtop'
                  : 'h-center bdtottom bdright'
              "
            >
              <el-col :span="5" class="h-center"
                ><div class="grid-content bg-purple v-center">
                  <el-tag
                    closable
                    effect="dark"
                    type="dark"
                    @close="del(scope.row.id, item.id)"
                  >
                    {{ item.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i></div
              ></el-col>
              <el-col :span="19"
                ><div class="grid-content bg-purple">
                  <el-row
                    v-for="(it, i) in item.children"
                    :key="i"
                    class="pd bdtottom h-center"
                    :gutter="20"
                  >
                    <el-col :span="6" class="h-center">
                      <el-tag
                        closable
                        effect="dark"
                        type="success"
                        @close="del(scope.row.id, it.id)"
                      >
                        {{ it.authName }}
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="18">
                      <el-tag
                        closable
                        effect="dark"
                        v-for="(k, v) in it.children"
                        type="warning"
                        class="tag-lv3"
                        :key="v"
                        @close="del(scope.row.id, k.id)"
                      >
                        {{ k.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </div></el-col
              >
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="isEditList(scope.row.id)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delrole(scope.row.id)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="right = true"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加 -->
    <el-dialog title="添加角色" :visible.sync="dialogAddRole">
      <el-form
        :model="role"
        ref="role"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="roleName"
          label="角色名称"
          :rules="[
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            {
              min: 3,
              max: 8,
              message: '长度在 3 到 8 个字符',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item
          prop="roleName"
          label="角色描述"
          :rules="[
            { required: true, message: '请输入角色描述', trigger: 'blur' },
          ]"
        >
          <el-input v-model="role.roleDesc"></el-input>
        </el-form-item> </el-form
      >  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddRole = false">取 消</el-button>
        <el-button type="primary" @click="addRoles('role')">确 定</el-button>
      </div>
          </el-dialog
    >
    <!-- 修改 -->
    <el-dialog title="修改角色" :visible.sync="flag">
       <el-form
        :model="editForm"
        :rules="rule"
        label-width="100px"
        ref="listForm"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item> </el-form
      >      
      <div slot="footer" class="dialog-footer">
                <el-button @click="flag = false">取 消</el-button>
                <el-button type="primary" @click="editList">确 定</el-button>
              
      </div>
    </el-dialog>
    <!-- 分配权限 -->

    <el-dialog title="分配权限" :visible.sync="right">
      <el-tree :data="rights" ref="tree" show-checkbox node-key="id" default-expand-all>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span >{{ data.authName }}</span>
        </span>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="right = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {
  getRoles,
  delRoles,
  addRoles,
  delRole,
  queryList,
  isEditLiseEd,
  getRights,
} from "@/utils/api";
export default {
  name: "",
  data() {
    return {
      roles: [],
      dialogAddRole: false,
      role: {
        roleName: "",
        roleDesc: "",
      },
      flag: false,
      // 修改角色弹框数据
      editForm: {
        roleName: "", // 修改角色名称
        roleDesc: "", // 修改角色描述
      },
      rule: {
        // 添加必填项
        roleName: [
          { required: true, message: "角色名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3到 10 个字符", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "角色描述", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      right: false,
      rights: [],
    };
  },
  created() {},
  mounted() {
    this.getRoles();
    this.rightsAll();
  },
  methods: {
    async getRoles() {
      let { data } = await getRoles();
      this.roles = data;
    },
    // 删除
    async del(user, id) {
      let { data } = await delRoles(user, id);
      this.$message({
        type: "success",
        message: data.meta.msg,
      });
      this.getRoles();
    },
    // 添加
    addRoles(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          addRoles(this.role).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: res.meta.msg,
            });
            this.dialogAddRole = false;
            this.getRoles();
          });
        } else {
          return false;
        }
      });
    },
    // 删除角色
    delrole(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.dela(id);
          this.getRoles();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async dela(id) {
      let { data } = await delRole(id);
      console.log(data);
      this.$message({
        type: "success",
        message: data.meta.msg,
      });
    },
    // 查询当前数据
    async isEditList(id) {
      this.flag = true;
      let data = await queryList(`roles/${id}`);
      this.editForm = data.data;
      if (data.meta.status == 200) {
        this.$message({
          type: "success",
          message: data.meta.msg,
        });
      }
    }, // 修改当前数据
    editList(id) {
      this.flag = true;
      this.editPut();
    },
    // 修改
    async editPut() {
      let { data } = await isEditLiseEd(this.editForm);
      if (data.meta.status == 200) {
        this.flag = false;
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getRoles();
      }
    },

    async rightsAll() {
      let { data } = await getRights();
      console.log(data);
      this.rights = data;
    },

    getCheckedKeys() {
      let arr=this.$refs.tree.getCheckedKeys();
        console.log(arr);
      this.right = false
    },

  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-card__body {
  > .el-row {
    margin-bottom: 10px;
  }
}
.el-row {
  border-left: 1px solid #efefef;
}
.pd {
  padding: 5px 0;
}
.h-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-center {
  display: flex;
  align-items: center;
}
.bdtottom {
  border-bottom: 1px solid #efefef;
}
.bdright {
  border-right: 1px solid #efefef;
}
.bdtop {
  border-top: 1px solid #efefef;
}
.tag-lv3 {
  margin: 5px 10px 5px 0;
}
</style>