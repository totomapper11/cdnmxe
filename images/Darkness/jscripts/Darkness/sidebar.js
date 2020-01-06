function setCookie(nazwa, wartosc, dni) {
	 var teraz = new Date();
	 var wygasa = new Date();
	 if (dni == null || dni == 0) dni = 1;
	 wygasa.setTime(teraz.getTime() + 3600000 * 24 * dni);
	 document.cookie = nazwa+"="+escape(wartosc) + ";expires="+wygasa.toGMTString();
}
function getCookie(nazwa) {
	var theCookie=" "+document.cookie;
	var ind = theCookie.indexOf(" "+nazwa+"=");
	if (ind ==-1) ind=theCookie.indexOf(";"+nazwa+"=");
	if (ind ==-1 || nazwa=="") return "";
	var ind1 = theCookie.indexOf(";",ind+1);
	if (ind1 == -1) ind1=theCookie.length; 
	return unescape(theCookie.substring(ind+nazwa.length+2,ind1));
}
jQuery.fn.Sidebar = function(){
	var status = getCookie("sidebar"),
	speed = 1200,
	forums_width = "74%",
	sidebox_width = "25%",
	efect = "easeOutElastic";
	if(status == 1){
		jQuery(".main-aside").css({"width":"0%", "display":"None"});
		jQuery(".forums").css({"width":"100%"});	
		jQuery(".themesidebar").find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left");
	} else{
		jQuery(".main-aside").css({"width":sidebox_width, "display":"block"});
		jQuery(".forums").css({"width":forums_width});	
		jQuery(".themesidebar").find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-right");
	}

	jQuery(".themesidebar").click(function(e){
		e.preventDefault();
		if (!jQuery(".forums").is(':animated')){
			var status = getCookie("sidebar");
			if(status == 0){
			jQuery(".forums").animate({"width":"100%"},speed,efect);	
			jQuery(".main-aside").animate({"width":"0","opacity":"0"},speed,efect, function() {
				jQuery(".main-aside").css({"display":"None"});
				jQuery(".themesidebar").find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left");
				setCookie("sidebar", 1, 360);
				});		
			}
			else {
				jQuery(".main-aside").animate({"width":sidebox_width,"opacity":"1"},speed,efect);
				jQuery(".main-aside").css({"display":"block"});
				jQuery(".forums").animate({"width":forums_width},speed,efect, function() {
					jQuery(".themesidebar").find("i").removeClass("fa-angle-double-left").addClass("fa-angle-double-right");
					setCookie("sidebar", 0, 360);
					});
			}
		}
	});
};