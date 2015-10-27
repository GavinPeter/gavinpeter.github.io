
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

		   // Load the classic theme
    Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.4.2/themes/classic/galleria.classic.min.js');

    // Initialize Galleria
    Galleria.run('#galleria', {

    // configure
    autoplay: true,
    lightbox: true,
    idleMode: true,
	// extend theme
    extend: function() {
        var gallery = this; // "this" is the gallery instance

        //fullscreen button
        this.addElement('fscr');
        this.appendChild('stage','fscr');
        var fscr = this.$('fscr').click(function() {
            	gallery.toggleFullscreen();
		$(".galleria-fscr").toggleClass("minimize");
        });

        // this.addIdleState(this.get('fscr'), { opacity:0 });
    }

	});
	
});

//google map
function initMap() {
    //初始畫一個LatLng物件(位置的物件，須以經緯度為參數加入)
    var latlng = new google.maps.LatLng(24.160069,120.643771); 
    var mapOptions = {
        center: latlng, //目前地圖中央的位置(須放置LatLng物件)
        zoom: 16, //地圖縮放程度
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //設定Google Map會檢視於哪個區塊中，如下為id=map_canvas的html標籤區塊
    map = new google.maps.Map(document.getElementById("gmap"), 
        mapOptions);
 
    //設定地圖標記提示框中的html內容
    var contentString ='<div style="width:110px;color:black;">台中僑園飯店<br />105/1/23,12:00 pm</div>'; 
 	
    var infowindow = new google.maps.InfoWindow({
        content: contentString //提示框中的內容
    });
	 
    //建立一個marker物件(地圖標記點)
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
		title: '嘉宏❤津舫婚禮'
    });
	
	    //建立一個marker物件(地圖標記點)
    var marker_p1 = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(24.159531, 120.643323),
		icon: 'img/free-parking.png',
		title: '免費停車場'
    });
	
	var marker_p2 = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(24.160649, 120.644083),
		icon: 'img/toll-parking.png',
		title: '付費停車場'
    });
     
    //檢視(open)提示框並指向map物件裡的marker標記點
    infowindow.open(map, marker);
}

