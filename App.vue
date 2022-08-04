<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
.black-back {
	background-color: #00000030;
	height: 100%;
	width: 750rpx;
	position: fixed;
	top: 50px;
	backdrop-filter: blur(10px);
}
</style>
