mui.init({
	swipeBack: true //启用右滑关闭功能
});
//判断手势滑动事件
var srctop = 0,
	thissrctop = 0;
$(window).scroll(function() {
	//当滚动到距离顶部50像素时， 显示新头部
	if($(this).scrollTop() >= 60) {
		$("header h1,#bars").css({
			"bottom": "0px",
			'transition': 'all 0.5s',
		})
	} else {
		$("header h1,#bars").css({
			"bottom": "-50px",
			'transition': 'all 0.3s',
		})
	}
	thissrctop = srctop;
	return false;
});

mui.init({
	swipeBack: false,
	pullRefresh: {
		container: '#collectionlist',
		up: {
			callback: pullupRefresh,
			auto: false, //自动执行一次上拉加载，可选；
			show: true, //显示底部上拉加载提示信息，可选；
			contentinit: '上拉显示更多',
			contentdown: '上拉显示更多',
			contentrefresh: '正在加载...',
			contentnomore: '没有更多数据了'
		}
	}
});
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	if(window.plus && plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
		plus.nativeUI.toast('似乎已断开与互联网的连接', {
			verticalAlign: 'top'
		});
		setTimeout(function() {
			mui('#collectionlist').pullRefresh().endPullupToRefresh(Boolean); //结束上拉
		}, 1000);
		return;
	}

	setTimeout(function() {

		setTimeout(function() {
			mui('#collectionlist').pullRefresh().endPullupToRefresh(true); //结束上拉，没有数据了
		}, 1000);
	}, 2000);
}