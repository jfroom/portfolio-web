module.exports.register = function(Handlebars, options, params) {
  "use strict";


  Handlebars.registerHelper('image_embed', function(image_url, classes, caption, style, img_link, options) {
    var out = "<span ";
    if (typeof style == "string"){
      out += " style='" + style + "' ";
    }
    out += " class='img-caption ";
    if (typeof classes == "string"){
      out += classes;
    }
    out += "'>";
    out += "<span class='img-wrap-outer' style='" + style + "' >";
    out += "<span class='img-wrap'>";

    if (typeof img_link != "string" || img_link === ""){
      img_link = image_url;
    }
    //console.log("img_link:" + img_link);
    if (typeof img_link == "string") {
      out += "<a href='" + img_link + "'>";
    }
    out += "<img class='item-img' src='" + image_url + "' ";
    if (typeof caption == "string") {
      out += " alt='" + caption + "'";
    }
    out += "/>"
    if (typeof img_link == "string") {

      out += "</a>"
    }
    if (typeof caption == 'string') {
      out += "<span class='caption'>";
      out += caption;
      out += "</span>";
    }
    out += "</span>"
    out += "</span>"
    out += "</span>";
    //console.log("image_embed " + out);
    return out;
  });

  Handlebars.registerHelper('video_embed', function(video_tag, classes, caption, style, options) {
    var out = "<span style='" + style + "' class='img-caption video ";
    if (classes !== undefined){
      out += classes;
    }
    out += "'>";
    out += "<span class='img-wrap-outer'>";
    out += "<span class='img-wrap'>";
    out += video_tag;

    if (caption !== undefined) {
      out += "<span class='caption'>";
      out += caption;
      out += "</span>";
    }
    out += "</span>"
    out += "</span>"
    out += "</span>";
    //console.log("image_embed " + out);
    return out;
  });
  Handlebars.registerHelper('video_youtube_embed_lite', function(video_id, classes, caption, style, options) {
    var out = "<span style='" + style + "' class='img-caption video ";
    if (classes !== undefined){
      out += classes;
    }
    out += "'>";
    out += "<span class='img-wrap-outer'>";
    out += "<span class='img-wrap'>";
    out += "<div class='lite' id='" + video_id + "' style=''></div>";


    if (caption !== undefined) {
      out += "<span class='caption'>";
      out += caption;
      out += "</span>";
    }
    out += "</span>"
    out += "</span>"
    out += "</span>";
    //console.log("image_embed " + out);
    return out;
  });

}
