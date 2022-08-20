<template>
	<view
	  class="item" 
	  :style="showSwitch ? {backgroundColor: 'white', color: 'black'} : ''"
	  @click="emits('itemFun')"
	>
	    <text>{{ title }}</text>
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
  }
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
  	
    &:active {
        background-color: #5985eb;
        color: white;
    }
}
</style>