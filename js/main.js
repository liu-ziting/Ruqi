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
	//当滚动list时， img进行上下移动
	var srctop = $(this).scrollTop();
	if(thissrctop <= srctop) {
		//下滚
		$("#boxlist li").on('touchmove', function(e) {
			
		});
	} else {
		//上滚
		$("#boxlist li").on('touchmove', function(e) {

		});
	}
	thissrctop = srctop;
	return false;
});

//点击右上角弹窗菜单
$("#topPopover .mui-table-view-cell").click(function() {
	mui('#topPopover').popover('hide');
})

//拖动事件，拖动显示类型
document.getElementById("boxlist").addEventListener("drag", function() {
	$('#mainlist ul .listbut > span').fadeIn();
	return;
});
document.getElementById("boxlist").addEventListener("dragend", function() {
	$('#mainlist ul .listbut > span').fadeOut();
	return;
});


var innerHTML = '';
var pageNo = 1;
var pageSize = 20;
//topiclist(pageNo);

mui.init({
	swipeBack: false,
	pullRefresh: {
		container: '#mainlist',
		down: {
			style: 'circle', //必选，下拉刷新样式
			range: '190px', //可选 默认100px,控件可下拉拖拽的范围
			auto: true, //可选,默认false.首次加载自动上拉刷新一次
			callback : function(){
	    		setTimeout(function() {
	    			mui('#mainlist').pullRefresh().endPulldownToRefresh();//停止下拉刷新,回到顶部
		    		topiclist(1);
				}, 500);
	    	} 
		},
		up: {
			auto: false, //自动执行一次上拉加载，可选；
			show: true, //显示底部上拉加载提示信息，可选；
			contentinit: '上拉显示更多',
			contentdown: '上拉显示更多',
			contentrefresh: '正在加载...',
			contentnomore: '没有更多数据了',
			callback: function(){
    			setTimeout(function() {
					topiclist(++pageNo);
				}, 500);
	    	} 
		}
	}
});


//文章列表接口请求
function topiclist(pageNo){
	var Authorization = localStorage.getItem("Authorization")
	mui.ajax(getUrl()+'topic/list', {
		data: {
			Authorization:Authorization,
			pageNo:pageNo,
			pageSize:pageSize
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(result) {
			if(result.code == 0){
				var innerHTML = '';
				for (var i = 0; i < result.data.list.length; i++) {
					
					innerHTML +='<li>';
					if(result.data.list[i].img){
						var filesString=result.data.list[i].img;
						var imglist=filesString.split(",");
						for(var j=0;j<imglist.length;j++){
							innerHTML +='<img class="listimg" src="'+imgurl+imglist[0]+'" />';
						}
					};
					
					innerHTML +='<h1>'+result.data.list[i].title+'</h1>';
					innerHTML +='<p>'+result.data.list[i].title+'</p>';
					innerHTML +='<div class="listbut">';
					innerHTML +='<span>智障青年</span>';
					innerHTML +='<b>30分钟前</b>';
					innerHTML +='<div>';
					innerHTML +='<span><img src="../img/fx.png"/>145</span>';
					innerHTML +='<span><img src="../img/xx.png"/>69</span>';
					innerHTML +='</div>';
					innerHTML +='</div>';
					innerHTML +='<div class="mui-clearfix"></div>';
					innerHTML +='</li>';
				};
				$("#boxlist").append(innerHTML);
				mui('#mainlist').pullRefresh().endPullupToRefresh(result.data.list.length<20 ); //参数为true代表没有更多数据了。 
			}
		},
	});
}



/**
 * 预加载详情页具体业务实现
 */
mui.plusReady(function() {
	webview_detail = mui.preload({
		url: 'listdetails.html',
	});
});
mui.plusReady(function() {
	webview_detail = mui.preload({
		url: 'find.html',
	});
});
mui.plusReady(function() {
	webview_detail = mui.preload({
		url: 'wode.html',
	});
});
//打开新页面--文章详情
mui("#boxlist").on('tap', 'li', function() {
	//获取id
	var id = this.getAttribute("id");
	//传值给详情页面，通知加载新数据
	//mui.fire(detail,'getDetail',{id:id});
	//打开新闻详情
	mui.openWindow({
		id: 'detail',
		url: 'listdetails.html',
		extras: {
			//自定义扩展参数，可以用来处理页面间传值
		},
		createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
			duration: '200' //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '正在加载...', //等待对话框上显示的提示内容
		}

	})
})

