<template>
	<movable-area :style="{height: itemHeight + 'px'}">
		<view class="ok-button" :style="{height: itemHeight - 1 + 'px'}" @click="buttonClick(true)">
			<uni-icons type="checkmarkempty" :size="rpx2px(80)" color="white"></uni-icons>
		</view>
		<movable-view :damping="50" :out-of-bounds="true" :x="x" direction="horizontal" @change="itemChange">
			<view class="list-item">
				<view class="time-area">
					<span>{{ getTime(time) }}</span>
				</view>
				<span 
				  class="item-text" 
				  :style="{ color: (isOk ? '#cebfae' : '')}"
				>
					{{ text }}
				</span>
			</view>
		</movable-view>
		<view class="close-button" :style="{height: itemHeight - 1 + 'px'}" @click="buttonClick(false)">
			<uni-icons type="closeempty" :size="rpx2px(80)" color="white"></uni-icons>
		</view>
	</movable-area>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import getTime from '../../util/getTime'
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

const emits = defineEmits<{
	(e: 'setOk', id: number, isOk: boolean): void
	(e: 'deleteItem', id: number): void
}>()
const buttonClick = (use: boolean): void => {
	x.value = rpx2px(150)
	if (use) {
		isOk.value = !isOk.value
		emits('setOk', props.time, isOk.value)
	} else {
		emits('deleteItem', props.time)
	}
}

const itemChange = (e) => {
	x.value = e.detail.x
	if (e.detail.x < 150 && e.detail.x > rpx2px(150)) {
		x.value = rpx2px(150)
	}
	if (e.detail.x < rpx2px(150) && e.detail.x > 50) {
		x.value = rpx2px(150)
	}
}
</script>

<style lang="scss">
@import './style.scss';
</style>
