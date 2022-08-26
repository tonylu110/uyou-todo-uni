<template>
	<view class="content">
		<TitleBar
		  :showBackButton="true" 
		  :showRightButton="false"
		  title="软件更新" 
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
					<text v-if="appNewVersion">{{ appNewVersion }}</text>
					<view class="update-list" v-if="updateMsg.length > 0">
						<text v-for="(item, index) in updateMsg" :key="index">{{ item }}</text>
					</view>
				</view>
				<ItemButton mode="primary" @click="buttonClick">{{ buttonText }}</ItemButton>
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

const buttonText = ref('检查更新中...')
const updateMsg = ref([])
const appNewVersion = ref('')

const update = () => {
	uni.request({
		url: 'https://api.todo.uyou.org.cn/update/get',
		success: (res) => {
			const version = appversion
			if (version < res.data[0].code) {
				updateMsg.value = res.data[0].data
				appNewVersion.value = `新版本: ${res.data[0].version}`
				buttonText.value = '前往更新'
			} else {
				buttonText.value = '检查更新'
				appNewVersion.value = '暂无更新'
				uni.showToast({
					title: '暂无更新',
					icon: 'none'
				})
			}
		}
	})
}

const buttonClick = () => {
	if (updateMsg.value.length > 0) {
		plus.runtime.openURL('https://github.com/tonylu110/uyou-todo-uni/releases')
	} else {
		buttonText.value = '检查更新中...'
		appNewVersion.value = ''
		setTimeout(() => {
			update()
		}, Math.floor(Math.random () * 900) + 100)
	}
}

onMounted(() => {
	uni.getSystemInfo({
		success: (res: unknown): void => {
			screenHeight.value = res.screenHeight
		}
	})
})

onShow(() => {
	setTimeout(() => {
		update()
	}, Math.floor(Math.random () * 900) + 100)
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
	
	.setting-title {
		width: 590rpx;
		height: auto;
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
		    height: 200rpx;
		}
		
		text {
		    margin-top: 30rpx;
		    color: #00000050;
		}
		
		.update-list {
			display: flex;
			flex-direction: column;
			width: 590rpx;
			border-top: 2rpx solid #00000030;
			margin-top: 30rpx;
			
			text {
				color: black;
				margin-top: 20rpx;
			}
		}
	}
	
	&:deep(.item-button) {
		position: fixed;
		bottom: 10px;
	}
}
</style>
