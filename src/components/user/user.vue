<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索与添加 -->
<!--            <el-row :gutter="20">-->
<!--                <el-col :span="7">-->
                  <el-form ref="form" :model="querryFrom" label-width="80px">
                    <el-form-item label="姓名">
                      <el-input v-model="querryFrom.name"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input v-model="querryFrom.phone "></el-input>
                    </el-form-item>
                    <el-form-item label="工资">
                      <el-input v-model="querryFrom.salary"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="queryUser">立即查询</el-button>
                    </el-form-item>
                  </el-form>


<!--                </el-col>-->

<!--            </el-row>-->
            <!-- 表格 -->
            <el-table
                    :data="userList"
                    border
                    stripe
                    style="width: 100%">

                <el-table-column
                        type="index"
                        label="#"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="姓名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="100"

                >
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.sex==1">男</el-tag>
                    <el-tag v-else>女</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="role_name"
                        label="角色">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.dept==1">管理员</el-tag>
                    <el-tag v-else>职工</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                        prop="mg_state"
                        label="状态"
                >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.mg_state"
                                @change="userStateChange(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <!-- 删除角色 -->
                        <el-button type="danger" icon="el-icon-delete" @click="sureDeleteUser(scope.row.workid)"></el-button>

                    </template>
                </el-table-column>
            </el-table>
<!--           分页组件-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[3, 5, 10, 20]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>



    </div>

</template>

<script>
    export default {
        data() {
            var checkMobile = (rule, value, callback) => {
                //验证手机正则
                const regMobile = /^1[3456789]\d{9}$/
                if (regMobile.test(value)) {
                    //合法
                    return callback()
                }
                callback(new Error('请输入合法手机号'))
            }
            return {
                //用户列表查询参数
                queryInfo: {
                    //查询参数
                    query: '',
                    //当前页数
                    pagenum: 1,
                    //每页显示条数
                    pagesize: 10
                },
              querryFrom:{
                name:'',
                phone:'',
                salary:'',
                username:'',
                workId:''
              },
                //用户列表
                userList: [],
                //
                total: 0,
                //控制添加用户对话框显示隐藏
                addDialogVisible: false,
                //控制修改用户对话框显示隐藏
                editDialogVisible:false,
                //修改用户表单
                editForm: {

                },
                //修改用户表单验证规则
                editFormRules: {
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ]
                },
                //控制修改角色对话框显示
                roleDialogVisible:false,
                //当前用户信息
                userInfo:{},
                //角色列表
                rolesList:{},
                //选中的角色id值
                selectedRoleId:''
            }

        },
        created() {
            this.getUserList()
        },
        methods: {
            //获取用户列表
            async getUserList() {
                const {data: res} = await this.$http.post('/first/user2', {params: this.queryInfo})
                if (res.status !== 1) return this.$message.error('获取用户列表失败')
                this.userList = res.data;
                this.total = res.total
            },
            //监听每页显示条数改变事件
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize
                this.getUserList()
            },
            //监听页码改变
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage
                this.getUserList()
            },
            //用户状态改变
            async userStateChange(userInfo) {
                const {data: res} = await this.$http.put('/users/' + userInfo.id + '/state/' + userInfo.mg_state)
                if (res.meta.status !== 200) {
                    userInfo.mg_state = !userInfo.mg_state
                    return this.$message.error(res.meta.msg)
                }
                this.$message.success(res.meta.msg)
            },

            //确认删除用户弹窗
            sureDeleteUser(id) {
              console.log(id)
                this.$confirm('确认删除用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const {data:res} =await this.$http.post('/first/deleteUser',this.$qs.stringify({workId:id}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
                    if (res.status!==1) return this.$message.error('删除失败，请重试！');
                    await this.getUserList();
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
          async queryUser(){
            const {data:res} =await this.$http.post('/first/search',this.$qs.stringify(this.querryFrom),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
            if (res.status!==1) return this.$message.error('查询失败，请重试！');
            this.userList = res.data
            this.total = res. total
          }

        }
    }
</script>

<style lang="less" scoped>

</style>
