<template>
	<movable-area :style="{height: itemHeight + 'px'}">
		<view class="ok-button" @click="buttonClick(true)">
			<uni-icons type="checkmarkempty" :size="rpx2px(80)" color="white"></uni-icons>
		</view>
		<movable-view :damping="50" :out-of-bounds="true" :x="x" direction="horizontal" @change="itemChange">
			<view ref="itemRef" class="list-item" :id="'item' + time" @longpress="copy">
				<view class="time-area">
					<text>{{ getTime(time) }}</text>
				</view>
				<text 
				  class="item-text" 
				  :style="{ color: (isOk ? '#cebfae' : '')}"
				>
					{{ text }}
				</text>
			</view>
		</movable-view>
		<Toast v-if="copySuccess" msg="复制成功" />
	</movable-area>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, onUpdated } from 'vue'
import getTime from '../../util/getTime'
const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const copySuccess = ref(false)
const itemRef = ref(null)
const x = ref(rpx2px(150))
const props = defineProps({
	ok: {
		type: Boolean,
		default: false
	},
	time: Number,
	text: String,
	x: Number
})
const isOk = ref(props.ok)
const itemHeight = ref(0)

const setX = ref(0)

const getItemHeight = () => {
	let itemId: string = '#item' + props.time
	uni.createSelectorQuery().select(itemId).boundingClientRect((res) => {
		itemHeight.value = res.height
	}).exec()
}

watchEffect(() => {
	isOk.value = props.ok
	setX.value = props.x
})

onMounted(() => {
	getItemHeight()
})
onUpdated(() => {
	getItemHeight()
	if (setX.value === 1) {
		x.value = rpx2px(150)
	}
})

const emits = defineEmits<{
	(e: 'setOk', id: number, isOk: boolean): void,
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

const copy = () => {
	uni.setClipboardData({
		data: props.text,
		showToast: false,
		success: () => {
			copySuccess.value = true
			setTimeout(() => {
				copySuccess.value = false
			}, 1000)
		}
	})
}
</script>

<style lang="scss">
@import './style.scss';
</style>
