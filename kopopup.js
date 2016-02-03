// KOPOPUP Plugin
//--- Popup windows with images and descriptions
//--- Auto sizes to fit in the screen as well as centers

(function ($) {

    //type
    //gallery
    //onOpen
    //onClose

    var kop = function (coll, options) {
        var elemList = coll;
        var instance = this;
        var curIndex = 0;
        var opt = options;


        this.showPopup = function (el) {
            //find the index of the item selected
            elemList.each(function (index) {
                if (el.is(this)) {
                    curIndex = index;
                }
            });

            //What type of popup is it?
            switch (opt.type) {
                case "image":
                    var HTMLtoAppend;
                    var content = "";
                    //get the image url
                    var imgURL = $(el).attr('data-url');

                    //if content exists - get it
                    if ($(el).find('.ko-popup-content').html() != undefined) {
                        content = $(el).find('.ko-popup-content').html();
                    }

                    //<div class="ko-popup-bg">
                    //  <div class="ko-popup-window-image">
                    //      <div class="ko-popup-next"></div>
                    //      <div class="ko-popup-prev"></div>
                    //      <div title="Close (Esc)" class="ko-popup-close">&times;</div>
                    //      <img src="/U/R/L" class="img-responsive">
                    //      <div class="ko-popup-image-desc" style="padding:' + padding + '">CONTENT</div>
                    //      <div class="ko-popup-index"></div>
                    //  </div>
                    //</div>

                    //build the popup HTML to add to the page
                    HTMLtoAppend = '<div class="ko-popup-bg"><div class="ko-popup-window-image">';

                    //Add next/prev buttons if it's a gallery
                    if (opt.gallery && elemList.length > 1) {
                        HTMLtoAppend += '<div class="ko-popup-next"></div>' +
                                '<div class="ko-popup-prev"></div>';
                    }

                    //Add the close button and the image
                    HTMLtoAppend += '<div title="Close (Esc)" class="ko-popup-close">&times;</div><img src="' + imgURL + '" class="img-responsive">';

                    //if no content exists - get rid of the padding
                    var padding = "10px";
                    if (content == "") { padding = "0px"; }

                    //
                    if (opt.gallery) {
                        HTMLtoAppend += '<div class="ko-popup-image-desc" style="padding:' + padding + '">' + content +
                        '</div>';
                    }

                    //Show the index numbers if it's a gallery
                    if (opt.gallery && elemList.length > 1) {
                        HTMLtoAppend += '<div class="ko-popup-index"></div>';
                    }

                    HTMLtoAppend += "</div></div>";

                    //Add the popup HTML to the page
                    $('body').append(HTMLtoAppend);

                    //disable page scrolling
                    $('html').css("overflow", "hidden");

                    //wait for the image to load
                    var img = $('<img src="' + imgURL + '"/>').load(function () {
                        //Position the popup in the center of the window
                        //Also re-position the popup on windows resize
                        positionIMGPopup();
                        $(window).resize(function () { positionIMGPopup(); });

                        //Show the popup
                        $('.ko-popup-bg').animate({ "opacity": 1 }, 300, "linear");
                    });
                    break;

                case "iframe":
                    //build the popup HTML to add to the page
                    var HTMLtoAppend =
                        '<div class="ko-popup-bg">' +
                            '<div class="ko-popup-window-outer">' +
                                '<div class="ko-popup-window-iframe" style="width:1130px">';
                    //Add next/prev buttons if it's a gallery
                    if (opt.gallery && elemList.length > 1) {
                        HTMLtoAppend += '<div class="ko-popup-next"></div>' +
                                '<div class="ko-popup-prev"></div>' +
                                '<div class="ko-popup-index"></div>';
                    }
                    HTMLtoAppend += '<div class="ko-popup-window-header">' +
                                        '<div title="Close (Esc)" class="ko-popup-close">&times;</div>' +
                                    '</div>' +
                                    '<div class="ko-popup-window-content">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

                    //build the iframe element
                    var frameHtml = '<iframe scrolling="no" class="ko-popup-iframe" src="' + el.attr('data-url') + '" style="width:100%;"></iframe>';

                    //Add the popup HTML to the page
                    $('body').append(HTMLtoAppend);
                    //Add the content HTML
                    $('.ko-popup-window-content').append(frameHtml);

                    //disable page scrolling
                    $('html').css("overflow", "hidden");

                    //Wait for iframe to load
                    $('.ko-popup-iframe').load(function () {
                        //Position the popup in the center of the window
                        //Also re-position the popup on windows resize
                        positionHTMLPopup();
                        $(window).resize(function () { positionHTMLPopup(); });

                        //Show the box
                        $('.ko-popup-bg').animate({ "opacity": 1 }, 300, "linear");
                    });
                    break;

                case "html":
                    //build the popup HTML to add to the page
                    var HTMLtoAppend =
                        '<div class="ko-popup-bg">' +
                            '<div class="ko-popup-window-outer">' +
                                '<div class="ko-popup-window-html">' +
                                '<div class="ko-popup-window-header">' +
                                    '<div title="Close (Esc)" class="ko-popup-close">&times;</div>' +
                                '</div>' +
                                '<div class="ko-popup-window-content">' +
                                '</div>' +
                            '</div>' +
                        '</div>';

                    //Add the popup HTML to the page
                    $('body').append(HTMLtoAppend);

                    //Add the content HTML
                    $('.ko-popup-window-content').append(el.find('.ko-popup-content').html());

		    		//disable page scrolling
                    $('html').css("overflow", "hidden");
                    
                    //Position the popup in the center of the window
                    //Also re-position the popup on windows resize
                    positionHTMLPopup();
                    $(window).resize(function () { positionHTMLPopup(); });

                    //Show the box
                    $('.ko-popup-bg').animate({ "opacity": 1 }, 300, "linear");
                    
                    break;
            }

            //Gallery tasks
            if (opt.gallery && elemList.length > 1) {
                
                //refresh index text
                $('.ko-popup-index').html(curIndex + 1 + " / " + elemList.length);
                //Bind next/prev buttons
                $('.ko-popup-next').click(function () {
                    instance.next();
                });
                $('.ko-popup-prev').click(function () {
                    instance.prev();
                });

                //Bind key press events if it's a gallery
                $(document).keydown(function (event) {
                    //Left Key
                    if (event.which == 37) {
                        //Left Key
                        instance.prev();
                    } else if (event.which == 39) {
                        //Right Key
                        instance.next();
                    }
                });
            }

            //Bind closing clicks
            $('.ko-popup-bg, .ko-popup-close').click(function () {
                instance.closePopup();
            });

            //Don't close when you click on the popup
            $('.ko-popup-window-outer, .ko-popup-window-image').click(function () {
                event.stopPropagation();
            });

            //onOpen Callback
            if (opt.onOpen != undefined) {
                opt.onOpen(el);
            }
        }

        
        //Show the next item
        this.next = function () {
            //change the current index
            if (curIndex < elemList.length - 1) {
                curIndex++;
            } else {
                curIndex = 0;
            }

            //Get the next item
            var item = elemList[curIndex];

            //show the next item
            switch (opt.type) {
                case "image":
                    //Set the image URL
                    $('.ko-popup-window-image img').attr("src", $(item).attr("data-url"));
					
					$('.ko-popup-window-image img').load(function() {
						var content = "";
						if ($(item).find('.ko-popup-content').html() != undefined) {
							content = $(item).find('.ko-popup-content').html();
							$('.ko-popup-image-desc').css("padding", "10px");
						} else {
							$('.ko-popup-image-desc').css("padding", "0px");
						}
					
						$('.ko-popup-image-desc').html(content);
						
						//re-position the popup as the content could be a different size
						positionIMGPopup();
					});
                    break;

                case "iframe":
                    //show the new iframe
                    $('.ko-popup-window-iframe iframe').attr("src", $(item).attr("data-url"));
                    
                    break;
                default:
            }

            //refresh index text
            $('.ko-popup-index').html(curIndex + 1 + " / " + elemList.length);

            //onChange Callback
            if (opt.onChange != undefined) {
                opt.onChange(elemList[curIndex]);
            }
        }

        //Show the previous item
        this.prev = function() {
            if (curIndex > 0) {
                curIndex--;
            } else {
                curIndex = elemList.length - 1;
            }
            
            //Get the next item
            var item = elemList[curIndex];

            //show the next item
            switch (opt.type) {
                case "image":
					//Set the image URL
                    $('.ko-popup-window-image img').attr("src", $(item).attr("data-url"));
					
                    $('.ko-popup-window-image img').load(function() {
						var content = "";
						if ($(item).find('.ko-popup-content').html() != undefined) {
							content = $(item).find('.ko-popup-content').html();
							$('.ko-popup-image-desc').css("padding", "10px");
						} else {
							$('.ko-popup-image-desc').css("padding", "0px");
						}
					
						$('.ko-popup-image-desc').html(content);
						
						//re-position the popup as the content could be a different size
						positionIMGPopup();
					});
                    break;

                case "iframe":
                    //show the new iframe
                    $('.ko-popup-window-iframe iframe').attr("src", $(item).attr("data-url"));

                    break;
                default:
            }

            //refresh index text
            $('.ko-popup-index').html(curIndex + 1 + " / " + elemList.length);

            //onChange Callback
            if (opt.onChange != undefined) {
                opt.onChange(elemList[curIndex]);
            }
        }

        //Close the popup
        this.closePopup = function () {
            //fade out animation, then remove the HTML from the DOM
            $('.ko-popup-bg').animate({ "opacity": 0 }, 300, "linear", function () {
                $('.ko-popup-bg').remove();
                $('html').css("overflow", "");
            });

            //unbind keypress
            $(document).unbind('keydown');

            //onClose Callback
            if (opt.onClose != undefined) {
                opt.onClose(elemList[curIndex]);
            }
        }

        //Re-position the popup on the screen
        var positionIMGPopup = function () {
            //IMAGE HEIGHT - Image cannot be taller than the screen height - the description height
            var imgMaxHeight = $(window).height() * .9 - $('.ko-popup-window-image .ko-popup-image-desc').height();
            //Dont let the image get smaller than 100px
            if (imgMaxHeight < 100) { imgMaxHeight = 100; }
            //Set the max-height for the image
            $('.ko-popup-window-image img').css("max-height", imgMaxHeight + "px");

            //IMAGE WIDTH - Image cannot be wider than the window width
            $('.ko-popup-window-image img').css("max-width", $(window).width() * .8 + "px");
            //Dont let the image get wider than the popup window
            if ($('.ko-popup-window-image').width() < $('.ko-popup-window-image img').width()) { $('.ko-popup-window-image img').css("max-width", $('.ko-popup-window-image').width() + "px"); }
            
            //Set the description width the same as the image, always
            $('.ko-popup-image-desc').css("width", $('.ko-popup-window-image img').outerWidth() - 1 + "px");

            //Now that we have the size of the popup calculated, position it in the center of the window
            var top = 0;
            var left = 0;
            top = ($('.ko-popup-bg').height() - $('.ko-popup-window-image').outerHeight()) / 2;
            left = ($('.ko-popup-bg').width() - $('.ko-popup-window-image').outerWidth()) / 2;

            //set the margins
            $('.ko-popup-window-image').css("top", top + "px");
            $('.ko-popup-window-image').css("left", left + "px");

            //refresh index text
            $('.ko-popup-index').html(curIndex + 1 + " / " + elemList.length);
        }

        var positionHTMLPopup = function () {
            if (opt.type == "iframe") {
                $('.ko-popup-iframe').css("height", $('.ko-popup-iframe').contents().find("body").height() + 5 + "px");
                $('.ko-popup-iframe').css("overflow", "hidden");
                //$('.ko-popup-window-iframe').css("width", $('ko-popup-iframe').width());
            }

            //calculate top and left margins to position the window in the middle of the screen
            var top = 0;
            var left = 0;
            top = ($('.ko-popup-bg').height() - $('.ko-popup-window-outer').outerHeight()) / 2;
            left = ($('.ko-popup-bg').width() - $('.ko-popup-window-outer').outerWidth()) / 2;

            //never let the top margin to be negative
            if (top < 0) { top = 0; }

            //set the margins
            $('.ko-popup-window-outer').css("top", top + "px");
            $('.ko-popup-window-outer').css("left", left + "px");

            //if the popup is taller than the window, allow scrolling
            if ($('.ko-popup-window-outer').outerHeight() > $('.ko-popup-bg').height()) {
				//disable page scrolling
				$('html').css("overflow", "hidden");
                $('.ko-popup-bg').css("overflow-y", "scroll");
            } else {
                $('.ko-popup-bg').css("overflow-y", "");
            }
        }

    };



    //plugin init
    $.fn.kopopup = function (options) {
        //Get the collection of items
        var koPop = new kop(this, options);

        //Bind the click event for each item
        return this.each(function () {
            $(this).click(function () {
                koPop.showPopup($(this));
            });
        });
    }

}(jQuery));
