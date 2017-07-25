 $(function() {
    $('.scroll-down').click (function() {
      $('html, body').animate({scrollTop: $('section.how-to-buy-BSH').offset().top }, 'slow');
      return false;
    });
  });
  
  function pageScroll() {
    	window.scrollBy(0,50); // horizontal and vertical scroll increments
    	scrolldelay = setTimeout('pageScroll()',100); // scrolls every 100 milliseconds
}

function stopScroll() {
    	clearTimeout(scrolldelay);
}