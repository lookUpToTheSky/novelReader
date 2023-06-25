<template>
  <div class="login"> 
    <van-nav-bar
    title=""
    left-text=""
    left-arrow
    @click-left="onClickLeft"
    />
    <div class="home">
    <p class="title">
      账号登录
    </p>
    <div class="form">
      <form method="post">
        <input v-model="username" type="text" placeholder="请输入用户名">
        <input v-model="password" type="password" placeholder="请输入密码">
        <input type="button" class="submit elAct" value="登录" @click="userLogin">
      </form>
      <div class="tip">
        <p @click="openEditPassword">忘记密码</p>
        <p @click="openRegister">
          立即注册
        </p>
      </div>
    </div>
    </div>
    <!-- 修改密码 -->
    <van-dialog v-model:show="showEditPassword" title="修改密码" :before-close="onSbmitPaasword" show-cancel-button>
      <EditPaasword ref="editPaaswordRef"></EditPaasword>
    </van-dialog>
    <!-- 注册 -->
    <van-dialog v-model:show="showRegister" title="注册" :before-close="onSbmitRegister" show-cancel-button>
      <Register ref="registerRef"></Register>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent} from 'vue'
import { showToast } from 'vant';
import { setStorage } from '@/utils/storage'
import * as user from '@/api/login.js'
import { useRouter } from "vue-router"
// 通过defineAsyncComponent方法注册组件
let EditPaasword = defineAsyncComponent(() => import("@/components/editPaasword.vue"))
let Register = defineAsyncComponent(() => import("@/components/Register.vue"))
// 响应式状态
const username = ref("")
const password = ref("")
const showEditPassword = ref(false)
const showRegister = ref(false)
let router = useRouter()
let editPaaswordRef = ref()
let registerRef = ref()

// 点击登录
let userLogin = async () => {
  const res = await user.login({username: username.value, password: password.value})
  if(res.success) {
    // 登录成功之后，缓存用户信息
    setStorage("userInfo", res.data)
    // 登录成功之后，跳转到首页
    router.push({path: '/', query: {}})
    showToast(res.msg);
  }else{
    showToast(res.msg);
  }
}

let onClickLeft = () => {
  history.back()
}
let openRegister = () => {
  showRegister.value = true
}
let closeRegister = () => {
  showRegister.value = false
}
// 确定提交
let onSbmitPaasword = (action) => {
  if(action=="cancel") {
    showEditPassword.value = false
  }else{
    let success = editPaaswordRef.value.valid()
    if(success) {
      showEditPassword.value = false
    }
  }
}
// 确定注册
let onSbmitRegister = (action) => {
  if(action=="cancel") {
    showRegister.value = false
  }else{
    let success = registerRef.value.register()
    if(success) {
      showRegister.value = false
    }
  }
}
// 忘记密码
let openEditPassword = () => {
  showEditPassword.value = true
}
// 生命周期钩子
onMounted(() => {
})
</script>

<style lang="less" scoped>
.home { padding: (40/@rem);}
.title{ font-size: @font_big; margin-top: (150/@rem); color: @main_col2; }
.form{ margin-top: 1(00/@rem);
  input{ margin-top: (20/@rem); display: block; width:100%; height: (80/@rem); line-height: (80/@rem); text-indent: (10/@rem); font-size: @font_ord; color: @font_col2; border-bottom:(2/@rem) solid @font_col4;  }
  .submit{ margin-top: (40/@rem); border: none; background: @main_col2; text-indent: 0; border-radius: (50/@rem); color: @font_col6; }
  .disabled{ background: @font_col3; }
}
.tip{ margin-top: (40/@rem); font-size: @font_text; color: @main_col2; display: flex; justify-content: space-between; }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>