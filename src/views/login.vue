<template>
  <div>
    <div class="header"><h1>登录</h1>
    </div>
    <el-row type="flex" justify="center">
      <el-form :model="user" label-width="80px" ref="form" :rules="rules" status-icon>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="user.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="user.pwd" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="icon" @click="sub" :disabled="disabled">登录</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      disabled:false,   // 用来控制按钮被多次点击登录
      user: {
        name: '',
        pwd: ''
      },
      rules: {
        name: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }]
      },
      icon: 'el-icon-upload'
    }
  },
  methods: {
    ...mapActions(['login']),
    sub() {
      // 1 首先来做校验
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 2 改变图标 此时变成加载的图标
          this.icon = 'el-icon-loading';
          this.disabled=true;   // 此时按钮是禁用的
          // 3 模拟异步请求操作
          setTimeout(() => {
            // 4 登录成功
            /*if (this.user.name == 'admin' && this.user.pwd == 'admin') {
              console.log(111);
              this.$router.push({name:'Forms2'});
            } else {
              // 登录失败
              this.icon = 'el-icon-upload';
              this.disabled=false;   // 此时按钮又可以点击了
              this.$message({
                type: 'error',
                message: '用户名或密码错误',
                showClose: true
              });
            }*/
            this.login(this.user);
            if(sessionStorage.loginStatus&&sessionStorage.loginStatus=='1'){
              // 说明是可以登录的
              this.$router.push({name:'home'});
            }else{
              this.icon = 'el-icon-upload';
              this.disabled=false;   // 此时按钮又可以点击了
              this.$message({
                type: 'error',
                message: '用户名或密码错误',
                showClose: true
              });
            }
          }, 3000)
        }
      });
    }
  }
}

</script>
<style scoped>
.header {
  background-color: #409EFF;
  height: 60px;
  color: white;
  text-align: center;
  margin-bottom: 30px;
}
</style>
