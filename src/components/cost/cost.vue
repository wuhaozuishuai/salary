<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>扣款管理</el-breadcrumb-item>
      <el-breadcrumb-item>扣款列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片区域   -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>

      </el-row>
      <!-- 表格 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="事由" prop="word"></el-table-column>
        <el-table-column label="金额" prop="money"></el-table-column>
        <el-table-column label="扣费">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.status==0 ">待审批</el-tag>
            <el-tag type="success" v-else>已通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status ==0">

              <el-button type="primary" size="mini" icon="el-icon-edit" @click="audit(scope.row.work_id)">审核</el-button>
            </div>
            <div v-else>
              <el-button type="warning" size="mini" icon="el-icon-edit" @click="appeal(scope.row.work_id)">申诉</el-button>
            </div>
          </template>
        </el-table-column>
        <!--                <el-table-column width="200px"-->
        <!--                        label="操作">-->
        <!--                    <template slot-scope="scope">-->
        <!--                        &lt;!&ndash; 编辑 &ndash;&gt;-->
        <!--                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.id)">编辑-->
        <!--                        </el-button>-->
        <!--                        &lt;!&ndash; 删除 &ndash;&gt;-->
        <!--                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.goods_id)">删除</el-button>-->


        <!--                    </template>-->
        <!--                </el-table-column>-->
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[10, 15, 30, 50]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      goodsList: [],
      //查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      //总数据条数
      total: 0,
    }
  },
  mounted() {
    this.getGoodsList()
  },
   methods: {
    //根据资品列表
    async getGoodsList() {
      const {data: res} = await this.$http.post('/salaryList/getsalaryList', {params: this.queryInfo})
      console.log(res)
      if (res.status !== 1) return this.$message.error('请求工资列表失败')
      this.$message.success('加载工资列表成功')
      this.goodsList = res.data
      this.total = res.total
      console.log(res)
    },
    //显示数量改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    //页码改变
    handleCurrentChange(newCurrent) {
      this.queryInfo.pagenum = newCurrent
      this.getGoodsList()
    },
    //
    //FIXME 接口暂无
    audit(id) {
      this.$confirm('确认通过该申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: res} = await this.$http.delete('/goods/' + id);
        if (res.meta.status !== 200) return this.$message.error('删除失败，请重试！');
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //点击按钮，跳转到添加商品页面
    goAddPage() {
      this.$router.push('/goods/add')
    },
      appeal(id){
      console.log(id)
         this.$prompt('请输入理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then( async ({ value }) => {
           // eslint-disable-next-line no-debugger
           debugger
        console.log(13)


        const {data: res} = await this.$http.post('/salaryList/reget',this.$qs({word:value,workid:id}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
           console.log(res)
        if (res.status !== 1) return this.$message.error('申诉失败，请重试！');

        this.$message({
          type: 'success',
          message: '申诉成功'
        });
      }).catch(() => {
        console.log(22)
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });








       // this.$prompt('请输入邮箱', '提示', {
       //   confirmButtonText: '确定',
       //   cancelButtonText: '取消',
       //   inputErrorMessage: '邮箱格式不正确'
       // }).then(({ value }) => {
       //
       // }).catch(() => {
       //   this.$message({
       //     type: 'info',
       //     message: '取消输入'
       //   });
       // });



    }
  }
}
</script>

<style scoped lang="less">

</style>
