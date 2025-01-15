<template>
	<view class="mzsm-body">
		<!-- #ifdef H5 -->
		<view style="text-align: center;font-size: 40rpx;">
			<text style="float: left;" @click="back()" class="cuIcon-back backbut"></text>
			<text style="margin-right: 55rpx;font-size: 35rpx;font-weight: 600;">版权免责声明</text>
		</view>

		<!-- #endif -->
		<view style="margin-top: 5rpx;">
			本程序《橘子搜搜》所有内容均由网络公开等<text style="color: red;">合法途径</text>整理而来，
			数据通过第三方搜索如<text style="color: red;">bing、谷歌、百度</text>等引擎获得原始数据，最终以非人工方式自动生成美化页面，用于精确呈现。
			该资料仅作为<text style="color: red;">阅读交流学习使用，并无任何商业目的，严禁用于商业用途</text>。
			若版权方、出版社认为本程序侵权，请立即联系客服，<text style="color: red;">提供相关证实材料</text>，如版权属实，本程序将<text
				style="color: red;">24</text>小时内删除相关内容，谢谢!

		</view>
		<view style="margin-top: 40rpx;">
			法律依据《中华人民共和国著作权法》第二十二条：在下列情况下使用作品，可以不经著作权人许可，不向其支付报酬，并且不得侵犯著作权人依照本法享有的其他权利：
		</view>
		<view>
			(1)为个人学习、研究或者欣赏，使用他人已经发表的作品;
		</view>
		<view>
			(2)为介绍、评论某一作品或者说明某一问题，在作品中适当引用他人已经发表的作品;
		</view>
		<view>
			(3)为报道时事新闻，在报纸、期刊、广播电台、电视台等媒体中不可避免地再现或者引用已经发表的作品;
		</view>
		<view>
			(4)报纸、期刊、广播电台、电视台等媒体刊登或者播放其他报纸、期刊、广播电台、电视台等媒体已经发表的关于政治、经济、宗教问题的时事性文章，但作者声明不许刊登、播放的除外。
		</view>





	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			back(val) {
				uni.navigateBack()
			}

		}
	}
</script>

<style>
	page {
		background: #ffffff;
	}

	.mzsm-body {
		padding: 40rpx;
		letter-spacing: 4rpx;
		line-height: 60rpx;
	}
</style>