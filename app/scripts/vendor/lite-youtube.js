/*
 * YouTube Lite Embed - jQuery plugin to embed light-weight YouTube videos
 *
 * Copyright (c) 2012 Amr Tj. Wallas
 *
 * Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License:
 *   http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 * Project Home:
 *   https://github.com/TjWallas/YouTube-Lite-Embed
 * 
 * Website:
 *	 http://tjwallas.weebly.com
 *
 * Version:  1.0
 *
 */
(function ($) {

  var doc = $(document);

  doc.on('click', '.lite > a', function () {
    var div = this.parentNode;
    $(div)
      .replaceWith('<embed src="http://www.youtube.com/v/' + div.id + '?version=3&autoplay=1" type="application/x-shockwave-flash" width="' + div.style.width + '" height="' + div.style.height + '" allowscriptaccess="always"></embed>');
    return false;
  });

  doc.ready(function () {
    YTLiteEmbed();
    $('img.lazy')
      .lazyload({
        effect: "fadeIn"
      });
    $(this)
      .trigger('scroll');
  });
})(jQuery);

function YTLiteEmbed() {
  var liteDivs = $('.lite');
  var vid, w, h, myDiv, img, a, button;

  for (var i = 0; i < liteDivs.length; i++) {
    myDiv = liteDivs[i];
    vid = myDiv.id;
    w = myDiv.style.width;
    h = myDiv.style.height;

    img = $(document.createElement('img'));
    img.attr({
      'class': 'lazy',
      'data-original': 'http://img.youtube.com/vi/' + vid + '/0.jpg',
      'width': w,
      'height': h
    });
    //img.css({'position': 'relative', 'top': '0', 'left': '0' });

    a = $(document.createElement('a'));
    a.href = '#';
    button = document.createElement('img');
    button.setAttribute('class', 'lite');
    button.src = 'http://lh4.googleusercontent.com/-QCeB6REIFlE/TuGUlY3N46I/AAAAAAAAAaI/9-urEUtpKcI/s800/youtube-play-button.png';
    button.style.position = 'absolute';
    button.style.top = Math.round((myDiv.clientHeight - 51) / 2) + 'px';
    button.style.left = Math.round((myDiv.clientWidth - 71) / 2) + 'px';
    $(myDiv)
      .append(a.append(img, button));

    $.ajax({
      url: 'http://gdata.youtube.com/feeds/api/videos/' + vid + '?v=2&fields=id,title&alt=json',
      dataType: 'json',
      success: function (data) {
        $(document.getElementById(data.entry.id.$t.split(':')[3]))
          .append('<div style="position:relative;margin:-' + h + ' 5px;padding:5px;background-color:rgba(0,0,0,0.3);-moz-border-radius:7px;-webkit-border-radius:7px;border-radius:7px"><span style="font-weight:bold;font-size:16px;color:#ffffff;font-family:sans-serif;text-align:left;">' + data.entry.title.$t + '</span></div>');
      }
    });
  }
  return false;
}
