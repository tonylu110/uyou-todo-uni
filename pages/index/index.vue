<template>
	<view class="content">
		<TitleBar 
		  :showBackButton="true" 
		  :showRightButton="true"
		  title="uyou Todo" 
		  bgColor="#7a695c" 
		  fontColor="#fff"
		  navShadowColor="90"
		  @right="add"
		  @left="gotoSetting"
		/>
		<scroll-view scroll-y="true" :style="{height: screenHeight - systemBarHeight - rpx2px(101) + 'px'}">
			<view class="scroll-in">
				<view style="height: 30rpx;"></view>
				<AddItem
				  v-if="addShow"
				  @addItemShow="addItemShow"
				  @addItem="addItem"
				/>
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

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import i18n from '../../i18n'
import AddItem from '../../components/AddItem/AddItem.vue'
import FirstLoad from '../../util/FirstLoad'
import IItemData from '../../interface/IItemData'
FirstLoad()
const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const screenHeight = ref(0)
const systemBarHeight = ref(0)
const list = reactive([])
const addShow = ref(false)
const setX = ref(0)
uni.$on('systemBarHeight', (res): void => {
	systemBarHeight.value = res
})
onShow(() => {
	list.length = 0
	uni.getStorage({
		key: 'todo',
		success: (res: unknown) => {
			for (let i = 0; i < res.data.length; i++) {
				list.push(res.data[i])
			}
		},
		fail: () => {
			i18n().list.forEach((item) => {
				list.push(item)
			})
		}
	})
})

onMounted(() => {
	uni.getSystemInfo({
		success: (res: unknown): void => {
			screenHeight.value = res.screenHeight
		}
	})
	uni.request({
		url: 'http://api.todo.uyou.org.cn/update/get',
		success: (res) => {
			const version = 110
			if (version < res.data[0].code) {
				let updateString: string = i18n().newVersion + res.data[0].version + '\n'
				res.data[0].data.forEach((item) => {
					updateString = updateString + item + '\n'
				})
				uni.showModal({
					title: i18n().updateText,
					content: updateString,
					success: (res) => {
						if (res.confirm) {
							plus.runtime.openURL('https://github.com/tonylu110/uyou-todo-uni/releases')
						}
					}
				})
			}
		}
	})
})

const setOk = (id: number, isOk: boolean): void => {
	for(let i = 0; i < list.length; i++) {
		if (list[i].id === id) {
			list[i].ok = isOk
		}
	}
	uni.setStorage({
		key: 'todo',
		data: list
	})
}
const deleteItem = (id: number): void => {
	let delete_index = id
	let newArray = []
	for (let i = 0, len = list.length; i < len; i++) {
	    if (list[i].id != delete_index) {
	        newArray.push(list[i])
	    }
	}
	list.length = 0
	newArray.forEach((item) => {
		list.push(item)
	})
	uni.setStorage({
		key: 'todo',
		data: list
	})
	setX.value = 1
	setTimeout(() => {
		setX.value = 0
	}, 10)
}
const add = () => {
	addShow.value = true
}

const addItem = (item: IItemData) => {
	list.unshift(item)
	uni.setStorage({
		key: 'todo',
		data: list,
	})
	addShow.value = false
}

const addItemShow = () => {
	addShow.value = false
}

const gotoSetting = () => {
	uni.navigateTo({
		url: '../setting/setting'
	})
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
