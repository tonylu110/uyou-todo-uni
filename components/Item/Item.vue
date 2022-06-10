<template>
	<movable-area :style="{height: itemHeight + 'px'}">
		<view class="ok-button" :style="{height: itemHeight + 'px'}" @click="buttonClick(true)">
			<image src="../../static/images/ok.png" mode=""></image>
		</view>
		<movable-view :out-of-bounds="true" :x="x" direction="horizontal" @change="itemChange">
			<view class="list-item">
				<view class="time-area">
					<span>{{ moment(time).format("hh:mm A") }}</span>
				</view>
				<span 
				  class="item-text" 
				  :style="{
					textDecoration: (isOk ? 'line-through' : ''),
					color: (isOk ? '#cebfae' : '')
				  }"
				>
					{{ text }}
				</span>
			</view>
		</movable-view>
		<view class="close-button" :style="{height: itemHeight + 'px'}" @click="buttonClick(false)">
			<image src="../../static/images/close.png" mode=""></image>
		</view>
	</movable-area>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import moment from 'moment'
const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const itemRef = ref(null)
const x = ref(rpx2px(150))
const props = defineProps({
	ok: {
		type: Boolean,
		default: false
	},
	time: Number,
	text: String
})
const isOk = ref(props.ok)
const itemHeight = ref(0)

onMounted(() => {
	uni.createSelectorQuery().select('.list-item').boundingClientRect((res) => {
		itemHeight.value = res.height
	}).exec()
})

const buttonClick = (use: boolean) => {
	x.value = rpx2px(150)
	if (use) {
		isOk.value = !isOk.value
	} else {
		
	}
}

const itemChange = (e) => {
	x.value = e.detail.x
}
</script>

<style lang="scss">
@import './style.scss';
</style>
