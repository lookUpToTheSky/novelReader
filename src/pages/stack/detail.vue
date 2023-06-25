<template>
  <div class="book">
    <van-nav-bar
    title="小说阅读器"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
    <!-- 书架封面 -->
    <div class="book_head">
      <div class="book_img">
        <img :src="details.img" class="u-imgAuto" :alt="details.title">
      </div>
      <div class="book_title">
        <p class="book_name">
          {{ details.title }}
        </p>
        <p class="book_author">
          作者:{{ details.author }}
        </p>
        <p>类型:{{ details.typeName || '-' }}</p>
        <p>字数:{{ details.count || '-' }}</p>
        <p>简介:{{ details.info || '-' }}</p>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom">
      <button class="add" @click="addbook">
        加入书架
      </button>
      <router-link :to="{path:'/readBook',query: {item: JSON.stringify(details)} }" class="reade">
        立即阅读
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive} from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
import {useRouter} from 'vue-router'
import { showToast } from 'vant';

let details = ref({})
let router = useRouter()

// 路径或缓存获取小说详情
let GetBooksDetail = () => {
    let item = router.currentRoute.value.query.item
    //存在时
    if(item) {
      details.value = JSON.parse(item)
      setStorage("activeBook", item)
    }else if(getStorage("activeBook")) {//不存在时，从缓存里面取
       details.value = getStorage("activeBook") 
    }
}

// 返回上一页
const onClickLeft = () => history.back();

// 加入书架
let addbook = () => {
    let userInfo = getStorage("userInfo")
    if(!userInfo) {//根据用户信息判断是否登录，未登录
        showToast("你还没登录！请登录");
        return false
    }else {
        //获取当前用户已加入书架的书
        let loveBook = getStorage("loveBook_"+userInfo.username) || []
        if(loveBook.length > 0 && loveBook.find(v => v.id == details.value.id)) {
            showToast("已经在书架了噢！");
            return false
        }
        loveBook.push(details.value)
        setStorage("loveBook_"+userInfo.username, loveBook)
        showToast("加入书架成功！");
    }
}
// 生命周期钩子
onMounted(() => {
    GetBooksDetail()
})
</script>
<style lang="less" scoped>
.book_head{ width: 100%; height: calc(100vh - 50px); overflow: auto; background: url('')no-repeat; background-size: cover; padding: (30/@rem);padding-bottom:(80/@rem);
  .book_title{ text-align: center; line-height: (40/@rem); }
  .book_name{ font-size:@font_title; margin: (20/@rem) 0; font-weight: 700; }
}
.u-imgAuto {
    display: block;
    margin: 0 auto;
    width: (300/@rem);
    height: (400/@rem);
}
.book_frame{position: relative; width:(375/@rem); margin: (20/@rem) auto;padding: 0 (20/@rem); background: #fff;}
.book_info{  padding: (20/@rem); font-size: @font_ord;
  .lastChapter{ width: 100%; margin: (10/@rem) 0;
    span{ color: @main_col2; } }
  .book_longIntro{ text-indent: 2em; }
}
.frame_title::before{ content: ""; display: block; position: absolute; width:( 4/@rem); height: (70/@rem); background: @main_col1; left: 0; }
.catalog{ display: block;  height: (70/@rem); line-height: (70/@rem); overflow: hidden;
  p{ float: left; font-size:@font_title;}
  span{ float: right; font-size: @font_text2; color: @font_col3; }}
.book_relation{ margin-bottom: (80/@rem);
  .frame_title{ line-height: (70/@rem); }

  ul{ margin-top: (20/@rem); overflow: hidden;
    li{ float: left; margin-left: (20/@rem); margin-bottom: (20/@rem);
       p{ width: (160/@rem); margin-top: (20/@rem); }
      .relation_img{ height: (220/@rem); width: (160/@rem); }}
  }
}
.bottom{ width: 100%; height: (80/@rem); line-height: (80/@rem); position: fixed; bottom: 0; left: 0; background: #fff; display: flex; box-shadow: 0 0 (10/@rem)( 5/@rem) @font_col4;
  button{ width: 50%; font-size: @font_ord; }
  .reade{ background: @main_col2; color: @font_col6; width: 50%; font-size: @font_ord; text-align: center;}
}
</style>
