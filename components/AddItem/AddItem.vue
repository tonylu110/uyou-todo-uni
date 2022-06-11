<template>
	<view class="add">
		<view class="add-time-area">
			<text>{{ moment(todoTime).format('hh:mm A') }}</text>
		</view>
		<textarea :ref="todoInputRef" class="add-item-text" maxlength="-1" :auto-height="true" :auto-focus="true" v-model="todoText"></textarea>
		<view class="buttons" @click="clickAddButton">
			<view class="add-button">
				<uni-icons type="checkmarkempty" size="25" color="white"></uni-icons>
			</view>
			<view class="cancel-button" @click="clickCancelButton()">
				<uni-icons type="closeempty" size="25" color="white"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import moment from 'moment'
import IItemData from '../../interface/IItemData'
const addButtonShow = ref(false)
const todoInputRef = ref(null)
const todoTime = ref(new Date().getTime())
const todoText = ref('')

const emits = defineEmits<{
	(e: 'addItemShow'): void,
	(e: 'addItem', item: IItemData): void
}>()
const clickCancelButton = () => {
	emits('addItemShow')
}
const clickAddButton = () => {
	let item: IItemData = {
		text: todoText.value,
		id: todoTime.value,
		ok: false
	}
	emits('addItem', item)
}
</script>

<style lang="scss">
.add {
    position: relative;
    width: 660rpx;
    background-color: #f6f2e9;
    padding: 20rpx;
    border-radius: 10rpx;
    box-shadow: 0 2rpx 10rpx #7a695c50;
    margin-bottom: 20rpx;

    .add-time-area {
        background-color: #ede4d8;
        margin-left: -20rpx;
        margin-top: -20rpx;
		padding: 10rpx 20rpx;
		width: 660rpx;
		border-radius: 10rpx 10rpx 0 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		text {
			color: #cebfae;
		}
	}
	
	.add-item-text {
		display: block;
		margin-top: 20rpx;
		color: #6e492f;
		border: 0;
		max-width: 660rpx;
		min-width: 660rpx;
		outline: none;
		background-color: transparent;
		resize: none;
	}
	
	.buttons {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20rpx;
		border-top: 1.5px solid #cebfae50;
		padding-top: 20rpx;
		
		.add-button {
			flex: 1;
			background-color: #00a600;
			margin-right: 20rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 7rpx 0;
			
			&:active {
				background-color: #008600;
			}
		}
		
		.cancel-button {
			@extend .add-button;
			margin-right: 0px;
			background-color: #d6010f;
			
			&:active {
				background-color: #b6000b;
			}
		}
	}
}
</style>