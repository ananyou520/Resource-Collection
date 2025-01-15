<template>
	<view class="body">
		<view class="course">
			<view class="course-title">
				<view class="title-content">
					<u--text bold size="18" color="#0081ff" text="使用教程"></u--text>
				</view>
				<view class="title-shadow">
					<u--text bold color="#0081ff" text="COURSE"></u--text>
				</view>
			</view>
			<view class="course-body">
				<view class="course-body-view">
					<view class="course-body-view-title">
						<u--text size="16" :text="courseTitle1"></u--text>
					</view>
					<view class="course-body-view-contents">
						<view class="introduction-content">
							<u--text size="14" :text="courseContent1"></u--text>
						</view>
						<view class="introduction-content-images">
							<view class="introduction-content-image">
								<u--image :showLoading="true" :src="showPic1_1" width="160px" height="160px"></u--image>
							</view>
							<view class="introduction-content-image">
								<u--image :showLoading="true" :src="showPic1_2" width="160px" height="160px"></u--image>
							</view>
						</view>
					</view>
				</view>
				<view class="course-body-view">
					<view class="course-body-view-title">
						<u--text size="16" :text="courseTitle2"></u--text>
					</view>
					<view class="course-body-view-contents">
						<view class="introduction-content">
							<u--text size="14" :text="courseContent2_1"></u--text>
						</view>
						<view class="introduction-content">
							<u--text size="14" :text="courseContent2_2"></u--text>
						</view>
						<view class="introduction-content">
							<u--text size="14" :text="courseContent2_3"></u--text>
						</view>
						<u--text type="error" size="14" :text="promptTitle"></u--text>
					</view>
				</view>
			</view>
		</view>
		<view class="problem">
			<view class="problem-title">
				<view class="title-content">
					<u--text bold size="18" color="#0081ff" text="常见问题"></u--text>
				</view>
				<view class="title-shadow">
					<u--text bold color="#0081ff" text="PROBLEM"></u--text>
				</view>
			</view>
			<view class="problem-body">
				<view v-for="(item,index) in proContentList" :key="index" class="problem-body-view">
					<view class="problem-body-view-title">
						<u--text size="16" :text="item.problemTitle"></u--text>
					</view>
					<view class="problem-body-view-contents">
						<view class="introduction-content">
							<u--text size="14" :text="item.problemContent"></u--text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseTitle1: "01 如何复制视频链接",
				courseContent1: "打开您的APP，然后点击分享，就会出现一个复制链接的选项，点击复制链接(注意：链接不要超过150字)，然后来到小程序，粘贴链接再点解析就可以去水印了。",
				showPic1_1: "https://www.myazurepicture.llgulugulu.top/api/picture/getImageByte?pid=075b593ed4c9000d027a9ce83936d815",
				showPic1_2: "https://www.myazurepicture.llgulugulu.top/api/picture/getImageByte?pid=8e2e0e22653ab150c40fb1c0a12ecc56",
				courseTitle2: "02 为什么下载失败",
				courseContent2_1: "由于手机系统及微信的安全机制，视频大小不能超过10M左右，所以超过这个大小的视频，需要解析成功后，复制无水印链接到浏览器下载。",
				courseContent2_2: "1、如果您是安卓手机，直接复制无水印链接，然后任意一个浏览器打开即可。",
				courseContent2_3: "2、如果您是苹果手机，需要下载软件 documents 才能在浏览器中进行下载视频。",
				promptTitle: "温馨提示：进入下载界面请及时下载！若退出重新进入需要花费新的积分！",
				proContentList: [{
						problemTitle: "1、无法下载视频？",
						problemContent: "请先授权保存到手机相册的权限。由于手机系统及微信的安全机制，视频大小不能超过10M左右，所以超过这个大小的视频，需要解析成功后，复制无水印链接到浏览器下载。"
					},
					{
						problemTitle: "2、为什么下载视频那么慢？",
						problemContent: "有些视频比较长，或者多人同时下载，会导致下载速度缓慢，可以点击旁边的【复制链接】按钮到手机浏览器上打开即可使用手机上的网速下载。"
					},
					{
						problemTitle: "3、提示域名不合法等无法下载视频？",
						problemContent: "因为微信小程序需要配置download域名，没有配置的则不能下载（在您遇到不能下载的时候，会记录此时的域名，后续会手动加上）。可以在解析成功后点击下载按钮旁边的【复制链接】按钮，粘贴到手机浏览器打开即可下载。"
					},
					{
						problemTitle: "4、为什么视频成功解析了还有水印？",
						problemContent: "视频自带的无法去除哦，如果这个视频在该平台APP直接播放是没有水印的，解析后却有水印请联系客服。"
					},
					{
						problemTitle: "5、为什么小程序突然不能使用了，显示网络错误？",
						problemContent: "因为每天的凌晨3点到3点半，系统会进行自我维护，这段时间暂时不可用；其他时间段不能用请联系客服。"
					},
				]
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $u-bg-color;
	}

	.course,
	.problem {
		padding: 20rpx 20rpx 5rpx 20rpx;
	}

	.course-title,
	.problem-title {
		position: relative;
	}

	.title-shadow {
		position: absolute;
		bottom: -20rpx;
		font-style: italic;
		opacity: 0.4;
		padding-left: 10rpx;
	}

	.course-body,
	.problem-body {
		padding-top: 10rpx;
	}

	.course-body-view,
	.problem-body-view {
		padding-top: 20rpx;
	}

	.course-body-view-title,
	.problem-body-view-title {
		padding-bottom: 6rpx;
	}

	.introduction-content {
		padding-top: 5rpx;
		padding-bottom: 5rpx;
		text-indent: 2em;
	}

	.introduction-content-images {
		display: flex;
		flex-direction: row;
	}

	.introduction-content-image {
		width: 50%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>