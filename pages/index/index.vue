<template>
	<view class="index-box">
		<view class="list-icon">
			<text @click="goToList">list</text>
		</view>
		<text class="prompt">该版为测试版本</text>
		<div class="start-button" @click="goToInput">
			<text>开始背诵</text>
		</div>
		<view class="botton-box">
			<button size="mini" @click="show = !show">输入秘钥</button>
			<button size="mini" @click="deleteSecret" :disabled="bottonShow">清除秘钥</button>
		</view>
		<view class="secret-box" v-if="show">
			<input type="text" maxlength="3" v-model="secret.first">-
			<input type="text" maxlength="3" v-model="secret.two">-
			<input type="text" maxlength="3" v-model="secret.three">-
			<input type="text" maxlength="3" v-model="secret.four">

		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import {
		activationkey
	} from "@/utils/index.js"
	export default {
		data() {
			return {
				show: false,
				secret: {
					first: "",
					two: "",
					three: "",
					four: ""
				}
			}
		},
		onLoad() {

		},

		watch: {
			"secret.four": {
				handler(news, olds) {
					// 最后一格输完
					if (news.length === 3) {
						uni.showLoading()
						let secret_key =
							`${this.secret.first}${this.secret.two}${this.secret.three}${this.secret.four}`
						activationkey(secret_key).then(res => {
							if (res) {
								// 解决this指向问题
								this.$store.commit("setSecretKey", secret_key)
								uni.hideLoading()
								this.secret = {
									first: "",
									two: "",
									three: "",
									four: ""
								}
								uni.showToast({
									title: "激活成功"
								})
								return
							}
							uni.showToast({
								title: "秘钥错误，请联系管理员获取",
								icon: "error"
							})
							this.secret = {
								first: "",
								two: "",
								three: "",
								four: ""
							}
						}).catch(e=>{
							uni.showToast({
								title:e
							})
						})
					}
				},
				deep: true
			}
		},
		computed:{
			bottonShow(){
				return !uni.getStorageSync("secret_key")
			}	
		},
		methods: {
			async goToInput() {
				if (!this.$store.state.secret_key) {
					const {
						confirm
					} = await uni.showModal({
						title: "提示：",
						content: "您未输入秘钥，背诵记录将无法保存，是否仍然进行背诵？"
					})

					if (confirm) {
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/word_input/word_input"
							})
						}, 200)
					}
					return
				}
				const {
					confirm
				} = await uni.showModal({
					title: "是否开始背单词",
				})
				if (confirm) {
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/word_input/word_input"
						})
					}, 200)
				}


			},
			async deleteSecret(){
				 const {confirm} = await uni.showModal({
					title:"是否确定清除秘钥?"
				})
				if(confirm){
					// 清除本地缓存的秘钥
					uni.removeStorageSync("secret_key")
				}
			},
			goToList(){
				setTimeout(()=>{
					uni.navigateTo({
						url:'/pages/word_list/word_list'
					})
				},200)
			}
		}
	}
</script>

<style lang='scss' scoped>
	.index-box {
		height: calc(100vh - var(--window-top));
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.prompt {
		color: #7c7c7c;
		font-size: 14px;
		transform: translateY(-160rpx);
	}

	.start-button {
		width: 300rpx;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		color: #fff;
		font-size: 20px;
		border-radius: 50%;
		background: linear-gradient(#aaaaff, #b87eff)
	}

	.list-icon {
		width: 30px;
		height: 30px;
		font-size: 13px;
		line-height: 30px;
		text-align: center;
		border: 1px solid #000;
		border-radius: 50%;
		position: absolute;
		top: 28vh;
		left: 5vw;

	}

	.botton-box {
		margin-top: 8vh;
		display: flex;
		flex-direction: column;
		button{
			margin-top:20rpx ;
		}
	}

	.secret-box {
		display: flex;
		align-items: center;
		position: absolute;
		bottom: 19vh;

		input {
			width: 8vw;
			height: 3vh;
			border: 1px solid #000;
			margin: 0 1vw;
		}
	}
</style>