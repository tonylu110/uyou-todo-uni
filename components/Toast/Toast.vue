<template>
	<view class="toast">
	    {{ msg }}
	</view>
</template>

<script setup lang="ts">
const props = defineProps({
	msg: String
})
</script>

<style lang="scss">
.toast {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	background-color: #fff6dc;
	padding: 7px;
	border-radius: 5px;
	color: #996b3d;
	box-shadow: 0 2px 5px #7a695c90;
	font-weight: bold;
	z-index: 20;
}
</style>