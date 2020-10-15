<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 订单管理</el-breadcrumb-item>
      <el-breadcrumb-item> 订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="from.query"
            class="input-with-select"
            clearable
            @clear="getList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="" label="是否付款">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              type="danger"
              effect="dark"
              v-if="scope.row.pay_status == 0"
              >未付款</el-tag
            >
            <el-tag size="mini" effect="dark" v-if="scope.row.pay_status == 1"
              >已付款</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="from.pagenum"
        :page-size="from.pagesize"
        :page-sizes="[2, 4, 6, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
      
  </div>
</template>


<script>
import { getOrders } from "@/utils/api";
export default {
  name: "",
  data() {
    return {
      from: {
        query: "",
        pagenum: 1,
        pagesize: 6,
      },
      list: [],
      total: 0,
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    handleSizeChange(val) {
      this.from.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.from.pagenum = val;
      this.getList();
    },
    async getList() {
      let { data } = await getOrders(this.from);
      // console.log(data.total);
      this.list = data.goods;
      this.total = data.total;
    },
    update() {},
    del() {},
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