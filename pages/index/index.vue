<template>
	<view class="content">
		<TitleBar 
		  :showBackButton="false" 
		  :showRightButton="true"
		  title="uyou Todo" 
		  bgColor="#7a695c" 
		  fontColor="#fff"
		  navShadowColor="90"
		  @addShow="add"
		/>
		<scroll-view scroll-y="true" :style="{height: screenHeight - systemBarHeight - rpx2px(101) + 'px'}">
			<view class="scroll-in">
				<view style="height: 30rpx;"></view>
				<AddItem
				  v-if="addShow"
				  @addItemShow="addItemShow"
				  @addItem="addItem"
				/>
				<Item 
				  v-for="(item,index) in list"
				  :ok='item.ok' 
				  :text="item.text" 
				  :time="item.id"
				  @setOk="setOk"
				  @deleteItem="deleteItem"
				/>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import AddItem from '../../components/AddItem/AddItem.vue'
import FirstLoad from '../../util/FirstLoad'
import IItemData from '../../interface/IItemData'
FirstLoad()
const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const screenHeight = ref(0)
const systemBarHeight = ref(0)
const list = ref()
const addShow = ref(false)
uni.$on('systemBarHeight', (res): void => {
	systemBarHeight.value = res
})
uni.getStorage({
	key: 'todo',
	success: (res: unknown) => {
		list.value = res.data
	},
	fail: () => {
		list.value = listData
	}
})

onMounted(() => {
	uni.getSystemInfo({
		success: (res: unknown): void => {
			screenHeight.value = res.screenHeight
		}
	})
})

const setOk = (id: number, isOk: boolean): void => {
	for(let i = 0; i < list.value.length; i++) {
		if (list.value[i].id === id) {
			list.value[i].ok = isOk
		}
	}
	uni.setStorage({
		key: 'todo',
		data: list.value
	})
}
const deleteItem = (id: number): void => {
	for (let i = 0; i < list.value.length; i++) {
	    if (list.value[i].id === id) {
			list.value.splice(i, 1)
	    }
	}
	uni.setStorage({
		key: 'todo',
		data: list.value,
	})
}
const add = () => {
	addShow.value = true
}

const addItem = (item: IItemData) => {
	list.value.unshift(item)
	uni.setStorage({
		key: 'todo',
		data: list.value,
	})
	addShow.value = false
}

const addItemShow = () => {
	addShow.value = false
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
</style>
