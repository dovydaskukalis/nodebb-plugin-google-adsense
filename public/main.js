var loaded = false;

$(window).on('action:ajaxify.end', function (e, url) {
	$.getScript("http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function (data){


		$.getJSON("/google-adsense.config.json", function (data){
			//If ad in header is enabled
			console.log(loaded)
			if(data.header_active == "on" && loaded == false){
				$(getInsCode(data.client_id, data.header_id, 'container', 'margin:0 auto;', 'auto')).insertBefore("#content");
				(adsbygoogle = window.adsbygoogle || []).push({});
			}

			//If ad in footer is enabled
			if(data.footer_active == "on" && loaded == false){
				$(getInsCode(data.client_id, data.footer_id, 'container', 'margin:0 auto;', 'auto')).insertBefore("footer");
				(adsbygoogle = window.adsbygoogle || []).push({});
			}

				if (url.url.substring(0, 6) == "topic/") {
					if(data.after_first_post_active == "on"){
						$(".post-row:first-child").after("<div style='height:100px;'>" + getInsCode(data.client_id, data.after_first_post_id, 'container', 'margin:0 auto; margin-top:15px!important; margin-bottom:0!important', 'auto') + "</div>");
						(adsbygoogle = window.adsbygoogle || []).push({});
					}
					if(data.first_post_active == "on"){
						switch(data.first_post_position){
							case 'bottom':
							$(".post-content").first().append(getInsCode(data.client_id, data.footer_id, '', 'margin:0 auto;', 'auto'));
							break;

							case 'top':
							$(".post-content").first().prepend(getInsCode(data.client_id, data.footer_id, '', 'margin:0 auto;', 'auto'));
							break;

							case 'left':
							var height = $(".post-content").first().height();
							if(height < 250){
								var type = "rectangle";
								var width = 250;
							}
							else{
								var width = 300;
								var type ="vertical";
							}
							$(".post-content").first().prepend(getInsCode(data.client_id, data.footer_id, 'pull-left', 'width:' + width + 'px;  margin-right:30px;', type));
							break;

							case 'right':
							var height = $(".post-content").first().height();
							if(height < 250){
								var type = "rectangle";
								var width = 250;
							}
							else{
								var width = 300;
								var type ="vertical";
							}
							$(".post-content").first().prepend(getInsCode(data.client_id, data.footer_id, 'pull-right', 'width:' + width + 'px; margin-left:30px;', type));
							break;

							default:
							break;
						}
						(adsbygoogle = window.adsbygoogle || []).push({});
						
					}
				}
				loaded = true;
			})
})

})


function getInsCode(clientId, dataId, customClass, style, format){
	var ad = '<ins class="adsbygoogle ' + customClass + '" style="display:block; ' + style + ' margin-bottom:15px; " data-ad-format="' + format + '" data-ad-client="ca-' + clientId + '" data-ad-slot="' + dataId + '"></ins>';
	return ad;
}