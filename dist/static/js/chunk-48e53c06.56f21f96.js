(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48e53c06"],{"72ba":function(e,t,n){"use strict";var a=n("c811"),r=n.n(a);r.a},c7f0:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[n("el-breadcrumb-item",{attrs:{to:{path:"/home/index"}}},[e._v(" 首页 ")]),n("el-breadcrumb-item",[e._v(" 订单管理")]),n("el-breadcrumb-item",[e._v(" 订单列表")])],1),n("el-card",{staticClass:"box-card"},[n("el-row",[n("el-col",{attrs:{span:7}},[n("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getList},model:{value:e.from.query,callback:function(t){e.$set(e.from,"query",t)},expression:"from.query"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getList},slot:"append"})],1)],1)],1),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,stripe:""}},[n("el-table-column",{attrs:{type:"index",label:"#"}}),n("el-table-column",{attrs:{prop:"order_number",label:"订单编号"}}),n("el-table-column",{attrs:{prop:"order_price",label:"订单价格"}}),n("el-table-column",{attrs:{prop:"",label:"是否付款"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.pay_status?n("el-tag",{attrs:{size:"mini",type:"danger",effect:"dark"}},[e._v("未付款")]):e._e(),1==t.row.pay_status?n("el-tag",{attrs:{size:"mini",effect:"dark"}},[e._v("已付款")]):e._e()]}}])}),n("el-table-column",{attrs:{prop:"is_send",label:"是否发货"}}),n("el-table-column",{attrs:{label:"下单时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("time")(t.row.create_time)))])]}}])}),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(n){return e.update(t.row.goods_id)}}}),n("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(n){return e.del(t.row.goods_id)}}})]}}])})],1),n("el-pagination",{attrs:{"current-page":e.from.pagenum,"page-size":e.from.pagesize,"page-sizes":[2,4,6,10],layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){return e.$set(e.from,"pagenum",t)},"update:current-page":function(t){return e.$set(e.from,"pagenum",t)}}})],1)],1)},r=[],o=(n("96cf"),n("1da1")),l=n("7c15"),i={name:"",data:function(){return{from:{query:"",pagenum:1,pagesize:6},list:[],total:0}},created:function(){},mounted:function(){this.getList()},methods:{handleSizeChange:function(e){this.from.pagesize=e,this.getList()},handleCurrentChange:function(e){this.from.pagenum=e,this.getList()},getList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["i"])(e.from);case 2:n=t.sent,a=n.data,console.log(a.total),e.list=a.goods,e.total=a.total;case 7:case"end":return t.stop()}}),t)})))()},update:function(){},del:function(){}},filters:{time:function(e){var t=new Date(e);function n(e){return e<10&&(e="0"+e),e}var a=t.getFullYear(),r=t.getMonth()+1,o=t.getDate(),l=t.getHours(),i=t.getMinutes(),s=t.getSeconds();return a+"-"+n(r)+"-"+n(o)+" "+n(l)+":"+n(i)+":"+n(s)}}},s=i,c=(n("72ba"),n("2877")),u=Object(c["a"])(s,a,r,!1,null,"3955739c",null);t["default"]=u.exports},c811:function(e,t,n){}}]);