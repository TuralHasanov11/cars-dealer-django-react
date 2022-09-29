/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
function ownKeys(t, e) {
  var a,
      r = Object.keys(t);
  return (
      Object.getOwnPropertySymbols &&
          ((a = Object.getOwnPropertySymbols(t)),
          e &&
              (a = a.filter(function (e) {
                  return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
          r.push.apply(r, a)),
      r
  );
}
function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
      var a = null != arguments[e] ? arguments[e] : {};
      e % 2
          ? ownKeys(Object(a), !0).forEach(function (e) {
                _defineProperty(t, e, a[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a))
          : ownKeys(Object(a)).forEach(function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
            });
  }
  return t;
}
function _defineProperty(e, t, a) {
  return t in e ? Object.defineProperty(e, t, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = a), e;
}

// eslint-disable-next-line no-unused-expressions
!(function () {
  
  var t, a, r;
  (function () {
      for (var a = document.querySelectorAll(".password-toggle"), e = 0; e < a.length; e++)
          !(function (e) {
              var t = a[e].querySelector(".form-control");
              a[e].querySelector(".password-toggle-btn").addEventListener(
                  "click",
                  function (e) {
                      "checkbox" === e.target.type && (e.target.checked ? (t.type = "text") : (t.type = "password"));
                  },
                  !1
              );
          })(e);
  })(),
      window.addEventListener(
          "load",
          function () {
              var e = document.getElementsByClassName("needs-validation");
              Array.prototype.filter.call(e, function (t) {
                  t.addEventListener(
                      "submit",
                      function (e) {
                          !1 === t.checkValidity() && (e.preventDefault(), e.stopPropagation()), t.classList.add("was-validated");
                      },
                      !1
                  );
              });
          },
          !1
      ),
      null != (t = document.querySelector(".navbar.fixed-top")) &&
          (t.classList,
          window.addEventListener("scroll", function (e) {
              20 < e.currentTarget.pageYOffset ? t.classList.add("navbar-stuck") : t.classList.remove("navbar-stuck");
          })),
      new SmoothScroll("[data-scroll]", {
          speed: 800,
          speedAsDuration: !0,
          offset: function (e, t) {
              return t.dataset.scrollOffset || 40;
          },
          header: "[data-scroll-header]",
          updateURL: !1,
      }),
      null != (r = document.querySelector(".btn-scroll-top")) &&
          ((a = parseInt(600, 10)),
          window.addEventListener("scroll", function (e) {
              e.currentTarget.pageYOffset > a ? r.classList.add("show") : r.classList.remove("show");
          })),
      [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (e) {
          return new bootstrap.Tooltip(e, { trigger: "hover" });
      }),
      [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function (e) {
          return new bootstrap.Popover(e);
      }),
      [].slice.call(document.querySelectorAll(".toast")).map(function (e) {
          return new bootstrap.Toast(e);
      }),
      (function () {
          for (var n = document.querySelectorAll(".range-slider"), e = 0; e < n.length; e++)
              !(function (e) {
                  var t = n[e].querySelector(".range-slider-ui"),
                      a = n[e].querySelector(".range-slider-value-min"),
                      r = n[e].querySelector(".range-slider-value-max"),
                      e = {
                          dataStartMin: parseInt(n[e].dataset.startMin, 10),
                          dataStartMax: parseInt(n[e].dataset.startMax, 10),
                          dataMin: parseInt(n[e].dataset.min, 10),
                          dataMax: parseInt(n[e].dataset.max, 10),
                          dataStep: parseInt(n[e].dataset.step, 10),
                      };
                  noUiSlider.create(t, {
                      start: e.dataStartMax ? [e.dataStartMin, e.dataStartMax] : [e.dataStartMin],
                      connect: !!e.dataStartMax || "lower",
                      step: e.dataStep,
                      tooltips: !0,
                      range: { min: e.dataMin, max: e.dataMax },
                      format: {
                          to: function (e) {
                              return "$" + parseInt(e, 10);
                          },
                          from: function (e) {
                              return Number(e);
                          },
                      },
                  }),
                      t.noUiSlider.on("update", function (e, t) {
                          e = (e = e[t]).replace(/\D/g, "");
                          t ? r && (r.value = Math.round(e)) : a && (a.value = Math.round(e));
                      }),
                      a &&
                          a.addEventListener("change", function () {
                              t.noUiSlider.set([this.value, null]);
                          }),
                      r &&
                          r.addEventListener("change", function () {
                              t.noUiSlider.set([null, this.value]);
                          });
              })(e);
      })(),
      (function () {
          for (var o = document.querySelectorAll('[data-bs-toggle="select"]'), e = 0; e < o.length; e++)
              !(function (e) {
                  for (var t = o[e].querySelectorAll(".dropdown-item"), a = o[e].querySelector(".dropdown-toggle-label"), r = o[e].querySelector('input[type="hidden"]'), n = 0; n < t.length; n++)
                      t[n].addEventListener("click", function (e) {
                          e.preventDefault();
                          e = this.querySelector(".dropdown-item-label").innerText;
                          (a.innerText = e), null !== r && (r.value = e);
                      });
              })(e);
      })(),
      (function (e, t, a) {
          for (var r = 0; r < e.length; r++) t.call(a, r, e[r]);
      })(document.querySelectorAll(".tns-carousel-wrapper .tns-carousel-inner"), function (e, t) {
          var a =
                  null != t.dataset.carouselOptions && "vertical" === JSON.parse(t.dataset.carouselOptions).axis
                      ? ['<i class="fi-chevron-up"></i>', '<i class="fi-chevron-down"></i>']
                      : ['<i class="fi-chevron-left"></i>', '<i class="fi-chevron-right"></i>'],
              r = { container: t, controlsText: a, navPosition: "bottom", mouseDrag: !0, speed: 500, autoplayHoverPause: !0, autoplayButtonOutput: !1 };
          null != t.dataset.carouselOptions && (o = JSON.parse(t.dataset.carouselOptions));
          var a = Object.assign({}, r, o),
              n = tns(a),
              r = t.closest(".tns-carousel-wrapper"),
              o = (r.querySelectorAll(".tns-item"), n.getInfo()),
              i = r.querySelector(".tns-current-slide"),
              a = r.querySelector(".tns-total-slides");
          r.classList.contains("tns-center") &&
              ((t = o.index),
              o.slideItems[t].classList.add("active"),
              n.events.on("indexChanged", function () {
                  var e = n.getInfo(),
                      t = e.indexCached,
                      a = e.index;
                  e.slideItems[t].classList.remove("active"), e.slideItems[a].classList.add("active");
              })),
              null !== r.querySelector(".tns-slides-count") &&
                  ((i.innerHTML = o.displayIndex),
                  (a.innerHTML = o.slideCount),
                  n.events.on("indexChanged", function () {
                      var e = n.getInfo();
                      i.innerHTML = e.displayIndex;
                  }));
      }),
      (function () {
          var e = document.querySelectorAll(".gallery");
          if (e.length)
              for (var t = 0; t < e.length; t++) {
                  var a = !!e[t].dataset.thumbnails;
                  lightGallery(e[t], { selector: ".gallery-item", download: !1, thumbnail: a, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0, color: "fd5631" } });
              }
      })(),
      (function () {
          var e = document.querySelectorAll('[data-bs-toggle="lightbox"]');
          if (e.length)
              for (var t = 0; t < e.length; t++)
                  lightGallery(e[t], { selector: "this", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0, color: "fd5631" } });
      })(),
      (function () {
          var e = document.querySelectorAll(".date-picker");
          if (0 !== e.length)
              for (var t = 0; t < e.length; t++) {
                  var a = void 0;
                  null != e[t].dataset.datepickerOptions && (a = JSON.parse(e[t].dataset.datepickerOptions));
                  var r = e[t].classList.contains("date-range") ? { plugins: [new rangePlugin({ input: e[t].dataset.linkedInput })] } : "{}",
                      a = _objectSpread(_objectSpread(_objectSpread({}, { disableMobile: "true" }), r), a);
                  flatpickr(e[t], a);
              }
      })(),
      (function () {
          for (var e = document.querySelectorAll(".parallax"), t = 0; t < e.length; t++) new Parallax(e[t]);
      })(),
      (function () {
          var e = document.querySelectorAll(".file-uploader");
          if (0 !== e.length) {
              "undefined" != typeof FilePondPluginFileValidateType && FilePond.registerPlugin(FilePondPluginFileValidateType),
                  "undefined" != typeof FilePondPluginFileValidateSize && FilePond.registerPlugin(FilePondPluginFileValidateSize),
                  "undefined" != typeof FilePondPluginImagePreview && FilePond.registerPlugin(FilePondPluginImagePreview),
                  "undefined" != typeof FilePondPluginImageCrop && FilePond.registerPlugin(FilePondPluginImageCrop),
                  "undefined" != typeof FilePondPluginImageResize && FilePond.registerPlugin(FilePondPluginImageResize),
                  "undefined" != typeof FilePondPluginImageTransform && FilePond.registerPlugin(FilePondPluginImageTransform);
              for (var t = 0; t < e.length; t++) FilePond.create(e[t]);
          }
      })(),
      (function () {
          var r = document.querySelectorAll("[data-bs-binded-element]");
          if (0 !== r.length)
              for (var e = 0; e < r.length; e++)
                  !(function (e) {
                      var t = document.querySelector(r[e].dataset.bsBindedElement),
                          a = r[e].dataset.bsUnsetValue;
                      "SELECT" === r[e].tagName
                          ? r[e].addEventListener("change", function (e) {
                                t.innerText = e.target.value;
                            })
                          : r[e].classList.contains("date-picker")
                          ? r[e].addEventListener("change", function (e) {
                                "" !== e.target.value ? (t.innerText = e.target.value) : (t.innerText = a);
                            })
                          : r[e].addEventListener("keyup", function (e) {
                                "" !== e.target.value ? (t.innerText = e.target.value) : (t.innerText = a);
                            });
                  })(e);
      })(),
      (function () {
          var e = document.querySelectorAll("[data-master-checkbox-for]");
          if (0 !== e.length)
              for (var t = 0; t < e.length; t++)
                  e[t].addEventListener("change", function () {
                      var e = document.querySelector(this.dataset.masterCheckboxFor).querySelectorAll('input[type="checkbox"]');
                      if (this.checked) for (var t = 0; t < e.length; t++) (e[t].checked = !0), e[t].dataset.checkboxToggleClass && document.querySelector(e[t].dataset.bsTarget).classList.add(e[t].dataset.checkboxToggleClass);
                      else for (var a = 0; a < e.length; a++) (e[a].checked = !1), e[a].dataset.checkboxToggleClass && document.querySelector(e[a].dataset.bsTarget).classList.remove(e[a].dataset.checkboxToggleClass);
                  });
      })(),
      (function () {
          for (var e = document.querySelectorAll("[data-bs-toggle-class]"), t = 0; t < e.length; t++)
              e[t].addEventListener("click", function (e) {
                  e.preventDefault();
                  var t = document.querySelector(e.currentTarget.dataset.bsTarget),
                      e = e.currentTarget.dataset.bsToggleClass;
                  t.classList.toggle(e);
              });
      })();
})();
