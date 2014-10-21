$(document).ready(function(){
  $("#main_container").on("scroll", function (event) {
    var jMainContainer = $(this)
      , scrollTop = jMainContainer.scrollTop()
      ;

    if (scrollTop > 100) {
      jMainContainer.find(".bannerBG").show();
      jMainContainer.find(".maximized").addClass("minimized").removeClass("maximized");
    } else {
      jMainContainer.find(".minimized").removeClass("minimized").addClass("maximized");
      jMainContainer.find(".bannerBG").hide();
    }
  });

  $(".create-project").on("click", function(event){
    event.preventDefault();
    $("#create_project").modal();
  });
});
