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
					<text>uyou ToDo v{{ version }}</text>
				</view>
				<Item
				  :title="loginState ? i18n().myAccount : i18n().loginText"
				  :showSwitch="false"
				  @itemFun="toAccount"
				/>
				<ItemBox>
					<Item
					  title="自动获取更新"
					  :showSwitch="true"
					  :switchState="autoUpdateState"
					  @switchFun="setAutoUpdate"
					/>
					<Item
					  title="软件更新" 
					  @itemFun="toUpdate"
					/>
				</ItemBox>
				<ItemBox>
					<Item image="/static/web.png"/>
					<Item image="/static/desk.png" />
					<Item image="/static/donate.png" />
				</ItemBox>
				<ItemButton mode="error" @click="clearData">
					<text>{{ i18n().clearData }}</text>
				</ItemButton>
				<ItemButton @click="showLangSet">
					<image src="../../static/lang.png" mode="aspectFill" class="lang-img"></image>
				</ItemButton>
				<SetLangList @showLangSet="showLangSet" v-if="isShowLangSet" />
				<view v-if="isShowLangSet" @click="showLangSet" class="black-back"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
import Item from '../../components/ItemBox/Item/Item.vue' 
import ItemButton from '../../components/ItemBox/ItemButton/ItemButton.vue'
import i18n from '../../i18n'

const version = uni.getAppBaseInfo().appVersion

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

const clearData = () => {
	uni.clearStorage()
	uni.clearStorageSync()
	uni.reLaunch({
		url: '../index/index'
	})
}

const autoUpdateState = ref(uni.getStorageSync('autoUpdateState') || uni.getStorageSync('autoUpdateState') === '')
const setAutoUpdate = () => {
	autoUpdateState.value = !autoUpdateState.value
	uni.setStorageSync('autoUpdateState', autoUpdateState.value)
}

const toUpdate = () => {
	uni.navigateTo({
		url: '../update/update'
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
