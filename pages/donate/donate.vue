<template>
	<view class="content">
		<TitleBar
		  :showBackButton="true" 
		  :showRightButton="false"
		  title="捐赠" 
		  bgColor="#7a695c" 
		  fontColor="#fff"
		  navShadowColor="90"
		  leftImg="arrow-left"
		  @left="back"
		/>
		<scroll-view scroll-y="true" :style="{height: screenHeight - systemBarHeight - rpx2px(101) + 'px'}">
			<view class="scroll-in">
				<view class="title">
					<image src="../../static/donate/alipay.png" mode="widthFix"></image>
					<image src="../../static/donate/wechatpay.png" mode="widthFix"></image>
				</view>
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
import appversion from '../../util/appVersion'

const version = uni.getAppBaseInfo().appVersion

const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const screenHeight = ref(0)
const systemBarHeight = ref(0)
uni.$on('systemBarHeight', (res): void => {
	systemBarHeight.value = res
})

onMounted(() => {
	uni.getSystemInfo({
		success: (res: unknown): void => {
			screenHeight.value = res.screenHeight
		}
	})
})

const back = () => {
	uni.navigateBack({
		
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
	justify-content: space-between;
	
	.title {
		width: 590rpx;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFF;
		border-radius: 14rpx;
		padding: 60rpx;
		margin-bottom: 65rpx;
		box-shadow: 0 2px 10px #00000030;
		
		image {
		    width: 590rpx;
			margin-bottom: 30rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
