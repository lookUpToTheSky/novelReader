<template>
 <div class="login">
    <div class="form">
      <form method="post">
        <input v-model="username" autocomplete="off" type="text" placeholder="请输入用户名">
        <input v-model="password" autocomplete="off" type="password" placeholder="请输入密码">
        <input v-model="password2" autocomplete="off" type="password" placeholder="请再次输入密码">
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose} from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
import { showToast } from 'vant'

// 响应式状态
const username = ref("")
const password = ref("")
const password2 = ref("")

// 验证的方法
let valid = () => {
    let users = getStorage("user") || []
    let currentIndex = users.findIndex(element => element.username == username.value);
    // 获取用户名是否存在到用户列表
    if(currentIndex == -1) {
        showToast("用户名不存在！")
        return false
    }
    if(!username.value || username.value.length < 3) {
        showToast("用户名不能为空且长度不小于3！")
        return false
    }
    if(!password.value  || password.value.length < 8) {
        showToast("用户名不能为空且长度不小于8！")
        return false
    }
    if(password2.value !== password.value) {
        showToast("两次密码不一致！")
        return false
    }
    users[currentIndex].password = password.value
    setStorage("user", users)
    showToast("密码修改成功！")
    return true
}
// 暴露子组件方法
defineExpose({
    valid: valid
})
// 生命周期钩子
onMounted(() => {
  console.log(123)
})
</script>

<style lang="less" scoped>
.login{ padding: (40/@rem); }
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