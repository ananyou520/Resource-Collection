<template>
	<view>
		<!-- #ifdef H5 -->
		<view style="padding: 40rpx;">
			<view style="text-align: center;font-size: 40rpx;">
				<text style="float: left;" @click="back()" class="cuIcon-back backbut"></text>
				<text style="margin-right: 55rpx;font-size: 35rpx;font-weight: 600;">今日更新</text>
			</view>
		</view>
		<!-- #endif -->
		<view>
			<view class="recommend-info">
				<view class="recommend-title">
					<view class="title">
						<image src="https://simgs.emoboy.vip/static/imgs/wntj_title.png" mode=""></image>
					</view>
				</view>
				
				<view class="goods-list">
					<view class="list" v-for="(item, index) in dataList" @click="toName(item.name)" :key="index">
						<view style="background-color: white;overflow: hidden;border-radius: 10rpx;" v-if="item.ad == 1 && adId">
							<view style="overflow: hidden;">
								<ad-custom :unit-id="adId" ad-intervals="30" ></ad-custom>
							</view>
						</view>
						<view v-else>
							<view class="pictrue">
								<image :src="showImg"></image>
							</view>
							<view class="title-tag">
								<view class="tag">
									<text>最新</text>
									{{ item.name}}
								</view>
							</view>
						</view>
						
						<!-- <view class="price-info">
							<view class="user-price">
								<text class="cuIcon-time min"></text>
								<text style="font-size: 26rpx;margin-left: 20rpx;">{{ item.addtime }}</text>
							</view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	import {
		getDay
	} from "@/api/app/index.js"
	export default {
		data() {
			return {
				dataList:[],
				type: 0,
				showImg: "/static/images/dj.png",
				adId: null,
				noAdNumber:0,
				shaerImg: "/static/images/dj.png",
			}
		},
		onShareAppMessage() {
			return {
				title: "今日全网已更新"+(this.dataList.length - this.noAdNumber)+"部短剧视频，快一起来看看吧！",
				imageUrl: this.shaerImg,
				path: 'pages/upday/upday',
			}
		},
		onShareTimeline() {
			return {
				title: "今日全网已更新"+(this.dataList.length - this.noAdNumber)+"部短剧视频，快一起来看看吧！",
				query: {},
				imageUrl: this.shaerImg
			}
		},
		onShow() {
			if(uni.getStorageSync("upDayImg")){
				this.showImg = uni.getStorageSync("upDayImg")
			}
			if(uni.getStorageSync("upDayAd")){
				this.adId = uni.getStorageSync("upDayAd")
			}
			if(uni.getStorageSync("upDayShaer")){
				this.shaerImg = uni.getStorageSync("upDayShaer")
			}
			//#ifdef MP-WEIXIN
			if(uni.getStorageSync("isNoData")){
				this.type = 1
				this.dataList=[
					{
						playletName: '我的轻创业表格',
						consumeNum: 12
					},
					{
						playletName: '我的网络创业表格',
						consumeNum: 8
					},
					{
						playletName: '本小程序功能使用教程表格',
						consumeNum: 3
					},
					{
						playletName: '我的wps表格资料表格',
						consumeNum: 2
					}
				]
			}else{
				this.type = 0
				this.getDataList()
			}
			//#endif
			//#ifndef MP-WEIXIN
			this.getDataList()
			//#endif
			
		
		},
		methods: {
			getDataList() {
				var that = this;
				getDay().then(res => {
					that.dataList = res.data
					//#ifdef MP-WEIXIN
					if(this.adId){
						that.dataList.splice(3, 0, {ad:1});
						that.noAdNumber = 1
					}
					//#endif
				})
			},
			toName(name){
				if(this.type == 0){
					uni.setStorageSync("searchValue",name)
					uni.switchTab({
						url: '/pages/index'
					});
				}
				
			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	$base: #fe3b0f; // 基础颜色
	$assist-clor: #ff4e17; // 辅助颜色
	$change-clor: #fc603a; // 渐变色
	$floor-clor: #fafafa; // 底部颜色
	$price-clor: #ff0000; // 价格颜色
	/* 为你推荐 */
	.recommend-info {
		width: 100%;
		background-color: #f2f2f2;
	
		.recommend-title {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100rpx;
	
			.title {
				display: flex;
				align-items: center;
	
				image {
					width: 416rpx;
					height: 40rpx;
				}
			}
		}
	
		.goods-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 30rpx;
	
			.list {
				width: 49%;
				height: 460rpx;
				margin-bottom: 20rpx;
				background-color: #ffffff;
				border-radius: 10rpx;
				overflow: hidden;
	
				.pictrue {
					display: flex;
					justify-content: center;
	
					image {
						height: 350rpx;
						width: 350rpx;
					}
				}
	
				.title-tag {
					// display: flex;
					height: 100rpx;
					padding: 20rpx;
	
					.tag {
						float: left;
						margin-right: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						white-space: normal;
						font-size: 26rpx;
						line-height: 40rpx;
	
						text {
							font-size: 24rpx;
							color: #ffffff;
							padding: 4rpx 16rpx;
							background: linear-gradient(to right, $base, $change-clor);
							border-radius: 6rpx;
							margin-right: 10rpx;
						}
					}
				}
	
				.price-info {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: space-between;
					padding: 0 20rpx;
					height: 80rpx;
	
					.user-price {
						display: flex;
						align-items: center;
	
						text {
							color: $price-clor;
						}
	
						.min {
							font-size: 28rpx;
						}
	
						.max {
							font-size: 32rpx;
							margin-left: 10rpx;
						}
					}
	
					.vip-price {
						display: flex;
						align-items: center;
	
						image {
							width: 26rpx;
							height: 26rpx;
							margin-right: 10rpx;
						}
	
						text {
							color: #fcb735;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}

</style>
