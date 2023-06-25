<template>
  <div class="home">
    <van-nav-bar
    :title="activeItem.title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    style="margin-bottom: 0"
    />
    <!-- 显示目录 -->
    <van-popup
    v-model:show="showLeft"
    position="left"
    :style="{ width: '60%', height: '100%' }"
    >
        <h6 class="content_title">目录</h6>
        <ul>
            <li @click="current=index;showLeft=!showLeft" 
            class="content_item" 
            v-for="(item, index) in activeItem.contentList"
            :key="item.id" :class="{active: current==index}">第{{index+1}}章 &nbsp;{{item.title}}</li>
        </ul>
    </van-popup>

    <!-- 字体大小 -->
    <van-popup
    v-model:show="fontChangeShow"
    position="top"
    :style="{ width: '100%', height: '60%' }"
    >
        <h6 class="content_title" :style="{fontSize: '0.'+fontSize+'rem'}">请根据你的需要进行字体大小调整</h6>
        <ul class="font_change">
            <li @click="fontChange('add')">增加+</li>
            <li @click="fontChange('reduce')">减小-</li>
        </ul>
    </van-popup>
    <!-- 背景颜色 -->
    <van-popup
    v-model:show="bgChangeShow"
    position="top"
    :style="{ width: '100%', height: '60%' }"
    >
        <div :style="theme" style="height: 100%; border-bottom: 1px solid #888">
            <h6 class="content_title">请选择你需要的背景颜色</h6>
            <ul class="bg_change">
                <li @click="bgChange(item)" v-for="item in bgOptions" :key="item.value" :style="item.theme">{{item.text}}</li>
            </ul>
        </div>
    </van-popup>

    <!-- 正文 -->
    <div class="content-wrap" :style="theme">
        <div class="content_title" :style="{fontSize: '0.'+fontSize+'rem'}">第{{current+1}}章&nbsp;{{activeItem.contentList[current].title}}</div>
        <p class="content_item1" :style="{fontSize: '0.'+fontSize+'rem'}">{{activeItem.contentList[current].content}}</p>
        <p class="content_item1" :style="{fontSize: '0.'+fontSize+'rem'}">{{activeItem.contentList[current].content}}</p>
        <p class="content_item1" :style="{fontSize: '0.'+fontSize+'rem'}">{{activeItem.contentList[current].content}}</p>
    </div>
    <!-- 底部tabbar -->
    <van-tabbar v-model="active">
      <van-tabbar-item @click="showLeft=!showLeft" icon="home-o">目录</van-tabbar-item>
      <van-tabbar-item @click="prePage" icon="arrow-left">上一章</van-tabbar-item>
      <van-tabbar-item @click="nextPage" icon="arrow">下一章</van-tabbar-item>
      <van-tabbar-item @click="fontChangeShow=true" icon="font-o">字体大小</van-tabbar-item>  
      <van-tabbar-item @click="bgChangeShow=true" icon="orders-o">背景颜色</van-tabbar-item>  
      <van-tabbar-item @click="addbook" icon="plus">加入书架</van-tabbar-item>  
    </van-tabbar>
  </div>
</template>
<script setup>
import { ref, onMounted,  defineAsyncComponent } from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
import {useRouter} from 'vue-router'
import { showToast } from 'vant';
import * as book from "@/api/book.js"
let active = ref(0)
let showLeft = ref(false)
let fontChangeShow = ref(false)
let bgChangeShow = ref(false)
let router = useRouter()
let activeItem = ref([])
let fontSize = ref(30)
let theme = ref({color: "#000", background: "#f5f5f5"})
let userInfo = ref({})
let current = ref(0) //当前章节
let loveBookList = ref([]) //当前章节
let bgOptions=ref([
    {value: 1, theme: {color: "#000", background: "#f5f5f5"}, text: "白天模式"},
    {value: 2, theme: {color: "#eee", background: "#111"}, text: "夜间模式"},
    {value: 3, theme: {color: "#111", background: "#ccc"}, text: "护眼模式"},
    {value: 4, theme: {color: "#000", background: "#cbb99d"}, text: "柔和模式"},
])
activeItem.value = JSON.parse(router.currentRoute.value.query.item)
// 获取用户的当前进度
current.value = activeItem.value.currentPage || 0
// 获取缓存的当前用户
userInfo.value = getStorage("userInfo") || {}
// 返回上一页
const onClickLeft = () => history.back();

 // 加入书架
let addbook = () => {
    let userInfo = getStorage("userInfo")
    if(!userInfo) {
        showToast("你还没登录！请登录");
        return false
    }else {
        let loveBook = getStorage("loveBook_"+userInfo.username) || []

        if(loveBook.length > 0 && loveBook.find(v => v.id == activeItem.value.id)) {
            showToast("已经在书架了噢！");
            return false
        }
        loveBook.push(activeItem.value)
        setStorage("loveBook_"+userInfo.username, loveBook)
        showToast("加入书架成功！");
    }
}
// 上一章
let prePage = () => {
    if(current.value!=0){
        current.value--
        // 用户已登录， 记录当前进度
        if(userInfo.value.username) {
            let index = loveBookList.value.findIndex(v => v.id == activeItem.value.id)
            loveBookList.value[index].currentPage = current
            setStorage("loveBook_"+userInfo.value.username, loveBookList.value)
        }
    }else{
        showToast("到最第1章了哦~")
    }
}

// 下一张
let nextPage = () => {
    if(activeItem.value.contentList.length - 1 > current.value){
        current.value++ 
        // 用户已登录， 记录当前进度
        if(userInfo.value.username) {
            let index = loveBookList.value.findIndex(v => v.id == activeItem.value.id)
            loveBookList.value[index].currentPage = current
            setStorage("loveBook_"+userInfo.value.username, loveBookList.value)
        }
    }else{
        showToast("到最后1章了哦~")
    }
}
// 改变字体大小
let fontChange = (action) => {
    
    if(action == "add") {
        fontSize.value++
    }else{
        if(fontSize.value==12) {
            showToast("不能再小了哦~")
            return false
        }
        fontSize.value--
    }
    // 用户已登录保存设置字号
    if(userInfo.value.username) {
        setStorage("fontSize_"+userInfo.value.username, fontSize.value)
    }
}

// 改变背景颜色
let bgChange = (item) => {
    theme.value = item.theme
    // 用户已登录保存设置背景
    if(userInfo.value.username) {
        setStorage("theme_"+userInfo.value.username, theme.value)
    }
}

// 生命周期钩子
onMounted(() => {
    if(userInfo.value.username) {
       fontSize.value =  getStorage("fontSize_"+userInfo.value.username)
       theme.value = getStorage("theme_"+userInfo.value.username)
       loveBookList.value = getStorage("loveBook_"+userInfo.value.username)
    }
})

</script>
<style lang="less" scoped>
.home {
    height: calc(100vh - 50px);
    .content_title {
        text-align: center;
        line-height: (60/@rem);
        font-size: (30/@rem);
        text-align: center;
    }
    .content-wrap {
        padding-bottom: 50px;
        min-height: calc(100vh - 100px);
    }
    .font_change {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        li {
            padding: 0 (20/@rem);
            height: (60/@rem);
            outline: none;
            border-radius: 0;
            color: #eee;
            background-color: #ee0a24;
            margin: (20/@rem) 0;
            margin-right: (40/@rem);
            line-height:(60/@rem);
            text-align: center;
            &:last-child {
                background: #1989fa;
            }
        }
    }
    .bg_change {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0 25%;
        li {
            padding: 0 (20/@rem);
            height: (60/@rem);
            width: 100%;
            outline: none;
            border-radius: 0;
            color: #eee;
            margin: (20/@rem) 0;
            line-height:(60/@rem);
            text-align: center;
            border: 0.5px solid #ccc;
        }
    }
    .content_item {
        padding: 0 (20/@rem);
        line-height: (45/@rem);
        font-size: (24/@rem);
    }
    .content_item1 {
        padding: 0 (20/@rem);
        line-height: (55/@rem);
        font-size: (30/@rem);
        text-indent:2em;
    }
    .active {
        color:rgb(14, 126, 223);
    }
}
</style>
