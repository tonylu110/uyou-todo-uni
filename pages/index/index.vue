<template>
	<view class="content">
		<TitleBar 
		  :showBackButton="false" 
		  title="uyou Todo" 
		  bgColor="#7a695c" 
		  fontColor="#fff"
		  navShadowColor="90"
		/>
		<scroll-view scroll-y="true" :style="{height: screenHeight - systemBarHeight - rpx2px(131) + 'px'}">
			<view class="scroll-in">
				<Item 
				  v-for="(item,index) in list"
				  :ok='item.ok' 
				  :text="item.text" 
				  :time="item.id"
				/>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import list from '../../test/list'
import TitleBar from '../../components/TitleBar/TitleBar.vue'
import Item from '../../components/Item/Item.vue'
const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const isOk = ref(false)
const title = ref('Hello')
const screenHeight = ref(0)
const systemBarHeight = ref(0)
uni.$on('systemBarHeight', (res): void => {
	systemBarHeight.value = res
})
onMounted(() => {
	uni.getSystemInfo({
		success: (res): void => {
			screenHeight.value = res.screenHeight
		}
	})
})
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #edd9b7;
	
	scroll-view {
		padding-top: 30rpx;
	}
}
.scroll-in {
	width: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
