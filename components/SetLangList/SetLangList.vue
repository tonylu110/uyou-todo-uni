<template>
	<view class="lang-menu">
		<view @click="setLang()">{{ i18n().setLangText }}</view>
		<view @click="setLang()">English</view>
		<view @click="setLang()">中文（简体）</view>
		<view @click="setLang()">中文（繁體）</view>
		<view @click="setLang()">日本語</view>
	</view>
</template>

<script setup lang="ts">
import i18n from '../../i18n'
	
const emits = defineEmits<{
	(e: 'showLangSet')
}>()

const setLang = () => {
	emits('showLangSet')
}
</script>

<style lang="scss">
.lang-menu {
  width: 400rpx;
  padding: 30rpx;
  background-color: white;
  position: absolute;
  box-shadow: 0 0 20rpx #00000030;
  z-index: 1;
  border-radius: 14rpx;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

    view {
	    padding: 30rpx;
	    background-color: #00000000;
	    border-radius: 10rpx;
	    cursor: pointer;

	    &:active {
		    background-color: #5985eb;
			color: white;
	    }  
    }
}
</style>