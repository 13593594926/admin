<template>
    
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item> 数据统计</el-breadcrumb-item>
      <el-breadcrumb-item> 数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
        
      <div id="myReport"  :style="{width: '800px', height: '460px'}"></div>
    </el-card>
  </div>
</template>


<script>
import { report } from "@/utils/api";
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.getReport();
  },
  methods: {
    async getReport() {
      let { data } = await report();
      // console.log(data);
      let myChart = this.$echarts.init(document.getElementById("myReport")); //获取容器元素
      let option = {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: data.legend,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data:data.xAxis[0].data
          }
        ],
        yAxis: data.yAxis,
        series: data.series,
      }; //防止越界，重绘canvas
      window.onresize = myChart.resize;
      myChart.setOption(option); //设置option
    },
  },
};
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>