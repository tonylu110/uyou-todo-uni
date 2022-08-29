<template>
	<view class="menu" :style="{
	  transform: openBar ? '' : 'translateX(-555rpx)',
	  backgroundColor: blurShow ? '#fff6dc' : '',
	  boxShadow: openBar ? '20rpx 0 30rpx #00000010' : ''
	}">
		<view class="list">
			<text class="title t1">{{ i18n().accountPage.account }}</text>
			<view class="account-list" @click="emits('toAccount')" style="margin-top: 30rpx;">
				<uni-icons type="person-filled" size="35" color="#00000070"></uni-icons>
				<text class="text">{{ i18n().myAccount }}</text>
			</view>
			<text class="title">{{ i18n().listMenu.cate }}</text>
			<view class="account-list" @click="toOther('allNotDo')" style="margin-top: 30rpx;">
				<uni-icons type="circle" size="35" color="#00000070"></uni-icons>
				<text class="text">{{ i18n().listMenu.incompleted }}</text>
			</view>
			<view class="account-list" @click="toOther('allDo')">
				<uni-icons type="circle-filled" size="35" color="#00000070"></uni-icons>
				<text class="text">{{ i18n().listMenu.completed }}</text>
			</view>
		</view>
		<view class="list">
			<view class="setting-list" @click="emits('toSetting')">
				<uni-icons type="gear-filled" size="35" color="#00000070"></uni-icons>
				<text class="text">{{ i18n().settingTitle }}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import i18n from '../../i18n'
	
defineProps({
	openBar: {
		default: false,
		type: Boolean
	}
})

const emits = defineEmits<{
	(e: 'toSetting'): void,
	(e: 'toAccount'): void,
	(e: 'toOther'): void
}>()

const toOther = (data: string) => {
	emits('toOther')
	uni.navigateTo({
		url: '../other/other?name=' + data,
	})
}

const blurShow = ref(false)
if (uni.getSystemInfoSync().browserName === 'chrome' && Number(uni.getSystemInfoSync().browserVersion.split('.')[0]) < 76) {
	blurShow.value = true
}
</script>

<style lang="scss">
.menu {
	position: fixed;
	left: 0;
	top: 0;
	width: 550rpx;
	background-color: #fff6dc70;
	height: 100%;
	z-index: 102;
	transition: transform 0.4s;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	backdrop-filter: blur(20px);
	
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
				font-weight: bold;
			}
			
			&:active {
				background-color: #00000030;
			}
		}
		
		.account-list {
			@extend .setting-list;
			margin-bottom: 20rpx;
		}
		
		.title {
			display: block;
			margin-top: 80rpx;
			font-size: 40rpx;
			font-weight: bold;
			margin-left: 50rpx;
			color: #00000070;
			
			&.t1 {
				margin-top: 160rpx;
			}
		}
	}
}
</style>