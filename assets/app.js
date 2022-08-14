/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (() => {

// Localization Selector handle Event Listener
document.querySelectorAll('[aria-controls="dropdown-popover"]').forEach(function (el, target) {
  el.setAttribute("aria-controls", el.getAttribute("aria-controls") + "-" + target);
  el.nextElementSibling.setAttribute("id", el.getAttribute("aria-controls"));
  el.addEventListener('click', function (e) {
    var popover = el.nextElementSibling;

    if (popover.getAttribute('aria-hidden') === 'true') {
      popover.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      popover.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }
  }); // Outside click listener

  document.addEventListener('click', function (e) {
    if (e.target !== el) {
      var popover = el.nextElementSibling;

      if (popover.getAttribute('aria-hidden') === 'false' && !popover.contains(e.target)) {
        popover.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
      }
    }
  });
}); // Search box handle Event Listener

document.querySelector('[data-action="ws-toggle-search"]').addEventListener('click', function (e) {
  e.preventDefault();
  var search = document.getElementById(e.target.getAttribute("data-action"));
  var overLay = document.querySelector('.ws--page-overlay');

  if (search.getAttribute('aria-hidden') === 'true') {
    search.setAttribute('aria-hidden', 'false'); // Focus on the search input

    search.querySelector("input[type='search']").focus();
  } else {
    search.setAttribute('aria-hidden', 'true');
  } // Toggle the overlay


  overLay.classList.toggle('is-ws-visible'); // add click listener for disable search

  document.querySelector('[data-action="ws-close-search"]').addEventListener('click', function (e) {
    e.preventDefault();
    search.setAttribute('aria-hidden', 'true'); // Toggle the overlay

    overLay.classList.toggle('is-ws-visible');
  });
}); // Main Dropdown Menu And Mega Menu handle Event Listener

document.querySelectorAll('[aria-hasdropdown="true"]').forEach(function (el) {
  // Dropdown Menu handle mouse hover Event Listener
  el.addEventListener('mouseenter', function (e) {
    // Set the dropdown menu to visible
    el.classList.add('is-ws-visible');
    var dropdown = el.children[1];
    dropdown.setAttribute('aria-hidden', 'false');
  }); // Dropdown Menu handle mouse leave Event Listener

  el.addEventListener('mouseleave', function (e) {
    closeDropdown();
  });
}); // Close Dropdown Menu

function closeDropdown() {
  document.querySelectorAll('[aria-hasdropdown="true"]').forEach(function (el) {
    if (el.classList.contains('is-ws-visible')) {
      el.classList.remove('is-ws-visible');
      el.children[1].setAttribute('aria-hidden', 'true');
    }
  });
} // Sidebar Menu handle Event Listener


document.querySelectorAll('[data-action="open-drawer"]').forEach(function (el) {
  // Get the drawer element
  var drawer = document.querySelector('[data-section-type="' + el.dataset.drawerId + '"]');
  var overLay = document.querySelector('.ws--page-overlay'); // Sidebar Menu handle click Event Listener

  el.addEventListener('click', function (e) {
    // Toggle the drawer attribute
    drawer.setAttribute('aria-hidden', 'false'); // Toggle the overlay

    overLay.classList.toggle('is-ws-visible'); // Close the drawer

    drawer.querySelector('[data-action="close-drawer"]').addEventListener('click', function (e) {
      drawer.setAttribute('aria-hidden', 'true'); // Toggle the overlay

      overLay.classList.toggle('is-ws-visible');
    });
  }); // outside click listener

  document.addEventListener('click', function (e) {
    if (e.target !== el) {
      if (drawer.getAttribute('aria-hidden') === 'false' && !drawer.contains(e.target)) {
        // Toggle the drawer attribute
        drawer.setAttribute('aria-hidden', 'true'); // Toggle the overlay

        overLay.classList.toggle('is-ws-visible');
      }
    }
  });
}); // Lazy Load Images using Intersection Observer

(function () {
  var observer = new IntersectionObserver(onIntersect);
  var observerBg = new IntersectionObserver(onIntersectBg); // Get all the images

  document.querySelectorAll("[data-lazy]").forEach(function (img) {
    observer.observe(img);
  }); // Get all bg images

  document.querySelectorAll("[data-lazy-bg]").forEach(function (img) {
    observerBg.observe(img);
  }); // Intersection Observer Callback function For BG Images

  function onIntersectBg(entries) {
    entries.forEach(function (entry) {
      if (entry.target.getAttribute("data-processed") || !entry.isIntersecting) {
        return true;
      }

      entry.target.classList.add('ws--image-lazy-loading');

      if (entry.target.getAttribute("data-src")) {
        entry.target.style.backgroundImage = "url(" + entry.target.getAttribute("data-src") + ")";
      }

      entry.target.setAttribute("data-processed", true);
      entry.target.classList.remove("ws--image-lazy-load");
      entry.target.classList.remove("ws--image-lazy-loading");
      entry.target.classList.add("ws--image-lazy-loaded");
    });
  } // Intersection Observer Callback function For Images


  function onIntersect(entries) {
    entries.forEach(function (entry) {
      if (entry.target.getAttribute("data-processed") || !entry.isIntersecting) {
        return true;
      }

      entry.target.classList.add('ws--image-lazy-loading');
      entry.target.setAttribute("src", entry.target.getAttribute("data-src"));
      entry.target.setAttribute("data-processed", true);
      entry.target.classList.remove("ws--image-lazy-load");
      entry.target.classList.remove("ws--image-lazy-loading");
      entry.target.classList.add("ws--image-lazy-loaded");
    });
  }
})(); // // Recall the flickity slider when the window is resized
// window.addEventListener('resize', function(e) {
//     document.querySelectorAll('[data-flickity]').forEach(function(el) {
//         // el.flickity('resize');
//     });
// });
// Recall the flickity slider when the display mode is changed for an element


document.querySelectorAll('.ws--nav-tab-link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    // Get the paranet element
    var parent = e.target.parentElement;
    var tab = parent.getAttribute('data-bs-target');
    var tabContent = document.querySelector(tab); // Get the flickity slider

    var slider = tabContent.querySelector('[data-flickity]');
    setHeightFlikityItems(); // Resize the slider

    Flickity.data(slider).reloadCells(); // tabContent.flickity('resize');
    // document.querySelectorAll('[data-flickity]').forEach(function(element) {
    //     Flickity.data(element).resize();
    //     console.log(element);
    // });
  });
}); // var tabEl = document.querySelector('button[data-bs-toggle="tab"]');
// tabEl.addEventListener('hide.bs.tab', function (event) {
//     let newActive = event.relatedTarget;
//     console.log(newActive);
//     let newTab = newActive.getAttribute('data-bs-target');
//     let newTabContent = document.querySelector(newTab);
//     let slider = newTabContent.querySelector('[data-flickity]');
//     Flickity.data(slider).resize();
// })
// bind event listener for the product carousel

document.addEventListener('DOMContentLoaded', setHeightFlikityItems); // Set the height of the product carousel

function setHeightFlikityItems() {
  var flickity = document.querySelectorAll('[data-flickity]');
  flickity.forEach(function (el) {
    var getSilders = el.children; // Find the slider element max height and set it to the slider

    for (var i = 0; i < getSilders.length; i++) {
      getSilders[i].style.height = getSilders[i].offsetHeight + 'px';
    }
  });
} // Quantity Incrementer and Decrementer


document.querySelectorAll('[data-action="quantity-increment"]').forEach(function (el) {
  // Get the decrementer element
  var decrementer = el.querySelector('[data-action="decrement"]'); // Get the Incrementer element

  var incrementer = el.querySelector('[data-action="increment"]'); // Get the input element

  var input = el.querySelector('[data-action="quantity"]'); // Increment the value

  incrementer.addEventListener('click', function (e) {
    var value = parseInt(input.value);
    input.value = value + 1;
  }); // Decrement the value

  decrementer.addEventListener('click', function (e) {
    var value = parseInt(input.value);

    if (value > 1) {
      input.value = value - 1;
    }
  });
});

/***/ }),

/***/ "./src/scss/base.scss":
/*!****************************!*\
  !*** ./src/scss/base.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/global.scss":
/*!******************************!*\
  !*** ./src/scss/global.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/app": 0,
/******/ 			"assets/global": 0,
/******/ 			"assets/base": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/global","assets/base"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	__webpack_require__.O(undefined, ["assets/global","assets/base"], () => (__webpack_require__("./src/scss/base.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/global","assets/base"], () => (__webpack_require__("./src/scss/global.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;