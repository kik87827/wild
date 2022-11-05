if( window.console == undefined ){ console = { log : function(){} }; }

/** browser checker **/
let touchstart = "ontouchstart" in window;
let userAgent=navigator.userAgent.toLowerCase();
document.addEventListener("DOMContentLoaded",() => {
	layoutFunc();
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
	
}
