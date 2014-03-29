$(document).ready(function(){
	$.getJSON("/google-adsense.config.json", function (data){
			//If ad in header is enabled
			if(data.header_active == "on"){
				$(getInsCode(data.client_id, data.header_id, 'container', 'margin:0 auto;', 'auto')).insertBefore("#content");
				(adsbygoogle = window.adsbygoogle || []).push({});
			}

			//If ad in footer is enabled
			if(data.footer_active == "on"){
				$(getInsCode(data.client_id, data.footer_id, 'container', 'margin:0 auto;', 'auto')).insertBefore("footer");
				(adsbygoogle = window.adsbygoogle || []).push({});
			}
			$(window).on('action:ajaxify.end', function (e, url) {


				if (url.url.substring(0, 6) == "topic/") {
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
			})
			(adsbygoogle = window.adsbygoogle || []).push({});
		})

})

function getInsCode(clientId, dataId, customClass, style, format){
	var ad = '<ins class="adsbygoogle ' + customClass + '" style="display:block; ' + style + ' margin-bottom:15px; " data-ad-format="' + format + '" data-ad-client="ca-' + clientId + '" data-ad-slot="' + dataId + '"></ins>';
	return ad;
}