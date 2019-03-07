<template>
  <div class="createPost-container">
    <el-form ref="ruleForm" :inline="true" :rules="rules" :model="ruleForm" label-width="80px" style="margin-top:20px;width:500px;margin-left:35%">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="ruleForm.name" style="width:360px"/>
      </el-form-item>
      <el-form-item label="输入密码" prop="password">
        <el-input v-model="ruleForm.password" style="width:360px"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_password">
        <el-input v-model="ruleForm.confirm_password" style="width:360px"/>
      </el-form-item>
      <el-form-item label="头像上传">
        <el-upload :auto-upload="false" :on-change="changeUpload" class="upload-demo" drag action="">
          <i class="el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
    return {
      ruleForm: {
        name: '',
        password: '',
        confirm_password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
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
    },
    changeUpload: function(file, fileList) {
      this.fileList = fileList
      this.$nextTick(
        () => {
          const upload_list_li = document.getElementsByClassName('el-upload-list')[0].children
          for (let i = 0; i < upload_list_li.length; i++) {
            const li_a = upload_list_li[i]
            const imgElement = document.createElement('img')
            imgElement.setAttribute('src', fileList[i].url)
            imgElement.setAttribute('style', 'max-width:50%;padding-left:25%')
            if (li_a.lastElementChild.nodeName !== 'IMG') {
              li_a.appendChild(imgElement)
            }
          }
        })
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
