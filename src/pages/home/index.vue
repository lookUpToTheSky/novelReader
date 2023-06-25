<template>
  <div class="home">
   <van-nav-bar title="小说阅读器" />
    <ul class="booklist">
      <li v-if="booklist.length<=0" class="empty">
        {{ userInfo.id ? "暂无书籍，赶快去书城添加书籍吧！":"当前未登录哦,看看推荐吧！"}}
      </li>
      <!-- 推荐 -->
      <li v-for="(item,key) in bookPutList" :key="key" class="book">
        <router-link :to="{path:'/stack-detail',query: {item: JSON.stringify(item)} }" class="book_link">
          <div class="img">
            <img :src="item.img" class="u-imgAuto">
          </div>
          <div>
            <p>{{ item.title }}</p>
            <p class="author">作者:{{ item.author }}</p> 
          </div>
        </router-link>
      </li>
      <!-- 书架 -->
      <li v-for="(item,key) in booklist" :key="key" class="book">
        <router-link :to="{path:'/readBook',query: {item: JSON.stringify(item)} }" class="book_link">
          <div class="img">
            <img :src="item.img" :alt="item.item" class="u-imgAuto">
          </div>
          <div>
            <p>{{ item.title }}</p>
            <p class="author">作者:{{ item.author }}</p> 
            <p style="font-size: 12px" v-if="item.currentPage">已阅读到：第{{ item.currentPage + 1 }}章</p>
            <button class="del_book" @click.stop.prevent="del(item)">删除</button>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
import * as book from "@/api/book.js"
// 
let booklist = ref([])
let bookPutList = ref([])
let userInfo = ref({})

// 获取收藏的图书
let GetBooks = () => {
  let user = getStorage("userInfo")
  if(user) {
    // 用户已登录
    userInfo.value = user
    booklist.value = getStorage("loveBook_"+user.username) || []
  }else{
    // 用户未登录
    booklist.value = []
    GetPutBooks()
  }
}

// 获取推荐的小说
let GetPutBooks = async () => {
  let {data} = await book.getAllBook()
  bookPutList.value=data.data.reverse()
}
// 删除当前书本
let del = (item) => {
  booklist.value = booklist.value.filter(v => v.id != item.id)
  setStorage("loveBook_"+userInfo.value.username, booklist.value)
}
// 生命周期钩子
onMounted(() => {
  GetBooks()
})
</script>
<style lang="less" scoped>
.home{  width: 100%; height: 100%; }
.booklist{  overflow: auto; background: #fff;padding-bottom: 56px; }
.book{ position: relative; float: left;  margin-left: (40/@rem); margin-top: (40/@rem);padding-bottom: (20/@rem);
  .book_link{display: flex; }
  .img{ height: (220/@rem); width: (200/@rem); border-radius: (10/@rem);}
  .img img{ height: (220/@rem); width: (200/@rem); border-radius: (10/@rem);}
  p{ margin-top: (20/@rem); text-align: center; font-size: (28/@rem); color: @font_col7; margin-left: (40/@rem) }
  .author {color: #398afb; font-size: (18/@rem); border: 1px solid #398afb;}
  .del{ position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    .mask{ width: 100%; height: (220/@rem); background: rgba(0, 0, 0, 0.5); border-radius: (10/@rem); display: flex; justify-content: center; align-items: center;
      span{ width: (50/@rem); height: (50/@rem); border: (2/@rem) solid @font_col3; border-radius: 50%; }
      .svg_Gou{ color: #fff; width: (50/@rem); height: (50/@rem); }}
      .sel{ background: @main_col1; }
  }
}
.editBtn{ position: absolute; bottom: 0; width: 100%; height: (100/@rem); line-height: (100/@rem); box-shadow: 0 0 (10/@rem) (5/@rem) #ccc;  background: @font_col6; display: flex;
  button{ display: block; width: 50%; height: 100%; text-align: center; font-size: @font_text2; color: @main_col1;
    &:first-child{ border-right: (2/@rem) solid @font_col4; color: #333; }}
}
.empty{ text-align: center; color: @font_col2; font-size: (14/@rem); margin-top: (30/@rem); }
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.del_book {
  width: (100/@rem);
  height: (60/@rem);
  outline: none;
  border-radius: 0;
  color: #eee;
  background-color: #ee0a24;
  margin: (40/@rem) 0;
  margin-left: (40/@rem);
}
// /deep/.van-nav-bar__title {
//   font-size: (20/@rem);
// }
</style>
