<template>
    <div class="menu">
      <div class="user" @click="toLogin">
        <div class="avatar">
          <img :src="userInfo.avatar" class="u-imgAuto">
        </div>
        <p>{{ userInfo&&userInfo.username||'点击登录' }}</p>
      </div>
      <ul>
        <li>
			<van-icon name="phone-o" class="van-icon" />
            <p class="u-cenInBlock">
              反馈建议
            </p>
        </li>
        <li>
			<van-icon name="setting-o" />
            <p class="u-cenInBlock">
              我的设置
            </p>
        </li>
      </ul>
      <div v-if="userInfo.username" class="out" @click="outLogin">
		<van-icon name="share-o" />
        <p class="u-cenInBlock">
          退出登录
        </p>
      </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive} from 'vue'
import { useRouter } from "vue-router"
import { getStorage, setStorage, removeStorage } from '@/utils/storage'
import userIcon from '@/assets/img/avatar.jpg'
import { showConfirmDialog } from 'vant';

let userInfo = ref({})
const router = useRouter()

// 退出登录
let outLogin = () => {
	showConfirmDialog({
	title: '提示',
	message:
		'确定要退出登录吗？',
	})
	.then(() => {
		removeStorage("userInfo")
		userInfo.value = {}
		router.push('/login')
	})
	.catch(() => {

	});
}

// 跳转登录页
let toLogin = () => {
	if (!userInfo.value || !userInfo.value.username) {
		router.push('/login')
	}
}
// 生命周期钩子
onMounted(() => {
	userInfo.value = getStorage("userInfo") || {}
})
</script>
<style lang="less" scoped>
  .menu{ position: absolute; left: 0; top: 0;  width: 100%; height: 100%; background: @font_col4;
    .user{ padding: (60/@rem) (20/@rem) 0; height: (280/@rem); font-size: @font_title2; background: url('@/assets/img/menubg.jpg'); color: @font_col5;
      .avatar{ margin: 0 auto; width: (120/@rem); height: (120/@rem); margin-bottom: (20/@rem); border-radius: 50%; border:(2/@rem) solid @font_col3;overflow: hidden; }
      p{ text-align: center; }
    }
    ul{ padding: (10/@rem) (20/@rem);
      li{ height: (80/@rem); line-height: (80/@rem); font-size: @font_title;
	  	border-bottom: 1px solid #eee;
        .link{ width: 100%; height: 100%; display: block; }
      }
    }
    .out{ padding: (40/@rem) (20/@rem) 0;border-top:( 2/@rem) solid @font_col4; font-size: (30/@rem);}
    .svg_menu,.svg_Out{ width: (30/@rem); height: (30/@rem); margin-right: (20/@rem); }
  }
.slide-enter-active, .slide-leave-active {
  transition: all .5s;
}
.slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
  transform: translateX(-100%);
}
.van-icon {
	font-size: (38/@rem);
	color: #41da;
	margin-right: (20/@rem);
}
</style>