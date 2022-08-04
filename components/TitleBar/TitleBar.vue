<template>
	<view>
		<view class="system_bar" :style="{height: systemBarHeight + 'px', backgroundColor: bgColor}"></view>
		<view class="navigator_bar" :style="{boxShadow: '0px 0px 30px #000000' + navShadowColor, backgroundColor: bgColor, color: fontColor}">
			<view class="button" v-if="showBackButton" @click="left()">
				<uni-icons :type="leftImg" size="24" :color="fontColor"></uni-icons>
			</view>
			<view class="" style="width: 30px;" v-if="!showBackButton"></view>
			{{ title }}
			<view class="" style="width: 30px;" v-if="!showRightButton"></view>
			<view class="button sync" v-if="showRightButton && syncButtonShow" @click="emits('sync')">
				<uni-icons type="refresh" size="26" :color="fontColor"></uni-icons>
			</view>
			<view class="button" v-if="showRightButton" @click="right()">
				<uni-icons type="plusempty" size="24" :color="fontColor"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
const props = defineProps({
	showBackButton: {
		type: Boolean,
		default: true
	},
	showRightButton: {
		type: Boolean,
		default: false
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
	},
	leftImg: {
		type: String,
		default: 'bars'
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
const emits = defineEmits<{
	(e: 'right'): void,
	(e: 'left'): void,
	(e: 'sync'): void
}>()
const left = () => {
	emits('left')
}
const right = () => {
	emits('right')
}

const syncButtonShow = ref(false)

onShow(() => {
	uni.getStorage({
		key: 'uid',
		success: (res) => {
			if (res.data !== '') {
				syncButtonShow.value = true
			} else {
				syncButtonShow.value = false
			}
		},
		fail: (res) => {
			syncButtonShow.value = false
		}
	})
})
</script>

<style lang="scss">
	.system_bar{
		position: relative;
		width: 750rpx;
		background-color: white;
		z-index: 101;
	}
	.navigator_bar{
		position: relative;
		z-index: 100;
		width: 700rpx;
		height: 100rpx;
		background-color: white;
		font-size: 35rpx;
		font-weight: bold;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0px 25rpx 0px 25rpx; 
		justify-content: space-between;
	}
	
	.button {
		border-radius: 10rpx;
		padding: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		
		&:active {
			background-color: #00000050;
		}
		
		&.sync {
			position: absolute;
			right: 60px;
		}
	}
</style>