<template>
	<view class="list-item">
		<view class="time-area">
			<span>2022</span>
		</view>
		<span 
		  class="item-text" 
		  :style="{
			textDecoration: (isOk ? 'line-through' : ''),
			color: (isOk ? '#cebfae' : '')
		  }"
		>
			15315156
		</span>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
const itemRef = ref(null)
const props = defineProps({
	isOk: {
		type: Boolean,
		default: false
	}
})

onMounted(() => {
	uni.createSelectorQuery().select('.list-item').boundingClientRect((res) => {
		uni.$emit('itemHeight', res.height)
	}).exec()
})
</script>

<style lang="scss">
@import './style.scss';
</style>
