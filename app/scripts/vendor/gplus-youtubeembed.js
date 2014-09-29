// gplus-youtubeembed - Makes embedded YouTube video iframes Google+ style to improve page loading speed.
// Copyright (c) 2013 by Arun - http://www.skipser.com
// Licensed under the GNU LGPL license: http://www.gnu.org/copyleft/lesser.html
// For usage details, read - http://www.skipser.com/510

// code modified to enable ?rel=0 at end of video, remove skipser hint code, remove arrow centering code

// Call this function at the end of the closing </body> tag.
function optimizeYouTubeEmbeds() {
    console.log("optimizeYouTubeEmbeds")
    // Get all iframes
    var frames = document.getElementsByTagName('iframe');

    // Loop through each iframe in the page.
    for (var i = 0; i < frames.length; i++) {

        // Find out youtube embed iframes.
        if (frames[i].src && frames[i].src.length > 0 && frames[i].src.match(/http(s)?:\/\/www\.youtube\.com/)) {

            // For Youtube iframe, extract src and id.
            var src = frames[i].src;
            console.log("found youtube src" + src)
            var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            var id = (src.match(p) ? RegExp.$1 : false);
            if (id == false) {
                continue;
            }

            // Get width and height.

            var w = frames[i].width;
            var h = frames[i].height;
            w = 300;
            h = 169;

            if (src == '' || w == '' || h == '') {
                continue;
            }

            // Thease are to position the play button centrally.
            var pw = Math.ceil(w / 2 - 38.5);
            var ph = Math.ceil(h / 2 - 38.5);

            // The image+button overlay code.
            var code = '<div style="max-width:' + w + 'px; xmax-height:' + h + 'px; margin:0 auto"><a href="#"  class="fpo-video-click-load" onclick="LoadYoutubeVidOnPreviewClick(\'' + id + '\',' + w + ',' + h + ');return false;"';
            code += ' id="skipser-youtubevid-' + id + '">';
            code += '<img src="http://i.ytimg.com/vi/' + id + '/mqdefault.jpg" style="max-width:' + w + 'px; xmax-height:' + h + 'px;" />';
            code += '<div class="fpo-play-btn" style="background: url(\'data:image/png;base64,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\') no-repeat scroll center center transparent;position:relative;';
            code += ' xmargin-left:' + pw + 'px; xtop:' + ph + 'px;';
            code += '"></div></a></div>';

            // Replace the iframe with a the image+button code.
            var div = document.createElement('div');
            div.innerHTML = code;
            div = div.firstChild;
            frames[i].parentNode.replaceChild(div, frames[i]);
            i--;
        }
    }
}
// Replace preview image of a video with it's iframe.
function LoadYoutubeVidOnPreviewClick(id, w, h) {
    //var code='<iframe src="https://www.youtube.com/embed/'+id+'/?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1" width="'+w+'" height="'+h+'" frameborder=0 allowfullscreen style="border:1px solid #ccc;" ></iframe>';
    var code = '<iframe src="https://www.youtube.com/embed/' + id + '/?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1&rel=0" frameborder=0 allowfullscreen style="border:1px solid #ccc;" ></iframe>';
    var iframe = document.createElement('div');
    iframe.innerHTML = code;
    iframe = iframe.firstChild;
    var div = document.getElementById("skipser-youtubevid-" + id);
    div.parentNode.replaceChild(iframe, div)
}



/* This code uses jquery
function optimizeYouTubeEmbeds1() {
    // Loop through each iframe in the page.
    $('iframe').each(function(index,item) {
        // Check if the ifram is a YouTube video.
        if($(item).attr('src') && $(item).attr('src').match(/http(s)?:\/\/www\.youtube\.com/)) {
            // Get the video src, width and height.
            var src=$(item).attr('src');
            var w=$(item).attr('width');
            var h=$(item).attr('height');

            // Thease are to position the play button centrally.
            var pw=Math.ceil(w/2-38.5);
            var ph=Math.ceil(h/2+38.5);

            //Extract the YouTube video id.
            var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
              var id=(src.match(p) ? RegExp.$1 : false);
            if(id == false) { return true; }

            // This is the preview image + play button code. On clicking the image, LoadYoutubeVidOnPreviewClick function will get called.
            var code='<div style="width:'+w+'px; height:'+h+'px; margin:0 auto"><a href="#"  onclick="LoadYoutubeVidOnPreviewClick(\''+id+'\','+w+','+h+');return false;" id="skipser-youtubevid-'+id+'"><img src="http://i.ytimg.com/vi/'+id+'/hqdefault.jpg" style="width:'+w+'px; height:'+h+'px;" />'+
                     '<div style="background: url(\'data:image/png;base64,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\') no-repeat scroll 0 0 transparent;height: 77px;width: 77px; position:relative; margin-left:'+pw+'px; margin-top:-'+ph+'px;"></div></a></div>';

            // Replace the existing iframe with the image code.
            $(item).after(code);
            $(item).remove();
        }
    });
}
// Replace preview image of a video with it's iframe.
function LoadYoutubeVidOnPreviewClick1(id,w ,h) {
    var code='<iframe src="https://www.youtube.com/embed/'+id+'/?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1" width="'+w+'" height="'+h+'" frameborder=0 allowfullscreen style="border:1px solid #ccc;" ></iframe>';
    $("#skipser-youtubevid-"+id).after(code);
    $("#skipser-youtubevid-"+id).remove();
}
*/
