<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>打卡管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加打卡</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card style="height: 750px">
      <!-- 主题区域 -->
      <el-form :model="addForm"  ref="addFormRef" label-width="70px">
        <el-form-item label="工时" prop="time">
          <el-input v-model="addForm.time"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="word">
          <el-input v-model="addForm.word "></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="workId">
          <el-input v-model="addForm.workId "></el-input>
        </el-form-item>

      </el-form>
      <!-- 底部区域 -->
      <div class="bottom-button">
        <el-button @click="addDialogClose">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {

  data(){
    // var checkMobile = (rule, value, callback) => {
    //   //验证手机正则
    //   const regMobile = /^1[3456789]\d{9}$/
    //   if (regMobile.test(value)) {
    //     //合法
    //     return callback()
    //   }
    //   callback(new Error('请输入合法手机号'))
    // }
    return{

      //添加用户表单
      addForm: {
        time : '',//用户名
        word: '123456',//密码
        // dept : '',//邮箱
        workId : 'workId '//手机
      },
      options:[
        {
          value:1,
          label:'管理员'
        },
        {
          value:2,
          label:'普通职工'
        }

      ],
      //添加用户表单验证规则

    }
  },
  methods:{
    addDialogClose() {
      this.$refs.addFormRef.resetFields();//清空添加用户对话框
    },
    //确认添加用户
    async addUser() {
      // this.$refs.addFormRef.validate(async valid => {
      // if (!valid) return;//预校验失败
      //校验成功，执行操作
      const {data: res} = await this.$http.post('/salary/decard',this.$qs.stringify(this.addForm) ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
      if (res.status !== 1) return this.$message.error('添加打卡失败');
      this.$message.success('添加打卡成功');
      await this.$refs.addFormRef.resetFields();
      await this.$router.push('/orders')
      // }
      // )
    }
  }
}
</script>

<style scoped lang="less">

</style>
