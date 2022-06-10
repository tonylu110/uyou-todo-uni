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
				<movable-area :style="{height: itemHeight + 'px'}">
					<view class="ok-button" :style="{height: itemHeight + 'px'}" @click="buttonClick(true)">
						<image src="../../static/images/ok.png" mode=""></image>
					</view>
					<movable-view :out-of-bounds="true" :x="x" direction="horizontal" @change="itemChange">
						<Item :isOk="isOk" />
					</movable-view>
					<view class="close-button" :style="{height: itemHeight + 'px'}" @click="buttonClick(false)">
						<image src="../../static/images/close.png" mode=""></image>
					</view>
				</movable-area>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import TitleBar from '../../components/TitleBar/TitleBar.vue'
import Item from '../../components/Item/Item.vue'
const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const px2rpx = (px: number): number => {
	return px/(uni.upx2px(100)/100)
}
const isOk = ref(false)
const title = ref('Hello')
const screenHeight = ref(0)
const systemBarHeight = ref(0)
const itemHeight = ref(0)
const x = ref(rpx2px(150))
uni.$on('systemBarHeight', (res): void => {
	systemBarHeight.value = res
})
uni.$on('itemHeight', (res):void => {
	itemHeight.value = res
})
onMounted(() => {
	uni.getSystemInfo({
		success: (res): void => {
			screenHeight.value = res.screenHeight
		}
	})
})
const itemChange = (e) => {
	x.value = e.detail.x
}
const buttonClick = (use: boolean) => {
	x.value = rpx2px(150)
	if (use) {
		isOk.value = !isOk.value
	} else {
		
	}
}
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
		
		movable-area {
			width: 1000rpx;
			margin-bottom: 30rpx;
			
			.ok-button {
				position: absolute;
				left: 150rpx;
				background-color: #00b600;
				color: white;
				width: 140rpx;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				
				&:active {
					background-color: #00a600;
				}
				
				image {
					width: 100rpx;
					height: 100rpx;
				}
			}
			
			.close-button {
				@extend .ok-button;
				left: 709rpx;
				background-color: #d6010f;
				
				&:active {
					background-color: #b6000b;
				}
			}
			
			movable-view {
				width: 700rpx;
				z-index: 10;
			}
		}
	}
}
.scroll-in {
	width: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
