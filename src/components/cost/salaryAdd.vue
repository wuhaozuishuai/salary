<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>扣款管理</el-breadcrumb-item>
      <el-breadcrumb-item>扣款申请</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card style="height: 750px">
      <!-- 主题区域 -->
      <el-form :model="salaryAddForm"  ref="addFormRef" label-width="100px">
        <el-form-item label="申请扣款来源" prop="workId ">
          <el-input v-model="salaryAddForm.workId "></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="salaryAddForm.money"></el-input>
        </el-form-item>

        <el-form-item label="申请理由" prop="word">
          <el-input v-model="salaryAddForm.word"></el-input>
        </el-form-item>

      </el-form>
      <!-- 底部区域 -->
      <div class="bottom-button">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
data(){
  return {
//添加角色表单
    salaryAddForm: {
      workId: '',//
      money: '',//
      word:''
    },

    //添加用户表单验证规则


  }
},
  methods:{
    dialogClose() {
      this.salaryAddForm = {
        reason: '',//
        mount: '',//
        time:'',
        type:'',
      }
      this.$refs.addFormRef.resetFields();//清空添加用户对话框
    },
    addRole(){
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;//预校验失败
        //校验成功，执行操作
        const {data: res} = await this.$http.post('/salaryList/insertcost', this.$qs.stringify(this.salaryAddForm),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        if (res.status !== 1) return this.$message.error('申请失败');
        this.$message.success('申请成功');
        this.dialogVisible = false;
        this.$refs.addFormRef.resetFields();
        this.$router.push('/cost')
      })
    }
  }
}
</script>

<style scoped>

</style>
