<template>
	<view style="background-color: white;">
		<!-- #ifndef APP-PLUS -->
		<Tips ref="tips" />
		<!-- #endif -->
		<!-- 通知 -->

		<!-- 轮播图 -->
		<uni-swiper-dot class="uni-swiper-dot-box" :info="swiperData" :current="current" field="content">
			<swiper autoplay :circular="true" interval="6000" class="swiper-box" :current="swiperDotIndex"
				@change="changeSwiper">
				<swiper-item v-for="(item, index) in swiperData" :key="index">
					<view @click="toAdUrl(item)" class="swiper-item">
						<image :src="item.image" mode="" :draggable="false" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="notice-box">
			<image class="notice-svg" src="/static/images/tz.svg" mode=""></image>
			<view class="inform">
				<view class="inform-info">
					<view class="info">
						<swiper class="swiper" :circular="true" :vertical="true" :indicator-dots="false"
							:autoplay="true" :interval="4000" :duration="1000">
							<swiper-item v-if="type == 0">
								<view class="notice-text">
									<!-- #ifdef H5 -->
									<p>已更新至 <text style="color: red;margin: 0 6rpx;">{{number}}</text> 个资源 --
										点击保存到网盘进行观看</p>
										<!-- #endif -->
									<!-- #ifndef H5 -->
									<p>感谢您的使用，截至目前已更新至 <text style="color: red;margin: 0 6rpx;">{{number}}</text> 个资源
									</p>
									<!-- #endif -->
								</view>
							</swiper-item>
							<swiper-item v-for="(item,index) in noticeList">
								<view class="notice-text">
									<p>{{item.title}}</p>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="notice-text">
									<!-- #ifdef H5 -->
									<p>点击右上角 ... 收藏，找资源不迷路，更方便 !</p>
									<!-- #endif -->
									<!-- #ifdef MP-WEIXIN -->
									<p>点击右上角 ... 添加小程序到我的，找资源更方便 !</p>
									<!-- #endif -->
									<!-- #ifdef APP-PLUS -->
									<p>我的界面添加客服微信，找资源更方便 !</p>
									<!-- #endif -->
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;" class="search">
			<uni-search-bar v-model="searchValue" radius="190" placeholder="请输入要查询的资源名/关键字" @confirm="search"
				cancelButton="none" bgColor="#fff" />
		</view>
		
		<view v-if="is" @click="search" class="select">
			点击查询
		</view>
		<view v-else class="select">
			查询中
		</view>
		<view v-if="type == 0" @click="toDay()" class="dayup" >
			-- 点击查看今日全网更新 --
		</view>
		<view class="solids-bottom info-top grid col-3 text-center">
			<view style="">
				<image class="info-top-svg" src="/static/images/new.svg"></image>	
				<text style="float: left;">最新更新</text>
			</view>
			<view>
				<text v-if="type == 0" @click="tojc()" style="color: #3C9CFF;border-bottom: 1px solid;" decode><text style="color: red;margin-right: 6rpx;margin-left: 6rpx;" class="cuIcon-video"></text>{{ '使用教程&nbsp;' }} </text>
			</view>
			<view>
				<text style="float: right;margin-right: 35rpx;">资源链接</text>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<view v-if="dataList.length != 0" v-for="(item,index) in dataList" :key="index" class="solids-bottom info-list_h">
			<view style="" class="info-name_h">{{item.title}}</view>
			<view class="flex justify-around">
				<view @click="xxfkOpen(item)" class="bg-red margin-xs radius info-fk_h">错误反馈</view>
				<view @click="copyh(item)" class="bg-cyan margin-xs radius info-copy_h">复制链接</view>
				<view @click="toUrl(item)" class="bg-blue margin-xs radius info-look_h">开始观看</view>
			</view>
			
		</view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view v-if="dataList.length != 0" v-for="(item,index) in dataList" :key="index" class="solids-bottom info-list">
			
			<!-- #ifdef MP-WEIXIN -->
			<view class="info-name">{{item.title}}</view>
			<text v-if="type == 0" @click="coypUrl(item)" class="info-copy">复制链接</text>
			<text v-else @click="copy2(item)" class="info-copy">复制标题</text>
			<text style="color: red;" @click="xxfkOpen(item)" class="info-copy">错误反馈</text>
			<!-- #endif -->
			
			<!-- #ifdef APP-PLUS -->
			<view class="info-name">{{item.title}}</view>
			<text @click="appUrl(item)" class="info-copy">开始观看</text>
			<text style="color: red;" @click="xxfkOpen(item)" class="info-copy">错误反馈</text>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view>
				<ad-custom v-if="homeAdId && index==0" style="height: 280rpx;overflow: hidden;" :unit-id="homeAdId"
					ad-intervals="30"></ad-custom>
			</view>
			<!-- #endif -->
		</view>
		<!-- #endif -->
		<view v-if="dataList.length == 0" style="text-align: center;">
			<image style="width: 400rpx;height: 200rpx;" src="/static/images/nodata.svg"></image>
			<view style="color: #adadad;">无数据</view>
		</view>

		<!-- 加载动图 -->
		<view class="artileload" v-if="showTotal">
			<image style="width: 100%;height: 100%;" src="/static/images/articleload.gif" mode="aspectFit"></image>
		</view>
		<!-- 文章列表没有数据 -->
		<view @click="toMy()" class="no-list-data" v-else>
			-- 没有搜索到 ？ 点击反馈客服添加 --
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<ad-custom v-if="homeAdId && adShow && dataList.length == 0" style="height: 280rpx;overflow: hidden;" :unit-id="homeAdId"
			ad-intervals="30"></ad-custom>
		<!-- #endif -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view style="border-radius: 30rpx;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 50rpx;" class="content">提示</view>
				</view>
				<view class=" bg-white">
					<view style="font-size: 33rpx;color: #6a6a6a;padding: 40rpx 60rpx 60rpx 60rpx;">
						{{copyTitle}}<!-- (链接有效期为30分钟) -->
					</view>
					<button @tap="hideModal" style="margin-bottom: 50rpx;width: 55%;height: 90rpx;font-size: 38rpx;"
						class="cu-btn bg-green">知道了</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='Modalh'?'show':''">
			<view style="border-radius: 30rpx;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 50rpx;" class="content">提示</view>
				</view>
				<view class=" bg-white">
					<view style="font-size: 33rpx;color: #6a6a6a;padding: 40rpx 60rpx 60rpx 60rpx;">
						链接已复制到您的手机！<!-- (链接有效期为30分钟) -->
					</view>
					<button @tap="hideModal" style="margin-bottom: 50rpx;width: 55%;height: 90rpx;font-size: 38rpx;"
						class="cu-btn bg-green">知道了</button>
				</view>
			</view>
		</view>
		<!--广告确认弹窗-->
		<view class="cu-modal" :class="modalName=='adModal'?'show':''">
			<view style="border-radius: 30rpx;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 40rpx;" class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" bg-white">
					<view style="font-size: 33rpx;color: #6a6a6a;padding: 30rpx 60rpx 60rpx 60rpx;">
						观看 <text style="color: #3C9CFF;margin: 0 10rpx;">视频广告</text> 之后自动生成链接
					</view>
					<button @tap="lookAd" style="margin-bottom: 40rpx;width: 35%;height: 70rpx;font-size: 30rpx;"
						class="cu-btn bg-blue"><text style="font-size: 30rpx;margin-right: 15rpx;"
							class="cuIcon-recordfill"></text> 观看广告</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='scModal'?'show':''">
			<view style="border-radius: 30rpx;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 50rpx;" class="content">提示</view>
				</view>
				<view class=" bg-white">
					<view style="font-size: 33rpx;color: #6a6a6a;padding: 40rpx 60rpx 60rpx 60rpx;">
						{{tipStr}}
					</view>
					<button @tap="schideModal" style="margin-bottom: 50rpx;width: 55%;height: 90rpx;font-size: 38rpx;"
						class="cu-btn bg-green">知道了</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='imgModal'?'show':''">
			<view style="border-radius: 30rpx; background-color: white;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 40rpx;" class="content">小程序访问</view>
					<view class="action" @tap="modalName = null">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" bg-white">
					<image style="width: 75%;margin-top: 20rpx;" mode="widthFix" show-menu-by-longpress="true"
						src="https://simgs.emoboy.vip/app-show/%E6%A9%98%E5%AD%90%E6%90%9C%E6%90%9C.jpg"></image>
						<view class="tipinfo">微信小程序</view>
					<view class="tipinfo2">Tip：长按图片识别 / 保存</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='qyModal'?'show':''">
			<view style="border-radius: 30rpx; background-color: white;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view style="color: black;font-size: 38rpx;margin-top: 40rpx;color: red;" class="content">搜剧服务迁移通知</view>
					<view class="action" @tap="modalName = null">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" bg-white">
					<image style="width: 75%;margin-top: 20rpx;" mode="widthFix" show-menu-by-longpress="true"
						src="https://simgs.emoboy.vip/app-show/%E6%A9%98%E5%AD%90%E6%90%9C%E6%90%9C.jpg"></image>
						<view class="tipinfo">微信小程序：橘子搜搜</view>
					<view style="margin: 20rpx 20rpx 40rpx 20rpx;color: red;" class="">搜剧服务已迁移至微信小程序，截图保存上面的小程序码并前往微信扫一扫继续使用搜剧功能，或者微信搜索“橘子搜搜”小程序继续使用，注意：此页面即将停用，以后请前往微信小程序继续使用！</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='xxfkModal'?'show':''">
			<view style="border-radius: 30rpx;" class="cu-dialog bg-white">
				<view class="cu-bar bg-white justify-end">
					<view style="color: red;font-size: 38rpx;margin-top: 50rpx;" class="content">反馈</view>
					<view class="action" @tap="modalName = null">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class=" bg-white">
					<view style="font-size: 33rpx;color: #6a6a6a;padding: 40rpx 50rpx 30rpx 50rpx;">
						<radio-group class="block" @change="RadioChange">
							<view class="cu-form-group" style="height: 70rpx;">
								<view class="title">资源<text style="color: red;">不存在</text>打不开</view>
								<view>
									<radio class='blue margin-left-sm' :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
								</view>
							</view>
						</radio-group>
						<radio-group class="block" @change="RadioChange">
							<view class="cu-form-group"  style="height: 70rpx;">
								<view class="title">资源内容<text style="color: red;">缺少</text>不完整</view>
								<view>
									<radio class='blue margin-left-sm' :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
								</view>
							</view>
						</radio-group>
						<radio-group class="block" @change="RadioChange">
							<view class="cu-form-group"  style="height: 70rpx;">
								<view class="title">资源内容与名字<text style="color: red;">不一致</text></view>
								<view>
									<radio class='blue margin-left-sm' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
								</view>
							</view>
						</radio-group>
						<view class="cu-form-group align-start">
							<view class="title">其他原因</view>
							<textarea style="background-color: #f6f6f6;border-radius: 6rpx;padding: 20rpx;" v-model="xxfkInfo" maxlength="-1" @input="textareaBInput" placeholder="请输入具体原因哟 !"></textarea>
						</view>
						
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="contact" style="margin-bottom: 20rpx;width: 35%;height: 80rpx;font-size: 33rpx;"
						class="cu-btn bg-red">极速处理</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<button @tap="jscl" style="margin-bottom: 20rpx;width: 35%;height: 80rpx;font-size: 33rpx;"
						class="cu-btn bg-red">极速处理</button>
					<!-- #endif -->
					<button @tap="tjfk" style="margin-bottom: 20rpx;width: 35%;height: 80rpx;font-size: 33rpx;margin-left: 40rpx;"
						class="cu-btn bg-green">提交反馈</button>
						<view style="text-align: center;font-size: 22rpx;color: red;margin-bottom: 25rpx;">提交反馈后请等待更新，如需马上处理请选择极速处理 !</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	let videoAd = null;
	import {
		listDuanju,
		updateDuanju,
		getBannerData,
		getSearch,
		duanjuNumber,
		getNotice,
		numberAdd,
		addxs
	} from "@/api/app/index.js"
	import config from '@/config'
	import Tips from '@/components/S-Tips/Tips'

	export default {
		components: {
			Tips
		},
		data() {
			return {
				adId: null,
				homeAdId: null,
				adShow: false,
				adUnitId: "",
				radio: '',
				tipStr: "",
				is: true,
				baseUrl: config.baseUrl,
				current: 0,
				swiperDotIndex: 0,
				swiperData: [{
					image: 'https://djapi.emoboy.vip/uploads/20240523/113e78a7f82eba2c6cd07b6bc23e0dbb.jpg',
					remarks: ''
				}],
				swiperData1: ['/static/meituan3.png'],
				queryParams: {
					pageNum: 1,
					pageSize: 20,
				},
				dataList: [],
				testList: [{
						"createBy": null,
						"createTime": "2024-03-25 16:57:01",
						"updateBy": null,
						"updateTime": null,
						"remark": null,
						"id": 3,
						"title": "本小程序功能使用教程表格",
						"url": "https://pan.quark.cn/s/4635afd81"
					},
					{
						"createBy": null,
						"createTime": "2024-03-25 16:57:01",
						"updateBy": null,
						"updateTime": null,
						"remark": null,
						"id": 4,
						"title": "我的轻创业表格",
						"url": "https://pan.quark.cn/s/2fa29d614a"
					},
					{
						"createBy": null,
						"createTime": "2024-03-25 16:57:01",
						"updateBy": null,
						"updateTime": null,
						"remark": null,
						"id": 5,
						"title": "我的网络创业表格",
						"url": "https://pan.quark.cn/s/2d07166d5f"
					},
					{
						"createBy": null,
						"createTime": "2024-03-25 16:57:01",
						"updateBy": null,
						"updateTime": null,
						"remark": null,
						"id": 6,
						"title": "我的wps表格资料表格",
						"url": "https://pan.quark.cn/s/d9825603f6"
					}
				],
				total: 0,
				showTotal: false,
				searchValue: null,
				modalName: null,
				number: 0,
				urls: "",
				isDuanJu: false,
				noticeList: [],
				type: 0,
				xxfkInfo: "",
				thisXxfk: null,
				copyTitle:"链接已复制",
				isLookAd:false
			}
		},
		onShow() {
			var that = this
			if (uni.getStorageSync("searchValue")) {
				this.queryParams.pageNum = 1
				this.showTotal = false;
				that.searchValue = uni.getStorageSync("searchValue")
				getSearch({
					keyword: uni.getStorageSync("searchValue"),
					myUrl:1
				}).then(response => {
					if (response.data[0].title == '没有找到相关内容') {
						that.dataList = []
					} else {
						that.dataList = response.data
					}
					this.adShow = true
					uni.removeStorageSync('searchValue');
				})
			}
		},
		onLoad() {
			var that = this
			//this.modalName = 'qyModal'
			let sc_init = uni.getStorageSync('isScTip');
			// if (!sc_init) {
			// 	this.tipStr = '搜索的时候如果遇到名字和资源内容不一致或搜索没有想要的，一定要在底部我的界面中联系客服帮您寻找！'
			// 	this.modalName = 'scModal'
			// }
			//#ifdef MP-WEIXIN
			getNotice({
				type: 0
			}).then(res => {
				that.noticeList = []
				var isNoData = false
				that.isLookAd = false
				uni.setStorageSync("adId", null)
				uni.setStorageSync("adId2", null)
				uni.setStorageSync("adId3", null)
				uni.setStorageSync("upDayAd", null)
				uni.setStorageSync("delWatermarkKey", null)
				uni.setStorageSync("videoTutorials", null)
				uni.setStorageSync("imgTutorials", null)
				for (var i = 0; i < res.data.length; i++) {
					//获取公告
					if (res.data[i].type == 1) {
						that.noticeList.push(res.data[i])
					}
					//获取原生模板广告id
					if (res.data[i].type == 2) {
						that.adId = res.data[i].title
						uni.setStorageSync("adId", res.data[i].title)
					}
					//获取激励广告id
					if (res.data[i].type == 3) {
						uni.setStorageSync("adId2", res.data[i].title)
					}
					//复制链接是否看广告
					if (res.data[i].type == 14) {
						if(res.data[i].title == 1){
							that.adUnitId = uni.getStorageSync("adId2")
							that.CreateAd()
							that.isLookAd = true
						}
					}
					//获取原生模板广告id
					if (res.data[i].type == 15) {
						that.homeAdId = res.data[i].title
					}
					//首页小程序分享配置
					if (res.data[i].type == 4) {
						uni.setStorageSync("miniHomeShaer", res.data[i])
					}
					//吃喝玩乐小程序分享配置
					if (res.data[i].type == 5) {
						uni.setStorageSync("miniPartyShaer", res.data[i])
					}
					//复制成功提示配置
					if (res.data[i].type == 6) {
						that.copyTitle = res.data[i].title
					}
					//每日更新封面图配置
					if (res.data[i].type == 7) {
						uni.setStorageSync("upDayImg", res.data[i].title)
					}
					//每日更新ad配置
					if (res.data[i].type == 8) {
						uni.setStorageSync("upDayAd", res.data[i].title)
					}
					//每日更新分享图配置
					if (res.data[i].type == 9) {
						uni.setStorageSync("upDayShaer", res.data[i].title)
					}
					//去水印key配置
					if (res.data[i].type == 10) {
						uni.setStorageSync("delWatermarkKey", res.data[i].title)
					}
					//使用教程url配置
					if (res.data[i].type == 11) {
						uni.setStorageSync("videoTutorials", res.data[i].title)
					}
					if (res.data[i].type == 12) {
						uni.setStorageSync("imgTutorials", res.data[i].title)
					}
					//获取激励广告id
					if (res.data[i].type == 13) {
						uni.setStorageSync("adId3", res.data[i].title)
					}
					
					//过审版本
					if (res.data[i].type == config.appInfo.version) {
						isNoData = true
					}
				}
				if (isNoData) {
					uni.setStorageSync("isNoData", true)
					that.dataList = that.testList
					that.number = 4
					that.type = 1
				} else {
					uni.setStorageSync("isNoData", false)
					that.swiperData = []
					getBannerData().then(res => {
						for (var i = 0; i < res.data.length; i++) {
							var img = res.data[i].image
							if (img.indexOf('http') !== -1) {
								that.swiperData.push(res.data[i])
							} else {
								res.data[i].image = that.baseUrl + img
								that.swiperData.push(res.data[i])
							}
						}
					})
					duanjuNumber().then(res => {
						that.number = res.data.total;
					})

					that.getDataList()
				}
			})

			//#endif
			//#ifndef MP-WEIXIN
			getNotice({
				type: 0
			}).then(res => {
				that.noticeList = []
				uni.setStorageSync("videoTutorials", null)
				uni.setStorageSync("imgTutorials", null)
				for (var i = 0; i < res.data.length; i++) {
					//获取公告
					if (res.data[i].type == 1) {
						that.noticeList.push(res.data[i])
					}
					//每日更新封面图配置
					if (res.data[i].type == 7) {
						uni.setStorageSync("upDayImg", res.data[i].title)
					}
					//使用教程url配置
					if (res.data[i].type == 11) {
						uni.setStorageSync("videoTutorials", res.data[i].title)
					}
					if (res.data[i].type == 12) {
						uni.setStorageSync("imgTutorials", res.data[i].title)
					}
				}
			})
			that.swiperData = []
			getBannerData().then(res => {
				for (var i = 0; i < res.data.length; i++) {
					var img = res.data[i].image
					if (img.indexOf('http') !== -1) {
						that.swiperData.push(res.data[i])
					} else {
						res.data[i].image = that.baseUrl + img
						that.swiperData.push(res.data[i])
					}
				}
			})
			duanjuNumber().then(res => {
				that.number = res.data.total;
			})

			that.getDataList()
			//#endif



		},
		// 下拉刷新
		onPullDownRefresh() {
			this.queryParams = {
				pageNum: 1,
				pageSize: 20,
			}
			this.searchValue = null
			this.getDataList()
		},
		// 上拉分页
		onReachBottom() {
			var that = this;
			//this.page为加载次数，this.pageSize为每一次加载的数据条数
			if (this.showTotal) {
				//this.total为请求数据的总条数。只要现有条数小于总条数就执行一下代码
				this.showTotal = true;
				this.queryParams.pageNum++;
				//加载次数递加
				//请求更多数据列表
				listDuanju(this.queryParams).then(response => {
					that.dataList = that.dataList.concat(response.data)
					if (response.data.length < this.queryParams.pageSize) {
						//this.total为请求数据的总条数。只要现有条数小于总条数就执行一下代码
						this.showTotal = false;
					} else {
						this.showTotal = true;
					}

				})
			} else {
				this.showTotal = false;
			}
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
		watch: {
			// 监听搜索关键字变化
			searchValue(newValue, oldValue) {
				// 当搜索关键字被清空时，重新获取数据列表
				if (!newValue) {
					if (this.type == 0) {
						this.getDataList(); // 替换成你的加载数据方法名
					}
				}
			}
		},
		methods: {
			tojc(){
				this.$tab.navigateTo('/pages/tool/video_tutorials')
			},
			toDay(){
				this.$tab.navigateTo('/pages/upday/upday')
			},
			xxfkOpen(val){
				this.thisXxfk = val
				this.modalName = 'xxfkModal'
			},
			RadioChange(e) {
				this.radio = e.detail.value
				this.xxfkInfo = ''
			},
			textareaBInput(e) {
				this.xxfkInfo = e.detail.value
				this.radio = ''
			},
			jscl(){
				this.modalName = ''
				this.$tab.navigateTo('/pages/mine/guanzhu?type=1')
			},
			tjfk(){
				var that = this
				const now = new Date();
				const year = now.getFullYear();
				const month = now.getMonth() + 1;
				const day = now.getDate();
				const hour = now.getHours();
				const minute = now.getMinutes();
				const second = now.getSeconds();
				if(this.radio == 'A'){
					this.xxfkInfo = '资源不存在打不开'
				}else if(this.radio == 'B'){
					this.xxfkInfo = '资源内容缺少不完整'
				}else if(this.radio == 'C'){
					this.xxfkInfo = '资源内容与名字不一致'
				}
				if(this.xxfkInfo == '' || this.xxfkInfo == null){
					that.$refs.uToast.show({
						type: 'error',
						title: '',
						message: "请选择或输入反馈内容 ！",
						icon: false
					})
					return;
				}
				addxs({
					title: this.thisXxfk.title,
					urls: this.thisXxfk.url,
					state: that.xxfkInfo,
					addtime: year + "-" + month + "-" + day + " " + hour + ":" + minute +
						":" + second
				}).then(response => {
					that.modalName = ''
					that.radio = ''
					that.xxfkInfo = ''
					uni.showToast({
						title: '反馈成功',
						//将值设置为 success 或者直接不用写icon这个参数 error none
						icon: 'success',
						//显示持续时间为 2秒
						duration: 2000
					})
				})
			},
			toAdUrl(val) {
				var that = this
				if (val.looktype == 1) {
					//#ifdef MP-WEIXIN
					uni.navigateToMiniProgram({
						appId: val.minappid,
						path: val.minapppath, //需要打开的目标路径
						extraData: {},
						envVersion: 'release', //小程序版本：develop（开发版），trial（体验版），release（正式版）
						success(res) {
							// 打开成功
						}
					})
					//#endif
					//#ifdef H5
					window.location.href = val.url
					//#endif
					//#ifdef APP-PLUS
					// plus.share.getServices(res => {
					// 	let sweixin = null;
					// 	sweixin = res.find(i => i.id === 'weixin')
					// 	if (sweixin) {
					// 		// 分享跳转到微信小程序
					// 		sweixin.launchMiniProgram({
					// 			id: val.primaryid, //微信小程序原生id
					// 			path: val.minapppath, //    打开小程序的页面路径，不传默认跳转首页
					// 			type: 0 //     微信小程序版本类型，可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。
					// 		})
					// 	} else {
					// 		uni.showToast({
					// 			title: '请安装微信',
					// 			icon: 'none'
					// 		})
					// 	}
					// }, err => {
					// 	console.log("分享失败"); // 获取分享服务列表失败
					// });
					plus.runtime.openURL(val.url)
					//#endif
				} else if (val.looktype == 2) {
					//#ifdef MP-WEIXIN
					uni.navigateToMiniProgram({
						appId: val.minappid,
						path: val.minapppath, //需要打开的目标路径
						extraData: {},
						envVersion: 'release', //小程序版本：develop（开发版），trial（体验版），release（正式版）
						success(res) {
							// 打开成功
						}
					})
					//#endif
					//#ifdef H5
					this.modalName = 'imgModal'
					//#endif
					//#ifdef APP-PLUS
					plus.share.getServices(res => {
						let sweixin = null;
						sweixin = res.find(i => i.id === 'weixin')
						if (sweixin) {
							// 分享跳转到微信小程序
							sweixin.launchMiniProgram({
								id: val.primaryid, //微信小程序原生id
								path: val.minapppath, //    打开小程序的页面路径，不传默认跳转首页
								type: 0 //     微信小程序版本类型，可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。
							})
						} else {
							uni.showToast({
								title: '请安装微信',
								icon: 'none'
							})
						}
					}, err => {
						console.log("分享失败"); // 获取分享服务列表失败
					});
					//#endif
				} else if(val.looktype == 3){
					//#ifdef MP-WEIXIN
					uni.setClipboardData({
						data: val.url,
						showToast: false,
						success: function() {
							that.tipStr = '链接已复制，请粘贴到浏览器访问 !'
							that.modalName = 'scModal'
						}
					});
					//#endif
					//#ifdef H5
					window.location.href = val.url
					//#endif
					//#ifdef APP-PLUS
					plus.runtime.openURL(val.url)
					//#endif
				} else if(val.looktype == 4){
					this.$tab.navigateTo(val.path)
				}
				//
			},
			xxfk(val) {
				const now = new Date();
				const year = now.getFullYear();
				const month = now.getMonth() + 1;
				const day = now.getDate();
				const hour = now.getHours();
				const minute = now.getMinutes();
				const second = now.getSeconds();
				uni.showModal({
					title: '提示',
					content: '请确认资源是否失效？资源内容错误？提交后等待更新，谢谢反馈！',
					success: function(res) {
						if (res.confirm) {
							addxs({
								title: val.title,
								urls: val.url,
								state: '未处理',
								addtime: year + "-" + month + "-" + day + " " + hour + ":" + minute +
									":" + second
							}).then(response => {
								uni.showToast({
									title: '反馈成功',
									//将值设置为 success 或者直接不用写icon这个参数 error none
									icon: 'success',
									//显示持续时间为 2秒
									duration: 2000
								})
							})
						} else {
							// 执行取消后的操作
						}
					}
				})

			},
			toMy() {
				uni.switchTab({
					url: '/pages/mine/index'
				});
			},
			lookAd() {
				if (videoAd) {
					videoAd.show().catch(() => {
						// 失败重试
						videoAd.load()
							.then(() => videoAd.show())
							.catch(err => {
								console.error('激励视频 广告显示失败', err)
							})
					})
				}
			},
			openAd(val) {
				this.urls = val
				this.modalName = "adModal"
			},
			coypUrl(val){
				if(this.isLookAd){
					this.openAd(val)
				}else{
					this.copy(val)
				}
				
			},
			copy(val) {
				this.numberAdd(val)
				var that = this;
				uni.setClipboardData({
					data: val.url,
					showToast: false,
					success: function() {
						that.modalName = "Modal"
					}
				});
			},
			copyh(val) {
				this.numberAdd(val)
				var that = this;
				uni.setClipboardData({
					data: val.url,
					showToast: false,
					success: function() {
						that.modalName = "Modalh"
					}
				});
			},
			copy2(val) {
				this.numberAdd(val)
				var that = this;
				uni.setClipboardData({
					data: val.title,
					showToast: false,
					success: function() {
						that.copyTitle = "标题已复制"
						that.modalName = "Modal"
					}
				});
			},
			toUrl(val) {
				this.numberAdd(val)
				uni.showModal({
					title: '提示',
					content: '保存到网盘，可无限制观看 !',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							// 执行确认后的操作
							window.location.href = val.url
						} else {
							// 执行取消后的操作
						}
					}
				})
			},
			appUrl(val) {
				this.numberAdd(val)
				uni.showModal({
					title: '提示',
					content: '保存到网盘，可无限制观看 !',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							// 执行确认后的操作
							plus.runtime.openURL(val.url)
						} else {
							// 执行取消后的操作
						}
					}
				})
			},
			numberAdd(val) {
				numberAdd({
					id: val.id
				}).then(response => {})
			},
			hideModal() {
				this.modalName = null
			},
			schideModal() {
				uni.setStorage({
					key: 'isScTip',
					data: '0'
				})
				this.modalName = null
			},
			// 搜索触发
			search() {
				if (this.type == 1) {
					uni.showToast({
						icon: 'none',
						title: "无数据"
					})
					return;
				}
				var that = this
				this.is = false
				if (that.searchValue == null || that.searchValue == '') {
					that.getDataList()
				} else {
					this.queryParams.pageNum = 1
					this.showTotal = false;
					getSearch({
						keyword: that.searchValue,
						myUrl:1
					}).then(response => {
						if (response.data[0].title == '没有找到相关内容') {
							that.dataList = []
						} else {
							that.dataList = response.data
						}
						this.adShow = true
						that.is = true
					})
				}

			},
			getDataList() {
				var that = this;
				this.adShow = false;
				listDuanju(this.queryParams).then(response => {
					that.dataList = response.data
					if (that.dataList.length < this.queryParams.pageSize) {
						this.showTotal = false;
					} else {
						this.showTotal = true;
					}
					that.is = true
					uni.stopPullDownRefresh(); //停止刷新
				})
			},
			changeSwiper(e) {
				this.current = e.detail.current
			},
			CreateAd() {
				var that = this;
				if (this.adUnitId != '') {
					if (wx.createRewardedVideoAd) {
						videoAd = wx.createRewardedVideoAd({
							adUnitId: this.adUnitId
						})
						videoAd.onLoad(() => {})
						videoAd.onError((err) => {
							that.$refs.uToast.show({
								type: 'error',
								title: '',
								message: "广告加载失败，稍后再试！",
								icon: false
							})
							that.copy(this.urls)
						})
						videoAd.onClose((res) => {
							if (res && res.isEnded) {
								this.modalName = null
								that.copy(this.urls)
							} else {
								this.modalName = null
								that.$refs.uToast.show({
									type: 'success',
									title: '',
									message: "看完才能获取哟 !",
									icon: false
								})
								//that.copy(this.urls)
							}
						})
					}

				}
			},

		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #fff !important;
	}
	uni-radio-group{
		height: 80rpx !important;
	}
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

	/* 通知 */
	.inform {
		// padding: 0 25rpx;
		// height: 130rpx;
		// margin: 30rpx auto;

		.inform-info {
			display: flex;
			// padding: 0 20rpx;
			height: 70rpx;
			border-radius: 10rpx;

			.picture {
				width: 20%;
				height: 100%;

				image {
					width: 93rpx;
					height: 84rpx;
					margin-top: -20rpx;
				}
			}

			.info {
				width: 100%;
				height: 100%;

				.swiper {
					width: 100%;
					height: 100%;

					.swiper-item {
						display: flex;
						align-items: center;
						width: 100%;
						height: 100%;

						text {}
					}
				}
			}
		}
	}


	.search {
		border: 3rpx solid #89B9D8;
		margin: 20rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;
	}

	.info-top {
		background: #F8F8F8;
		height: 100rpx;
		line-height: 100rpx;
		margin-top: 30rpx;
		font-size: 30rpx;
		font-weight: 600;
		width: 100%;
	}

	.info-top-svg {
		height: 70upx;
		width: 70upx;
		margin: 15rpx 5rpx 15rpx 5rpx;
		float: left;
		margin-top: 12rpx;
	}

	.info-list {
		font-size: 28rpx;
	}

	.info-copy {
		float: right;
		margin-right: 30rpx;
		color: #1E90FF;
		height: 100rpx;
		line-height: 100rpx;
	}

	.info-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 55%;
		display: inline-block;
		color: #636363;
		margin-left: 22rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.info-list_h {
		
		
		font-size: 30rpx;
	}
	.info-fk_h{
		color: white;
		margin-bottom: 20rpx;
		padding: 10rpx 20rpx;
		font-size: 24rpx;
	}
	.info-copy_h {
		color: white;
		margin-bottom: 20rpx;
		padding: 10rpx 20rpx;
		font-size: 24rpx;
	}
	.info-look_h {
		color: white;
		margin-bottom: 20rpx;
		padding: 10rpx 20rpx;
		font-size: 24rpx;
	}
	
	.info-name_h {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
		display: inline-block;
		color: #636363;
		padding: 20rpx 20rpx 0 20rpx;
	}

	.select {
		width: 60%;
		margin-left: 20%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background-color: #78B7E0;
		color: white;
		border-radius: 15rpx;
		font-size: 36rpx;
		font-weight: 600;
		margin-top: 20rpx;
		letter-spacing: 4rpx;
	}

	.notice-box {
		width: 100%;
		margin-bottom: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		box-shadow: 0 -5px 13px -1px rgba(0, 0, 0, 0.6);
	}

	.notice-svg {
		height: 80upx;
		width: 80upx;
		display: inline-block;
		float: left;
		margin-top: -1rpx;
		margin-left: 10rpx;
	}

	.notice-text {
		display: inline-block;
		margin-left: 20rpx;
		// width: 590upx;
		overflow: hidden;
		white-space: nowrap;
		box-sizing: border-box;
		color: #DE9C10;
	}

	.notice-text p {
		display: inline-block;
		font-weight: 600;
		/* padding-left: 100%;
		animation: marquee 15s linear infinite; */
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-100%);
		}
	}

	/* 列表没有数据 */
	.no-list-data {
		text-align: center;
		margin: 15rpx 0px 45rpx 0px;
		color: #0081ff;
		font-size: 24upx;
		height: 40rpx;
		line-height: 40rpx;
	}
	.dayup {
		text-align: center;
		margin: 20rpx 0px;
		color: #0081ff;
		font-size: 26upx;
		height: 40rpx;
		line-height: 40rpx;
	}

	/* 加载动图 */
	.artileload {
		height: 80rpx;
		width: 80rpx;
		margin: 20rpx auto;
		overflow: hidden;
	}

	.swiper {
		height: 400rpx;
	}

	.swiper-box {
		height: 315rpx;
		overflow: hidden;
		transform: translateY(0);
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		height: 315rpx;
		line-height: 315rpx;
	}

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			/* #ifndef APP-NVUE */
			margin: 0 auto;
			/* #endif */
			margin-top: 8px;
		}

		.image {
			width: 100%;
		}
	}
</style>