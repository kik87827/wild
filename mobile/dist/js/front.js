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
		let flow_notice_slide = document.querySelectorAll(".flow_container .swiper-slide");
		var flow_notice_obj = null;
		if(flow_notice_slide.length>1){
			flow_notice_obj = new Swiper(".flow_container", {
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



    // mobile total
    function mbTotal(){
        var btn_htotal = document.querySelector(".btn_hdtotal"),
            mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
            mainmenu_dim = document.querySelector(".mainmenu_dim"),
            mbmenu_toggle_one = document.querySelectorAll(".mbmenu_toggle_one"),
            mbmenu_two = document.querySelectorAll(".mbmenu_two"),
            btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
            domHtml = document.querySelector("html"),
            domBody = document.querySelector("body");

        // init 
        if(mobile_mainmenu_zone === null){return;}
        btn_htotal.addEventListener("click",function(e){
            e.preventDefault();
            totalOpen();
        },false);
        btn_mbmenuclose.addEventListener("click",function(e){
            e.preventDefault();
            totalClose();
        },false);
		mbmenu_toggle_one.forEach((element)=>{
			element.addEventListener("click",function(e){
				e.preventDefault();
				let thisEventObj = e.currentTarget;
				let thisNextObj = thisEventObj.nextElementSibling;
				thisEventObj.classList.toggle("active");
				thisNextObj.classList.toggle("active");
			},false);
		});
		mbmenu_two.forEach((element)=>{
			element.addEventListener("click",function(e){
				e.preventDefault();
				let thisEventObj = e.currentTarget;
				let thisNextObj = thisEventObj.nextElementSibling;
				thisEventObj.classList.toggle("active");
				thisNextObj.classList.toggle("active");
			},false);
		});
        mainmenu_dim.addEventListener("click",function(e){
            e.preventDefault();
            totalClose();
        },false);
        function totalOpen(){
            mobile_mainmenu_zone.classList.add("active")
            setTimeout(function(){
                mobile_mainmenu_zone.classList.add("motion");
                if(touchstart){
                    domBody.setAttribute("data-scr", window.pageYOffset);
                    domBody.style.marginTop = -window.pageYOffset + "px";
                    domHtml.classList.add("touchDis");
                }
            },30);
        }
        function totalClose(){
            mobile_mainmenu_zone.classList.remove("motion");
            setTimeout(function(){
                mobile_mainmenu_zone.classList.remove("active");
                domHtml.classList.remove("touchDis");
                domBody.style.marginTop = 0;
                window.scrollTo(0, parseInt(domBody.getAttribute("data-scr")));
            },500);
        }
    }
    mbTotal();
    
	flowNotice();
}


function mainVisual(){
	let main_visual_obj = null;
	const mv_wrap = document.querySelector(".mv_wrap");
	const main_visual_container = document.querySelector(".main_visual_container");
	const mv_paging_current = document.querySelector(".mv_paging_current");
	const mv_paging_length = document.querySelector(".mv_paging_length");
	const main_visual_slide = main_visual_container.querySelectorAll(".swiper-slide");
    mv_paging_length.innerHTML = main_visual_slide.length;
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
				el: ".mv_control_paging",
			},
		});
        main_visual_obj.on("slideChange",()=>{
            mv_paging_current.innerHTML = main_visual_obj.realIndex+1;
        });
	}else{
		mv_wrap.classList.add("nodata");
	}
}


function mainContent(){
	let get_data_container_slide = document.querySelectorAll(".get_data_container .swiper-slide");
	let gallery_one_container_slide = document.querySelectorAll(".gallery_one_container .swiper-slide");
	let gallery_two_container_slide = document.querySelectorAll(".gallery_two_container .swiper-slide");
	let dataSwiperObj_01 = null;
	let dataSwiperObj_02 = null;
	let dataSwiperObj_03 = null;
	if(get_data_container_slide.length>1){
		dataSwiperObj_01 = new Swiper(".get_data_container", {
			speed : 500,
			loop : true,
			pagination: {
				el: '.get_data_container .swiper-pagination',
			}
		});
	}
	if(gallery_one_container_slide.length>1){
		dataSwiperObj_02 = new Swiper(".gallery_one_container", {
			speed : 500,
			loop : true,
			pagination: {
				el: '.gallery_one_container .swiper-pagination',
			}
		});
	}
	if(gallery_two_container_slide.length>1){
		dataSwiperObj_03 = new Swiper(".gallery_two_container", {
			speed : 500,
			loop : true,
			pagination: {
				el: '.gallery_two_container .swiper-pagination',
			}
		});
	}
}