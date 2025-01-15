<script>
  import config from './config'
  import store from '@/store'
  import { getToken } from '@/utils/auth'
  import {
  	getOpenId
  } from "@/api/app/index.js"

  export default {
    onLaunch: function() {
      this.initApp()
    },
    methods: {
      // 初始化应用
      initApp() {
        // 初始化应用配置
        this.initConfig()
        // 检查用户登录状态
        //#ifdef H5
        //#endif
		//#ifdef MP-WEIXIN
		//this.getWxLogin()
		//#endif
      },
      initConfig() {
        this.globalData.config = config
      },
	  getWxLogin(){
		  uni.login({
		  	provider: 'weixin',
		  	success: loginRes => {
				console.log("coed====="+loginRes.code)
		  		//获取openid
		  		getOpenId({
					code: loginRes.code
				}).then(response => {
		  			var antoInfo = JSON.parse(response.msg)
		  			var data = {
		  				openId: antoInfo.openid,
		  				oldUserId : 0
		  			}
		  			
		  		})
		  				
		  	}
		  });
	  }
    }
  }
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
  @import '@/static/scss/index.scss';
  @import "colorui/main.css";
  @import "colorui/icon.css";
   /* #ifdef H5 */ 
   uni-page-head { display: none; } 
   /* #endif */ 
</style>
