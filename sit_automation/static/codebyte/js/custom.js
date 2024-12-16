 var Codebyte = function(){
	 "use strict"
	/* Search Bar ============ */
	var screenWidth = $( window ).width();
	var screenHeight = $( window ).height();
	
	
	
	var handleSelectPicker = function(){
		if(jQuery('.default-select,.table-responsive select').length > 0 ){
			jQuery('.default-select').selectpicker();
			jQuery('.default-select,.table-responsive select').selectpicker();
		}

	}

	var handlePreloader = function(){
		setTimeout(function() {
			jQuery('#loading-area').remove();
			$('#main-wrapper').addClass('show');
		},1200);	
		
	}
	
    var handleMetisMenu = function() {
		if(jQuery('#menu').length > 0 ){
			$("#menu").metisMenu();
		}
		jQuery('.metismenu > .mm-active ').each(function(){
			if(!jQuery(this).children('ul').length > 0)
			{
				jQuery(this).addClass('active-no-child');
			}
		});
	}
   
    var handleAllChecked = function() {
		$("#checkAll, #checkAll4, #checkAll1, #checkAll2, #checkAll5").on('change',function() {
			$("td input, .email-list .custom-checkbox input").prop('checked', $(this).prop("checked"));
		});
		$(".checkAllInput").on('click',function() {
			jQuery(this).closest('.ItemsCheckboxSec').find('input[type="checkbox"]').prop('checked', true);		
		});
		$(".unCheckAllInput").on('click',function() {
			jQuery(this).closest('.ItemsCheckboxSec').find('input[type="checkbox"]').prop('checked', false);		
		});
	}

	var handleNavigation = function() {
		$(".nav-control").on('click', function() {

			$('#main-wrapper').toggleClass("menu-toggle");

			$(".hamburger").toggleClass("is-active");
			handleMinHeight();
		});
		
	}

	var handleEcommerceCategory = function(){

		$("input[name='automationSelect']" ).on( "change", function() {
			$('.check-ai').removeClass('active');
			$(this).closest('.check-ai').addClass('active');
			if($(this).val() === "automatic"){
				$('.check-sub-bx').addClass('dismiss');
			}else{
				$('.check-sub-bx').removeClass('dismiss');
			}
		});
		$(document).ready(function(){
			$(document).ready(function() {
    // Handle click event of the button with id "add-btn"
    $('#add-btn').click(function() {
      // Define the HTML content to be appended
      var newContent = `

		<hr>
        <div class="check-sub-bx-1 mt-3 dismiss">
          <div class="row">
            <div class="col-xl-3">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label required">Product Tag</label>
                <div class="dropdown bootstrap-select default-select w-100">
                  <select class="default-select w-100" aria-label="Default select example">
                    <option selected="">Product Title</option>
                    <option value="1">Product Tag</option>
                    <option value="2">Product Price</option>
                  </select>
                  <button type="button" tabindex="-1" class="btn dropdown-toggle btn-light" data-bs-toggle="dropdown" role="combobox" aria-owns="bs-select-1" aria-haspopup="listbox" aria-expanded="false" title="Product Title">
                    <div class="filter-option">
                      <div class="filter-option-inner">
                        <div class="filter-option-inner-inner">Product Title</div>
                      </div>
                    </div>
                  </button>
                  <div class="dropdown-menu" style="max-height: 199.375px; overflow: hidden; min-height: 0px;">
                    <div class="inner show" role="listbox" id="bs-select-1" tabindex="-1" aria-activedescendant="bs-select-1-0" style="max-height: 183.375px; overflow-y: auto; min-height: 0px;">
                      <ul class="dropdown-menu inner show" role="presentation" style="margin-top: 0px; margin-bottom: 0px;">
                        <li class="selected active">
                          <a role="option" class="dropdown-item active selected" id="bs-select-1-0" tabindex="0" aria-setsize="3" aria-posinset="1" aria-selected="true">
                            <span class="text">Product Title</span>
                          </a>
                        </li>
                        <li>
                          <a role="option" class="dropdown-item" id="bs-select-1-1" tabindex="0">
                            <span class="text">Product Tag</span>
                          </a>
                        </li>
                        <li>
                          <a role="option" class="dropdown-item" id="bs-select-1-2" tabindex="0">
                            <span class="text">Product Price</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3">
              <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label required">Product Margin</label>
                <div class="dropdown bootstrap-select default-select w-100">
                  <select class="default-select w-100" aria-label="Default select example">
                    <option selected="">is less than</option>
                    <option value="1">is equal to</option>
                    <option value="2">is greater than</option>
                  </select>
                  <button type="button" tabindex="-1" class="btn dropdown-toggle btn-light" data-bs-toggle="dropdown" role="combobox" aria-owns="bs-select-2" aria-haspopup="listbox" aria-expanded="false" title="is less than">
                    <div class="filter-option">
                      <div class="filter-option-inner">
                        <div class="filter-option-inner-inner">is less than</div>
                      </div>
                    </div>
                  </button>
                  <div class="dropdown-menu" style="max-height: 199.375px; overflow: hidden; min-height: 0px;">
                    <div class="inner show" role="listbox" id="bs-select-2" tabindex="-1" aria-activedescendant="bs-select-2-0" style="max-height: 183.375px; overflow-y: auto; min-height: 0px;">
                      <ul class="dropdown-menu inner show" role="presentation" style="margin-top: 0px; margin-bottom: 0px;">
                        <li class="selected active">
                          <a role="option" class="dropdown-item active selected" id="bs-select-2-0" tabindex="0" aria-setsize="3" aria-posinset="1" aria-selected="true">
                            <span class="text">is less than</span>
                          </a>
                        </li>
                        <li>
                          <a role="option" class="dropdown-item" id="bs-select-2-1" tabindex="0">
                            <span class="text">is equal to</span>
                          </a>
                        </li>
                        <li>
                          <a role="option" class="dropdown-item" id="bs-select-2-2" tabindex="0">
                            <span class="text">is greater than</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3">
              <div class="mb-3">
                <label for="exampleFormControlInput3" class="form-label required">Quantity</label>
                <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="1">
              </div>
            </div>
          
          </div>
         
        </div>`;

      // Append the new content after the parent element
      $(this).closest('.row').after(newContent);
    });
  });
		});
	}
	var handleEmailRead = function(){
		
		if($(window).width() <= 1199){
			jQuery('.mail-tab a').unbind().on('click',function(){
				$('.inbox-area-list').css('display', 'none');
				$('.read-content-bx').css('display', 'block');
			});
			jQuery('.dz-back-arrow').unbind().on('click',function(){
				$('.inbox-area-list').css('display', 'block');
				$('.read-content-bx').css('display', 'none');
			});
		}else{
			jQuery('.mail-tab button').unbind('click');
			$('.inbox-area-list').css('display', 'block');
			$('.read-content-bx').css('display', 'block');
		}
	}
	var handleHorizontalDropDown = function(){
		$('.metismenu li a').hover(
			function(event) {
				var $submenu = $(this).parent().children('ul');
				
				var $windowEdge = $('#main-wrapper').width();
				var $leftOffset = ($(window).width() - $('#main-wrapper').width())/2;
				var $menuRightEdge = ($(this).offset().left + $(this).outerWidth() + $submenu.outerWidth()) - $leftOffset;
				if($('html').attr('dir')==='ltr'){
					var $menuRightEdge = ($(this).offset().left + $(this).outerWidth() + $submenu.outerWidth()) - $leftOffset;
					if($menuRightEdge > $windowEdge) {
						if($(this).parent().parent('ul.metismenu').length > 0){
							$submenu.css({ left: 'auto', right: '0' });
						}else{
							$submenu.css({ left: 'auto', right: '100%' });
						}
					}
				}else{
					var $rightOffset = $windowEdge - ($(this).offset().left + $(this).outerWidth() - $leftOffset); 
					var $menuLeftEdge = $rightOffset + $(this).outerWidth() + $submenu.outerWidth();
					console.log($rightOffset);
					if($menuLeftEdge > $windowEdge) {
						if($(this).parent().parent('ul.metismenu').length > 0){
							$submenu.css({ left: '0', right: 'auto' });
						}else{
							$submenu.css({ left: '100%', right: 'auto' });
						}
					}
				}
			},
			function() {
				$(this).children('ul').removeAttr('style');
			}
		);
	}
  
	var handleCurrentActive = function() {
		for (var nk = window.location,
			o = $("ul#menu a").filter(function() {
				
				return this.href == nk;
				
			})
			.addClass("mm-active")
			.parent()
			.addClass("mm-active");;) 
		{
			
			if (!o.is("li")) break;
			
			o = o.parent()
				.addClass("mm-show")
				.parent()
				.addClass("mm-active");
		}
	}

	var handleMiniSidebar = function() {
		$("ul#menu>li").on('click', function() {
			const sidebarStyle = $('body').attr('data-sidebar-style');
			if (sidebarStyle === 'mini') {
				console.log($(this).find('ul'))
				$(this).find('ul').stop()
			}
		})
	}
   
	
    
	var handleDataAction = function() {
		$('a[data-action="collapse"]').on("click", function(i) {
			i.preventDefault(),
				$(this).closest(".card").find('[data-action="collapse"] i').toggleClass("mdi-arrow-down mdi-arrow-up"),
				$(this).closest(".card").children(".card-body").collapse("toggle");
		});

		$('a[data-action="expand"]').on("click", function(i) {
			i.preventDefault(),
				$(this).closest(".card").find('[data-action="expand"] i').toggleClass("icon-size-actual icon-size-fullscreen"),
				$(this).closest(".card").toggleClass("card-fullscreen");
		});



		$('[data-action="close"]').on("click", function() {
			$(this).closest(".card").removeClass().slideUp("fast");
		});

		$('[data-action="reload"]').on("click", function() {
			var e = $(this);
			e.parents(".card").addClass("card-load"),
				e.parents(".card").append('<div class="card-loader"><i class=" ti-reload rotate-refresh"></div>'),
				setTimeout(function() {
					e.parents(".card").children(".card-loader").remove(),
						e.parents(".card").removeClass("card-load")
				}, 2000)
		});
	}

    var handleHeaderHight = function() {
		const headerHight = $('.header').innerHeight();
		$(window).scroll(function() {
			if ($('body').attr('data-layout') === "horizontal" && $('body').attr('data-header-position') === "static" && $('body').attr('data-sidebar-position') === "fixed")
				$(this.window).scrollTop() >= headerHight ? $('.ic-sidenav').addClass('fixed') : $('.ic-sidenav').removeClass('fixed')
		});
	}
	
	
	
	var handleMenuTabs = function() {
		if(screenWidth <= 991 ){
			jQuery('.menu-tabs .nav-link').on('click',function(){
				if(jQuery(this).hasClass('open'))
				{
					jQuery(this).removeClass('open');
					jQuery('.fixed-content-box').removeClass('active');
					jQuery('.hamburger').show();
				}else{
					jQuery('.menu-tabs .nav-link').removeClass('open');
					jQuery(this).addClass('open');
					jQuery('.fixed-content-box').addClass('active');
					jQuery('.hamburger').hide();
				}
				//jQuery('.fixed-content-box').toggleClass('active');
			});
			jQuery('.close-fixed-content').on('click',function(){
				jQuery('.fixed-content-box').removeClass('active');
				jQuery('.hamburger').removeClass('is-active');
				jQuery('#main-wrapper').removeClass('menu-toggle');
				jQuery('.hamburger').show();
			});
		}
	}
	
	var handleChatbox = function() {
		jQuery('.bell-link').on('click',function(){
			jQuery('.chatbox').addClass('active');
		});
		jQuery('.chatbox-close').on('click',function(){
			jQuery('.chatbox').removeClass('active');
		});
	}
	
	
	var handleBtnNumber = function() {
		$('.btn-number').on('click', function(e) {
			e.preventDefault();

			fieldName = $(this).attr('data-field');
			type = $(this).attr('data-type');
			var input = $("input[name='" + fieldName + "']");
			var currentVal = parseInt(input.val());
			if (!isNaN(currentVal)) {
				if (type == 'minus')
					input.val(currentVal - 1);
				else if (type == 'plus')
					input.val(currentVal + 1);
			} else {
				input.val(0);
			}
		});
	}
	
	var handleDzChatUser = function() {
		jQuery('.ic-chat-user-box .ic-chat-user').on('click',function(){
			jQuery('.ic-chat-user-box').addClass('d-none');
			jQuery('.ic-chat-history-box').removeClass('d-none');
            
		}); 
		
		jQuery('.ic-chat-history-back').on('click',function(){
			jQuery('.ic-chat-user-box').removeClass('d-none');
			jQuery('.ic-chat-history-box').addClass('d-none');
		}); 
		
		jQuery('.ic-fullscreen').on('click',function(){
			jQuery('.ic-fullscreen').toggleClass('active');
		});
        
       
        
        
	}
	var handleshowPass = function(){
		jQuery('.show-pass').on('click',function(){
			jQuery(this).toggleClass('active');
			if(jQuery('#ic-password').attr('type') == 'password'){
				jQuery('#ic-password').attr('type','text');
			}else if(jQuery('#ic-password').attr('type') == 'text'){
				jQuery('#ic-password').attr('type','password');
			}
		});
	}
	
	var heartBlast = function (){
		$(".heart").on("click", function() {
			$(this).toggleClass("heart-blast");
		});
	}
	
	var handleDzLoadMore = function() {
		$(".ic-load-more").on('click', function(e)
		{
			e.preventDefault();	//STOP default action
			$(this).append(' <i class="fas fa-sync"></i>');
			
			var icLoadMoreUrl = $(this).attr('rel');
			var icLoadMoreId = $(this).attr('id');
			
			$.ajax({
				method: "POST",
				url: icLoadMoreUrl,
				dataType: 'html',
				success: function(data) {
					$( "#"+icLoadMoreId+"Content").append(data);
					$('.ic-load-more i').remove();
				}
			})
		});
	}
	
	var handleLightgallery = function () {
        if (jQuery('#lightgallery').length > 0) {
            lightGallery(document.getElementById('lightgallery'), {
                plugins: [lgThumbnail, lgZoom],
                selector: '.lg-item',
                thumbnail: true,
                exThumbImage: 'data-src'
            });
        }
    }
	var handleCustomFileInput = function() {
		$(".custom-file-input").on("change", function() {
			var fileName = $(this).val().split("\\").pop();
			$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
		});
	}
    
  	var vHeight = function(){
        var ch = $(window).height() - 206;
        $(".chatbox .msg_card_body").css('height',ch);
    }
    
	var domoPanel = function(){
		
		$('.ic-demo-trigger').on('click', function() {
				$('.ic-demo-panel').addClass('show');
		  });
		  $('.ic-demo-close, .bg-close').on('click', function() {
				$('.ic-demo-panel').removeClass('show');
		  });
		  
		  $('.ic-demo-bx').on('click', function() {
			  $('.ic-demo-bx').removeClass('demo-active');
			  $(this).addClass('demo-active');
		  });
	} 
	
	var handleDatetimepicker = function(){
		
		if(jQuery('.bt-datepicker').length > 0){
			$(".bt-datepicker").datepicker({ 
				autoclose: true, 
				todayHighlight: true
			}).datepicker('update', new Date());
		}
   }

   var handleThemeMode = function() {
   

	if(jQuery(".ic-theme-mode").length>0) {
		jQuery('.ic-theme-mode').on('click',function(){
			jQuery(this).toggleClass('active');
			if(jQuery(this).hasClass('active')){
				jQuery('body').attr('data-theme-version','dark');
				setCookie('version', 'dark');
				jQuery('#theme_version').val('dark');
				
			}else{
				jQuery('body').attr('data-theme-version','light');
				setCookie('version', 'light');
				jQuery('#theme_version').val('light');	
						
			}
			$('.default-select').selectpicker('refresh');
		});
		var version = getCookie('version');
		
		jQuery('body').attr('data-theme-version', version);
		jQuery('.ic-theme-mode').removeClass('active');
		setTimeout(function(){
			if(jQuery('body').attr('data-theme-version') === "dark")
			{
				jQuery('.ic-theme-mode').addClass('active');
			}
		},1500)
	}
   
   
}

/* Coming Soon Counter ============ */
	var handleComingSoonCounter = function(){
		
		var commingSoonDate = new Date(WebsiteLaunchDate).getTime();
		
		var x = setInterval(function() {
			clockCounter();
		}, 1000);
		
		function clockCounter(){
			var currentTime = new Date().getTime();
			var clockTime = commingSoonDate - currentTime;

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(clockTime / (1000 * 60 * 60 * 24));
			var hours = Math.floor((clockTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((clockTime % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((clockTime % (1000 * 60)) / 1000);

			var remainDays 		= (days.toString().length 		== 1) ? '0'+days	: days;
			var remainHour 		= (hours.toString().length 		== 1) ? '0'+hours	: hours;
			var remainMin 		= (minutes.toString().length 	== 1) ? '0'+minutes	: minutes;
			var remainSeconds 	= (seconds.toString().length 	== 1) ? '0'+seconds	: seconds;

			jQuery('#day').text(remainDays);
			jQuery('#hour').text(remainHour);
			jQuery('#min').text(remainMin);
			jQuery('#second').text(remainSeconds);
			
			var rotateNum = 6 * seconds;

			$('.round').css({'transform': 'rotate(' + rotateNum + 'deg)'});
			$('.round').css({'-webkit-transform': 'rotate(' + rotateNum + 'deg)'});
			$('.round').css({'-o-transform': 'rotate(' + rotateNum + 'deg)'});
			$('.round').css({'-moz-transform': 'rotate(' + rotateNum + 'deg)'});
			$('.round').css({'-ms-transform': 'rotate(' + rotateNum + 'deg)'});

			// If the count down is over, write some text 
			if (clockTime < 0) {
				clearInterval(x);
				jQuery("#day, #hour, #min, #second").html("EXPIRED");
			}
		}
		
	}
	var handleMinHeight = function() {
		var win_h = window.innerHeight;
		var win_h = window.innerHeight;
		if (win_h > 0 ? win_h : screen.height) {
			$(".content-body").css("min-height", (window.innerHeight - 70) + "px");	
			setTimeout(() => {
				if($('body').attr('data-layout') === "vertical"){
					if(
						($('body').attr('data-sidebar-style') === "mini") && ($('.ic-sidenav  .metismenu').height() > (window.innerHeight - 60))
						||
						($('body').attr('data-sidebar-style') === "modern") && ($('.ic-sidenav  .metismenu').height() > (window.innerHeight - 60))
						||
						($('body').attr('data-sidebar-style') === "full") && $('#main-wrapper').hasClass('menu-toggle') && ($('.ic-sidenav  .metismenu').height() > (window.innerHeight - 60))
					){	
						$(".content-body").css("min-height", ($('.ic-sidenav .metismenu').height() + 110) + "px");
					}
				}
			},500);
		};
		
		setTimeout(() => {
			if(
				$('body').attr('data-header-position') === "fixed" 
				&& 
				$('body').attr('data-layout') === "horizontal"
				&&
				$('body').attr('data-sidebar-position') === "fixed"
			){
				$('.content-body').css("padding-top" ,  ($('.ic-sidenav').height() + $('.header').height()) + 'px');
			}else if(
				$('body').attr('data-header-position') === "fixed" 
				&& 
				$('body').attr('data-layout') === "horizontal"
				&&
				$('body').attr('data-sidebar-position') === "static"
			){
				$('.content-body').css("padding-top" , $('.header').height() + "px" );
			}else if(
				$('body').attr('data-header-position') === "static" 
				&& 
				$('body').attr('data-layout') === "horizontal"
				&&
				$('body').attr('data-sidebar-position') === "fixed"
			){
				$('.content-body').css("padding-top" , "0px" );
			}else{
				$('.content-body').css("padding-top" , "" );
			}
		},400);
		
	}
	/* counter */
	
	var handleCounter = function(){
		if(jQuery(".counter").length>0) {
			 $(document).ready(function () {
				$('.counter').counterUp({
					delay: 10,
					time: 1000
				});
			});
		}
		
	}
	
	/* Website Launch Date */ 
	var WebsiteLaunchDate = new Date();
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	WebsiteLaunchDate.setMonth(WebsiteLaunchDate.getMonth() + 1);
	WebsiteLaunchDate =  WebsiteLaunchDate.getDate() + " " + monthNames[WebsiteLaunchDate.getMonth()] + " " + WebsiteLaunchDate.getFullYear();
	/* Website Launch Date END */ 
	
	/* Countdown ============ */
	var handleCountDown = function(WebsiteLaunchDate){
		/* Time Countr Down Js */
		if($(".countdown").length)
		{
			$('.countdown').countdown({date: WebsiteLaunchDate+' 23:5'}, function() {
				$('.countdown').text('we are live');
			});
		}
		/* Time Countr Down Js End */
	}
		
	
	var handleCkEditor = function(){
		if (jQuery("#ckeditor").length > 0 || jQuery("#ckeditor1").length > 0) {
    const editorElements = [];

    if (jQuery("#ckeditor").length > 0) {
        editorElements.push(document.querySelector('#ckeditor'));
    }

    if (jQuery("#ckeditor1").length > 0) {
        editorElements.push(document.querySelector('#ckeditor1'));
    }

    editorElements.forEach(element => {
        ClassicEditor
            .create(element, {
                simpleUpload: {
                    uploadUrl: 'ckeditor-upload.php',
                }
            })
            .then(editor => {
                window.editor = editor;
            })
            .catch(err => {
                console.error(err.stack);
            });
    });
}

	}
	
	var handleMenuPosition = function(){
		
		if(screenWidth > 1024){
			$(".metismenu  li").unbind().each(function (e) {
				if ($('ul', this).length > 0) {
					var elm = $('ul:first', this).css('display','block');
					var off = elm.offset();
					var l = off.left;
					var w = elm.width();
					var elm = $('ul:first', this).removeAttr('style');
					var docH = $("body").height();
					var docW = $("body").width();
					
					if(jQuery('html').hasClass('rtl')){
						var isEntirelyVisible = (l + w <= docW);	
					}else{
						var isEntirelyVisible = (l > 0)?true:false;	
					}
						
					if (!isEntirelyVisible) {
						$(this).find('ul:first').addClass('left');
					} else {
						$(this).find('ul:first').removeClass('left');
					}
				}
			});
		}
	}	
	var handleProfile = function(){
		 $(".contact-footer").on('click', function(){
			$(".contact-footer").removeClass('show');
			$(this).addClass("show");
		  });

	}

	var setCurrentYear = function(){
		const currentDate = new Date();
		let currentYear = currentDate.getFullYear();
	   let elements = document.getElementsByClassName('current-year'); 

		  for (const element of elements) {
		  element.innerHTML = currentYear;
	  }

}
	var handleDraggableCard = function() {
		var dzCardDraggable = function () {
		 return {
		  //main function to initiate the module
		  init: function () {
		   var containers = document.querySelectorAll('.draggable-zone');

		   if (containers.length === 0) {
			return false;
		   }

		   var swappable = new Sortable.default(containers, {
			draggable: '.draggable',
			handle: '.draggable.draggable-handle',
			mirror: {
			 appendTo: 'body',
			 constrainDimensions: true
			}
			
		   });
		   swappable.on('drag:stop', () => {
				setTimeout(function(){
					setBoxCount();
				}, 200);
				
			})
		  }
		 };
		}();

		jQuery(document).ready(function () {
		 dzCardDraggable.init();
		});
		
		
		function setBoxCount(){
			var cardCount = 0;
			jQuery('.dropzoneContainer').each(function(){
				cardCount = jQuery(this).find('.draggable-handle').length;
				jQuery(this).find('.totalCount').html(cardCount);
			});
		}
	}
	var handleMagnifyGallery = function(){
		
		const imageSelector = $('.DZoomImage');
		



		imageSelector.on('mousemove',function(t) {
			let e = $(this).offset();
			var i = (t.pageX - e.left) / $(this).width() * 100 <= 100 ? (t.pageX - e.left) / $(this).width() * 100 : 100;
			var c = (t.pageY - e.top) / $(this).height() * 100 <= 100 ? (t.pageY - e.top) / $(this).height() * 100 : 100;
			
			$(this).find('img').css("transform-origin", i + "% " + c + "%");
		})
		imageSelector.on('mouseenter',function(t) {
			let n = $(this).find('img');
			n.css("cursor", "pointer"), 
				/* n.css("width", $(this).width() + "px"), 
				n.css("height", $(this).height() + "px"), */ 
			n.css("transition", "0.1s"), 
			n.css("transform", "scale(" + 1.5 + ")"),
			$(this).find('.mfp-link i').css({opacity : 1,zIndex : 1})
		});
		imageSelector.on('mouseleave',function(t) {
			let n = $(this).find('img');
			n.css("transition", "0.1s"), n.css("transform", "scale(1)")
			$(this).find('.mfp-link i').css({opacity : 0,zIndex : 1})
		});
	}
	
	var priceslider = function () {
		if ($("#slider-tooltips-product").length > 0) {
			var tooltipSlider = document.getElementById('slider-tooltips-product');

			var formatForSlider = {
				from: function (formattedValue) {
					return Number(formattedValue);
				},
				to: function (numericValue) {
					return Math.round(numericValue);
				}
			};

			noUiSlider.create(tooltipSlider, {
				start: [40, 346],
				connect: true,
				format: formatForSlider,
				tooltips: [wNumb({ decimals: 1 }), true],
				range: {
					'min': 0,
					'max': 400
				}
			});
			var formatValues = [
				document.getElementById('slider-margin-value-min'),
				document.getElementById('slider-margin-value-max')
			];
			tooltipSlider.noUiSlider.on('update', function (values, handle, unencoded) {
				formatValues[0].innerHTML = "" + "$" + values[0];
				formatValues[1].innerHTML = "" + "$" + values[1];
			});
		}
	}
  
	/* Function ============ */
	return {
		init:function(){
			handleMetisMenu();
			handleAllChecked();
			handleNavigation();
			handleMagnifyGallery();
			handleCurrentActive();
			handleMiniSidebar();
			handleMinHeight();
			handleDataAction();
			handleHeaderHight();
			handleMenuTabs();
			handleChatbox();
			handleBtnNumber();
			handleDzChatUser();
			handleCountDown(WebsiteLaunchDate);
			setCurrentYear();
			handleshowPass();
			heartBlast();
			handleDzLoadMore();
			handleLightgallery();
			handleEcommerceCategory();
			handleCustomFileInput();
			vHeight();
			handleThemeMode();
			domoPanel();
			handleDatetimepicker();
			handleCkEditor();
			handleProfile();
			handleDraggableCard();
			handleEmailRead();
			
			handleCounter();
		
			priceslider();
			setTimeout(function(){
				handleHorizontalDropDown();
			},500);
		},

		
		load:function(){
			handlePreloader();
			handleSelectPicker();
			handleEmailRead();
			
		},
		
		resize:function(){
			screenWidth;
			vHeight();
			handleEmailRead();
			handleMinHeight();
		},	
		
		handleMenuPosition:function(){
			
			handleMenuPosition();
		},
	}
	
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
	$('[data-bs-toggle="popover"]').popover();
    'use strict';
	Codebyte.init();
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load',function () {
	'use strict'; 
	Codebyte.load();
	setTimeout(function(){
			Codebyte.handleMenuPosition();
	}, 1000);
	
});
/*  Window Load END */
/* Window Resize START */
jQuery(window).on('resize',function () {
	'use strict'; 
	Codebyte.resize();
	setTimeout(function(){
			Codebyte.handleMenuPosition();
	}, 1000);
});
/*  Window Resize END */