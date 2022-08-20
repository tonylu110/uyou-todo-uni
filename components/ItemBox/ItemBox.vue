<template>
	<view class="item-box">
		<slot/>
	</view>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.item-box {
	margin-bottom: 25rpx;
	box-shadow: 0 2px 10px #00000030;
	border-radius: 14rpx;
	overflow: hidden;
  
    &:deep(.item) {
        box-shadow: none;
        margin-bottom: 0px;
        border-radius: 0;
        border-bottom: 1px solid #00000015;

        &:last-child {
            border: 0px;
        }
    }
}
</style>