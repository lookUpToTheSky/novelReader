<script setup>
import { onMounted, ref, watch } from 'vue'
import { screenAdaptation } from './utils/tools'
import * as user from '@/api/login.js'
import { getStorage, setStorage } from '@/utils/storage'
import {useRouter} from 'vue-router'
const active = ref(0)
const showBar = ref(["home", "stack","me"])
let router = useRouter()

let getUserList = async () => {
  let {data} = await user.getUser()
  setStorage("user", data.data)
}

onMounted(() => {
  screenAdaptation()
  if(!getStorage("user")) {
    getUserList()
  }
  window.onresize = screenAdaptation
})
</script>

<template>
  <div class="appWrap">
    <router-view></router-view>
    <van-tabbar v-model="active" v-show="showBar.includes(router.currentRoute.value.name)">
      <van-tabbar-item to="/" icon="home-o">书架</van-tabbar-item>
      <van-tabbar-item to="/stack" icon="search">书库</van-tabbar-item>
      <van-tabbar-item to="/me" icon="friends-o">我的</van-tabbar-item>  
    </van-tabbar>
  </div>
</template>

<style scoped lang="less">
.appWrap{ height: 100vh }
* {
  padding: 0;
  margin: 0;
}
</style>
