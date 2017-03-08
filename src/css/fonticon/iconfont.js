;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-baocun" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M314.518674 822.766226 438.484846 822.766226 438.484846 1023.919031 314.518674 1023.919031 314.518674 822.766226 314.518674 822.766226ZM998.762057 0 23.373531 0C10.464549 0 0 10.464622 0 23.373458L0 867.871232 156.300434 1022.136686 227.679086 1022.136686 227.679086 1022.00459 227.679086 987.272923 227.679086 724.113701 697.81504 724.113701 697.81504 1022.00459 697.082149 1022.00459 697.082149 1022.136686 998.762057 1022.136686C1011.67104 1022.136686 1022.135589 1011.672064 1022.135589 998.763227L1022.135589 23.373458C1022.137051 10.464622 1011.671771 0 998.762057 0L998.762057 0ZM858.99264 514.388553 163.144411 514.388553 163.144411 55.947337 858.99264 55.947337 858.99264 514.388553 858.99264 514.388553ZM314.518674 1022.00459 438.484846 1022.00459 438.484846 1022.850341 314.518674 1022.850341 314.518674 1022.00459 314.518674 1022.00459Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)