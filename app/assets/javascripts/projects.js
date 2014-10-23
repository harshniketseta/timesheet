
var Timesheet = (function(Timesheet) {

  Timesheet.Projects = function () {

  };

  Timesheet.Projects.method("init", function(){
    var self = this;

    self.initEventListeners();
  });

  Timesheet.Projects.method("initEventListeners", function(){
    var self = this;

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
      window.location = "#createProject";
      $("#create_project").modal();
    });

    $(".clickable").on("click", function(event){
      event.preventDefault();

      var jEle = $(this)
        ,href = jEle.attr("href")
        ;

      window.location = href;

    });

    $(".addMember").on("click", function(event){
      var jEle = $(this)
        ,href = jEle.attr("href")
        ,project_id = href.split("_")[1]
        ,jModal = $("#add_member")
        ;

      jModal.find("#project_user_project_id").val(project_id);
      jModal.modal();

    });
  });

  return Timesheet;
})(Timesheet);
