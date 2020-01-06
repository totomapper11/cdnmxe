var user_opt_text = usermenu;
var myslider = { 
	delay: 7000,
	on: false,
	max_width: 1494,
	current_id: 0,
	fit: function() {
		if($(window).innerWidth() > this.max_width) {
			this.slide_width = this.max_width;
		} else {
			this.slide_width = $(window).innerWidth();
		}
		$(".slider .slides").css("width", this.slides * this.slide_width);
		it = this;
		$.each($(".slider .slides > div"), function() {
			$(this).css("width", it.slide_width);
		});
		position = (this.current_id * this.slide_width) * -1 + "px";
		$(".slider").css("width", this.slide_width);
		$(".slider .slides").css("transform", "translate3d("+position+", 0, 0)");
	},
	next_slide: function(manually = false) {
		next = this.current_id + 1;
		if($(".slider .slides > div[data-slide="+next+"]").length == 0) {
			next = 0;
			position = "0px";
		} else {
			position = (next * myslider.slide_width) * -1 + "px";
		}
		$(".slider .slides").css("transform", "translate3d("+position+", 0, 0)");
		this.current_id = next;
		if(this.pages == true) {
			$(".slider .pages .page.active").removeClass("active");
			$(".slider .pages .page[data-slide="+next+"]").addClass("active");
		}
		if(manually == true) {
			clearInterval(this.interval);
			this.set_interval();
		}
	},
	stop_slider: function() {
		clearInterval(this.interval);
	},
	previous_slide: function() {
		prev = this.current_id - 1;
		if($(".slider .slides > div[data-slide="+prev+"]").length == 0) {
			prev = $(".slider .slides > div").last().attr("data-slide");
		}
		position = (prev * this.slide_width) * -1 + "px";
		$(".slider .slides").css("transform", "translate3d("+position+", 0, 0)");
		if(this.pages == true) {
			$(".slider .pages .page.active").removeClass("active");
			$(".slider .pages .page[data-slide="+next_id+"]").addClass("active");
		}
		this.current_id = prev;
		clearInterval(this.interval);
		this.set_interval();
	},
	set_interval: function() {
		this.interval = setInterval(this.next_slide, this.delay);
	},
	set_slider: function(pages = false) {
		this.slides = $(".slider .slides > div").length;
		this.fit();
		$(".slider .slides > div").each(function(key) {
			$(this).attr("data-slide", key);
		});
		$(".slider .slides").css("width", this.slides_width);
		if(pages == true) {
			this.make_pagination();
			$(".slider .pages .page[data-slide=0]").addClass("active");
		}
		this.pages = pages;
		this.on = true;
		this.set_interval();
	},
	make_pagination: function() {
		$(".slider .slides > div").each(function(index) {
			id = index;
			$(this).attr("data-slide", id);
			$(".slider .pages").append("<div class='page' data-slide='"+id+"'></div>");
		});
	}
}

$(document).ready(function() {
	myslider.set_slider();
	$(window).resize(function() {
		myslider.fit();
	});
	$("header").prepend("<div class='mobile-container'><div class='mobile-container-bg'></div><div class='mobile-menus'><ul class='user-menu'></ul><ul class='forum-menu'></ul></div></div>")
	user_menu = $("ul.user-panel").html();
	user2 = $("ul.user2").html();
	forum_menu = $("header .top .left ul.menu").html();
	$("header").prepend("<div class='mobile-menus-open'><i class='fa fa-bars'></i></div>");
	$(".mobile-menus .user-menu").append(user_menu);
	$(".mobile-menus .user-menu li.user-menu span").removeAttr("data-dropdown").removeClass().addClass("sm-link").html(user_opt_text);
	$(".mobile-menus .user-menu li.user-menu > ul").removeAttr("data-dropdown").removeClass().addClass("sm-ul");
	$(".mobile-menus .user-menu li.user-menu").removeClass();
	$(".mobile-menus .user-menu li.imp-menu").prependTo(".mobile-menus .user-menu");
	$(".mobile-menus .user-menu li.imp-menu ul").prepend("<li class='close-menus'><i class='fa fa-times-circle'></i></li>");
	$(".mobile-menus .sm-link").click(function() {
		$(this).siblings().fadeToggle();
	});
	$(".mobile-menus .forum-menu").append(forum_menu);
	$(".mobile-menus .forum-menu").append(user2);
	$(".mobile-menus-open i").click(function() {
		$(".mobile-container-bg").css({visibility: "visible"});
		$(".mobile-menus").css({right:0, visibility: "visible"});
	});
	$('.mobile-container-bg').click(function() {
		$(".mobile-menus").css({right: "-300px"});
		setTimeout("$('.mobile-container-bg').css({visibility: 'hidden'});$('.mobile-menus').css({visibility: 'hidden'})", 600);
	});
	$(".mobile-menus .close-menus").click(function() {
		$(".mobile-menus").css({right: "-300px"});
		setTimeout("$('.mobile-container-bg').css({visibility: 'hidden'});$('.mobile-menus').css({visibility: 'hidden'})", 600);
	});
	$(".slider .buttons .previous").click(function() {
		myslider.previous_slide();
	});
	$(".slider .buttons .next").click(function() {
		myslider.next_slide(true);
	});
	$(".slider .pages .page").click(function() {
		id = $(this).attr("data-slide");
		if($(".slider .pages .page[data-slide="+id+"]").hasClass("active") == 0) {
			position = $(this).attr("data-slide") * - 100;
			$(".slider .slides").css("transform", "translate3d("+position+"vw, 0, 0)");
			$(".slider .pages .page.active").removeClass("active");
			$(".slider .pages .page[data-slide="+id+"]").addClass("active");
		}
	});
	$(".login span").click(function() {
		if($(window).innerWidth() > 1080) {
			$("body").css("overflow", "hidden");
			$(".user-panel .login-box-index").fadeIn();
			$(".user-panel .login-box").fadeIn();
		} else {
			window.location.href = rootpath+"/member.php?action=login";
		}
	});
	$(".login-box .close").click(function() {
		$("body").css("overflow", "auto");
		$(".login-box-index").fadeOut();
		$(".login-box").fadeOut();
	});
	$(".login-box-index").click(function() {
		$("body").css("overflow", "auto");
		$(".login-box-index").fadeOut();
		$(".login-box").fadeOut();
	});
	$("footer .up .button").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
	});
	$(".read-all a").attr("href", "misc.php?action=markread&my_post_key=" + my_post_key);
	$(document).on('click',  '.dropdown-overlay', function(){
		dropdown_name = $(this).data("dropdown");
		$("ul[data-dropdown="+dropdown_name+"]").fadeOut();
		$(this).remove()
	});
	$(".dropdown-link").click(function() {
		dropdown_name = $(this).data("dropdown");
		$("body").append("<div class=\"dropdown-overlay\" data-dropdown=\""+dropdown_name+"\"></div>");
		$("ul[data-dropdown="+dropdown_name+"]").fadeIn();
	});
});
