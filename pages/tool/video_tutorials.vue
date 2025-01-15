<template>
	<view>
		<!-- #ifdef H5 -->
		<view style="padding: 40rpx;">
			<view style="text-align: center;font-size: 40rpx;">
				<text style="float: left;" @click="back()" class="cuIcon-back backbut"></text>
				<text style="margin-right: 55rpx;font-size: 35rpx;font-weight: 600;">使用教程</text>
			</view>
		</view>
		<!-- #endif -->
		<view v-if="videoTutorials">
			<video :src="videoTutorials" class="video" @error="videoErrorCallback"></video>
			<view>
				<image style="width: 100%;" mode="widthFix" :src="imgTutorials"></image>
			</view>
		</view>
		
		<view v-else style="background-color: white;padding: 40rpx;">
			使用指南--请花1分钟仔细看完哦<br/>
			使用时只需要输入关键字，如《长公主驾到》就尤搜【长公主】或【公主】即可，以防错字搜不到!<br/>
			使用方法:点击复制链接--复制到夸克网盘打开--保存到自己网盘按文件名排序自动顺序播放<br/>
			资源原文件都是高清以上，清晰度上不去是网盘限制，开通夸克会员即可解锁;非会员下载观看，高清晰度。<br/> 
			也是
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<ad-custom v-if="adId" :unit-id="adId" ad-intervals="30"></ad-custom>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoTutorials: null,
				imgTutorials: null,
				adId:null,
			}
		},
		onShow() {
			if(uni.getStorageSync("videoTutorials")){
				this.videoTutorials = uni.getStorageSync("videoTutorials")
			}
			if(uni.getStorageSync("imgTutorials")){
				this.imgTutorials = uni.getStorageSync("imgTutorials")
			}
		},
		onLoad() {
			this.adId = uni.getStorageSync('adId3');
		},
		methods: {
			videoErrorCallback: function(e) {
				// console.log(e)
				uni.showModal({
					content: e.mp["@warning"],
					showCancel: false
				})
			},
			back() {
				uni.navigateBack()
			}
			
		}
	}
</script>

<style>
	page {
		background-color: #fff !important;
	}
	.video {
		width: 100%;
	}

</style>
