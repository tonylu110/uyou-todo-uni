<template>
	<view class="content">
		<TitleBar
		  :showBackButton="true" 
		  :showRightButton="false"
		  :title="i18n().settingTitle" 
		  bgColor="#7a695c" 
		  fontColor="#fff"
		  navShadowColor="90"
		  leftImg="arrow-left"
		  @left="back"
		/>
		<scroll-view scroll-y="true" :style="{height: screenHeight - systemBarHeight - rpx2px(101) + 'px'}">
			<view class="scroll-in">
				<view class="setting-title">
					<image src="../../static/todo_list.png" mode="aspectFit"></image>
					<text>uyou ToDo v1.1.0</text>
				</view>
				<view class="setting-item" @click="toAccount">
					<text>{{ loginState ? '我的账号' : '未登录' }}</text>
					<uni-icons type="forward" size="25"></uni-icons>
				</view>
				<view class="setting-item lang-set" @click="showLangSet">
					<image src="../../static/lang.png" mode="aspectFill" class="lang-img"></image>
				</view>
				<SetLangList @showLangSet="showLangSet" v-if="isShowLangSet" />
				<view v-if="isShowLangSet" @click="showLangSet" class="black-back"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
import i18n from '../../i18n'

const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const screenHeight = ref(0)
const systemBarHeight = ref(0)
uni.$on('systemBarHeight', (res): void => {
	systemBarHeight.value = res
})

const loginState = ref(false)

onMounted(() => {
	uni.getSystemInfo({
		success: (res: unknown): void => {
			screenHeight.value = res.screenHeight
		}
	})
})

onShow(() => {
	uni.getStorage({
		key: 'uid',
		success: (res) => {
			if (res.data !== '') {
				loginState.value = true
			} else {
				loginState.value = false
			}
		}
	})
})

const back = () => {
	uni.navigateBack()
}

const isShowLangSet = ref(false)
const showLangSet = () => [
	isShowLangSet.value = !isShowLangSet.value
]

const toAccount = () => {
	uni.navigateTo({
		url: '../account/account'
	})
}
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #eee;
}
.scroll-in {
	width: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20rpx;
	
	.setting-title {
		width: 590rpx;
		height: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFF;
		border-radius: 14rpx;
		padding: 60rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 2px 10px #00000030;
		
		image {
		    height: 100%;
		}
		
		text {
		    margin-top: 15px;
		    color: #00000050;
		}
	}
	
	.setting-item {
	    width: 650rpx;
	    height: 60rpx;
	    padding: 30rpx;
	    border-radius: 14rpx;
	    box-shadow: 0 2px 10px #00000030;
	    background-color: white;
	    cursor: pointer;
		display: flex;
		align-items: center;
		margin-bottom: 25rpx;
		justify-content: space-between;
	
	    &:active {
	        background-color: #5985eb;
	        color: white;
	    }
	
	    .lang-img {
	        max-height: 120rpx;
			width: 100%;
	    }
	
	    &.lang-set {
	        padding: 0px;
	        height: 120rpx;
	        width: 710rpx;
	        display: flex;
	        flex-direction: row;
	        justify-content: center;
			align-items: center;
	    }
	}
}
</style>
