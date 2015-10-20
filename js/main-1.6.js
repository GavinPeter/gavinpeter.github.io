
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

$( '#example3' ).sliderPro({
			width: 960,
			height: 500,
			fade: true,
			arrows: true,
			buttons: false,
			fullScreen: true,
			shuffle: false,
			smallSize: 500,
			mediumSize: 1000,
			largeSize: 3000,
			thumbnailArrows: true,
			autoplay: true
		});
	
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
    var contentString ='<div style="width:110px;color:black;">台中僑園飯店<br />105/1/23,12:30 pm</div>'; 
 	
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

