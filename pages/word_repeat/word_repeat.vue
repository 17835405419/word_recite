<template>
	<view class="word_read-box">
		<view class="word-box" @click="run(index)" :style="{'zIndex':wordInfoList.length - index}"
			:animation="activeId === index && index + 1 !== wordInfoList.length ? animationData: '' "
			v-for="(item,index) in wordInfoList">

			<word-card class="item" types="repeat" :obj="item" :repeatWordNum='wordInfoList.length' :index="index"
				ref="cardItem"></word-card>



		</view>
		<div class="botton-box">
			<button @click="lookTranSlate">查看翻译</button>
			<button @click="continueRecite">继续背诵</button>
			<button @click="endRecite">结束背诵</button>

		</div>
	</view>
</template>

<script>
	import WordCard from "@/components/WordCard/WordCard.vue"
	import {
		mapState
	} from "vuex"
	export default {
		components: {
			WordCard
		},
		data() {
			return {
				animationData: {},
				activeId: 0,

			};
		},
		onShow() {
			var animation = uni.createAnimation({
				transformOrigin: "-10% 50%",
				duration: 1000,
				timingFunction: 'ease',
			})
			this.animation = animation

		},
		computed: {
			...mapState(["wordInfoList"])
		},
		methods: {
			run(index) {
				this.activeId = index
				this.animation.rotate(100).opacity(0).step()
				this.animationData = this.animation.export()
			},
			lookTranSlate() {
				// 调用显示答案方法
				this.$refs.cardItem.forEach(item => item.isShowAnswerFuc())
			},
			continueRecite() {
				// 继续背诵
				// this.activeId  < this.wordInfoList.length - 2  最后一页不需要点击了

				if (this.activeId < this.wordInfoList.length - 2) return uni.showToast({
					title: "背诵次数未完成",
					icon: "none"
				})
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/word_input/word_input"
					})
				}, 500)
			},

			async endRecite() {
				// 显示确认框
				const {
					confirm
				} = await uni.showModal({
					title: "是否确认完成背诵？"
				})
				if (confirm) {
					let wordInfoList = this.$store.state.wordInfoList
					// 先存储至本地
					// uni.setStorageSync("wordList", wordInfoList)
					await saveWordListToDB(this.$store.state.secret_key, wordInfoList)

					this.$store.commit("deleteWordList")
					// 跳转
					setTimeout(() => {
						// 跳转至首页
						uni.reLaunch({
							url: "/pages/index/index"
						})
					}, 500)
				}
			}
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.word_read-box {
		width: 100vw;

		.word-box {
			position: relative;
			display: flex;
			justify-content: center;

			.item {
				position: absolute;

			}
		}

		.botton-box {
			width: 100vw;
			position: fixed;
			bottom: 0rpx;
		}
	}
</style>