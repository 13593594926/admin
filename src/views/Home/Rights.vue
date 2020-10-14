<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 权限管理</el-breadcrumb-item>
      <el-breadcrumb-item> 权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table
        :data="rights" stripe border
        style="width: 100%"
      >
        <el-table-column type="index" label="#" > </el-table-column>
        <el-table-column property="authName" label="权限名称">
        </el-table-column>
        <el-table-column property="path" label="路径">
        </el-table-column>
        <el-table-column property="address" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==0">一级</el-tag>
            <el-tag v-if="scope.row.level==1" type="success">二级</el-tag>
            <el-tag v-if="scope.row.level==2" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
      
  </div>
</template>


<script>
import { getRight } from "@/utils/api";
export default {
  name: "",
  data() {
    return {
      rights: [],
    };
  },
  created() {},
  mounted() {
    this.list();
  },
  methods: {
    async list() {
      let { data } = await getRight();
      console.log(data);
      this.rights = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>