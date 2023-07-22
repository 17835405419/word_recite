<template>
	<div class="card" >
		<view class="word">
			<text>{{obj.word}}</text>
		</view>
		<view class="answer" v-show="isShowAnswer">
			<text>{{obj.translate}}</text>
		</view>
		<view class="num">
			<text>{{index + 1}}</text>/

			<!-- 如果为重复 则总数为单词总数  否则则为背诵总次数 -->
			<text>{{types === "repeat" ? repeatWordNum : obj.num}}</text>
		</view>
	</div>
</template>

<script>
	export default {
		name: "WordCard",
		props: {
			obj: {
				type: Object,
				default: () => {}
			},
			index: {
				type: Number,
				default: 1
			}, //当前次数
			types:{		
				/* 
					read 阅读页面    repeat 重复页面
				 */
				type:String,
				default:"read"
			} ,//组件类型
			repeatWordNum:{

				type:Number,	
			}
		},

		data() {
			return {
				answer:"",
				isShowAnswer:false
			};
		},
		methods:{
			isShowAnswerFuc(){
				this.isShowAnswer = !this.isShowAnswer	
			},
		
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		width: 500rpx;
		height: 600rpx;
		transform: translateY(180rpx);
		background-color: #8EC5FC;
		background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
		color: #fff;
		border-radius: 30rpx;
		box-shadow: 0 0 11px 1px #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;

		.word {
			font-size: 30px;
		}

		.answer {
			transform: translateY(-100rpx);
		}

		.num {
			height: 50rpx;

			text {
				padding: 0 12rpx;

			}
		}
	}
</style>