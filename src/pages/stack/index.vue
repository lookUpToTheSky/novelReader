<template>
  <div class="home">
   <van-nav-bar title="小说阅读器" />
    <div class="head_note">
      <h6>请选择你喜欢的分类</h6>
      <ul class="type_list">
        <li @click="selectedType(item.value)" v-for="item in typeList" :class="{active: item.value == activeType}" :key="item.value"> {{item.label}}|</li>
      </ul>
    </div>
    <ul class="booklist">
      <p v-if="booklist.length<=0" class="empty">
        暂无书籍!
      </p>
      <li v-for="(item,key) in booklist" :key="key" class="book">
        <router-link :to="{path:'/stack-detail',query: {item: JSON.stringify(item)} }" class="book_link">
          <div class="img">
            <img :src="item.img" :alt="item.item" class="u-imgAuto">
          </div>
          <div class="book_info">
            <p>{{ item.title }}</p>
            <p class="author">作者:{{ item.author }}</p> 
            <div class="book_content">
              {{item.info}}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
import * as book from "@/api/book.js"
// 图书列表
let booklist = ref([])
// 当前图书分类
let activeType = ref(0)
let typeList = [
  {value: 1, label: "武侠"},
  {value: 2, label: "玄幻"},
  {value: 3, label: "惊悚"},
]
// 获取所有小说
let GetBooks = async () => {
  let {data} = await book.getAllBook()
  booklist.value = data.data
  setStorage("allBook", data.data)
}

// 根据分类获取所有小说
let selectedType = async (type) => {
  if(type==activeType.value){
    activeType.value = 0
  }else{
    activeType.value = type
  }

  // 查询选中分类的图书
  let {data} = await book.getAllBook(activeType.value)
  booklist.value = data.data
}

//生命周期钩子
onMounted(() => {
  GetBooks()
})
</script>
<style lang="less" scoped>
.home{  width: 100%; height: 100%; }
.booklist{  overflow: auto; background: #fff; }
.book{ padding: (10/@rem) (40/@rem);padding-right:(10/@rem); margin-top: (20/@rem);min-height:(300/@rem);
  background-color: #f5f5f5;
  .book_link{display: flex; }
  .img{  position: relative; height: (180/@rem); width: (160/@rem); border-radius: (10/@rem);}
  .img img{ height: (180/@rem); width: (160/@rem); border-radius: (10/@rem);}
  p{ margin-top: (16/@rem); text-align: center; font-size: @font_title; color: @font_col7; }
  .author {color: #398afb; font-size: (20/@rem); border: 1px solid #398afb;}
  .book_info {
    flex: 1;
    height: (200/@rem);
    padding: 0 (20/@rem);
  }
}
.book_content {
  font-size: (14/@rem);
  color: #888;
  margin-top: (6/@rem);
  height: (160/@rem);
  overflow: hidden;
}
.editBtn{ position: absolute; bottom: 0; width: 100%; height: (100/@rem); line-height: (100/@rem); box-shadow: 0 0 (10/@rem) (5/@rem) #ccc;  background: @font_col6; display: flex;
  button{ display: block; width: 50%; height: 100%; text-align: center; font-size: @font_text2; color: @main_col1;
    &:first-child{ border-right: (2/@rem) solid @font_col4; color: #333; }}
}
.empty{ text-align: center; color: @font_col2; font-size: (14/@rem); margin-top: (100/@rem); }
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.head_note {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h6 {
    font-size: (30/@rem);
    margin: (10/@rem) 0;
    color: #222;
  }
  .type_list {
    display: flex;
    align-items: center;
    li {
      width: (70/@rem);
    }
  }
  .active {
    color: #398afb;
  }
}
// /deep/.van-nav-bar__title {
//   font-size: (20/@rem);
// }
</style>
