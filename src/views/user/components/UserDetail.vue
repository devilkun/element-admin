<template>
  <div class="createPost-container">
    <el-form ref="ruleForm" :inline="true" :rules="rules" :model="ruleForm" label-width="80px" style="margin-top:20px;width:500px;margin-left:33%">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="ruleForm.name" style="width:360px"/>
      </el-form-item>
      <el-form-item label="输入密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" style="width:360px"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" style="width:360px"/>
      </el-form-item>
      <el-form-item label="用户角色" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择" style="width:360px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" style="text-align:center"/>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left:35%">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      options: [{
        value: '1',
        label: '超级管理员'
      }, {
        value: '2',
        label: '内容发布'
      }, {
        value: '3',
        label: '普通用户'
      }],
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
        role: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        checkPass: [
          { required: true, trigger: 'blur', validator: validatePass2 }
        ],
        role: [
          { required: true, trigger: 'change', message: '请选择用户角色' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
