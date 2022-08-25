<template>
	<view class="lang-menu">
		<view @click="setLang('auto')" :class="langShow('auto') ? 'select' : ''">
			<text>{{ i18n().setLangText }}</text>
			<uni-icons type="checkmarkempty" size="20" color="white"></uni-icons>
		</view>
		<view @click="setLang('en')" :class="langShow('en') ? 'select' : ''">
			<text>English</text>
			<uni-icons type="checkmarkempty" size="20" color="white"></uni-icons>
		</view>
		<view @click="setLang('zh-Hans')" :class="langShow('zh-Hans') ? 'select' : ''">
			<text>中文（简体）</text>
			<uni-icons type="checkmarkempty" size="20" color="white"></uni-icons>
		</view>
		<view @click="setLang('zh-Hant')" :class="langShow('zh-Hant') ? 'select' : ''">
			<text>中文（繁體）</text>
			<uni-icons type="checkmarkempty" size="20" color="white"></uni-icons>
		</view>
	</view>
</template>

<script setup lang="ts">
import i18n from '../../i18n'
	
const emits = defineEmits<{
	(e: 'showLangSet')
}>()

const setLang = (lang: string) => {
	uni.setLocale(lang)
	emits('showLangSet')
}

const langShow = (lang: string): boolean => {
  const langLocal = uni.getLocale()
  if ((lang === 'auto' && langLocal === null) || lang === langLocal) {
    return true
  } else {
    return false
  }
}
</script>

<style lang="scss">
.lang-menu {
  width: 450rpx;
  background-color: white;
  position: absolute;
  box-shadow: 0 0 20rpx #00000030;
  z-index: 1;
  border-radius: 14rpx;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;

    view {
	    padding: 30rpx;
	    background-color: #00000000;
	    cursor: pointer;
		border-bottom: 1px solid #00000020;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

	    &:active {
		    background-color: #5985eb;
			color: white;
	    }  
		
		&:last-child {
			border: none;
		}
		
		&.select {
			background-color: #5985eb;
			color: white;
		}
    }
}
</style>