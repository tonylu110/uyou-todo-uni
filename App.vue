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
@font-face {
	font-family: 'smartisan-t';
	src: url('static/fonts/smartisan-t/Smartisan_Compact-Regular.ttf');
}

@font-face {
	font-family: 'smartisan-t';
	font-weight: bold;
	src: url('static/fonts/smartisan-t/Smartisan_Compact-Bold.ttf');
}	

* {
	font-family: 'smartisan-t';
}

.black-back {
	background-color: #00000030;
	height: 100%;
	width: 750rpx;
	position: fixed;
	top: 50px;
	backdrop-filter: blur(10px);
}
</style>
