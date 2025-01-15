<template>
	<view>
		<view>
			<view class="cu-card case " v-for="(item,index) in dataList" :key="index">
				<view @click="toAdUrl(item)" class="cu-item shadow" style="margin: 30rpx 30rpx 0 30rpx;">
					<view class="image">
						<image :src="item.image" style="height: 336rpx;"></image>
						<view class="cu-tag bg-red">火爆</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.title}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 40rpx;"></view>
		<view class="cu-modal" :class="modalName=='scModal'?'show':''">
			<view style="border-radius: 30rpx;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 50rpx;" class="content">提示</view>
				</view>
				<view class=" bg-white">
					<view style="font-size: 33rpx;color: #6a6a6a;padding: 40rpx 60rpx 60rpx 60rpx;">
						{{tipStr}}
					</view>
					<button @tap="schideModal" style="margin-bottom: 50rpx;width: 55%;height: 90rpx;font-size: 38rpx;"
						class="cu-btn bg-green">知道了</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='imgModal'?'show':''">
			<view style="border-radius: 30rpx; background-color: white;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 40rpx;" class="content">小程序访问</view>
					<view class="action" @tap="modalName = null">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" bg-white">
					<image style="width: 75%;margin-top: 20rpx;" mode="widthFix" show-menu-by-longpress="true"
						src="https://simgs.emoboy.vip/app-show/%E6%A9%98%E5%AD%90%E6%90%9C%E6%90%9C.jpg"></image>
						<view class="tipinfo">微信小程序</view>
					<view class="tipinfo2">Tip：长按图片识别 / 保存</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPartyData
	} from "@/api/app/index.js"
	import config from '@/config'
	export default {
		data() {
			return {
				dataList: [],
				baseUrl: config.baseUrl,
				modalName: null,
				tipStr:''
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			if(uni.getStorageSync("isNoData")){
				this.dataList=[
					{
						image: 'http://imgs.emoboy.vip/appimg/share/shuiyin.jpg',
						looktype: 2,
						title: '图片视频水印快速去除，支持抖音，快手等100+平台',
						minappid: 'wx48267eecee85d5c3',
						minapppath: 'pages/tool/shuiyin'
					}
				]
			}else{
				this.getList()
			}
			//#endif
			//#ifndef MP-WEIXIN
			this.getList()
			//#endif
		},
		onShareAppMessage() {
			return {
				title: uni.getStorageSync("miniPartyShaer").remarks,
				imageUrl: uni.getStorageSync("miniPartyShaer").title,
				path: 'pages/party/index',
			}
		},
		onShareTimeline() {
			return {
				title: uni.getStorageSync("miniPartyShaer").remarks,
				query: {},
				imageUrl: uni.getStorageSync("miniPartyShaer").title
			}
		},
		methods: {
			getList(){
				var that = this
				getPartyData().then(res => {
					for (var i = 0; i < res.data.length; i++) {
						var img = res.data[i].image
						if (img.indexOf('http') !== -1) {
							that.dataList.push(res.data[i])
						} else {
							res.data[i].image = that.baseUrl + img
							that.dataList.push(res.data[i])
						}
					}
				})
			},
			toAdUrl(val) {
				var that = this
				if (val.looktype == 1) {
					//#ifdef MP-WEIXIN
					uni.navigateToMiniProgram({
						appId: val.minappid,
						path: val.minapppath, //需要打开的目标路径
						extraData: {},
						envVersion: 'release', //小程序版本：develop（开发版），trial（体验版），release（正式版）
						success(res) {
							// 打开成功
						}
					})
					//#endif
					//#ifdef H5
					window.location.href = val.url
					//#endif
					//#ifdef APP-PLUS
					// plus.share.getServices(res => {
					// 	let sweixin = null;
					// 	sweixin = res.find(i => i.id === 'weixin')
					// 	if (sweixin) {
					// 		// 分享跳转到微信小程序
					// 		sweixin.launchMiniProgram({
					// 			id: val.primaryid, //微信小程序原生id
					// 			path: val.minapppath, //    打开小程序的页面路径，不传默认跳转首页
					// 			type: 0 //     微信小程序版本类型，可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。
					// 		})
					// 	} else {
					// 		uni.showToast({
					// 			title: '请安装微信',
					// 			icon: 'none'
					// 		})
					// 	}
					// }, err => {
					// 	console.log("分享失败"); // 获取分享服务列表失败
					// });
					plus.runtime.openURL(val.url)
					//#endif
				} else if (val.looktype == 2) {
					//#ifdef MP-WEIXIN
					uni.navigateToMiniProgram({
						appId: val.minappid,
						path: val.minapppath, //需要打开的目标路径
						extraData: {},
						envVersion: 'release', //小程序版本：develop（开发版），trial（体验版），release（正式版）
						success(res) {
							// 打开成功
						}
					})
					//#endif
					//#ifdef H5
					this.modalName = 'imgModal'
					//#endif
					//#ifdef APP-PLUS
					plus.share.getServices(res => {
						let sweixin = null;
						sweixin = res.find(i => i.id === 'weixin')
						if (sweixin) {
							// 分享跳转到微信小程序
							sweixin.launchMiniProgram({
								id: val.primaryid, //微信小程序原生id
								path: val.minapppath, //    打开小程序的页面路径，不传默认跳转首页
								type: 0 //     微信小程序版本类型，可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。
							})
						} else {
							uni.showToast({
								title: '请安装微信',
								icon: 'none'
							})
						}
					}, err => {
						console.log("分享失败"); // 获取分享服务列表失败
					});
					//#endif
				} else if(val.looktype == 3){
					//#ifdef MP-WEIXIN
					uni.setClipboardData({
						data: val.url,
						showToast: false,
						success: function() {
							that.tipStr = '链接已复制，请粘贴到浏览器访问 !'
							that.modalName = 'scModal'
						}
					});
					//#endif
					//#ifdef H5
					window.location.href = val.url
					//#endif
					//#ifdef APP-PLUS
					plus.runtime.openURL(val.url)
					//#endif
				} else if(val.looktype == 4){
					this.$tab.navigateTo(val.path)
				}
				//
			},
		}
	}
</script>

<style>
	.bg-img{
		width: 750rpx;
		height: 400rpx;
	}

</style>
