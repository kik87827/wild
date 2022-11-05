if( window.console == undefined ){ console = { log : function(){} }; }

/** browser checker **/
let touchstart = "ontouchstart" in window;
let userAgent=navigator.userAgent.toLowerCase();
document.addEventListener("DOMContentLoaded",() => {
	layoutFunc();
	btnToggleItem();
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
    // footer toggle
    function footerToggle(){
        let btn_bot_toggle = document.querySelector(".btn_bot_toggle");
        let bot_cont_wrap = document.querySelector(".bot_cont_wrap");
        if(btn_bot_toggle === null){return;}
        btn_bot_toggle.addEventListener("click",(e)=>{
            e.preventDefault();
            e.currentTarget.classList.toggle("active");
            bot_cont_wrap.classList.toggle("active");
        },false);
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
    footerToggle();
}



function mainVisual(){
	let main_visual_obj = null;
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
			}
		});
        main_visual_obj.on("slideChange",()=>{
            mv_paging_current.innerHTML = main_visual_obj.realIndex+1;
        });
	}
}


// pick 상품
let pick_swiper_obj = null;
function pickSwiperFunc(){
	let pick_swiper = null;
	let pick_swiper_slide = null;
	if(pick_swiper_obj == null){
		pick_swiper = document.querySelector(".mc_thum_container");
		pick_swiper_slide = pick_swiper.querySelectorAll(".swiper-slide");
		if(pick_swiper_slide.length>1){
			pick_swiper_obj = new Swiper(".mc_thum_container", {
				speed : 1000,
				loop : true,
				pagination: {
					clickable: true,
					el: ".mc_thum_container .swiper-pagination.mc_paging",
				},
			});
		}
	}
}
function pickSwiperUpdate(){
	if(pick_swiper_obj !== null){
		pick_swiper_obj.update();
	}
}


// 이런 상품은 어떠세요?
let product_swiper_obj = null;
function productSwiperFunc(){
	let product_swiper = null;
	let product_swiper_slide = null;
	if(product_swiper_obj == null){
		product_swiper = document.querySelector(".mc_product_container");
		product_swiper_slide = product_swiper.querySelectorAll(".swiper-slide");
		if(product_swiper_slide.length>1){
			product_swiper_obj = new Swiper(".mc_product_container", {
				slidesPerView: "auto",
				spaceBetween: 20,
				freeMode: true,
				mousewheelControl: true
			});
		}
	}
}
function productSwiperUpdate(){
	if(product_swiper_obj !== null){
		product_swiper_obj.update();
	}
}


// youtube
let youtube_swiper_obj = null;
function youtubeSwiperFunc(){
	let youtube_swiper = null;
	let youtube_swiper_slide = null;
	if(youtube_swiper_obj == null){
		youtube_swiper = document.querySelector(".youtube_swiper");
		youtube_swiper_slide = youtube_swiper.querySelectorAll(".swiper-slide");
		youtube_swiper_obj = new Swiper(".youtube_swiper", {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 20,
            loop:true
		});
	}
}
function youtubeSwiperUpdate(){
	if(youtube_swiper_obj !== null){
		youtube_swiper_obj.update();
	}
}

function btnToggleItem(){
	addDynamicEventListener(document.body, 'click', '.btn_likeitem', function (e) {
		let etarget = e.target;
		etarget.classList.toggle("active");
	});
}

function siblings(t) {
    var children = t.parentElement.children;
    var tempArr = [];

    for (var i = 0; i < children.length; i++) {
        tempArr.push(children[i]);
    }

    return tempArr.filter(function(e){
        return e != t;
    });
}
