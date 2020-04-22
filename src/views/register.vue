<template>
  <div>
    <div class="header"><h1>注册</h1></div>
  <el-row type="flex" justify="center">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" placeholder="密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="ruleForm.checkPwd" placeholder="确认密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="tel">
        <el-input placeholder="请输入电话号码" v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data() {
  	// 自定义表单校验
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
      	// 如果确认密码不为空
        if (this.ruleForm.checkPwd !== '') {
          this.$refs.ruleForm.validateField('checkPwd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatTel=(rule,value,callback)=>{
      // if(!(/^\d{11}$/.test(this.ruleForm.tel)){

      // }
      if(!/^\d{11}$/.test(this.ruleForm.tel)){
        callback(new Error('手机号必须为11位数字'));
      }else{
        callback();
      }
    };
    return {
      activeName: 'second',
      ruleForm: {
        name: '',   // 用户名
        pwd: '',   // 密码
        checkPwd: '',   // 确认密码
        tel:''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 16, message: '长度必须在3到16个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPwd: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        tel:[
          {required:true,validator:validatTel,trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    ...mapActions(['register']),
    submitForm(formName) {
    	// 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /*// 获取本地的数据
        	let data=JSON.parse(localStorage.getItem('data'))||[];
          // 追加一条数据
        	data.push({
        		"name":this.ruleForm.name,   // 用户名
        		"pwd":this.ruleForm.pwd,   // 密码
            "tel":this.ruleForm.tel   // 电话号码
        	});
        	// 存储对象数组
        	localStorage.setItem('data',JSON.stringify(data));*/
          this.register({
            "name":this.ruleForm.name,   // 用户名
            "pwd":this.ruleForm.pwd,    // 密码
            "tel":this.ruleForm.tel      // 电话号码
          });
          this.$message({
            type: 'success',
            message: '注册成功'
          });
          this.$refs[formName].resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
