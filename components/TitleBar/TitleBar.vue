<template>
	<view>
		<view class="system_bar" :style="{height: systemBarHeight + 'px', backgroundColor: bgColor}"></view>
		<view class="navigator_bar" :style="{boxShadow: '0px 0px 30px #000000' + navShadowColor, backgroundColor: bgColor, color: fontColor}">
			<uni-icons type="arrow-left" size="30" @click="back()" :color="fontColor" v-if="showBackButton"></uni-icons>
			<view class="" style="width: 30px;" v-if="!showBackButton"></view>
			{{ title }}
			<view class="" style="width: 30px;"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
const props = defineProps({
	showBackButton: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		default: '标题'
	},
	navShadowColor: {
		type: String,
		default: '00'
	},
	bgColor: {
		type: String,
		default: '#f8f8f8'
	},
	fontColor: {
		type: String,
		default: 'black'
	}
})
const systemBarHeight = ref(0)
onMounted(() => {
	uni.getSystemInfo({
		success: (res) => {
			systemBarHeight.value = res.statusBarHeight
			uni.$emit('systemBarHeight', res.statusBarHeight)
		}
	})
})
const back = () => {
	uni.navigateBack({})
}
</script>

<style>
	.system_bar{
		position: relative;
		width: 750rpx;
		background-color: white;
		z-index: 11;
	}
	.navigator_bar{
		position: relative;
		z-index: 10;
		width: 650rpx;
		height: 100rpx;
		background-color: white;
		font-size: 35rpx;
		font-weight: bold;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0px 50rpx 0px 50rpx; 
		justify-content: space-between;
	}
</style>