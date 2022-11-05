if( window.console == undefined ){ console = { log : function(){} }; }

/** browser checker **/
let touchstart = "ontouchstart" in window;
let userAgent=navigator.userAgent.toLowerCase();
document.addEventListener("DOMContentLoaded",() => {
	layoutFunc();
	titleToggle();
});
window.addEventListener("load",() => {
	
});


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
	commonLayout();

	function browserAdd(opt) {
		document.querySelector("html").classList.add(opt);
	}
}

function layoutFunc(){
	function goTop() {
		const btn_topgo_wrap = document.querySelector(".btn_topgo_wrap");
		const footer_main_wrap = document.querySelector(".footer_main_wrap");
		
		const body = document.body;
		const html = document.documentElement;
		let documentHeight = body.scrollHeight;
		let windowHeight = window.innerHeight;
		let footer_main_wrap_pos = 0;
		let footer_main_wrap_height = 0;
		
		if(btn_topgo_wrap === null || footer_main_wrap === null){return;}
		
		let btn_topgo = document.querySelector(".btn_topgo");
		let domHtml = document.querySelector("html");
		if (btn_topgo == null) {
			return;
		}
		btn_topgo.addEventListener("click", (e) => {
			e.preventDefault();
			domHtml.classList.add("smooth");
			setTimeout(function() {
			  window.scrollTo(0, 0);
			}, 30);
		},false);
		window.addEventListener("scroll", () => {
			let scroll = window.pageYOffset;
			footer_main_wrap_pos = footer_main_wrap !== null ? footer_main_wrap.offsetTop : 0;
			footer_main_wrap_height = footer_main_wrap !== null ? footer_main_wrap.offsetHeight : 0;
			
			if (scroll == 0) {
				domHtml.classList.remove("smooth");
			}
			if(documentHeight - windowHeight - 103 <= scroll){
				btn_topgo_wrap.style.bottom = footer_main_wrap_height - 80 + "px";
			}else{
				btn_topgo_wrap.style.bottom = "0px";
			}
		},false);
	}
	

	function footerSwiper(){
		let footer_linkage_obj = null;
		const footer_linkage_container = document.querySelector(".footer_linkage_swiper");
		const footer_linkage_slide = footer_linkage_container.querySelectorAll(".swiper-slide");
		if(footer_linkage_slide.length>1){
			footer_linkage_obj = new Swiper(".footer_linkage_swiper", {
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
	function gnbTotalMenu(){
		const header_zone = document.querySelector(".header_zone");
		const btn_header_total = document.querySelector(".btn_header_total");
		const global_menu_layer = document.querySelector(".global_menu_layer");
		if(btn_header_total === null || global_menu_layer === null){return;}

		btn_header_total.addEventListener("mouseover",()=>{
			global_menu_layer.classList.add("active");
		});

		header_zone.addEventListener("mouseleave",()=>{
			global_menu_layer.classList.remove("active");
		});

		btn_header_total.addEventListener("click",()=>{
			global_menu_layer.classList.toggle("active");
		});
	}
	goTop();
	footerSwiper();
	gnbTotalMenu();
}



function mainVisual(){
	let main_visual_obj = null;
	const main_visual_container = document.querySelector(".main_visual_container");
	const main_visual_slide = main_visual_container.querySelectorAll(".swiper-slide");
	let btn_mv_stop = null;
	let btn_mv_play = null;
	if(main_visual_slide.length>1){
		main_visual_obj = new Swiper(".main_visual_container", {
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

// 베스트 상품
let best_swiper_obj = null;
function bestSwiperFunc(){
	let best_swiper = null;
	let best_swiper_slide = null;
	if(best_swiper_obj == null){
		best_swiper = document.querySelector(".best_swiper");
		best_swiper_slide = best_swiper.querySelectorAll(".swiper-slide");
		best_swiper_obj = new Swiper(".best_swiper", {
			speed : 1000,
			slidesPerView: 4,
			slidesPerGroup: 4,
			loop : true,
			pagination: {
				clickable: true,
				el: ".best_swiper .swiper-pagination.mc_paging",
			},
			autoplay: {
				delay: 2000,
				disableOnInteraction: false
			},
		});
	}
}
function bestSwiperUpdate(){
	if(best_swiper_obj !== null){
		best_swiper_obj.update();
	}
}

// 추천 상품
let recommand_swiper_obj = null;
function recommandSwiperFunc(){
	let recommand_swiper = null;
	let recommand_swiper_slide = null;
	if(recommand_swiper_obj == null){
		recommand_swiper = document.querySelector(".recommend_swiper");
		recommand_swiper_slide = recommand_swiper.querySelectorAll(".swiper-slide");
		if(recommand_swiper_slide.length<=3){
			document.querySelector(".recommend_control").style.display = "none";
			return;
		}
		recommand_swiper_obj = new Swiper(".recommend_swiper", {
			speed : 1000,
			slidesPerView: 3,
			slidesPerGroup: 3,
			loop : true,
			navigation: {
				nextEl: '.recommend_control .btn_mc_control_obj.next_obj',
				prevEl: '.recommend_control .btn_mc_control_obj.prev_obj',
			},
			pagination: {
				clickable: true,
				el: ".recommend_swiper .swiper-pagination.mc_paging",
			},
		});
	}
}
function recommandSwiperUpdate(){
	let recommand_swiper_slide = recommand_swiper.querySelectorAll(".swiper-slide");
	if(recommand_swiper_obj !== null){
		if(recommand_swiper_slide.length>3){
			document.querySelector(".recommend_control .btn_mc_control_obj").style.display = "none";
		}
		recommand_swiper_obj.update();
	}
}

// TV홈쇼핑
let tv_swiper_obj = null;
function tvhomeSwiperFunc(){
	let tvhome_swiper = null;
	let tvhome_swiper_slide = null;
	if(tv_swiper_obj == null){
		tvhome_swiper = document.querySelector(".tvhome_swiper");
		tvhome_swiper_slide = tvhome_swiper.querySelectorAll(".swiper-slide");
		if(tvhome_swiper_slide.length<=5){
			document.querySelector(".tvhome_control").style.display = "none";
			return;
		}
		tv_swiper_obj = new Swiper(".tvhome_swiper", {
			speed : 1000,
			slidesPerView: 5,
			slidesPerGroup: 5,
			loop : true,
			navigation: {
				nextEl: '.tvhome_control .btn_mc_control_obj.next_obj',
				prevEl: '.tvhome_control .btn_mc_control_obj.prev_obj',
			},
			pagination: {
				clickable: true,
				el: ".tvhome_swiper .swiper-pagination.mc_paging",
			},
		});
	}
}
function tvhomeSwiperUpdate(){
	if(tv_swiper_obj !== null){
		tvhome_swiper_slide = tvhome_swiper.querySelectorAll(".swiper-slide");
		if(tvhome_swiper_slide.length<=5){
			document.querySelector(".tvhome_control").style.display = "none";
			return;
		}
		tv_swiper_obj.update();
	}
}

// youtube
let youtube_swiper_obj = null;
function youtubeSwiperFunc(){
	let youtube_swiper = null;
	let youtube_index_prev = null;
	let youtube_index_next = null;
	let youtube_swiper_slide = null;
	let youtube_swiper_slide_length = 0;
	if(youtube_swiper_obj == null){
		youtube_swiper = document.querySelector(".youtube_swiper");
		youtube_swiper_slide = youtube_swiper.querySelectorAll(".swiper-slide");
		youtube_swiper_slide_length = youtube_swiper_slide.length;
		youtube_index_prev = document.querySelector(".custom_index.prev");
		youtube_index_next = document.querySelector(".custom_index.next");
		if(youtube_swiper_slide.length<=3){
			document.querySelector(".custom_control_wrap").style.display = "none";
			return;
		}
		youtube_swiper_obj = new Swiper(".youtube_swiper", {
			speed : 1000,
			slidesPerView: 3,
			slidesPerGroup: 3,
			navigation: {
				nextEl: '.btn_custom_control.next_control',
				prevEl: '.btn_custom_control.prev_control',
			},
			scrollbar: {
				draggable : true,
				el: ".custom_realbar"
			},
		});
		indexHtml();
		youtube_swiper_obj.on("slideChange",function(){
			indexHtml();
		});
	}

	function indexHtml(){
		youtube_index_next.innerHTML =  numParse(youtube_swiper_slide_length/3);
	}

	function numParse(value){
		if(value < 10){
			return "0"+value;
		}else{
			return value;
		}
	}
}
function youtubeSwiperUpdate(){
	if(youtube_swiper_obj !== null){
		youtube_swiper_slide = youtube_swiper.querySelectorAll(".swiper-slide");
		if(youtube_swiper_slide.length<=3){
			document.querySelector(".custom_control_wrap").style.display = "none";
			return;
		}
		youtube_swiper_obj.update();
	}
}


// half left
let halfleft_swiper_obj = null;
function halfleftSwiperFunc(){
	let halfleft_swiper = null;
	let halfleft_swiper_slide = null;
	if(halfleft_swiper_obj == null){
		halfleft_swiper = document.querySelector(".half_left_swiper");
		halfleft_swiper_slide = halfleft_swiper.querySelectorAll(".swiper-slide");
		if(halfleft_swiper_slide.length>1){
			halfleft_swiper_obj = new Swiper(".half_left_swiper", {
				speed : 1000,
				loop : true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				pagination: {
					clickable: true,
					el: ".swiper-pagination.mc_paging.left_half_paging",
				},
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				}
			});
		}
	}
}
function halfleftSwiperUpdate(){
	if(halfleft_swiper_obj !== null){
		halfleft_swiper_obj.update();
	}
}


// half right
let halfright_swiper_obj = null;
function halfrightSwiperFunc(){
	let halfright_swiper = null;
	let halfright_swiper_slide = null;
	if(halfright_swiper_obj == null){
		halfright_swiper = document.querySelector(".half_right_swiper");
		halfright_swiper_slide = halfright_swiper.querySelectorAll(".swiper-slide");
		if(halfright_swiper_slide.length>1){
			halfright_swiper_obj = new Swiper(".half_right_swiper", {
				speed : 1000,
				loop : true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				pagination: {
					clickable: true,
					el: ".swiper-pagination.mc_paging.right_half_paging",
				},
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				}
			});
		}
	}
}
function halfrightSwiperUpdate(){
	if(halfright_swiper_obj !== null){
		halfright_swiper_obj.update();
	}
}



// sub
function titleToggle(){
	const btn_title_toggle = document.querySelectorAll(".btn_title_toggle");
	const layer_title_box = document.querySelectorAll(".layer_title_box");
	if(btn_title_toggle.length){
		btn_title_toggle.forEach((element)=>{
			element.addEventListener("click", (e) => {
				let currentTarget = e.currentTarget;
				let currentTargetParent = currentTarget.closest(".sub_title_wrap");
				let layer_title_box = currentTargetParent.querySelector(".layer_title_box");

				layer_title_box.classList.toggle("active");
			},false);
		});
		document.addEventListener("click" , (e)=> {
			let etarget = e.target;
			let etargetParent = etarget.closest(".layer_title_box");
			if(etarget.classList.contains("btn_title_toggle")){
				return;
			}else if(etargetParent === null){
				layer_title_box.forEach((element) => {
					element.classList.remove("active");
				});
			}
		},false);
	}
}

