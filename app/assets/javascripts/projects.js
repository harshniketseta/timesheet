
var Timesheet = (function(Timesheet) {

  Timesheet.Projects = function () {

  };

  Timesheet.Projects.method("init", function(){
    var self = this;

    self.initEventListeners();
  });

  Timesheet.Projects.method("initEventListeners", function(){
    var self = this;

    $(".create-project").on("click", function(event){
      event.preventDefault();
      window.location = "#createProject";
      $("#create_project").modal();
    });

    $(".editProject").on("click", function(event){
        event.preventDefault();

        var jEle = $(this)
            ,href = jEle.attr("href")
            ,project_id = href.split("/")[2]
            ,jModal = $("#edit_project")
            ,modalBody = jModal.find(".modal-body")
            ;

        modalBody.load(href, function(){
            jModal.modal();
        });
    });

    $(".positive").on("click", function(event){
      $('.edit_project').submit();
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
