(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "../node_modules/vue-loader/lib/index.js?!../node_modules/source-map-loader/dist/cjs.js!./pages/population.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************!*\
  !*** ../node_modules/vue-loader/lib??vue-loader-options!../node_modules/source-map-loader/dist/cjs.js!./pages/population.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_countries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/countries */ "./assets/countries.js");
/* harmony import */ var _assets_ages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/ages */ "./assets/ages.js");
/* harmony import */ var _assets_parties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/parties */ "./assets/parties.js");
/* harmony import */ var _assets_genders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/genders */ "./assets/genders.js");
/* harmony import */ var _assets_races__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/races */ "./assets/races.js");
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
  //console.log(t);
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  //js.setAttribute("type", "scripttype");
  //js.type = "scripttype"
  js.src = "./widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  t._e = [];
  //console.log(t);
  t.ready = function(f) {
    t._e.push(f);
  };
  console.log(t);
  return t;
}(document, "script", "twitter-wjs"));

const url = "https://icc.ise.bgu.ac.il/RepFeed/population/";
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Population",
  components: {},
  data: function () {
    return {
      load: false,
      feed: "",
      error_message: "",
      age: "age_bucket",
      country: "country",
      party: "party",
      gender: "gender",
      race: "race",
      op_age: _assets_ages__WEBPACK_IMPORTED_MODULE_2__["default"],
      op_country: _assets_countries__WEBPACK_IMPORTED_MODULE_1__["default"],
      op_gender: _assets_genders__WEBPACK_IMPORTED_MODULE_4__["default"],
      op_party: _assets_parties__WEBPACK_IMPORTED_MODULE_3__["default"],
      op_race: _assets_races__WEBPACK_IMPORTED_MODULE_5__["default"],
    };
  },
  methods: {
    /**
    * clear the feed and filters
    */
    set_reset() {
      this.load = false;
      document.getElementById('feed').innerHTML = "";
      try {
        (this.age = "age_bucket"),
          (this.country = "country"),
          (this.party = "party"),
          (this.gender = "gender"),
          (this.race = "race"),
          (this.feed = "");
        this.error_message = "";
        
      } catch (error) {
        console.log(error);
      }
      
    },

    /**
     * send Get request to the backend with the parameters from the filters.
     * get the response from the backend and set the data to the feed varible 
     */
    async search() {
      this.load = true;
      this.feed = "";
      this.error_message = "";
      document.getElementById('feed').innerHTML = "";
      //document.getElementById('feed').style.visibility = "hidden"
      // send Get request 
      try {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(
          url + `${this.age}/${this.country}/${this.party}/${this.gender}/${this.race}`
        );
        // if the backend returns empty list, set an error message
        if (response.data.length != 0) {
          for (let tweet in response.data){
            console.log(tweet)
            console.log(window.twttr.widgets);
            window.twttr.widgets.createTweet( response.data[tweet] , document.getElementById("feed"));
          }
          this.feed = response.data;
        } 
        else {
          this.error_message = "Sorry no result for your request";
        }
        //document.getElementById('else').style.visibility = "visible";
        this.load = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});


/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./pages/population.vue?vue&type=template&id=01d6be06&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./pages/population.vue?vue&type=template&id=01d6be06& ***!
  \*********************************************************************************************************************************************************************************************/
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
        _c("div", { staticStyle: { "margin-bottom": "1px" } }, [
          _vm._v("Please Choose Your Filters:")
        ]),
        _vm._v(" "),
        _c(
          "div",
          [
            _c("b-form-select", {
              staticClass: "mb-2",
              staticStyle: {
                border: "2px solid #ced4da",
                width: "31%",
                "margin-top": "1px",
                "margin-bottom": "1px",
                "margin-right": "5px"
              },
              attrs: { options: _vm.op_age },
              model: {
                value: _vm.age,
                callback: function($$v) {
                  _vm.age = $$v
                },
                expression: "age"
              }
            }),
            _vm._v(" "),
            _c("b-form-select", {
              staticClass: "mb-2",
              staticStyle: {
                border: "2px solid #ced4da",
                width: "31%",
                "margin-top": "1px",
                "margin-bottom": "1px",
                "margin-right": "5px"
              },
              attrs: { options: _vm.op_country },
              model: {
                value: _vm.country,
                callback: function($$v) {
                  _vm.country = $$v
                },
                expression: "country"
              }
            }),
            _vm._v(" "),
            _c("b-form-select", {
              staticClass: "mb-2",
              staticStyle: {
                border: "2px solid #ced4da",
                width: "31%",
                "margin-top": "1px",
                "margin-right": "10px"
              },
              attrs: { options: _vm.op_party },
              model: {
                value: _vm.party,
                callback: function($$v) {
                  _vm.party = $$v
                },
                expression: "party"
              }
            }),
            _vm._v(" "),
            _c("b-form-select", {
              staticClass: "mb-2",
              staticStyle: {
                border: "2px solid #ced4da",
                width: "31%",
                "margin-top": "1px",
                "margin-right": "5px"
              },
              attrs: { options: _vm.op_gender },
              model: {
                value: _vm.gender,
                callback: function($$v) {
                  _vm.gender = $$v
                },
                expression: "gender"
              }
            }),
            _vm._v(" "),
            _c("b-form-select", {
              staticClass: "mb-2",
              staticStyle: {
                border: "2px solid #ced4da",
                width: "31%",
                "margin-top": "1px",
                "margin-right": "10px"
              },
              attrs: { options: _vm.op_race },
              model: {
                value: _vm.race,
                callback: function($$v) {
                  _vm.race = $$v
                },
                expression: "race"
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("div", [
          _c(
            "button",
            {
              staticClass:
                "h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0",
              staticStyle: { position: "relative", left: "62%" },
              attrs: { type: "submit" },
              on: {
                click: function($event) {
                  return _vm.search()
                }
              }
            },
            [_vm._v("\n          Search\n        ")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass:
                "h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full relative right-0",
              staticStyle: { position: "relative", left: "65%" },
              attrs: { type: "submit" },
              on: {
                click: function($event) {
                  return _vm.set_reset()
                }
              }
            },
            [_vm._v("\n          Reset\n        ")]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "px-5 py-1 border-b border-lighter" })
        ])
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
            [_vm._v("\n        " + _vm._s(this.error_message) + "\n      ")]
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
        _c("h1", { staticClass: "text-xl font-bold" }, [_vm._v("Population")]),
        _vm._v(" "),
        _c("i", { staticClass: "fas fa-globe-europe text-xl text-blue" })
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

/***/ "./assets/ages.js":
/*!************************!*\
  !*** ./assets/ages.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
    { value: "age_bucket", text: "Age"},
    { value: "18-24", text: "18-24"},
    { value: "25-34", text: "25-34"},
    { value: "35-49", text: "35-49"},
    { value: "50-64", text: "50-64"},
    { value: "65+", text: "65+"}
    // {value: "18", text:"18"},
    // {value: "19", text:"19"},
    // {value: "20", text:"20"},
    // {value: "21", text:"21"},
    // {value: "22", text:"22"},
    // {value: "23", text:"23"},
    // {value: "24", text:"24"},
    // {value: "25", text:"25"},
    // {value: "26", text:"26"},
    // {value: "27", text:"27"},
    // {value: "28", text:"28"},
    // {value: "29", text:"29"},
    // {value: "30", text:"30"},
    // {value: "31", text:"31"},
    // {value: "32", text:"32"},
    // {value: "33", text:"33"},
    // {value: "34", text:"34"},
    // {value: "35", text:"35"},
    // {value: "36", text:"36"},
    // {value: "37", text:"37"},
    // {value: "38", text:"38"},
    // {value: "39", text:"39"},
    // {value: "40", text:"40"},
    // {value: "41", text:"41"},
    // {value: "42", text:"42"},
    // {value: "43", text:"43"},
    // {value: "44", text:"44"},
    // {value: "45", text:"45"},
    // {value: "46", text:"46"},
    // {value: "47", text:"47"},
    // {value: "48", text:"48"},
    // {value: "49", text:"49"},
    // {value: "50", text:"50"},
    // {value: "51", text:"51"},
    // {value: "52", text:"52"},
    // {value: "53", text:"53"},
    // {value: "54", text:"54"},
    // {value: "55", text:"55"},
    // {value: "56", text:"56"},
    // {value: "57", text:"57"},
    // {value: "58", text:"58"},
    // {value: "59", text:"59"},
    // {value: "60", text:"60"},
    // {value: "61", text:"61"},
    // {value: "62", text:"62"},
    // {value: "63", text:"63"},
    // {value: "64", text:"64"},
    // {value: "65", text:"65"},
    // {value: "66", text:"66"},
    // {value: "67", text:"67"},
    // {value: "68", text:"68"},
    // {value: "69", text:"69"},
    // {value: "70", text:"70"},
    // {value: "71", text:"71"},
    // {value: "72", text:"72"},
    // {value: "73", text:"73"},
    // {value: "74", text:"74"},
    // {value: "75", text:"75"},
    // {value: "76", text:"76"},
    // {value: "77", text:"77"},
    // {value: "78", text:"78"},
    // {value: "79", text:"79"}
]);

/***/ }),

/***/ "./assets/countries.js":
/*!*****************************!*\
  !*** ./assets/countries.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([  
    { value: "country", text: "State"},
   {value: "AK", text:"Alaska - AK"},
   {value: "AL", text:"Alabama - AL"},
   {value: "AR", text:"Arkansas - AR"},
   {value: "AZ", text:"Arizona - AZ"},
   {value: "CA", text:"California - CA"},
   {value: "CO", text:"Colorado - CO"},
   {value: "CT", text:"Connecticut - CT"},
   {value: "DC", text:"District of Columbia - DC"},
   {value: "DE", text:"Delaware - DE"},
   {value: "FL", text:"Florida - FL"},
   {value: "GA", text:"Georgia - GA"},
   {value: "HI", text:"Hawaii - HI"},
   {value: "IA", text:"Iowa - IA"},
   {value: "ID", text:"Idaho - ID"},
   {value: "IL", text:"Illinois - IL"},
   {value: "IN", text:"Indiana - IN"},
   {value: "KS", text:"Kansas - KS"},
   {value: "KY", text:"Kentucky - KY"},
   {value: "LA", text:"Louisiana - LA"},
   {value: "MA", text:"Massachusetts - MA"},
   {value: "MD", text:"Maryland - MD"},
   {value: "ME", text:"Maine - ME"},
   {value: "MI", text:"Michigan - MI"},
   {value: "MN", text:"Minnesota - MN"},
   {value: "MO", text:"Missouri - MO"},
   {value: "MS", text:"Mississippi - MS"},
   {value: "MT", text:"Montana - MT"},
   {value: "NC", text:"North Carolina - NC"},
   {value: "ND", text:"North Dakota - ND"},
   {value: "NE", text:"Nebraska - NE"},
   {value: "NH", text:"New Hampshire - NH"},
   {value: "NJ", text:"New Jersey - NJ"},
   {value: "NM", text:"New Mexico - NM"},
   {value: "NV", text:"Nevada - NV"},
   {value: "NY", text:"New York - NY"},
   {value: "OH", text:"Ohio - OH"},
   {value: "OK", text:"Oklahoma - OK"},
   {value: "OR", text:"Oregon - OR"},
   {value: "PA", text:"Pennsylvania - PA"},
   {value: "RI", text:"Rhode Island - RI"},
   {value: "SC", text:"South Carolina - SC"},
   {value: "SD", text:"South Dakota - SD"},
   {value: "TN", text:"Tennessee - TN"},
   {value: "TX", text:"Texas - TX"},
   {value: "UT", text:"Utah - UT"},
   {value: "VA", text:"Virginia - VA"},
   {value: "VT", text:"Vermont - VT"},
   {value: "WA", text:"Washington - WA"},
   {value: "WI", text:"West Virginia - WV"},
   {value: "WV", text:"Wisconsin - WI"},
   {value: "WY", text:"Wyoming - WY"}
]);

/***/ }),

/***/ "./assets/genders.js":
/*!***************************!*\
  !*** ./assets/genders.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
     {value: "gender", text: "Gender"},
     {value: "Female", text: "Female"},
     {value: "Male", text: "Male"}
    ]);

/***/ }),

/***/ "./assets/parties.js":
/*!***************************!*\
  !*** ./assets/parties.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
    {value: "party", text: "Party"},
    {value: "Democrat", text: "Democrat"},
    {value: "Independent", text: "Independent"},
    // {value: "No Party", text: "No Party"},
    {value: "Republican", text: "Republican"},
    {value: "NA", text: "NA"}
    // {value: "Other", text: "Other"}
 ]);

/***/ }),

/***/ "./assets/races.js":
/*!*************************!*\
  !*** ./assets/races.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([
    {value: "race", text: "Race"},
    {value: "African-American", text: "African-American"},
    {value: "Caucasian", text: "Caucasian"},
    {value: "Hispanic", text: "Hispanic"},
    {value: "Other", text: "Other"}
 ]);

/***/ }),

/***/ "./pages/population.vue":
/*!******************************!*\
  !*** ./pages/population.vue ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _population_vue_vue_type_template_id_01d6be06___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./population.vue?vue&type=template&id=01d6be06& */ "./pages/population.vue?vue&type=template&id=01d6be06&");
/* harmony import */ var _population_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./population.vue?vue&type=script&lang=js& */ "./pages/population.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _population_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _population_vue_vue_type_template_id_01d6be06___WEBPACK_IMPORTED_MODULE_0__["render"],
  _population_vue_vue_type_template_id_01d6be06___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "pages/population.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./pages/population.vue?vue&type=script&lang=js&":
/*!*******************************************************!*\
  !*** ./pages/population.vue?vue&type=script&lang=js& ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_dist_cjs_js_population_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib??vue-loader-options!../../node_modules/source-map-loader/dist/cjs.js!./population.vue?vue&type=script&lang=js& */ "../node_modules/vue-loader/lib/index.js?!../node_modules/source-map-loader/dist/cjs.js!./pages/population.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_source_map_loader_dist_cjs_js_population_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./pages/population.vue?vue&type=template&id=01d6be06&":
/*!*************************************************************!*\
  !*** ./pages/population.vue?vue&type=template&id=01d6be06& ***!
  \*************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_population_vue_vue_type_template_id_01d6be06___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./population.vue?vue&type=template&id=01d6be06& */ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./pages/population.vue?vue&type=template&id=01d6be06&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_population_vue_vue_type_template_id_01d6be06___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_population_vue_vue_type_template_id_01d6be06___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=1.js.map
//# sourceMappingURL=1.js.map