<template>
	<view :class="'item-button ' + mode">
	    <slot>button</slot>
	</view>
</template>

<script setup lang="ts">
defineProps({
  mode: {
    default: '',
    type: String
  }
})
</script>

<style lang="scss">
.item-button {
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
	justify-content: center;
	position: relative;
	color: #333;
	font-weight: bold;

    &:active {
		background-color: #5985eb;
		color: white;
    }
	
	&:last-child {
		margin-bottom: 65rpx;
	}

	&.primary {
		background-color: #5985eb;
		color: white;

		&:active {
			background-color: #4e6fbb;
		}
	}

	&.error {
		background-color: #e5544b;
		color: white;

		&:active {
			background-color: #c95047;
		}
	}

	&:deep(.lang-img) {
		max-height: 120rpx;
		width: 100%;
	}
}
</style>