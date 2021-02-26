<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>打卡管理</el-breadcrumb-item>
            <el-breadcrumb-item>打卡记录</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索 -->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容"  clearable >
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input>
                </el-col>

            </el-row>
        <!-- 订单列表  -->
            <el-table :data="orderList" border stripe >

                <el-table-column type="index"></el-table-column>
                <el-table-column label="工号" width="200px" prop="workid" ></el-table-column>
                <el-table-column label="内容" prop="word" ></el-table-column>
                <el-table-column label="工时（小时）"   width="200px">7.5</el-table-column>
                <el-table-column label="职位" prop="workTime" width="120px">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.dept == 1" type="success">管理员</el-tag>
                        <el-tag v-else type="danger">普通职员</el-tag>
                    </template>
                </el-table-column>

<!--                <el-table-column label="操作" width="150px">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button  v-if="scope.row.type ==3"  type="success" icon="el-icon-success" size="medium" @click="suThis(scope.row.id,1)"></el-button>-->
<!--                        <el-button  v-if="scope.row.type ==3"   type="danger" icon="el-icon-error" @click="suThis(scope.row.id,2)" size="medium"></el-button>-->

<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                queryInfo:{
                    query:'',
                    pagenum:1,
                    pagesize:10
                },
                total:0,
                orderList:[],
                //控制修改地址对话框显示隐藏
                addressVisible:false,

                //修改地址数据对象
                addressForm:{
                    address:''
                },
                //验证规则
                addressFormRules:{
                    address: [
                                { required: true, message: '请选择地址', trigger: 'blur' },

                            ],
                }

            }
        },
        created() {
            this.getOrderList()
        },
        methods:{
            async getOrderList(){
                const {data:res} = await this.$http.post('/first/getcard',)
              console.log(res)
                if (res.status !== 1) return this.$message.error('加载打卡列表失败！')
                this.$message.success('加载打卡列表成功')
                this.total = res.total
                this.orderList = res.data
                console.log(this.orderList)
            },
            handleSizeChange(newSize){
                this.queryInfo.pagesize = newSize
                this.getOrderList()
            },
            handleCurrentChange(newPage){
                this.queryInfo.pagenum = newPage
                this.getOrderList()
            },
          async suThis(id,type){
            console.log(JSON.stringify({id:id,type:type}))
              const {data:res} = await this.$http.put(`/suth/${id}/${type}`)
            if (res.meta.status !== 200) return this.$message.error('审核失败！')
            this.$message.success('审核成功')
          }



        }

    }
</script>

<style scoped lang="less">

</style>
