<!--
 * @Date: 2022-09-29 14:32:17
 * @LastEditTime: 2022-09-29 14:42:34
 * @Description: Do not edit
-->
<template name="Tips">
	<view>
		<!-- #ifdef H5 -->
		<view class="tipsWrap2" v-if="showTips" :style="{'top':top,'left': paddingLeft}">
			<view class="tip-top">
				<view class="top-img">
					<img class="tipsimg" src="https://simgs.emoboy.vip/static/images/sc.png" alt="">
				</view>
				<view class="top-text">
					<text>添加到我的收藏</text>
					<text>访问网站更便捷</text>
				</view>
			</view>
			<view class="tip-bottom2" @click="closeTips">
				我知道了
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view class="tipsWrap" v-if="showTips" :style="{'top':top,'left': paddingLeft}">
			<view class="tip-top">
				<view class="top-img">
					<img class="tipsimg" src="/static/images/tips.png" alt="">
				</view>
				<view class="top-text">
					<text>添加到我的小程序</text>
					<text>访问小程序更便捷</text>
				</view>
			</view>
			<view class="tip-bottom" @click="closeTips">
				我知道了
			</view>
		</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	export default {
		name: "Tips",
		data() {
			return {
				isFirst: true, //是否首次
				showTips: false, //是否展示
				top: '',
				right: '',
				paddingLeft: '',
			};
		},
		/**
		 * @description: onReady时动态获取胶囊的位置，需求为背景图对准三个点的中心
		 * @param {*} showTips 
		 * @param {*} first_init 
		 * @return {*}
		 */
		mounted() {
			this.getTopAndLeft()
			const _that = this;
			_that.showTips = true;
			// //获取本地缓存
			let first_init = uni.getStorageSync('isFirst');
			//console.log(first_init)
			if (first_init) {
				_that.showTips = false;
			} else {
				_that.showTips = true;
			}
		},
		methods: {
			/**
			 * @description:适配机型，动态获取胶囊的位置，动态赋值提示框的高度 
			 * @return {menuButtonInfo}  微信小程序的胶囊位置信息
			 */
			getTopAndLeft() {
				//#ifdef H5
				this.paddingLeft = '425rpx'
				//#endif
				//#ifndef H5
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect() // 获取胶囊的位置
				//console.log(menuButtonInfo, 'menuButtonInfo')
				//this.top = `${menuButtonInfo.bottom + 4}px` // 赋值高度
				this.right = menuButtonInfo.right + 'px' // 赋值left
				/**
				 * 区分安卓和ios系统  安卓和ios胶囊真机差16px
				 */
				if (['ios'].includes(uni.getSystemInfoSync().platform)) {
					this.paddingLeft = `${menuButtonInfo.left - 108}px`
				} else {
					this.paddingLeft = `${menuButtonInfo.left - 92}px` // 193为箭头到左侧的宽度
				}
				//#endif
				
			},

			/**
        * @description: 此方法可在父组件中调用，达到关闭弹窗效果 
				* onShow () {
						if (uni.getStorageSync('isFirst')) {
							this.$refs.tips.closeTips()
						}
					},
        * @return {*}
        */
			closeTips() {
				const _that = this;
				_that.showTips = false;
				uni.setStorage({
					key: 'isFirst',
					data: '0'
				})
			},
		}
	}
</script>

<style lang='scss' scoped>
	.tipsWrap {
		position: fixed;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 340rpx;
		height: 209rpx;
		display: flex;
		// 替换图片
		background: url(/static/images/tipsbg.png) no-repeat;
		background-size: 340rpx 209rpx;
		margin-top: 8rpx;
	}
	.tipsWrap2 {
		position: fixed;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 310rpx;
		height: 209rpx;
		display: flex;
		// 替换图片
		background: url(https://simgs.emoboy.vip/static/images/tipsbg.png) no-repeat;
		background-size: 390rpx 209rpx;
		border-radius: 20rpx;
		margin-top: 8rpx;
	}

	.tip-top {
		height: 129rpx;
		width: 100%;
		display: flex;

		.top-img {
			width: 84rpx;
			margin-top: 6rpx;
			height: 130rpx;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;

			.tipsimg {
				height: 64rpx;
				width: 64rpx;
				padding-left: 6rpx;
				padding-top: 6rpx;
			}
		}

		.top-text {
			display: flex;
			flex-flow: column;
			padding-top: 38rpx;
			margin-left: -2rpx;
			color: #FFFFFF;
			font-size: 28rpx;
			font-weight: 400;
			line-height: 38rpx;
			letter-spacing: -1rpx;
		}

		// .top-text text:nth-child(2){
		// 	padding-top: 3px;	
		// }
	}

	.tip-bottom {
		border-top: 2rpx solid rgba(105, 103, 103, .16);
		margin-top: -2rpx;
		height: 80rpx;
		width: calc(80% + 8rpx);
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFC75A;
		font-size: 26rpx;
		font-weight: 600;
	}
	.tip-bottom2 {
		border-top: 2rpx solid rgba(105, 103, 103, .16);
		margin-top: -2rpx;
		height: 80rpx;
		width: calc(80% + 8rpx);
		display: flex;
		justify-content: center;
		align-items: center;
		color: #0C86EA;
		font-size: 26rpx;
		font-weight: 600;
	}

	.closeIcon {
		font-size: 20rpx !important;
		margin-left: 10rpx;
		padding: 0 8rpx;
		background: #FFFFFF;
		border-radius: 12rpx;
	}
</style>