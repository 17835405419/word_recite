<template>
	<view class="word_list-box">
		<uni-collapse ref="collapse">
			<uni-collapse-item v-for="(item,index) in englishList" :key="index" :name="index">
				<!-- 抽屉框标题 -->
				<template v-slot:title>
					<view class="title-box">
						<text class="title">{{item.english_list[0].word}}</text>
						<text class="time">
							{{timeFormat(item.create_time)}}
						</text>
					</view>
				</template>

				<ul>
					<li v-for="(item1,index1) in item.english_list" :key="index1">{{item1.word}}

						<text @click="isShowTranslate(index,index1)"
							:style="{'color':listIndex === index && traSlateIndex === index1  ? '#aa55ff' :''}">{{listIndex === index && traSlateIndex === index1  ? item1.translate: "查看翻译"}}</text>
					</li>
				</ul>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import {
		timeFormat
	} from "@/utils/utils.js"
	const db = uniCloud.database()
	export default {
		data() {
			return {
				englishList: [],
				isShow: false,
				listIndex: null,
				traSlateIndex: null,

			};
		},
		onLoad() {
			this.getListData()
		},
		methods: {
			// 外部导入的函数要在templete中使用 必须在methods中注册
			timeFormat,
			async getListData() {
				const {
					result
				} = await db.collection("word").where({
					secret_key: this.$store.state.secret_key
				}).orderBy("create_time desc").get()
				this.englishList = result.data
			},
			isShowTranslate(index, index1) {
				this.listIndex = index
				this.traSlateIndex = index1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.word_list-box {

		ul,
		li {
			list-style: none;
		}

		li {
			height: 3vh;
			line-height: 3vh;
			padding: 1vh 0;
			font-size: 13px;
			display: flex;
			justify-content: space-between;

			text {
				color: #848484;
				padding-right: 5vw;
			}
		}

		.title-box {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			font-size: 15px;
			.time{
				 font-size: 13px;
			}
		}
	}
</style>