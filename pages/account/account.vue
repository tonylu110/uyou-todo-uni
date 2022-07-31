<template>
	<view class="content">
		<TitleBar
		  :showBackButton="true" 
		  :showRightButton="false"
		  :title="i18n().accountPage.account" 
		  bgColor="#7a695c" 
		  fontColor="#fff"
		  navShadowColor="90"
		  leftImg="arrow-left"
		  @left="back"
		/>
		<scroll-view scroll-y="true" :style="{height: screenHeight - systemBarHeight - rpx2px(101) + 'px'}">
			<view class="scroll-in">
				<view class="setting-item">
					<text>{{ loginText }}</text>
				</view>
				<view v-if="!loginState" class="login-input">
				    <input type="text" :placeholder="i18n().accountPage.account" v-model="uname">
				    <input type="password" :placeholder="i18n().accountPage.passwd" v-model="passwd">
				</view>
				<view v-if="!loginState" class="setting-item login" @click="login">
				    <text>{{ i18n().accountPage.login }}</text>
				</view>
				<view v-if="!loginState" class="setting-item register" @click="openRegister">
				    <text>{{ i18n().accountPage.register }}</text>
				</view>
				<view v-if="loginState" class="setting-item" style="background-color: white; color: black;">
				    <text>{{ i18n().accountPage.autoSync }}</text>
				    <switch :checked="swichState" @change="setAutoSync" />
				</view>
				<view v-if="loginState" class="setting-item logout" @click="logout">
				    <text>{{ i18n().accountPage.logout }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import i18n from '../../i18n'
	
const rpx2px = (rpx: number): number => {
	return uni.upx2px(rpx)
}
const screenHeight = ref(0)
const systemBarHeight = ref(0)
uni.$on('systemBarHeight', (res): void => {
	systemBarHeight.value = res
})

const loginState = ref(false)

const loginText = ref(i18n().loginText)

const swichState = ref(uni.getStorageSync('autoSync') === true || uni.getStorageSync('autoSync') === '')

const setAutoSync = (e) => {
	uni.setStorageSync('autoSync', e.detail.value)
	swichState.value = e.detail.value
}

onMounted(() => {
	uni.getSystemInfo({
		success: (res: unknown): void => {
			screenHeight.value = res.screenHeight
		}
	})
})

uni.getStorage({
	key: 'uid',
	success: (res) => {
		if (res.data !== '') {
			loginState.value = true
		}
	}
})

watchEffect(() => {
	if (loginState.value) {
		uni.getStorage({
			key: 'uname',
			success: (res) => {
				loginText.value = res.data
			}
		})
	}
})
	
const back = () => {
	uni.navigateBack()
}

const uname = ref('')
const passwd = ref('')

const login = () => {
	uni.request({
		url: 'https://api.todo.uyou.org.cn/login',
		method: 'POST',
		header: {
			'Content-Type': 'application/json'
		},
		data: {
			uname: uname.value,
			passwd: passwd.value
		},
		success: (res) => {
			if (res.data._id) {
				uni.setStorage({
					key: 'uid',
					data: res.data._id
				})
				uni.setStorage({
					key: 'uname',
					data: uname.value
				})
				loginState.value = true
				uname.value = ''
				passwd.value = ''
				uni.showToast({
					title: i18n().accountPage.syncData,
					icon: 'loading'
				})
				uni.request({
					url: 'https://api.todo.uyou.org.cn/todoexist',
					data: {
						uid: res.data._id
					},
					success: (resto) => {
						if (resto.data.code === 200) {
							uni.getStorage({
								key: 'todo',
								success: (todo) => {
									uni.request({
										url: 'https://api.todo.uyou.org.cn/addtodo',
										method: 'POST',
										header: {
											'Content-Type': 'application/json'
										},
										data: {
											uid: res.data._id,
											data: todo.data
										},
										success: (res) => {
											if (res.data.code === 200) {
												uni.showToast({
													title: i18n().accountPage.syncSuccess,
													icon: 'success'
												})
											} else {
												uni.showToast({
													title: i18n().accountPage.syncFail,
													icon: 'error'
												})
											}
										}
									})
								}
							})
						} else {
							uni.request({
								url: 'https://api.todo.uyou.org.cn/gettodo',
								method: 'POST',
								header: {
									'Content-Type': 'application/json'
								},
								data: {
									uid: res.data._id
								},
								success: (res) => {
									if (res.data._id) {
										uni.showToast({
											title: i18n().accountPage.syncSuccess,
											icon: 'success'
										})
										uni.setStorage({
											key: 'todo',
											data: JSON.parse(res.data.data).data
										})
									} else {
										uni.showToast({
											title: i18n().accountPage.syncFail,
											icon: 'error'
										})
									}
								}
							})
						}
					}
				})
			} else {
				uni.showModal({
					content: i18n().accountPage.loginError,
				})
			}
		}
	})
}

const logout = () => {
	uni.setStorage({
		key: 'uid',
		data: ''
	})
	uni.setStorage({
		key: 'uname',
		data: ''
	})
	loginState.value = false
	loginText.value = i18n().accountPage.loginText
}

const openRegister = () => {
	plus.runtime.openURL('https://register.todo.uyou.org.cn/#/')
}
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #eee;
}
.scroll-in {
	width: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20rpx;
	
	.login-input {
	    margin-bottom: 25rpx;
	    background-color: white;
	    border-radius: 14rpx;
	    box-shadow: 0 4rpx 20rpx #00000030;
	    width: 650rpx;
	    padding: 20rpx 30rpx;
	    display: flex;
	    flex-direction: column;
	
	    input {
	        padding: 30rpx;
	        margin: 10rpx 0;
	        border: 3rpx solid #00000020;
	        background-color: #00000010;
	        border-radius: 10rpx;
	    }
	}
	
	.setting-item {
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
		
		&.login {
		    background-color: #5985eb;
		    color: white;
		    justify-content: center;
	
		    &:active {
			    background-color: #4e6fbb;
		    }
		}
	
		&.register {
		    justify-content: center;
		}
	
		&.logout {
		    background-color: #e5544b;
		    color: white;
		    justify-content: center;
		}
	}
}
</style>
