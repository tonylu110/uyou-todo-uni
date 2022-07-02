<template>
	<view class="content">
		<TitleBar
		  :showBackButton="true" 
		  :showRightButton="false"
		  title="设置" 
		  bgColor="#7a695c" 
		  fontColor="#fff"
		  navShadowColor="90"
		  leftImg="arrow-left"
		  @left="back"
		/>
	</view>
</template>

<script setup lang="ts">
const back = () => {
	uni.navigateBack()
}
</script>

<style lang="scss">

</style>
