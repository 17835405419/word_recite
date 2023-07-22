<template>
	<view class="word_input-box">
		<!-- <text class="prompt">请在输入框输入背诵的单词</text> -->
		<div class="show-text">
			<text>{{word}}</text>
			<text class="translate">{{translate}}</text>
		</div>
		<div class="input-box">
			<input type="text" placeholder="请输入英文" v-model="word">
			<input type="text" placeholder="请输入翻译" v-model="translate">
			<picker mode="selector" :range='selectList' :value="index" @change="selectChange">
				<view class="repeat-title"><text>请选择单词重复次数：</text> {{selectList[index]}}</view>
			</picker>
		</div>
		<button size='mini' type='primary' :disabled="isDisable" @click="goToDetail">确认</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				word: "",
				translate: "",
				selectList: [
					3, 5, 10
				],
				index: 0,
				isDisable: true,
			};
		},
		watch: {
			isDisableBotton(e) {
				if (e) return this.isDisable = false
				this.isDisable = true
			}
		},
		computed: {
			isDisableBotton() {
				return this.word !== "" && this.translate !== ""
			}
		},
		methods: {
			selectChange(e) {
				this.index = e.detail.value
			},
			goToDetail(){
				let obj = {
					word:this.word,
					translate:this.translate,
					num:this.selectList[this.index]
	
				}
				
				setTimeout(()=>{
					uni.navigateTo({
						url:`/pages/word_details/word_details?obj=${JSON.stringify(obj)}`
					})
				},500)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.word_input-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translateY(45%);

		.show-text {
			width: 80vw;
			height: 160rpx;
			border: 1px solid #eee;
			margin: 10rpx auto;
			box-sizing: border-box;
			text-align: center;

			.translate {
				font-size: 14px;
				color: #aaaaff;
				
			}

			text {
				font-size: 16px;
				color: #0000ff;
				display: block;
				padding: 20rpx;
			}
		}

		.input-box {
			input {
				margin: 10rpx auto;
				font-size: 14px;
				width: 80vw;
				height: 60rpx;
				border: 1px solid #eee;
			}

			.repeat-title {
				color: #878787;
				height: 50rpx;
				line-height: 50rpx;
			}
		}

		button {
			width: 80vw;
			margin-top: 15rpx;
		}
	}
</style>