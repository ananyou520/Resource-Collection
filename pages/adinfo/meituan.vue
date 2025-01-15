<template>
	<view style=" height: 100%;">
		<text  @click="back()" class="cuIcon-back backbut"></text>
		<image show-menu-by-longpress="true" style="width: 750rpx;margin-top: 10rpx;" mode="widthFix" src="https://simgs.emoboy.vip/appimg/swiper/meituan1.png"></image>
		<!-- #ifdef MP-WEIXIN -->
		<view style="color: white;text-align: center;font-size: 40rpx;letter-spacing: 2rpx;">长按保存二维码，打开微信扫一扫</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view style="color: white;text-align: center;font-size: 40rpx;letter-spacing: 2rpx;">截图保存图片，打开微信扫一扫</view>
		<!-- #endif -->
		<view style="color: white;text-align: center;font-size: 30rpx;margin-top: 40rpx;margin-bottom: 20rpx;">
			注意：点击【限时】领【80元】券包，无需点击进群！
		</view>
		<image style="width: 60%;margin-left: 20%;"  mode="widthFix" src="https://simgs.emoboy.vip/appimg/swiper/meituan4.png"></image>
		<view style="color: white;text-align: center;margin-top: 3%;">具体活动内容以实际页面为准</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			back(val) {
				uni.navigateBack()
			},
		}
	}
</script>

<style>
	page {
		background-color: #fd5528
	}
	.backbut {
		position: absolute;
		left: 20rpx;
		top: 100rpx;
		font-size: 50rpx;
		color: #fff;
		z-index: 999;
	}

</style>
