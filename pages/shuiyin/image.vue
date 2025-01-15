<template>
	<view class="body">
		<view v-if="adUnitId" style="width: 94%; margin-left: 3%;">
			<ad-custom :unit-id="adUnitId"  ad-intervals="30" ></ad-custom>
		</view>
		<view class="contents">
			<view class="imagesContent">
				<view class="titleContent">
					<view class="title-content">
						<u--text bold size="18" color="#0081ff" text="图集"></u--text>
					</view>
					<view class="title-shadow">
						<u--text bold color="#0081ff" text="IMAGES"></u--text>
					</view>
				</view>
				<view class="imagesContent-images">
					<u-swiper @change="imageCurrentChange" imgMode="aspectFit" height="400" :list="imagesList"
						previousMargin="30" nextMargin="30" circular :autoplay="false" radius="5" current="imageCurrent"
						indicatorMode="dot" indicator indicatorInactiveColor="#3c9cff" indicatorActiveColor="red"
						bgColor="#ffffff"></u-swiper>
				</view>
				<view class="imagesContent-buttonGroup">
					<view class="imagesContent-buttonGroup-top">
						<view class="imagesContent-buttonGroup-left">
							<u-button @click="copyImageUrl" type="primary" plain text="复制链接"></u-button>
						</view>
						<view class="imagesContent-buttonGroup-right">
							<u-button @click="download(imagesList[imageCurrent])" type="primary" text="下载单张"></u-button>
						</view>
					</view>
					<view class="imagesContent-buttonGroup-bottom">
						<u-button @click="downloadAll" type="primary" text="下载全部"></u-button>
					</view>
				</view>
			</view>
			<view class="copywritingContent">
				<view class="titleContent">
					<view class="title-content">
						<u--text bold size="18" color="#0081ff" text="文案"></u--text>
					</view>
					<view class="title-shadow">
						<u--text bold color="#0081ff" text="TITLE"></u--text>
					</view>
				</view>
				<view class="copywritingContent-textarea">
					<u--textarea maxlength="180" height="140" v-model="copywriting" placeholder="文案内容"></u--textarea>
				</view>
				<view class="copywritingContent-button">
					<u-button @click="copyText(copywriting)" type="primary" text="复制文案"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addNewDownloadUrl
	} from "@/api/app/index.js"
	export default {
		data() {
			return {
				adUnitId:null,
				imageCurrent: 0,
				isOpenAd: false,
				videoAd_id: "",
				imagesList: [],
				copywriting: ""
			}
		},
		onLoad() {
			let _this = this;
			this.adUnitId = uni.getStorageSync("adId")
			uni.getStorage({
				key: 'analysisData',
				success: function(res) {
					_this.imagesList = res.data.pics
					_this.copywriting = res.data.title
				}
			})
		},
		methods: {
			imageCurrentChange(e) {
				let _this = this;
				_this.imageCurrent = e.current
			},
			copyImageUrl() {
				let _this = this;
				// console.log(this.imageCurrent)
				_this.copyText(_this.imagesList[_this.imageCurrent])
			},
			downloadAll() {
				let _this = this;
				for (let i = 0; i < _this.imagesList.length; i++) {
					_this.download(_this.imagesList[i])
				}
			},
			download(url) {
				let _this = this;
				
				const downloadTask = uni.downloadFile({
					url: url.replace('http://', 'https://'), //仅为示例，并非真实的资源
					success: (downloadRes) => {
						if (downloadRes.statusCode === 200) {
							console.log('下载成功');
							uni.saveImageToPhotosAlbum({
								filePath: downloadRes.tempFilePath,
								success() {
									uni.hideLoading()
									uni.showToast({
										icon: "success",
										title: "下载成功！"
									})
								},
								fail: function(err) {
									uni.hideLoading();
									console.log(err)
									if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
										err
										.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err
										.errMsg ===
										"saveImageToPhotosAlbum:fail authorize no response"
									) {
										// 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
										uni.showModal({
											title: '提示',
											content: '需要您授权保存相册',
											showCancel: false,
											success: modalSuccess => {
												uni.openSetting({
													success(settingdata) {
														console.log(
															"settingdata",
															settingdata)
														if (settingdata
															.authSetting[
																'scope.writePhotosAlbum'
															]) {
															uni.showModal({
																title: '提示',
																content: '获取权限成功,再次点击图片即可保存',
																showCancel: false,
															})
														} else {
															uni.showModal({
																title: '提示',
																content: '获取权限失败，将无法保存到相册哦~',
																showCancel: false,
															})
														}
													},
													fail(failData) {
														console.log("failData",
															failData)
													},
													complete(finishData) {
														console.log(
															"finishData",
															finishData)
													}
												})
											}
										})
									}
								}
							})
						}
					},
					fail: (err) => {
						uni.hideLoading()
						if (err.errMsg.includes("fail url not in domain list")) {
							uni.request({
								url: 'https://api.emoboy.vip/app/public/addNewDownloadUrl/' + url.replace(/^https?:\/\/(.*?)(:\d+)?\/.*$/, '$1'),
								method: 'GET',
								success: (res) => {
								},
								fail: (err) => {
								}
							});
							//addNewDownloadUrl(url.replace(/^https?:\/\/(.*?)(:\d+)?\/.*$/, '$1')).then(response => {}),
							uni.showModal({
								title: '提示',
								content: '因为微信限制，下载失败，可以通过浏览器链接下载，是否复制链接自行去浏览器下载？',
								success: (modalRes) => {
									if (modalRes.confirm) {
										_this.copyText(url)
									}
								}
							});
						} else {
							uni.showModal({
								title: '提示',
								content: '下载失败了',
								showCancel: false,
							})
						}

						// console.log(err)
					}
				});
				downloadTask.onProgressUpdate((downloadTaskRes) => {
					uni.showLoading({
						title: '下载进度' + downloadTaskRes.progress + '%',
						mask:true
					})
				})

			},
			copyText(text) {
				uni.setClipboardData({
					data: text,
					success: function(res) {
						uni.showToast({
							title: '复制成功',
						});
					},
					fail() {
						uni.showToast({
							icon: "error",
							title: '复制失败了'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $u-bg-color;
	}

	.ad-show {
		width: 100%;
	}

	.contents {
		padding: 20rpx 20rpx;
	}

	.imagesContent,
	.copywritingContent {
		margin-top: 30rpx;
		padding: 30rpx 20rpx;
		box-shadow: 3px 3px 4px rgba(26, 26, 26, 0.2);
		background-color: white;
		border-radius: 7px;
	}

	.titleContent {
		position: relative;
	}

	.title-shadow {
		position: absolute;
		bottom: -20rpx;
		font-style: italic;
		opacity: 0.4;
		padding-left: 10rpx;
	}

	.imagesContent-images,
	.copywritingContent-textarea {
		padding: 0 16rpx;
		margin-top: 40rpx;
	}

	.imagesContent-buttonGroup {
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 30rpx;
		display: flex;
		flex-direction: column;
	}

	.imagesContent-buttonGroup-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.imagesContent-buttonGroup-bottom,
	.copywritingContent-button {
		padding-top: 25rpx;
		width: 100%;
		box-shadow: 3px 3px 4px rgba(0, 102, 204, 0.2);
	}

	.imagesContent-buttonGroup-left,
	.imagesContent-buttonGroup-right {
		width: 45%;
		box-shadow: 3px 3px 4px rgba(0, 102, 204, 0.2);
	}
</style>