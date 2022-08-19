<template>
	<view class="content">
		<TitleBar 
		  :showBackButton="true" 
		  :showRightButton="false"
		  title="other" 
		  bgColor="#7a695c" 
		  fontColor="#fff"
		  navShadowColor="90"
		  leftImg="arrow-left"
		  @left="back"
		/>
		<scroll-view scroll-y="true" :style="{height: screenHeight - systemBarHeight - rpx2px(101) + 'px'}">
			<view class="scroll-in">
				<view style="height: 30rpx;"></view>
				<view class="item" v-for="(item,index) in list" :id="'listItem' + item.id">
					<view class="delete-button" @click="deleteItem(item.id)">
						<uni-icons type="closeempty" :size="rpx2px(80)" color="white"></uni-icons>
					</view>
					<Item
					  :ok='item.ok' 
					  :text="item.text" 
					  :time="item.id"
					  @setOk="setOk"
					  :x="setX"
					/>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const screenHeight = ref(0)
const systemBarHeight = ref(0)
const list = reactive([])
const setX = ref(0)
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

onLoad((e) => {
	uni.getStorage({
		key: 'todo',
		success: (res: unknown) => {
			for (let i = 0; i < res.data.length; i++) {
				if (res.data[i].ok === (e.name === 'allDo')) {
					list.push(res.data[i])
				}
			}
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
	background-color: #edd9b7;
}
.scroll-in {
	width: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 30rpx;
	
	.delete-button {
		position: absolute;
		right: 30rpx;
		background-color: #d6010f;;
		color: white;
		width: 140rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: inset 0 0 5rpx #00000050;
		z-index: 5;
		height: 130rpx;
		
		&:active {
			background-color: #b6000b;
		}
	}
}
</style>
