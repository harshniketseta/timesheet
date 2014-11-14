// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var Timesheet = (function(Timesheet) {

  Timesheet.Tasks = function () {

  };

  Timesheet.Tasks.method("init", function(){
    var self = this;

    self.initEventListeners();
  });

  Timesheet.Tasks.method("initEventListeners", function(){

    $(".add-task").on("click", function(event){
      event.preventDefault();
      window.location = "#createTask";
      $("#create_task").modal();
    });

    $("paper-slider").on("core-change", function(event){
      var jEle = $(this)
        ,value = Number(jEle.val())
      ;

      jEle.removeClass("blue").removeClass("orange").removeClass("red");

      if(value < 4){
        jEle.addClass("blue");
      } else if(value >= 4 && value < 7) {
        jEle.addClass("orange");
      } else {
        jEle.addClass("red");
      }

      $("#task_priority").val(value);
    });

    $.each($(".memberSelect2Input"), function (index, ele) {
      timesheet.helper().initSelect2($(ele), {
        placeholder: "Assign to",
        ajax: {
          url: "/lists/members",
          data: function (data, term) {
            return {q: data,
              project_id: $("#task_project_id").val()
            }
          }
        }
      });
    });
  });

  return Timesheet;
})(Timesheet);
