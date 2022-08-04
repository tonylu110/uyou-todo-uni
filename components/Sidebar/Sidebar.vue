<template>
	<view class="menu" :style="{transform: openBar ? '' : 'translateX(-550rpx)'}">
		<view class="list">
			
		</view>
		<view class="list">
			<view class="setting-list" @click="emits('toSetting')">
				<uni-icons type="gear-filled" size="40" color="#00000070"></uni-icons>
				<text class="text">设置</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
defineProps({
	openBar: {
		default: false,
		type: Boolean
	}
})

const emits = defineEmits<{
	(e: 'toSetting')
}>()
</script>

<style lang="scss">
.menu {
	position: fixed;
	left: 0;
	top: 0;
	width: 550rpx;
	background-color: #fff6dc;
	height: 100%;
	z-index: 102;
	transition: transform 0.4s;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	
	.list {
		.setting-list {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 10rpx 40rpx;
			margin-bottom: 40rpx;
			
			.text {
				margin-left: 20rpx;
				margin-top: 3rpx;
				color: #00000070;
			}
			
			&:active {
				background-color: #00000030;
			}
		}
	}
}
</style>