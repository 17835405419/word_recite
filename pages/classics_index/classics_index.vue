<template>
	<view class="classics-box">
		<view class="top_bgc-box">
		</view>
		<view class="book-box">
			<view class="title-box">
				<view class="title">
					四级词汇
				</view>
				<view class="change-box">
					修改计划>
				</view>
			</view>
			<view class="book_select-box">
				<view class="book-cover">
					<image
						src="https://img2.baidu.com/it/u=3086863900,955105366&fm=253&fmt=auto&app=138&f=JPG?w=500&h=667"
						mode=""></image>
				</view>
				<view class="select-box">
					+
				</view>
			</view>
			<view class="progress-box">
				<progress class="progress" :percent="15" stroke-width="9" />
				<view class="book_read-info">
					<view class="read_num">
						已学习:123
					</view>
					<view class="count">
						总词数：123123
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

			};
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #eee;
	}

	.top_bgc-box {
		height: 32vh;
		background-color: #aaaaff;
		border-radius: 0 0 30% 30%;
	}

	.book-box {
		height: 29.5vh;
		margin: 0 40rpx;
		background-color: #fff;
		transform: translateY(-355rpx);
		border-radius: 30rpx;

		.title-box {
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			font-size: 13px;
			color: #a2a2a2;

			.title {
				color: #000;
				font-size: 15px;
			}
		}

		.book_select-box {
			padding: 0 30rpx;
			display: flex;

			.book-cover {
				width: 130rpx;
				height: 180rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.select-box {
				width: 128rpx;
				height: 178rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 28px;
				border: 1px dotted #000;
				margin-left: 30rpx;
				color: #a2a2a2;


			}
		}

		.progress-box {
			padding: 30rpx;

			// 修改进度条圆角 
			/deep/.uni-progress-bar,
			/deep/ .uni-progress-inner-bar {
				border-radius: 30rpx;
			}

			.book_read-info {
				padding: 15rpx 0;
				font-size: 13px;
				color: #a2a2a2;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>