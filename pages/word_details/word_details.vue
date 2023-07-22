<template>
	<view class="word_detail-box">
		<view class="top-box">
			<view class="word-show">
				<text class="word"> {{obj.word}}</text>
				<text>{{obj.translate}}</text>
			</view>
			<view class="time-box">
				<text class="title">倒计时</text>
				<uni-countdown :show-day="false" :minute="minute" :second="second" @timeup="timeEnd"
					ref="countdown"></uni-countdown>
			</view>
			<text>倒计时结束将自动开始速记</text>
		</view>
		<view class="botton-box">
			<button @click="extendTime">时间恢复</button>
			<button @click="startRead">开始速记</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				minute: 1,
				second: 0,
				obj:{
					
				}
			};
		},
		onLoad(e) {
			// 上个页面传递的信息
			this.obj = JSON.parse(e.obj)
		},
		methods: {
			timeEnd() {
				setTimeout(()=>{
					uni.reLaunch({
						url:`/pages/word_read/word_read?obj=${JSON.stringify(this.obj)}`
					})
				},200)
			},
			extendTime() {
				this.minute == 1
				// 调用刷新组件显示方法
				this.$refs.countdown.update()
			},
			startRead(){
				setTimeout(()=>{
					uni.reLaunch({
						url:`/pages/word_read/word_read?obj=${JSON.stringify(this.obj)}`
					})
				},200)
			}
		}
	}
</script>

<style lang="scss" scoped>

	.top-box{
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translateY(25%);
	}
	.word-show{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		text{
			padding: 8rpx 0;
			font-size: 15px;
			color: #55007f;
		}
		.word{
			font-size: 24px;
			color: #aa55ff;
		}
	
	}
	.time-box {
		width: 300rpx;
		height: 300rpx;
		border: 1px solid #000000;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 80rpx 0;
	}

	.botton-box {
		width: 100vw;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>