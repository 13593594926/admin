<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 商品管理</el-breadcrumb-item>
      <el-breadcrumb-item> 商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 栅格布局 -->
      <el-row>
        <!-- 搜索 -->
        <div class="el-col el-col-8">
          <el-input
            placeholder="请输入内容"
            v-model="list.query"
            class="input-with-select"
            clearable
            @clear="getlist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getlist"
            ></el-button>
          </el-input>
        </div>
        <!-- 添加 -->
        <el-button type="primary" @click="$router.push('/home/add')">添加</el-button>
      </el-row>

      <el-table :data="goods" border stripe style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="600">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column label="创建时间" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.add_time | time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="update(scope.row.goods_id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="list.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
      

    <el-dialog
      title="修改"
      :visible.sync="dialogFormVisible"
      label-position="right"
    >
      <el-form :model="form" class="demo-ruleForm" label-width="100px">
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addupdate"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { getGoods, delGood, upGood,updateGood } from "@/utils/api";
export default {
  name: "",
  data() {
    return {
      list: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      goods: [],
      total: 0,
      dialogFormVisible: false,
      form: {},
    };
  },
  created() {},
  mounted() {
    this.getlist();
  },
  methods: {
    handleSizeChange(val) {
      this.list.pagesize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.list.pagenum = val;
      this.getlist();
    },
    //   获取数据
    async getlist() {
      let { data } = await getGoods(this.list);
      this.goods = data.goods;
      this.total = data.total;
      //   console.log(this.goods);
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(id);
          this.delete(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async delete(id) {
      let { data } = await delGood(id);
      this.$message({
        type: "success",
        message: data.meta.msg,
      });
      this.getlist();
    },
    // 修改
    async update(id) {
      this.dialogFormVisible = true;
      let { data } = await upGood(id);
      console.log(data);
      this.form = data;
    },
    async addupdate(){
        this.dialogFormVisible = false
        let {data} = await updateGood(this.form)
        console.log(data);
        this.$message({
            type:'success',
            message:data.meta.msg
        })
    this.getlist();

    }
  },
  filters: {
    time(dataStr) {
      var time = new Date(dataStr);

      function timeAdd0(str) {
        if (str < 10) {
          str = "0" + str;
        }
        return str;
      }
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        timeAdd0(m) +
        "-" +
        timeAdd0(d) +
        " " +
        timeAdd0(h) +
        ":" +
        timeAdd0(mm) +
        ":" +
        timeAdd0(s)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-table {
  margin: 20px 0;
  font-size: 12px;
}
</style>