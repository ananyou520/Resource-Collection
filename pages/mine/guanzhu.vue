<template>
	<div class="app-page">
		<!-- 个人信息部分 -->
		<div class="profile">
			<!-- 头像 -->
			<div class="avatar">
				<img src="https://simgs.emoboy.vip/static/images/basicprofile.png" alt="Avatar" class="avatar-img">
			</div>
			<!-- 昵称 -->
			<div class="nickname">橘子搜搜</div>
			<!-- 个人简介 -->
			<div class="bio">如果爱意难平，那就把它藏在心底吧！</div>
		</div>
		<!-- #ifdef H5 -->
		<text  @click="back()" class="cuIcon-back backbut"></text>
		<!-- #endif -->
		<!-- 联系人部分 -->
		<div class="contact">
			<!-- 循环渲染联系人列表 -->
			<div class="item" v-for="item in contacts" :key="item.id"
				@click="copyInfo(item.info, item.name, item.name1, item.id)">
				<!-- 联系人条目 -->
				<div class="icon-info">
					<!-- 自定义图标 -->
					<img :src="item.icon" alt="Custom Icon" class="custom-icon">
					<!-- 联系人名称 -->
					<div class="name">{{ item.name }}</div>
					<!-- 联系人名称 -->
					<div class="name1">{{ item.name1 }}</div>
					<!-- 联系人信息 -->
					<div class="info">{{ item.info }}</div>
					<div v-if="item.id ==1 || item.id ==2" class="copy"><text class="cuIcon-qrcode"></text></div>
					<div v-if="item.id ==3 || item.id ==4" class="copy"><text class="cuIcon-copy"></text></div>

				</div>
			</div>
		</div>
		<!--弹窗-->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view style="border-radius: 30rpx; background-color: white;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 40rpx;" class="content">{{modelTip}}</view>
					<view class="action" @tap="modalName = null">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" bg-white">
					<image style="width: 75%;" mode="widthFix" show-menu-by-longpress="true"
						:src="modelSrc"></image>
					<view class="tipinfo">Tip：长按图片识别 / 保存</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='tipModal'?'show':''">
			<view style="border-radius: 30rpx;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: red;font-size: 38rpx;margin-top: 50rpx;" class="content">提示</view>
				</view>
				<view class=" bg-white">
					<view style="font-size: 33rpx;color: #6a6a6a;padding: 40rpx 60rpx 60rpx 60rpx;">
						{{tipStr}}
					</view>
					<button @tap="modalName = null" style="margin-bottom: 50rpx;width: 55%;height: 90rpx;font-size: 38rpx;"
						class="cu-btn bg-green">知道了</button>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				modelSrc:"",
				modelTip:"",
				contacts: [{
						id: 1,
						icon: "https://simgs.emoboy.vip/static/images/qq.png",
						name: "企鹅",
						name1: ":",
						info: "1149297946"
					},
					{
						id: 2,
						icon: "https://simgs.emoboy.vip/static/images/wechat.png",
						name: "微信",
						name1: ":",
						info: "yimoziyuan666"
					},
					{
						id: 3,
						icon: "https://simgs.emoboy.vip/static/images/email.png",
						name: "邮箱",
						name1: ":",
						info: "zhouanhongit@163.com"
					},
					{
						id: 4,
						icon: "https://simgs.emoboy.vip/static/images/blog.png",
						name: "博客",
						name1: ":",
						info: "https://www.emoboy.vip"
					}
				],
				modalName: null,
				tipStr: ''
			};
		},
		onLoad(val) {
			if(val.type == 1){
				this.tipStr = '此页面选择一个作者的联系方式，反馈告知作者马上处理 ！！！'
				this.modalName = 'tipModal'
			}
		},
		methods: {
			copyInfo(info, name, name1, id) {
				if(id == 1){
					this.modelTip = "我的企鹅码"
					this.modelSrc = "https://simgs.emoboy.vip/appimg/QQ.png"
					this.modalName = "Modal"
				}else if(id == 2){
					this.modelTip = "我的微信码"
					this.modelSrc = "https://simgs.emoboy.vip/appimg/%E5%BE%AE%E4%BF%A1%E7%A0%81.png"
					this.modalName = "Modal"
				}
				uni.setClipboardData({
					data: info,
					success() {
						uni.showToast({
							title: `${name}已复制`,
							icon: 'success'
						});
					}
				});
			},
			back(val) {
				uni.navigateBack()
			},
		}
	};
</script>

<style scoped>
	.backbut {
		position: absolute;
		left: 20rpx;
		top: 50rpx;
		font-size: 50rpx;
		color: #fff;
	}
	.tipinfo {
		width: 60%;
		height: 80rpx;
		border-radius: 60rpx;
		text-align: center;
		/* border: 3rpx solid #ae67d6; */
		margin-left: 20%;
		line-height: 80rpx;
		margin-bottom: 40rpx;
		color: #ae67d6;
		font-size: 30rpx;
		font-weight: 600;
	}

	.app-page {
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: 0rpx;
	}

	.profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('https://v2.api-m.com/api/wallpaper?return=302');
		background-size: cover;
		background-position: center;
		height: 33vh;
	}

	.avatar {
		width: 100px;
		height: 100px;
		position: relative;
		box-sizing: border-box;
		border-radius: 50%;
		border: 1px solid #fff;
		box-shadow: 0 2px 24px rgba(0, 0, 0, 0.07);
		overflow: hidden;
		position: relative;
		top: 55px;
		left: 0px;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
	}

	.nickname {
		font-size: 20px;
		position: relative;
		top: 60px;
		color: #f3f3f3;
	}

	.bio {
		margin-top: 10px;
		position: relative;
		top: 62px;
		font-size: 16px;
		color: #f3f3f3;
	}

	.contact {
		border-top: 2px solid #f2f2f2;
		padding: 20px;
	}

	.item {
		border-radius: 12px;
		background-color: #fafafa;
		padding: 16px;
		margin-bottom: 10px;
	}

	.icon-info {
		display: flex;
		align-items: center;
	}

	.custom-icon {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}

	.name,
	.name1,
	.info {
		margin-right: 5px;
	}

	.copy {
		margin-left: auto;
		color: #1E90FF;
	}
</style>