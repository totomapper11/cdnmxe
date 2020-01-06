jQuery.fn.SuperMenu = function(){
	jQuery(this).find("> ul").find("> li").each(function(){
		
		var menu_content = jQuery(this).find("ul");
		
		jQuery(this).mouseenter(function(){
			menu_content.finish().fadeToggle().addClass("active");
		});
		
		jQuery(this).mouseleave(function(){
			menu_content.finish().fadeToggle().removeClass("active");
		});
	
	});
};