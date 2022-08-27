<template>
	<view
	  class="item" 
	  :style="showSwitch ? {backgroundColor: 'white', color: 'black'} : ''"
	  @click="emits('itemFun')"
	>
	    <view class="item-title">
			<view v-if="image" class="img-box">
				<image :src="image" mode=""></image>
			</view>
	    	<text>{{ title }}</text>
	    </view>
	    <switch 
	      v-if="showSwitch"
	      :checked="switchState" 
		  @change="(e) => emits('switchFun', e)" 
		/>
		<uni-icons v-if="showArrow && !showSwitch" type="forward" size="25"></uni-icons>
	</view>
</template>

<script setup lang="ts">
defineProps({
  switchState: {
    default: true,
    type: Boolean
  },
  title: {
    default: 'title',
    type: String
  },
  showSwitch: {
    default: false,
    type: Boolean
  },
  showArrow: {
    default: true,
    type: Boolean
  },
  image: String
})
const emits = defineEmits<{
	(e: 'itemFun'): void,
	(e: 'switchFun', e: unknow): void
}>()
</script>

<style lang="scss">
.item {
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
  position: relative;
  	
    &:active {
        background-color: #5985eb;
        color: white;
    }
	
	.item-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		
		.img-box {
			background-color: #00000005;
			width: 120rpx;
			height: 120rpx;
			margin-left: -30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 30rpx;
			border-right: 2rpx solid #00000010;
			
			image {
				height: 60rpx;
				width: 60rpx;
			}
		}
	}
}
</style>