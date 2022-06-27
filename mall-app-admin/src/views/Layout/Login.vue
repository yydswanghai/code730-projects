<template>
    <a-form-model class="login-container" ref="loginForm" :model="loginForm" :rules="rules" v-bind="layout" autocomplete="on">
        <a-form-model-item has-feedback label="邮箱" prop="email" class="item">
            <a-input v-model="loginForm.email" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="password" class="item">
            <a-input v-model="loginForm.password" type="password" autocomplete="new-password" />
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button html-type="button" type="primary" @click="submitForm('loginForm')" :disabled="loginForm.email === '' || loginForm.password === ''">
                提交
            </a-button>
            <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
                重置
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import { login } from "@/api/user"
export default {
  data() {
    let emailReg = /^[\w-]+@[\w.-]+.com$/;// 邮箱校验规则
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if(emailReg.test(value)){
          return callback();
      }else{
          return callback(new Error('邮箱格式不正确'))
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {// 表单数据对象
        email: '',
        password: '',
      },
      rules: {// 表单验证规则
        email: [{ validator: checkEmail, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
      },
      layout: {// 表单布局
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {// 校验成功
            login(this.loginForm).then(resp => {
              if(resp){
                // 登录成功 跳转到首页
                const path = this.$route.query.returnurl || "/index";
                this.$store.dispatch("loginUser/setUserInfo", resp)
                this.$router.push(path)
              }
            }).catch(error => {
              this.$message.error(error);
            })
            return true;
        } else {// 校验失败
          this.$message.error("请输入有效的邮箱账号");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    enterSubmit(){
      const key = window.event.keyCode;
      if(key === 13){
        this.submitForm('loginForm')
      }
    }
  },
  created(){
    document.addEventListener("keyup", this.enterSubmit);
  },
  destroyed(){
    document.removeEventListener("keyup", this.enterSubmit);
  }
};
</script>
  
<style lang="less" scoped>
@import "~@/styles/mixin.less";

.login-container{
    .self-center(fixed);
    padding: 3rem 5rem;
    min-width: 450px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 1px 2px 6px rgba(0, 0, 0, .5);
}
</style>