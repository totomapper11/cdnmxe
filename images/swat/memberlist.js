$(document).ready(function() {
	$(".additional-stuff .menu ul li").first().addClass("active");
	$(".additional-stuff .stuff > div").first().fadeIn();
	$(".additional-stuff .menu ul li").click(function() {
		if(!$(this).hasClass("active")) {
			active = $(".additional-stuff .menu ul li.active").data("element");
			new_active = $(this).data("element");
			$(".additional-stuff .menu ul li[data-element="+active+"]").removeClass("active");
			$(".additional-stuff .stuff div[data-element="+active+"]").fadeOut(function() {
				$(".additional-stuff .menu ul li[data-element="+new_active+"]").addClass("active");
				$(".additional-stuff .stuff div[data-element="+new_active+"]").fadeIn();
			});
		}
	});
});
