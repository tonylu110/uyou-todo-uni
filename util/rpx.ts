const rpxPx = (rop: boolean, num: number): number => {
	if (rop) {
		return uni.upx2px(num)
	} else {
		return num/(uni.upx2px(100)/100)
	}
}

export default rpxPx