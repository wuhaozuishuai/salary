<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加角色</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card style="height: 750px">
      <!-- 主题区域 -->
      <el-form :model="RolesForm" :rules="FormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="RolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="RolesForm.roleDesc"></el-input>
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
    RolesForm: {
      roleName: '',//角色名称
      roleDesc: '',//角色描述
    },
    //添加用户表单验证规则
    FormRules: {
      roleName: [
        {required: true, message: '请输入角色名称', trigger: 'blur'},
        {min: 3, max: 10, message: '名称长度为3-10位', trigger: 'blur'}
      ],
      roleDesc: [
        {required: true, message: '请输入角色描述', trigger: 'blur'},
        {min: 6, max: 15, message: '描述长度为6-15位', trigger: 'blur'}
      ],
    },

  }
},
  methods:{
    dialogClose() {
      this.RolesForm = {
        roleName: '',
        roleDesc: ''
      }
      this.$refs.addFormRef.resetFields();//清空添加用户对话框
    },
    addRole(){
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;//预校验失败
        //校验成功，执行操作
        const {data: res} = await this.$http.post('/roles', this.RolesForm);
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg);
        this.$message.success(res.meta.msg);
        this.dialogVisible = false;
        this.$refs.addFormRef.resetFields();
      })
    }
  }
}
</script>

<style scoped>

</style>
