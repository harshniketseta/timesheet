// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require select2
//= require bootstrap.js
//= require bootstrap-sprockets.js
//= require underscore/underscore-min.js
//= require moment/moment.js
//= require bootstrap-calendar/calendar.min.js
//= require moment
//= require bootstrap-datetimepicker
//= require jquery-ui/jquery-ui.min.js
//= require rangecalendar/jquery.rangecalendar.js

/* Adds methods to a Javascript Prototype Object (pseudo-Class) */
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

jQuery.fn.rotate = function(degrees, duration, cb) {
  var degrees = degrees || 0
    ,duration = (duration == undefined ? 400 : duration)
    ,cb = cb || function(){};

//  $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
//    '-moz-transform' : 'rotate('+ degrees +'deg)',
//    '-ms-transform' : 'rotate('+ degrees +'deg)',
//    'transform' : 'rotate('+ degrees +'deg)'});
//  $(this).animate({'-webkit-transform' : 'rotate('+ degrees +'deg)',
//    '-moz-transform' : 'rotate('+ degrees +'deg)',
//    '-ms-transform' : 'rotate('+ degrees +'deg)',
//    'transform' : 'rotate('+ degrees +'deg)'}, duration, cb);

  $(this).animate({  borderSpacing: degrees }, {
    step: function(now,fx) {
      $(this).css('-webkit-transform','rotate('+now+'deg)');
      $(this).css('-moz-transform','rotate('+now+'deg)');
      $(this).css('transform','rotate('+now+'deg)');
    },
    duration: duration,
    complete: cb
  },'linear');

  return $(this);
};

var Timesheet = (function () {
  /*
   Base App Class. Lazy Loads child classes aka subApps.

   Author: Harshniket
   Review:
   */
  var App = function (params) {
    this.params = params || {};

    var subApps = {
      "helper": "Helper",
      "projects": "Projects",
      "tasks": "Tasks",
      "timeline": "Timeline"
    }

    /*
     Lazy Loading of subApps.
     Goes through subApps and maps a function which initializes the subApp if not initialized,
     otherwise returns the already initialized object of the said class.

     Author: Harshniket
     Review:
     */
    for (var key in subApps) {
      if (!subApps.hasOwnProperty(key)) continue;
      var subAppName = subApps[key];
      App.prototype[key] = (function (subAppName) {
        var obj = '';
        return function (params) {
          if (typeof(obj) == "string") {
            if (App[subAppName]) {
              var subApp = App[subAppName];
              if (subApp.get && typeof(subApp.get) == "function") {
                obj = subApp.get(params);
              } else {
                obj = new subApp(params, this);
                if (typeof(obj["init"]) == "function") obj["init"]();
              }
            } else {
              obj = null;
            }
          }
          return obj;
        };
      }(subAppName));
    }
  }

  /*
   Init Function for Base App class.

   Author: Harshniket
   Review:
   */
  App.method("init", function () {
    var self = this;

    self.helper().initBanner();
    self.helper().initAlerts();
    self.helper().initAllSelect2();
    self.helper().initNumberOnlyField();
    self.helper().initPriceOnlyField();
    self.helper().makeTabsPersistent();
    setTimeout(function(){
      self.helper().slideUpAlerts("success");
      self.helper().slideUpAlerts("danger");
    }, 3 * 1000);
  });
  return App;
})();

/*
 Helper Singleton wrapper.

 Author: Harshniket
 Review:
 */
var Timesheet = (function (Timesheet) {

  Timesheet.Helper = (function () {
    var instance;

    function createInstance() {
      return _Helper;
    }

    return {
      get: function () {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      }
    };
  })();

  return Timesheet;
})(Timesheet);

/*
 Helper Functions.
 Author: Harshniket
 Review:
 */
var _Helper = {
  initBanner: function(){
    $("#main_container").on("scroll", function (event) {
      var jMainContainer = $(this)
        , scrollTop = jMainContainer.scrollTop()
        ;

      if (scrollTop > 100 && jMainContainer.find(".banner.maximized").length > 0) {
        var bannerDiv = jMainContainer.find(".banner")

        bannerDiv.find(".actionsWrap").animate({"margin-top": "44px"}, 400);

        jMainContainer.find(".banner").removeClass("maximized");
        jMainContainer.find(".projectWrap").removeClass("maximized");

        bannerDiv.animate({height: "72px"}, 400, function(){
          jMainContainer.find(".banner").addClass("minimized");
          jMainContainer.find(".projectWrap").addClass("minimized");
        });

      }
      if (scrollTop < 100 && jMainContainer.find(".banner.minimized").length > 0) {
        var bannerDiv = jMainContainer.find(".banner")

        bannerDiv.find(".actionsWrap").animate({"margin-top": "272px"}, 400);

        jMainContainer.find(".banner").removeClass("minimized");
        jMainContainer.find(".projectWrap").removeClass("minimized");

        jMainContainer.find(".banner").animate({height: "300px"}, 400, function(){
          jMainContainer.find(".banner").addClass("maximized");
          jMainContainer.find(".projectWrap").addClass("maximized");
        });

      }
    });
  },
  /*
   Init All date picker components.
   Author: Harshniket
   Review:
   */
  initDatePickers: function () {
    $(".date").datetimepicker({
      pickTime: false,
      showToday: true
    });
  },
  initAllSelect2: function () {
    var self = this;

    $.each($(".select2Input"), function (index, ele) {
      var jEle = $(ele)
        , options = {}
        ;

      options.placeholder = jEle.attr("placeholder");
      options.ajax = {}
      options.ajax.url = jEle.data("url");

      self.initSelect2($(ele), options);
    });
  },
  /*
   Init Select2 components.
   Author: Harshniket
   Review:
   */
  initSelect2: function (ele, options, preloadData) {
    var jEle = $(ele)
      , currId = jEle.data("valId")
      , currText = jEle.data("valText")
      , preloadData = {
        id: currId,
        text: currText
      }
      , options = options || {}
      , defOptions = {
        minimumInputLength: 0,
        ajax: {
          results: function (data, page) {
            return {
              results: data.results
            };
          },
          type: "POST",
          dataType: 'json',
          data: function (term, page) {
            return {
              q: term, // search term
              page_limit: 10
            };
          }
        }
      },
      finalOptions = $.extend(true, {}, defOptions, options)
      ;

    jEle.select2(finalOptions);
    currId && currText && jEle.select2("data", preloadData);

  },
  /*
   Init Number Only Fields components.

   Author: Harshniket
   Review:
   */
  initNumberOnlyField: function () {
    $(".numberOnlyField").on("keypress", function (evt) {
      var charCode = (evt.which) ? evt.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

      return true;
    });
  },

  /*
   Number and dot Only Fields components for trip prices.

   Author: Vipala
   Review:
   */
  initPriceOnlyField: function () {
    $(".floatOnlyField").on("keypress", function (evt) {
      var charCode = (evt.which) ? evt.which : event.keyCode
        , character = String.fromCharCode(charCode)
        ;

      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && character != ".")
        return false;

      return true;
    });
  },

  /*
   Inits Form.

   Author: Harshniket
   Review:
   */
  initForm: function (jForm) {
    var self = this;

    jForm.validate();
  },
  /*
   Init Number Only Fields components.

   Author: Harshniket
   Review:
   */
  initAlerts: function () {
    $(".close.close-sm").on("click", function () {
      var jEle = $(this)
        , jAlert = jEle.closest(".alert")
        ;

      jAlert.fadeOut();
    });
  },
  /*
   Reads location.hash to change tab, if tab not found fires event with said hash.
   Everything in the hash after '_' is considered event data.

   Author: Harshniket
   Review:
   */
  makeTabsPersistent: function () {
    if (location.hash !== '') {
      var tabPage = $('a[href="' + location.hash + '"][role="tab"]');

      if (tabPage.parent().is(":first-child")) {
        location.hash = "";
      }
      if (tabPage.length > 0) {
        tabPage.tab('show');
      } else {
        setTimeout(function () {
          var hash_split = location.hash.split("#")[1].split("_")
            , eventName = hash_split[0]
            , data = hash_split.slice(1, hash_split.length)
            ;

          $(document).trigger(eventName, data);
        }, 100);
      }
    }
    return $('a[data-toggle="tab"]').on('click', function (e) {
      return location.hash = $(e.target).attr('href').substr(1);
    });
  },
  /*
   Shows flash notice through javascript.

   Author: Harshniket
   Review:
   */
  showFlashInfo: function (notices) {

    $(".alert.alert-success").remove();
    var noticeHTML = "<p class='alert alert-success'>" + notices.join("</br>") + "</p>";
    $("#main_container").prepend(noticeHTML);
  },
  /*
   Shows flash alerts through javascript.

   Author: Harshniket
   Review:
   */
  showFlashAlert: function (alerts) {

    $(".alert.alert-danger").remove();
    var alertHTML = "<p class='alert alert-danger'>" + alerts.join("</br>") + "</p>";
    $("#main_container").prepend(alertHTML);
  },
  /*
   Modal show and callbacks helper.

   Author: Harshniket
   Review:
   */
  showModal: function (selector, options, onNegative, onPositive) {
    var jModal = $(selector);

    jModal.modal(options);

    jModal.find(".btn.negative").on("click", function () {
      onNegative();
    });

    jModal.find(".btn.positive").on("click", function () {
      onPositive();
    });

  },
  slideUpAlerts: function(type){
    $(".alert.alert-"+ type).slideUp("slow")
  },
  uuid: function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });

    return uuid;
  }
};

var Timesheet = (function (Timesheet) {

  Timesheet.GoogleMaps = function (configData) {
    var self = this;

    self.configData = configData;
  };

  Timesheet.GoogleMaps.method("init", function () {
    var self = this;

    /*
     Fire event that google maps has been loaded.
     */
    window.onGoogleMapsLoad = function () {
    };
  });

  return Timesheet;
})(Timesheet);
