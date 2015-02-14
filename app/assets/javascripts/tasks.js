// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var Timesheet = (function(Timesheet) {

  Timesheet.Tasks = function () {

  };

  Timesheet.Tasks.method("init", function(){
    var self = this;

    self.initEventListeners();
    self.initDateTimePickers();
    self.initRangeCalendar();
  });

  Timesheet.Tasks.method("initEventListeners", function(){

    $(".toggle-task").on("click", function(event){
      var jToggleTaskLn = $(this)
        ,jTaskTile = jToggleTaskLn.closest(".taskTile")
        ,jMinInfo = jTaskTile.find(".min-info")
        ,jMoreInfo = jTaskTile.find(".more-info")
        ;

      if(jToggleTaskLn.hasClass("fa-caret-right")) {
        jToggleTaskLn.rotate(90, 400, function () {
          jToggleTaskLn.addClass("fa-caret-down").removeClass("fa-caret-right");
          jToggleTaskLn.rotate(0, 0);
        });
        jMoreInfo.slideDown();
      } else {
        jToggleTaskLn.rotate(-90, 400, function(){
          jToggleTaskLn.addClass("fa-caret-right").removeClass("fa-caret-down");
          jToggleTaskLn.rotate(0, 0);
        });
        jMoreInfo.slideUp();
      }
    });

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

    Timesheet.Tasks.method("initDateTimePickers", function () {

     var self = this;

     $(".from_date").datetimepicker({
       showToday: true,
       pickTime: false,
       showTimezone: true
     });

     $(".to_date").datetimepicker({
       showToday: true,
       pickTime: false,
       showTimezone: true
     });
   });

    Timesheet.Tasks.method("initRangeCalendar", function(){
      var self = this;
      self.rangeCalendar = $(".task-range-calendar").rangeCalendar({
          theme:"default-theme",
          startDate: moment(),
          endDate: moment().add('months', 12),
          weekends: true,
          changeRangeCallback: self.onChangeRange
      });
    });

    Timesheet.Tasks.method("onChangeRange", function(target, range){
      $(target).parent().find("[name='task[estimated_time_for_completion][hours]']").val(range.width * 8);
      $('[name="task[schedule][start]"]').val(range.start)
      $('[name="task[schedule][end]"]').val(range.end);
      $(".schedule-label").html("Scheduled to start " + range.fromNow + ".")

    });

  return Timesheet;
})(Timesheet);
