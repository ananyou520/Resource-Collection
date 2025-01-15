<template>
	<view class="page">
		
		<view :style="{height:pageHeight+'px'}"></view>
		<view class="tab">
			<text v-for="v in tabs" :key="v.key" :class="{'tab-active' : v.key === current}" @click="tabChange(v)">
				{{v.name}}
			</text>
		</view>

		<view class="ranking">
			<view class="rangking-title">
				<text>排名</text>
				<text>资源名称</text>
				<text style="margin-right: 17rpx;">热度</text>
			</view>
			<view class="ranking-list">
				<!-- #ifdef H5 -->
				<view @click="toSearch(item)" class="ranking-list-item" v-if="key < showunm" v-for="(item, key) in dataList" :key="key">
				<!-- #endif -->
					<!-- #ifndef H5 -->
					<view @click="toSearch(item)" class="ranking-list-item" v-if="key < showunm" v-for="(item, key) in dataList" :key="key">
					<!-- #endif -->

						<view v-if="key < 3" class="ranking-list-number">
							<image :src="'/static/page6/' + (key + 1) + '.png'"></image>
						</view>
						<view v-else class="ranking-list-number">
							<text>{{key + 1}}</text>
						</view>
						<view class="ranking-list-nickname">
							<!-- <image :src="'/static/avatar/' + (key % 7) + '.png'"></image> -->
							<view class="name">{{item.playletName}}</view>
							<view  >
								<view style="display: inline-block;" v-for="(tags, key) in item.playletTags">
									<view v-if="key == 0" class='cu-tag round tags bg-orange'>{{tags}}</view>
									<view v-else-if="key == 1" class='cu-tag round tags bg-cyan'>{{tags}}</view>
									<view v-else-if="key == 2" class='cu-tag round tags bg-olive'>{{tags}}</view>
									<view v-else-if="key == 3" class='cu-tag round tags bg-green'>{{tags}}</view>
									<view v-else-if="key == 4" class='cu-tag round tags bg-blue'>{{tags}}</view>
									<!-- <view v-else class='cu-tag round tags'>{{tags}}</view> -->
								</view>
							</view>
							<!-- <view class="name2">{{item.playletTags.join()}}</view> -->
						</view>
						<text class="ranking-list-score">{{million(item.consumeNum)}}</text>
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view style="border-radius: 30rpx;" class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view style="color: black;font-size: 38rpx;margin-top: 50rpx;" class="content">提示</view>
					</view>
					<view class=" bg-white">
						<view style="font-size: 33rpx;color: #6a6a6a;padding: 40rpx 60rpx 60rpx 60rpx;">
							观看链接已复制到您的粘贴板中，请复制到浏览器中获取，链接中的资源可能存在排序混乱，画质模糊和观看时长限制，建议您转存至自己的网盘中使用即可解决此等问题<!-- (链接有效期为30分钟) -->
						</view>

						<button @tap="hideModal" style="margin-bottom: 50rpx;width: 55%;height: 90rpx;font-size: 38rpx;"
							class="cu-btn bg-green">知道了</button>
					</view>
				</view>
			</view>
			<button v-if="isShowBut" @click="more()" style="width: 26%;margin-left: 37%;margin-bottom: 30rpx;" class="cu-btn round line-pink" >查看更多</button>
			<view class="no-list-data">
				-- 温馨提示 --
			</view>
			<view v-if="type == 0" class="no-list-data2">
				点击排行榜内容可快速跳转此热门资源
			</view>
		</view>
</template>

<script>
	import {
		listDuanju,
		duanjuNumber,
		getConfigKey,
		updateDuanju,
		getNotice,
		thisRanking,
		getHot
	} from "@/api/app/index.js"
	export default {
		data() {
			return {
				showunm:10,
				isShowBut: true,
				current: 1,
				tabs: [
					// {
					// 	name: '日榜',
					// 	key: 1
					// },
					// {
					// 	name: '周榜',
					// 	key: 2
					// },
					{
						name: '全网排行榜',
						key: 1
					},
					{
						name: '本站排行榜',
						key: 2
					}
				],
				pageHeight: null,
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					bjName: null,
					isShow: 1,
					orderByDesc: 'copy_number'
				},
				dataList: [],
				modalName: "",
				type: 0
			}
		},
		onShow() {
			this.current = 1
			this.queryParams.pageNum = 1
			uni.getSystemInfo({
				success: (res) => {
					// 状态栏的高度
					this.pageHeight = res.statusBarHeight;
				}
			});
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
			more(){
				var that = this
				if(this.current == 1){
					var isShowunm = this.showunm+5
					if(isShowunm <= 80){
						this.showunm = isShowunm
					}
					if(this.showunm == 80){
						this.isShowBut = false
					}
				}else{
					this.queryParams.pageNum++
					thisRanking(this.queryParams).then(response => {
						// for(var i=0; i<response.data.length;i++){
						// 	that.dataList.push(response.data[i])
						// }showunm
						that.dataList = that.dataList.concat(response.data)
						that.showunm = that.queryParams.pageSize * that.queryParams.pageNum
						console.log(that.dataList)
					})
				}
				
			},
			toSearch(val){
				if(this.type == 0){
					uni.setStorageSync("searchValue",val.playletName)
					uni.switchTab({
						url: '/pages/index'
					});
				}
			},
			copy(val) {
				var that = this;
				uni.setClipboardData({
					data: val.djUrl,
					showToast: false,
					success: function() {
						that.modalName = "Modal"
					}
				});
			},
			toUrl(val) {
				uni.showModal({
					title: '提示',
					content: '保存到网盘，可无限制看 !',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							// 执行确认后的操作
							window.location.href = val.djUrl
						} else {
							// 执行取消后的操作
						}
					}
				})
			},
			hideModal() {
				this.modalName = null
			},
			getDataList() {
				var that = this;
				getHot().then(res => {
					that.dataList = res.data.content
				})
				// uni.request({
				// 	url: 'https://duanju.abya.cn/api.php',
				// 	method: 'GET',
				// 	success: (res) => {
				// 		that.dataList = res.data.content
				// 	},
				// 	fail: (err) => {
				// 		console.error('获取失败', err);
				// 	}
				// });
			},
			tabChange(e) {
				if(this.type == 0){
					var that = this
					this.current = e.key;
					if(this.current == 1){
						this.getDataList()
					}else{
						thisRanking(this.queryParams).then(response => {
							that.dataList = response.data
						})
					}
				}
				
				
			},
			million(value){//过万处理
			  let num;
			 if(value > 9999){//大于9999显示x.xx万
			    num=(Math.floor(value/1000)/10) + ' w';
			 }else if( value < 9999 && value>-9999){
			   num=value
			 }else if(value<-9999){//小于-9999显示-x.xx万
			
			    num = -(Math.floor(Math.abs(value)/1000)/10)+' w'
			 }
			 return num;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #5471f4;
	}

	.no-list-data {
		text-align: center;
		margin-bottom: 100rpx;
		color: #b3b3b3;
		font-size: 24upx;
		margin: 0rpx 40rpx 0rpx 40rpx;
	}

	.no-list-data2 {
		text-align: center;
		margin-bottom: 100rpx;
		color: #b3b3b3;
		font-size: 24upx;
		margin: 10rpx 40rpx 20rpx 40rpx;
	}

	.name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
		font-size: 30rpx;
	}
	.tags {
		height: 35rpx;
		line-height: 35rpx;
		margin-top: 10rpx;
		margin-right: 8rpx;
		font-size: 18rpx;
	}

	.page {
		padding-bottom: 20rpx;

		.tab {
			width: 700rpx;
			margin: auto;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			padding: 25rpx;

			text {
				display: block;
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				color: #fff;
				font-size: 14px;
			}

			.tab-active {
				font-size: 16px;
				font-weight: bold;
				position: relative;

				&::after {
					content: '';
					width: 120rpx;
					height: 6rpx;
					border-radius: 4rpx;
					background: #fff;
					position: absolute;
					left: 40rpx;
					bottom: 0;
				}
			}

		}

		.ranking {
			width: 700rpx;
			border-radius: 30rpx;
			margin: auto;
			box-sizing: border-box;
			padding: 20rpx;

			.rangking-title {
				display: flex;
				font-size: 12px;
				color: #f0f0f0;
				height: 50rpx;
				line-height: 50rpx;

				text {
					display: block;
					width: 100rpx;
					text-align: center;

					&:nth-child(2) {
						box-sizing: border-box;
						padding-left: 20rpx;
						text-align: left;
						width: calc(100% - 200rpx);
					}
				}
			}

			.ranking-list-item {
				height: 125rpx;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				font-size: 14px;
				background: rgba(255, 255, 255, 0.7);
				margin: 16rpx 0;

				&:nth-child(1) {
					background: #efb300;
				}

				&:nth-child(2) {
					background: #b4b0b0;
				}

				&:nth-child(3) {
					background: #e37d19;
				}

				.ranking-list-number {
					width: 100rpx;
					color: #777;
					display: flex;
					justify-content: center;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}

				.ranking-list-score {
					display: block;
					width: 22%;
					color: #555;
					font-size: 16px;
					text-align: right;
				}

				.ranking-list-nickname {
					// display: flex;
					align-items: center;
					width: 60%;
					box-sizing: border-box;
					padding-left: 20rpx;

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					text {
						width: auto;
					}
				}
			}
		}
	}
</style>