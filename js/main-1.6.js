
$(function() {

	// Do our DOM lookups beforehand
	var nav_container = $(".header-container");
	var nav = $("#nav");
	
	var top_spacing = 15;
	var waypoint_offset = 50;

	nav_container.waypoint({
		handler: function(event, direction) {
			
			if (direction == 'down') {
			
				nav_container.css({ 'height':nav.outerHeight(), 'position':'', 'bottom':''  });
				nav_container.stop().addClass("sticky").css("top",-nav.outerHeight()).animate({"top":top_spacing});
				
			} else {
				nav_container.css({ 'top':'', 'height':'' });
				nav_container.stop().removeClass("sticky").css({'position':'absolute', "bottom":nav.outerHeight()+waypoint_offset}).animate({"bottom":"20"});
			}
			
		},
		offset: function() {
			return -nav.outerHeight()-waypoint_offset;
		}
	});
	
	var sections = $("section");
	var navigation_links = $("#nav ul li a");
	
	sections.waypoint({
		handler: function(event, direction) {
		
			var active_section;
			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('nav a[href="#' + active_section.attr("id") + '"]');
			navigation_links.removeClass("selected");
			active_link.addClass("selected");

		},
		offset: '25%'
	})
	
	
	navigation_links.click( function(event) {

		$.scrollTo(
			$(this).attr("href"),
			{
				duration: 1000,
				offset: { 'left':0, 'top':-0.08*$(window).height() }
			}
		);
			event.preventDefault();
	});

	
	    var jssor_1_options = {
              $AutoPlay: true,
              $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$
              },
              $ThumbnailNavigatorOptions: {
                $Class: $JssorThumbnailNavigator$,
                $Cols: 10,
                $SpacingX: 3,
                $SpacingY: 3,
                $Align: 260
              }
            };
            
            var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);
            
            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizes
           function ScaleSlider() {
                //var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
		var refSize = $("section").width();
                if (refSize) {
                    refSize = Math.min(refSize, 800);
                    jssor_1_slider.$ScaleWidth(refSize);
                }
                else {
                    window.setTimeout(ScaleSlider, 30);
                }
            }
            ScaleSlider();
            $(window).bind("load", ScaleSlider);
            $(window).bind("resize", ScaleSlider);
            $(window).bind("orientationchange", ScaleSlider);
            //responsive code end
	
    //$('figure.responsive-image').picture();
});

//google map
function initMap() {
    //初始畫一個LatLng物件(位置的物件，須以經緯度為參數加入)
    var latlng = new google.maps.LatLng(24.160069,120.643771); 
    var mapOptions = {
        center: latlng, //目前地圖中央的位置(須放置LatLng物件)
        zoom: 15, //地圖縮放程度
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //設定Google Map會檢視於哪個區塊中，如下為id=map_canvas的html標籤區塊
    map = new google.maps.Map(document.getElementById("gmap"), 
        mapOptions);
 
    //設定地圖標記提示框中的html內容
    var contentString ='<div style="width:100px;color:black;">嘉宏❤津舫婚禮<br />台中僑園飯店<br />民國105年1月23日, 中午12:30</div>'; 
 	
    var infowindow = new google.maps.InfoWindow({
        content: contentString //提示框中的內容
    });
	 
    //建立一個marker物件(地圖標記點)
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
		title: '嘉宏❤津舫婚禮'
    });
     
    //檢視(open)提示框並指向map物件裡的marker標記點
    infowindow.open(map, marker);
}

