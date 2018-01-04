function getPosts() {
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  var result;
  xmlhttp.open("GET", "php/load_posts_gallery.php", false);
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
          result = this.responseText;
      }
  };
  xmlhttp.send(null);
  return result;
}
var jsonPosts = JSON.parse(getPosts());

for (var i = 0; i < jsonPosts.length; ++i) {
  var postId = "post" + i;
  $("#posts").append("<div id='" + postId + "'></div>");
  var post = $("#"+postId);
  $("#postTemplate").children().clone().appendTo(post);
  $(post).find(".postTitle").text(jsonPosts[i].title);
  var content = jsonPosts[i].post;
  var partial = content.substring(0,12) + "...";
  $(post).find(".postContent").text(partial);
  $(post).find(".postContent").data("shortText", partial);
  $(post).find(".postContent").data("fullText", content);
  $(post).find(".postImage").attr("src",jsonPosts[i].album);
}

$(".btnRead").click(function(){
  var button = $(this);
  var postContent = $(button).parent().siblings().children(".postContent");
  var container = $(button).parent().siblings(".container");
  if($(button).html()=='Hide'){
    $(postContent).text($(postContent).data("shortText"));
    $(button).html("Read more");
  }else{
    $(postContent).text($(postContent).data("fullText"));
    $(button).html("Hide");
  }
});