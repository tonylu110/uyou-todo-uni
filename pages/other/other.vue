<template>
	<view class="content">
		<TitleBar 
		  :showBackButton="true" 
		  :showRightButton="false"
		  :title="title" 
		  bgColor="#7a695c" 
		  fontColor="#fff"
		  navShadowColor="90"
		  leftImg="arrow-left"
		  @left="back"
		/>
		<scroll-view scroll-y="true" :style="{height: screenHeight - systemBarHeight - rpx2px(101) + 'px'}">
			<view class="scroll-in">
				<view style="height: 30rpx;"></view>
				<view class="item" v-for="(item,index) in list" :id="'listItem' + item.id">
					<view class="delete-button" @click="deleteItem(item.id)">
						<uni-icons type="closeempty" :size="rpx2px(80)" color="white"></uni-icons>
					</view>
					<Item
					  :ok='item.ok' 
					  :text="item.text" 
					  :time="item.id"
					  @setOk="setOk"
					  :x="setX"
					/>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const screenHeight = ref(0)
const systemBarHeight = ref(0)
const list = reactive([])
const setX = ref(0)
const title = ref('')
const listData = reactive([])
uni.$on('systemBarHeight', (res): void => {
	systemBarHeight.value = res
})

onMounted(() => {
	uni.getSystemInfo({
		success: (res: unknown): void => {
			screenHeight.value = res.screenHeight
		}
	})
})

onLoad((e) => {
	uni.getStorage({
		key: 'todo',
		success: (res: unknown) => {
			for (let i = 0; i < res.data.length; i++) {
				listData.push(res.data[i])
				if (res.data[i].ok === (e.name === 'allDo')) {
					list.push(res.data[i])
				}
			}
		}
	})
	if (e.name === 'allDo') {
		title.value = '已完成'
	} else {
		title.value = '未完成'
	}
})

const back = () => {
	uni.navigateBack({
		
	})
}

const setOk = (id: number, isOk: boolean) => {
	for(let i = 0; i < list.length; i++) {
		if (list[i].id === id) {
			list[i].ok = isOk
		}
	}
	for(let i = 0; i < listData.length; i++) {
		if (listData[i].id === id) {
			listData[i].ok = isOk
		}
	}
	uni.setStorage({
		key: 'todo',
		data: listData
	})
	uni.getStorage({
		key: 'uid',
		success: (uid) => {
			if (uid.data !== '') {
				uni.request({
					url: 'https://api.todo.uyou.org.cn/edittodo',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						uid: uid.data,
						data: JSON.stringify({
							data: listData
						})
					},
					success: () => {
						list.length = 0
						for (let i = 0; i < listData.length; i++) { 
							if (listData[i].ok === (title.value === 'allDo')) {
								list.push(listData[i])
							}
						}
					}
				})
			}
		}
	})
}

const deleteItem = (id: number) => {
	let delete_index = id
	let newArray = []
	let newArrayAll = []
	for (let i = 0, len = list.length; i < len; i++) {
	    if (list[i].id != delete_index) {
	        newArray.push(list[i])
	    }
	}
	list.length = 0
	newArray.forEach((item) => {
		list.push(item)
	})
	for (let i = 0, len = listData.length; i < len; i++) {
		if (listData[i].id != delete_index) {
		    newArrayAll.push(listData[i])
		}
	}
	listData.length = 0
	newArrayAll.forEach((item) => {
		listData.push(item)
	})
	uni.setStorage({
		key: 'todo',
		data: listData
	})
	uni.getStorage({
		key: 'uid',
		success: (uid) => {
			if (uid.data !== '') {
				uni.request({
					url: 'https://api.todo.uyou.org.cn/edittodo',
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
					},
					data: {
						uid: uid.data,
						data: JSON.stringify({
							data: listData
						})
					},
					success: (res) => {
						console.log(res.data);
					}
				})
			}
		}
	})
	setX.value = 1
	setTimeout(() => {
		setX.value = 0
	}, 10)
}
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #edd9b7;
}
.scroll-in {
	width: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 30rpx;
	
	.delete-button {
		position: absolute;
		right: 30rpx;
		background-color: #d6010f;;
		color: white;
		width: 140rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: inset 0 0 5rpx #00000050;
		z-index: 5;
		height: 130rpx;
		
		&:active {
			background-color: #b6000b;
		}
	}
}
</style>
