(function($) {
    $.fn.selectize = function(options) {
        var settings = $.extend({ 
            auto_submit: false,
            list_direction: "bottom",
        }, options);
        return this.each(function() { 
            var s = $(this);
            if(s.is("select")) {
                s.hide();
                var id = s.attr("name");
                var n = s.attr("data-select-name");
                s.parent().append("<div class='selectize selectize--"+settings.list_direction+"' data-id='"+id+"'><div class='selectize__open'>"+n+"</div><div class='selectize__options'></div></div>");
                var h = s.siblings(".selectize[data-id="+id+"]");
                if(s.find("option").length > 0) {
                    s.find("option").each(function() {
                        var c = $(this);
                        h.find(".selectize__options").append("<div class='selectize__options__option' data-name='"+c.attr('value')+"'>"+c.text()+"</div>");
                    }).promise().done(function() {
                        h.on('click', ".selectize__open", function() {
                            h.addClass("selectize--opened");
                            $("body").append("<div class='selectize__overlay'></diV>");
                        });
                        $("body").on('click', ".selectize__overlay", function() {
                            $(".selectize.selectize--opened").removeClass("selectize--opened");
                            $(".selectize__overlay").detach();
                        });
                        h.on('click', ".selectize__options__option", function() {
                            s.val($(this).attr("data-name"));
                            if(settings.auto_submit == true) {
                                s.parents('form:first').submit();
                            }
                        });
                    });
                }
            }
        });
    }
})(jQuery);

$(document).ready(function() {
	var user_opt_text = $(".user_na_menu").html();
    $("header").prepend("<div class='mobile-container'><div class='mobile-container-bg'></div><div class='mobile-menus'><ul class='user-menu'></ul><ul class='forum-menu'></ul></div></div>")
    user_menu = $("ul.user-panel").html();
    user2 = $("ul.user2").html();
    forum_menu = $(".hd-cont ul.menu").html();
    $("body").prepend("<div class='mobile-menus-open'><i class='fa fa-bars'></i></div>");
	$(".mobile-menus .user-menu").append(user_menu);
    //$(".mobile-menus .user-menu li.user-menu a").removeAttr("data-dropdown").removeClass().addClass("sm-link").html(user_opt_text);
	$(".mobile-menus .user-menu li.user-menu #mobile_menu").removeAttr("data-dropdown").removeClass().addClass("sm-link").html(user_opt_text);
    $(".mobile-menus .user-menu li.user-menu > ul").removeAttr("data-dropdown").removeClass().addClass("sm-ul");
    $(".mobile-menus .user-menu li.user-menu").removeClass();
    $(".mobile-menus .user-menu li.imp-menu").prependTo(".mobile-menus .user-menu");
    $(".mobile-menus .user-menu li.imp-menu ul").prepend("<li class='close-menus'><i class='fa fa-times-circle'></i></li>");
    $(".mobile-menus .forum-menu").append(forum_menu);
    $(".mobile-menus .forum-menu").append(user2);
	
	$( ".mobile-menus .forum-menu li.menu-dropdown" ).each(function( index ) {
		var temp = $(this).html();
		temp = temp.replace("<a", "<span");
		temp = temp.replace("<a", "<span");
		temp = temp.replace("</a>", "</span>");
		$(this).html(temp);
		
		$("span.dropdown-link", this).removeAttr("data-dropdown").removeClass().addClass("sm-link").html($("span", this).html());
		$(" > ul", this).removeAttr("data-dropdown").removeClass().addClass("sm-ul");
		$(this).removeClass();
		
	});
    $(".mobile-menus-open i").click(function() {
        $(".mobile-container-bg").css({
            visibility: "visible"
        });
        $(".mobile-menus").css({
            right: 0,
            visibility: "visible"
        });
    });
    $(".mobile-menus .sm-link").click(function() {
        console.log("d");
        $(this).siblings("ul").fadeToggle();
    });
    $('.mobile-container-bg').click(function() {
        $(".mobile-menus").css({
            right: "-300px"
        });
        setTimeout("$('.mobile-container-bg').css({visibility: 'hidden'});$('.mobile-menus').css({visibility: 'hidden'})", 600);
    });
    $(".mobile-menus .close-menus").click(function() {
        $(".mobile-menus").css({
            right: "-300px"
        });
        setTimeout("$('.mobile-container-bg').css({visibility: 'hidden'});$('.mobile-menus').css({visibility: 'hidden'})", 600);
    });
    $(".login span").click(function() {
        if ($(window).innerWidth() > 1080) {
            $("body").css("overflow-y", "hidden");
            $(".user-panel .login-box-index").fadeIn();
            $(".user-panel .login-box").fadeIn();
        } else {
            window.location.href = rootpath + "/member.php?action=login";
        }
    });
    $(".login-box .close").click(function() {
        $("body").css("overflow-y", "auto");
        $(".login-box-index").fadeOut();
        $(".login-box").fadeOut();
    });
    $(".login-box-index").click(function() {
        $("body").css("overflow-y", "auto");
        $(".login-box-index").fadeOut();
        $(".login-box").fadeOut();
    });
    $(".footer__btt").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });
    $(".read-all a").attr("href", "misc.php?action=markread&my_post_key=" + my_post_key);
    $(document).on('click', '.dropdown-overlay', function() {
        dropdown_name = $(this).data("dropdown");
        $("ul[data-dropdown=" + dropdown_name + "]").fadeOut();
        $(this).remove();
    });
    $(".dropdown-link").click(function() {
		$('.dropdown-overlay').each( function(index) {
			dropdown_name = $(this).data("dropdown");
			//console.log('data-dropdown="' + dropdown_name + '"');
			$("ul[data-dropdown=" + dropdown_name + "]").fadeOut();
			$(this).remove();
		});
		
        dropdown_name = $(this).data("dropdown");
        $("body").append("<div class=\"dropdown-overlay\" data-dropdown=\"" + dropdown_name + "\"></div>");
        $("ul[data-dropdown=" + dropdown_name + "]").fadeIn();
    });
    $("footer select").selectize({auto_submit: true, list_direction: "top"});
});