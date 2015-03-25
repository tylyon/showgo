var page   = document.getElementById('page'),
    ua     = navigator.userAgent,
    iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod');

var setupScroll = window.onload = function() {
  // Start out by adding the height of the location bar to the width, so that
  // we can scroll past it
  if (ios) {
    // iOS reliably returns the innerWindow size for documentElement.clientHeight
    // but window.innerHeight is sometimes the wrong value after rotating
    // the orientation
    var height = document.documentElement.clientHeight;
    // Only add extra padding to the height on iphone / ipod, since the ipad
    // browser doesn't scroll off the location bar.
    if (iphone && !fullscreen) height += 60;
    page.style.height = height + 'px';
  }
  // Scroll after a timeout, since iOS will scroll to the top of the page
  // after it fires the onload event
  setTimeout(scrollTo, 0, 0, 1);
};

$(document).ready( function () {
    // I only have one form on the page but you can be more specific if need be.
    var $form = $('form');

    $('#bottom-request-btn').click(function(e) {
      e.preventDefault();
      $('html,body').animate({
            scrollTop: 0}, 1000);
    });

    $('#learn-more-btn').click(function(e) {
      e.preventDefault();
      $('html,body').animate({
           scrollTop: $('#top-container').offset().top}, 1000);
    });


    if ( $form.length > 0 ) {
        $('form input[type="submit"]').bind('click', function ( event ) {
            if ( event ) event.preventDefault();
             register($form);
        });
    }

    $('#email-address').click(function(e){
      $('#email-address').attr("placeholder", "");
    });
});

function register($form) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
        success     : function(data) {
            // if data.result == error then show data.msg
            // need div for error message & style
            if (data.result == "error") {
              var errorMsg = data.msg.replace("0 - ", "");
              $(".error_msg").text(errorMsg);
            } else {
              $("#email").fadeOut();
              $(".modal.fade").modal();
              $("#mce-EMAIL").val("");
              $(".error_msg").text("");
              $("#thankyou").fadeIn();
            }

        }
    });
  }
