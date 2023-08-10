<template>
	<view class="home-box">
		<image src="../../static/bgc.jpg"></image>
		<view class="button-box">
			<view class="classics" @click="goToClassics">
				经典背诵
			</view>
			<view class="skill" @click="goToSkill">
				技巧背诵
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:""
			};
		},
		methods:{
			goToClassics(){
				setTimeout(()=>{
					uni.navigateTo({
						url:"/pages/classics_index/classics_index"
					})
				},200)
			},
			goToSkill(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
				
			},

		}
	}
</script>

<style lang="scss" scoped>
	.home-box {
		image {
			width: 100vw;
		
		}

		.button-box {
			display: flex;


			view {
				flex: 1;
				height: 25vh;
				margin: 50rpx 10rpx;
				line-height: 25vh;
				text-align: center;
				border-radius: 20rpx;
				background: url("../../static/buttonBgc.jpg");
				background-position: 50% 50%;
				font-size: 25px;
				font-weight: 900;
				color: #ffffff;
				&:hover{
					transform: scale(101%);
				}
			}

			.skill {
				background-position: 50% 10%;
			}
		}
	}
</style>