<script>
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: (res) => {
					if (res.osName === 'android') {
						// var Color = plus.android.importClass("android.graphics.Color");
						// plus.android.importClass("android.view.Window");    
						// var mainActivity = plus.android.runtimeMainActivity();    
						// var window_android = mainActivity.getWindow();    
						// var WindowManager=plus.android.importClass("android.view.WindowManager");    
						// var View=plus.android.importClass("android.view.View");    
						// window_android.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);  
						// window_android.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN  | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);  
						// window_android.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);   
						// window_android.setNavigationBarColor(Color.TRANSPARENT);  
						
						var ac = plus.android.runtimeMainActivity(); 
						var win = plus.android.invoke(ac, "getWindow");    
						var dec = plus.android.invoke(win, 'getDecorView')
						
						var View = plus.android.importClass("android.view.View");
						plus.android.invoke(dec, 'setSystemUiVisibility', View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR)
						
						console.log(plus.screen.resolutionHeight);
						console.log(res.windowHeight);
					}
				}
			})
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
