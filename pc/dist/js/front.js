if( window.console == undefined ){ console = { log : function(){} }; }

/** browser checker **/
let touchstart = "ontouchstart" in window;
let userAgent=navigator.userAgent.toLowerCase();
document.addEventListener("DOMContentLoaded",() => {
	layoutFunc();
});
window.addEventListener("load",() => {
	
});
$(window).on("load",function(){
	commonResize();
	posLayerEvent();
});

function commonResize(){
	var $window_width = 0;
	$(window).on("resize",function(){
		if($window_width == $(window).width()){
			return;
		}
		posLayerResize();
	}).resize();
}

function commonInit() {
	let touchstart = "ontouchstart" in window;
	let userAgent = navigator.userAgent.toLowerCase();
	let checkitem = [];
	if (touchstart) {
		browserAdd("touchmode");
	}
	if (userAgent.indexOf('samsung') > -1) {
		browserAdd("samsung");
	}

	if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
		browserAdd("window");
	}

	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
		// iPad or iPhone
		browserAdd("ios");
	}

	window.onload = function() {}

	function browserAdd(opt) {
		document.querySelector("html").classList.add(opt);
	}
}

function layoutFunc(){

	function flowNotice(){
		let flow_notice_slide = document.querySelectorAll(".flow_notice_container .swiper-slide");
		let flow_notice_obj = null;
		if(flow_notice_slide.length>1){
			flow_notice_obj = new Swiper(".flow_notice_container", {
				direction: "vertical",
				speed : 500,
				loop : true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				}
			});
		}
	}

	function btnTop(){
		let btn_gotop = document.querySelector(".btn_gotop");

		btn_gotop.addEventListener("click",(e)=>{
			e.preventDefault();
			window.scrollTo(0,0);
		});
	}

	flowNotice();
	btnTop();
}



function mainVisual(){
	let main_visual_obj = null;
	const main_visual_container = document.querySelector(".mv_container");
	const main_visual_slide = main_visual_container.querySelectorAll(".swiper-slide");
	let btn_mv_stop = null;
	let btn_mv_play = null;
	if(main_visual_slide.length>1){
		main_visual_obj = new Swiper(".mv_container", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.main_visual_paging",
			},
            navigation: {
                nextEl: '.btn_mv_control.next_control',
                prevEl: '.btn_mv_control.prev_control',
            },
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
		btn_mv_stop = document.querySelector(".btn_mv_stop");
		btn_mv_play = document.querySelector(".btn_mv_play");

		btn_mv_play.addEventListener("click", (e) => {
			e.preventDefault();
			main_visual_obj.autoplay.start();
		},false);

		btn_mv_stop.addEventListener("click", (e) => {
			e.preventDefault();
			main_visual_obj.autoplay.stop();
		},false);
	}
}




function posLayerEvent(){
	var posCallBtn = $("[data-poslayer]");
	var poslayer_z = $(".poslayer_z");
	
	$("body").append(poslayer_z);

	
	
	posCallBtn.on("click",function(e){
		var $this = $(this),
			$t_t = $($this.attr("data-poslayer"));
		e.preventDefault();
		posLayerShow($t_t,$this);
	});
	poslayer_z.on("click",".layerclose",function(e){
		e.preventDefault();
		posLayerHide($(this).parents(".poslayer_z"));
	});

	$(document).on("click",".btn_psubmit",function(e){
		e.preventDefault();
		let thisParent = $(this).parents(".poslayer_z");
		let targetCols = $(`[data-poslayer='#${thisParent.attr("id")}']`);
		let activeDate = thisParent.attr("data-date");
		let activeText = thisParent.find(".pclayer_vlist > li.active").text();
		targetCols.addClass("result_mode");
		if(thisParent.attr("data-date") !== undefined){
			targetCols.find(".search_form_text_result").html(activeDate);
		}else{
			targetCols.find(".search_form_text_result").html(activeText);
		}
		console.log();
		posLayerHide(thisParent);
	});

	$(document).on("click",".pcv_chk",function(e){
		e.preventDefault();
		$(this).parents("li").siblings().removeClass("active");
		$(this).parents("li").addClass("active");
	});

	$(document).on("click",function(e){
		if (!$(e.target).parents("[data-poslayer] , .poslayer_z , .layer_in_control").length && !$(e.target).is("[data-poslayer]") && !$(e.target).is(".layer_in_control")){
			posLayerHide($(".poslayer_z.active"));
		}
	});
}

function posLayerShow(target,btn){
	var poslayer_z = $(".poslayer_z");
	var target = $(target);
	
	$("body").append(target);
	poslayer_z.removeClass("active");
	target.addClass("active");
	posLayerPos(target,btn);
}

function posLayerResize(){
	var poslayer_z = $(".poslayer_z");
	if (poslayer_z.length){
		poslayer_z.each(function(){
			posLayerResizeAction($(this));
		});
	}
}

function posLayerPos(target,btn){
	var $target = $(target);
	var $target_tvitdep = $target.find(".tvitdep_vlist_wrap");
	var $target_tvitdep_pos = $target_tvitdep.length ? $target_tvitdep.offset().left : 0;
	var $target_tvitdep_wid = $target_tvitdep.length ? $target_tvitdep.outerWidth() : 0;
	var $targetWid = $target.length ? $target.outerWidth() : 0;
	var $btn = $(btn);
	var $btnIndex = $btn.index();
	var $btnPosTop = $btn.length ? $btn.offset().top : 0;
	var $btnPosHeight = $btn.length ? $btn.outerHeight() : 0;
	var $btnPosLeft = $btn.length ? $btn.offset().left : 0;
	var $btnWid = $btn.length ? $btn.outerWidth() : 0;
	var elseMargin = 0;
	$target.css({"top":"", "left" : "" , "right" : "" , "width" : ""});
	if ($targetWid + $btnPosLeft > $(window).width()){
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 60,
			"left": "auto",
			"right" : 20
		});
	}else{
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 60,
			"left": $btnPosLeft
		});
	}
}

function posLayerResizeAction(target){
	var $target = $(target);
	var $target_tvitdep = $target.find(".tvitdep_vlist_wrap");
	var $target_tvitdep_pos = $target_tvitdep.length ? $target_tvitdep.offset().left : 0;
	var $target_tvitdep_wid = $target_tvitdep.length ? $target_tvitdep.outerWidth() : 0;
	var $targetWid = $target.length ? $target.outerWidth() : 0;
	var $btn = $("[data-poslayer='#" + $target.attr("id") +"']");
	var $btnIndex = $btn.index();
	var $btnPosTop = $btn.length ? $btn.offset().top : 0;
	var $btnPosHeight = $btn.length ? $btn.outerHeight() : 0;
	var $btnPosLeft = $btn.length ? $btn.offset().left : 0;
	var $btnWid = $btn.length ? $btn.outerWidth() : 0;
	$target.css({"top":"", "left" : "" , "right" : "" , "width" : ""});
	if ($targetWid + $btnPosLeft > $(window).width()) {
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 60,
			"left": "auto",
			"right": 20
		});
	} else {
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 60,
			"left": $btnPosLeft
		});
	}
}

function posLayerHide(target){
	var target = $(target) || target;
	target.removeClass("active");
}