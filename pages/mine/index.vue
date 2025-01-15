<template>
	<view class="my">
		<image src="https://v2.api-m.com/api/wallpaper?return=302" mode="aspectFill" class="my_bg"></image>
		<view class="header_cell">
			<view style="margin-top: 40rpx;" class="user_info">
				<view class="flex justify-center align-center">
					<image src="https://v2.api-m.com/api/head?return=302" mode="aspectFill" class="user_photo"></image>
					<view>
						<view class="text-black text-bold">
							<text class="text-xl" style="font-weight: bold;">微信用户</text>
						</view>

					</view>
				</view>

			</view>
			<view style="margin-top: 90rpx;border-radius: 26rpx;" class="vip_cell flex justify-between align-center">
				<view>
					<view class="text-xl" style="font-weight: bold;color: rgb(241, 198, 142);">
						邀请朋友一起来搜索吧 !
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="cu-btn round invate_btn">邀 请</button>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<button @click="copyUrl()" class="cu-btn round invate_btn">邀 请</button>
				<!-- #endif -->
			</view>
		</view>
		<view class="cell_2 flex  align-cente" style="margin-top: 20rpx;">
			<button @click="guanzhu(1)" class="kefu">
				<text style="color: #1382ff;font-size: 60rpx;" class=" cuIcon-appreciatefill"></text>
				<text style="display: block;margin-top: -60rpx;margin-bottom: 15rpx;font-size: 30rpx;">同款搭建</text>
			</button>
			<!-- #ifndef MP-WEIXIN -->
			 <button @click="imgShow(2)" class="kefu">
			 	<text style="color: #1382ff;font-size: 60rpx;" class=" cuIcon-servicefill"></text>
			 	<text style="display: block;margin-top: -60rpx;margin-bottom: 15rpx;font-size: 30rpx;">添加客服</text>
			 </button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			 <button open-type="contact" class="kefu">
			 	<text style="color: #1382ff;font-size: 60rpx;" class=" cuIcon-servicefill"></text>
			 	<text style="display: block;margin-top: -60rpx;margin-bottom: 15rpx;font-size: 30rpx;">联系客服</text>
			 </button>
			<!-- #endif -->
			
		</view>
		<!-- <view style="width: 100%; margin-top: 30rpx;">
			<ad-custom unit-id="adunit-ff28399b17818338"  ad-intervals="30" ></ad-custom>
		</view> -->
		<view class="grid text-center col-4 bg-white"
			style="padding: 30rpx 0; border-radius: 15rpx;row-gap: 30rpx;margin-top: 20rpx;">
			<!-- #ifdef MP-WEIXIN -->
			<view @click="myBlog()">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view @click="modeImgShow(1)">
			<!-- #endif -->
				<view class="cell_3_icon flex justify-center align-center"><text
						class="text-olive cuIcon-choiceness"></text></view>
				<view>资源共享</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view @click="shuiyin()">
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<view @click="modeImgShow(2)">
			<!-- #endif -->
				<view class="cell_3_icon flex justify-center align-center"><text
						class="text-cyan cuIcon-selection"></text></view>
				<view>去除水印</view>
			</view>
			<view  @click="imgShow(1)">
				<view class="cell_3_icon flex justify-center align-center"><text class="text-cyan cuIcon-copy"></text>
				</view>
				<view>最新动态</view>
			</view>
			<view @click="mzModalShow()">
				<view class="cell_3_icon flex justify-center align-center"><text
						class="text-olive cuIcon-creative"></text></view>
				<view>免责声明</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<ad-custom v-if="adId" style="height: 343rpx;margin-top: 20rpx;overflow: hidden;" :unit-id="adId" ad-intervals="30"></ad-custom>
		<!-- #endif -->
		<!-- 功能列表 -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="metergasis">
			<view style="line-height: 60rpx;width: 90%;height: 150rpx;background-color: #fff;color: #666666;margin: 20rpx;text-align: center;">
				求资源的，搜索不到的，点击下面，反馈客服 !
			</view>
		</view>
		<!-- #endif -->
		<button @click="guanzhu(1)" class="select">
			反馈客服
		</button>
		<!-- #ifdef MP-WEIXIN -->
		<view class="no-list-data">
			-- 求资源的，搜索不到的，点击上面，反馈客服 ! --
		</view>
		<!-- #endif -->
		<!--免责声明弹窗-->
		<view class="cu-modal" :class="modalName=='mzModal'?'show':''">
			<view style="border-radius: 30rpx;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 50rpx;" class="content">版权免责声明</view>
				</view>
				<view class=" bg-white">
					<view style="font-size: 33rpx;color: #6a6a6a;padding: 40rpx 60rpx 60rpx 60rpx;">
					</view>
					<button @tap="hideModal" style="margin-bottom: 50rpx;width: 55%;height: 90rpx;font-size: 38rpx;"
						class="cu-btn bg-green">知道了</button>
				</view>
			</view>
		</view>
		<!--免责声明弹窗-->
		<view class="cu-modal" :class="modalName=='urlModal'?'show':''">
			<view style="border-radius: 30rpx;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 50rpx;" class="content">提示</view>
				</view>
				<view class=" bg-white">
					<view style="font-size: 33rpx;color: #6a6a6a;padding: 40rpx 60rpx 60rpx 60rpx;">
						邀请链接已复制，快去分享吧 !
					</view>
		
					<button @tap="hideModal" style="margin-bottom: 50rpx;width: 55%;height: 90rpx;font-size: 38rpx;"
						class="cu-btn bg-green">确认</button>
				</view>
			</view>
		</view>
		<!--弹窗-->
		<view class="cu-modal" :class="modalName=='imgModal'?'show':''">
			<view style="border-radius: 30rpx; background-color: white;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 40rpx;" class="content">{{modelTip}}</view>
					<view class="action" @tap="modalName = null">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" bg-white">
					<image style="width: 75%;margin-top: 20rpx;" mode="widthFix" show-menu-by-longpress="true"
						:src="modelSrc"></image>
						<view class="tipinfo">微信小程序</view>
					<view class="tipinfo2">Tip：长按图片识别 / 保存</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getNotice
	} from "@/api/app/index.js"
	let videoAd = null;
	export default {
		data() {
			return {
				adId:null,
				modalName: null,
				modelTip: "",
				modelSrc: ""
			};
		},
		onShareAppMessage() {
			return {
				title: uni.getStorageSync("miniHomeShaer").remarks,
				imageUrl: uni.getStorageSync("miniHomeShaer").title,
				path: 'pages/index',
			}
		},
		onShareTimeline() {
			return {
				title: uni.getStorageSync("miniHomeShaer").remarks,
				query: {},
				imageUrl: uni.getStorageSync("miniHomeShaer").title
			}
		},
		onShow() {

		},
		onLoad() {
			this.adId = uni.getStorageSync('adId');
		},
		methods: {
			copyUrl(){
				var that = this
				uni.setClipboardData({
					data: "全网 9999+ 短剧/电影/电视剧/🈲播等资源免费搜索，免费看。访问后面的链接即可使用 https://dj.emoboy.vip",
					showToast: false,
					success: function() {
						that.modalName = 'urlModal'
					}
				});
			},
			imgShow(type) {
				this.$tab.navigateTo('/pages/mine/imgShow?type='+type)
			},
			modeImgShow(val){
				if(val == 1){
					this.modelTip="资源共享"
					this.modelSrc="https://simgs.emoboy.vip/appimg/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%A0%81.jpg"
				}else{
					this.modelTip="去除水印"
					this.modelSrc="https://simgs.emoboy.vip/appimg/%E6%B0%B4%E5%8D%B0.jpg"
				}
				
				this.modalName = 'imgModal'
			},
			shuiyin() {
				this.$tab.navigateTo('/pages/shuiyin/delWatermark')
				// uni.navigateToMiniProgram({
				// 	appId: 'wx48267eecee85d5c3',
				// 	path: 'pages/tool/shuiyin', //需要打开的目标路径
				// 	extraData: {
				// 	},
				// 	envVersion: 'release', //小程序版本：develop（开发版），trial（体验版），release（正式版）
				// 	success(res) {
				// 		// 打开成功
				// 	}
				// })
			},
			myBlog(){
				uni.navigateToMiniProgram({
					appId: 'wx48267eecee85d5c3',
					path: '', //需要打开的目标路径
					extraData: {
					},
					envVersion: 'release', //小程序版本：develop（开发版），trial（体验版），release（正式版）
					success(res) {
						// 打开成功
					}
				})
			},
			copy(){
				uni.showToast({
				    title: '敬请期待',
				    //将值设置为 success 或者直接不用写icon这个参数 error none
				    icon: 'none',
				    //显示持续时间为 2秒
				    duration: 2000
				})
			},
			mzModalShow() {
				//this.modalName = "mzModal"
				this.$tab.navigateTo('/pages/mine/mzsm')
			},
			hideModal() {
				this.modalName = null
			},
			guanzhu(type) {
				this.$tab.navigateTo('/pages/mine/guanzhu')
			},


		}
	};
</script>

<style lang="less" scoped>
	.tipinfo {
		width: 60%;
		height: 48rpx;
		border-radius: 60rpx;
		text-align: center;
		margin-left: 20%;
		line-height: 80rpx;
		color: #ae67d6;
		font-size: 30rpx;
		font-weight: 600;
	}
	.tipinfo2 {
		width: 60%;
		height: 80rpx;
		border-radius: 60rpx;
		text-align: center;
		margin-left: 20%;
		line-height: 80rpx;
		margin-bottom: 40rpx;
		color: #ae67d6;
		font-size: 30rpx;
		font-weight: 600;
	}
	.select {
		width: 64%;
		margin-left: 18%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background-color: #78B7E0;
		color: white;
		border-radius: 15rpx;
		font-size: 35rpx;
		font-weight: 600;
		margin-top: 40rpx;
	}

	.kefu {
		width: 49%;
		background-color: white;
	}

	/* 列表没有数据 */
	.no-list-data {
		text-align: center;
		margin-bottom: 100rpx;
		color: #b3b3b3;
		font-size: 24upx;
		margin: 25rpx 20rpx 0rpx 20rpx;
	}

	.no-list-data2 {
		text-align: center;
		margin-bottom: 100rpx;
		color: #b3b3b3;
		font-size: 24upx;
		margin: 10rpx 40rpx 40rpx 40rpx;
	}

	button::after {
		border: none;
	}

	.blogui-img {
		height: 100%;
		width: 100%;
	}

	/* 功能列表 */
	.metergasis-li-rgth {
		width: 50upx;
		height: 50upx;
		overflow: hidden;
		flex-shrink: 0;
		position: absolute;
		right: 0upx;
		top: 50%;
		transform: translate(0%, -50%);
	}

	.metergasis-li-h {
		grid-row: 1;
		margin-left: 30upx;
		font-size: 30upx;
	}

	.metergasis-li-h2 {
		grid-row: 1;
		margin-left: 30upx;
		font-size: 25upx;
		color: #ADADAD;
		margin-left: auto;
		margin-right: 10rpx;
	}

	.metergasis-li-img {
		height: 52upx;
		width: 52upx;
		border-radius: 100upx;
		flex-shrink: 0;
	}

	.metergasis-li {
		padding: 24upx 32upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
	}

	.metergasis {
		background-color: #FFFFFF;
		border-radius: 16upx;
		margin: 2upx 0upx;
		padding: 2upx;
		margin-top: 20rpx;
	}

	.my {
		padding: 30rpx;

		.mt30 {
			margin-top: 30rpx;
		}

		.my_bg {
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			width: 100%;
		}

		.header_cell {
			margin-top: 100rpx;

			.user_info {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.user_photo {
					width: 120rpx;
					height: 120rpx;
					box-shadow: 0px 0px 10rpx 1px rgba(0, 0, 0, 0.1);
					border-radius: 50%;
					background-color: white;
					margin-right: 20rpx;
				}
			}

			.auth_btn {
				margin: 50rpx auto;
				text-align: center;

				&>button {
					box-shadow: 3px 3px 10rpx 1px rgba(0, 0, 0, 0.2);
					padding-left: 50rpx;
					padding-right: 50rpx;
				}
			}

			.vip_cell {
				margin-top: 40rpx;
				width: 690rpx;
				height: 150rpx;
				background-image: url('https://simgs.emoboy.vip/appimg/bolang.gif');
				background-size: 100% 100%;
				color: white;
				padding: 0 30rpx;

				.invate_btn {
					background-color: rgb(241, 198, 142);
					box-shadow: 3px 3px 10rpx 1px rgba(241, 198, 142, 0.5);
					width: 150rpx;
					color: rgb(99, 71, 56);
					font-weight: bold;
				}
			}
		}

		.cell_1_icon {
			width: 100rpx;
			height: 100rpx;
			background-color: #f4f2f7;
			border-radius: 50%;
			font-size: 50rpx;
			margin: 0 auto;
			margin-bottom: 15rpx;
		}

		.cell_2 {
			&>view {
				background-color: white;
				border-radius: 15rpx;
				text-align: center;
				width: 48%;
				padding: 30rpx 0;
			}

			.cell_2_icon {
				font-size: 60rpx;
				margin-bottom: 15rpx;
			}
		}

		.cell_3_icon {
			font-size: 50rpx;
			margin-bottom: 20rpx;
		}

		.cell_4 {

			&>view,
			navigator {
				padding: 20rpx 0;
			}
		}
	}
</style>