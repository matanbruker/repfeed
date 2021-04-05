(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "../node_modules/vue-loader/lib/index.js?!../node_modules/source-map-loader/dist/cjs.js!./pages/repFeed.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************!*\
  !*** ../node_modules/vue-loader/lib??vue-loader-options!../node_modules/source-map-loader/dist/cjs.js!./pages/repFeed.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));
const url = "https://icc.ise.bgu.ac.il/RepFeed/repfeed/";

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "repFeed",
  data() {
    return {
      load: false,
      feed: "",
      error_message: "",
      slider: {
        value: 0,
        data: [
          -1,
          -0.9,
          -0.8,
          -0.7,
          -0.6,
          -0.5,
          -0.4,
          -0.3,
          -0.2,
          -0.1,
          0,
          0.1,
          0.2,
          0.3,
          0.4,
          0.5,
          0.6,
          0.7,
          0.8,
          0.9,
          1,
        ],
      },
    };
  },
  methods: {
    async update_res() {
      this.load = true;
      this.feed = "";
      document.getElementById('feed').innerHTML = "";
      //document.getElementById('feed').style.visibility = "hidden"
      this.error_message = "";
      // send Get request 
      try {
        this.slider.value = 0;
        const response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url + "reset");

        // if the backend returns empty list, set an error message
        if (response.data.length != 0) {
          for (let tweet in response.data){
            console.log(tweet)
            window.twttr.widgets.createTweet( response.data[tweet] , document.getElementById("feed"));
          }
          this.feed = response.data;
        } else {
          this.error_message = "Sorry no result for your request";
        }

        //document.getElementById('feed').style.visibility = "visible";
        this.load = false;
      } catch (error) {
        console.log(error);
      }
    },

    async update_value() {
      this.load = true;
      document.getElementById('feed').innerHTML = "";
      //document.getElementById('feed').style.visibility = "hidden"
      // send Get request 
      try {
        this.feed = "";
        this.error_message = "";
        console.log(this.slider.value);
        const response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(
          url + this.slider.value
        );

        // if the backend returns empty list, set an error message
        if (response.data.length != 0) {
          for (let tweet in response.data){
            console.log(tweet)
            window.twttr.widgets.createTweet( response.data[tweet] , document.getElementById("feed"));
          }
          this.feed = response.data;
        } else {
          this.error_message = "Sorry no result for your request";
        }

        //document.getElementById('feed').style.visibility = "visible";
        this.load = false;
      } catch (error) {
        console.log(error);
      }
    },
    callbackRange(val) {
      console.log(val);
      this.slider.value = val;
    },
  },
});


/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./pages/repFeed.vue?vue&type=template&id=7902adf2&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./pages/repFeed.vue?vue&type=template&id=7902adf2& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "md:w-full h-full" }, [
    _c(
      "div",
      {
        staticStyle: {
          position: "sticky",
          top: "0",
          "background-color": "white"
        }
      },
      [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "px-1" },
          [
            _c("VueSlideBar", {
              attrs: { data: _vm.slider.data },
              on: {
                dragEnd: _vm.update_value,
                callbackRange: _vm.callbackRange
              },
              model: {
                value: _vm.slider.value,
                callback: function($$v) {
                  _vm.$set(_vm.slider, "value", $$v)
                },
                expression: "slider.value"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass:
              "px-5 py-6 border-b border-lighter flex items-center justify-between"
          },
          [
            _c(
              "button",
              {
                staticClass:
                  "h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0",
                staticStyle: { position: "relative", left: "80%", top: "15px" },
                attrs: { submit: "" },
                on: {
                  click: function($event) {
                    return _vm.update_res()
                  }
                }
              },
              [_vm._v("\n        Reset\n      ")]
            )
          ]
        )
      ]
    ),
    _vm._v(" "),
    this.error_message.length != 0
      ? _c("div", [
          _c(
            "p",
            {
              staticClass: "px-5 py-6 border-b border-lighter",
              staticStyle: { "margin-top": "15px" }
            },
            [_vm._v("\n      " + _vm._s(this.error_message) + "\n    ")]
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    this.load === true ? _c("div", [_vm._m(1)]) : _vm._e(),
    _vm._v(" "),
    _c("div", { attrs: { id: "feed" } })
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass:
          "px-5 py-3 border-b border-lighter flex items-center justify-between"
      },
      [
        _c("h1", { staticClass: "text-xl font-bold" }, [_vm._v("RepFeed")]),
        _vm._v(" "),
        _c("i", { staticClass: "fas fa-balance-scale text-xl text-blue" })
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "text-center", staticStyle: { "margin-top": "50px" } },
      [
        _c("div", {
          staticClass: "spinner-border text-primary",
          staticStyle: { width: "80px", height: "80px" },
          attrs: { role: "status" }
        })
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./pages/repFeed.vue":
/*!***************************!*\
  !*** ./pages/repFeed.vue ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _repFeed_vue_vue_type_template_id_7902adf2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repFeed.vue?vue&type=template&id=7902adf2& */ "./pages/repFeed.vue?vue&type=template&id=7902adf2&");
/* harmony import */ var _repFeed_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./repFeed.vue?vue&type=script&lang=js& */ "./pages/repFeed.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _repFeed_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _repFeed_vue_vue_type_template_id_7902adf2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _repFeed_vue_vue_type_template_id_7902adf2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "pages/repFeed.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./pages/repFeed.vue?vue&type=script&lang=js&":
/*!****************************************************!*\
  !*** ./pages/repFeed.vue?vue&type=script&lang=js& ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_dist_cjs_js_repFeed_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib??vue-loader-options!../../node_modules/source-map-loader/dist/cjs.js!./repFeed.vue?vue&type=script&lang=js& */ "../node_modules/vue-loader/lib/index.js?!../node_modules/source-map-loader/dist/cjs.js!./pages/repFeed.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_dist_cjs_js_repFeed_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./pages/repFeed.vue?vue&type=template&id=7902adf2&":
/*!**********************************************************!*\
  !*** ./pages/repFeed.vue?vue&type=template&id=7902adf2& ***!
  \**********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_repFeed_vue_vue_type_template_id_7902adf2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./repFeed.vue?vue&type=template&id=7902adf2& */ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./pages/repFeed.vue?vue&type=template&id=7902adf2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_repFeed_vue_vue_type_template_id_7902adf2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_repFeed_vue_vue_type_template_id_7902adf2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=2.js.map
//# sourceMappingURL=2.js.map