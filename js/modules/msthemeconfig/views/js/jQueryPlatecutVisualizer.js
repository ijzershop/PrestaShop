/**
 *
 *
 *  ______   _                         ______                 _    _  _                      _  _
 * (_____ \ | |        _              / _____)        _      | |  | |(_)                    | |(_)
 *  _____) )| |  ____ | |_    ____   | /       _   _ | |_    | |  | | _   ___  _   _   ____ | | _  _____   ____   ____
 * |  ____/ | | / _  ||  _)  / _  )  | |      | | | ||  _)    \ \/ / | | /___)| | | | / _  || || |(___  ) / _  ) / ___)
 * | |      | |( ( | || |__ ( (/ /   | \_____ | |_| || |__     \  /  | ||___ || |_| |( ( | || || | / __/ ( (/ / | |
 * |_|      |_| \_||_| \___) \____)   \______) \____| \___)     \/   |_|(___/  \____| \_||_||_||_|(_____) \____)|_|
 *
 *==============================================================================================================================
 *
 * plateCutVisualizer class for creating different cuts on a plate
 *
 *
 *
 * --Options & defaults are--
 *
 * The minimum cut size for remainder or desired plate
 * @type {number}
 *
 *
 * Option -> minCutSize
 * Default -> 150
 *
 *--------------------------------------#
 *
 * The maximum total cuts per plate
 * @type {number}
 *
 * Option -> maxCuts
 * Default -> 26
 *
 *--------------------------------------#
 *
 * The width of the visual cutline
 * @type {number}
 *
 * Option -> cutLineWidth
 * Default -> 3
 *
 *--------------------------------------#
 *
 * History array with all previous canvas states
 * @type {array}
 *
 * Option -> plateCutHistory
 * Default -> []
 *
 *--------------------------------------#
 *
 * Current state
 * @type {string}
 *
 * Option -> state
 * Default -> null
 *
 *--------------------------------------#
 *
 * Font-size of plate letters in pixels
 * @type {number}
 *
 * Option -> fontSizePX
 * Default -> 18
 *
 *--------------------------------------#
 *
 * Width of plate border in pixels
 * @type {number}
 *
 * Option -> plateBorder
 * Default -> 1
 *
 *--------------------------------------#
 *
 * Height of the whole plate
 * @type {number}
 *
 * Option -> plateHeight
 * Default -> 500
 *
 *--------------------------------------#
 *
 * Width of the hole plate
 * @type {number}
 *
 * Option -> plateWidth
 * Default -> 1000
 *
 *--------------------------------------#
 *
 * Orientation of whole plate "landscape" of "portrait"
 * @type {string}
 *
 * Option -> plateOrientation
 * Default -> 'landscape'
 *
 *--------------------------------------#
 *
 * All letters used for cuts, each cut is getting it's own identification letter
 * @type {array}
 *
 * Option -> cutIdArray
 * Default -> ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
 *
 *--------------------------------------#
 *
 * Background color of the active plate
 * @type {string}
 *
 * Option -> activePlateBackgroundColor
 * Default -> 'rgba(51,56,255,0.5)'
 *
 *--------------------------------------#
 *
 * Default background color of the plates
 * @type {string}
 *
 * Option -> plateBackgroundColor
 * Default -> '#ccc'
 *
 *--------------------------------------#
 *
 * Plate border color
 * @type {string}
 *
 * Option -> plateBorderColor
 * Default -> '#fff'
 *
 *--------------------------------------#
 *
 * Plate letter color
 * @type {string}
 *
 * Option -> plateLetterColor
 * Default -> '#000'
 *
 *--------------------------------------#
 *
 * Default visual cutline color
 * @type {string}
 *
 * Option -> visualCutLineColor
 * Default -> '#fff'
 *
 *--------------------------------------#
 *
 * Visual cutline color when size is invalid
 * @type {string}
 *
 * Option -> visualCutLineErrorColor
 * Default -> '#dc3545'
 *
 *--------------------------------------#
 *
 * Visual cutline dash array to create dotted or other type of line
 * @type {array}
 *
 * Option -> visualCutLineDashArray
 * Default -> [10, 5],
 *
 *--------------------------------------#
 *
 * Font-family for plate letters
 * @type {string}
 *
 * Option -> plateLetterFontFamily
 * Default -> '"Arial Black", Gadget, sans-serif'
 *
 *--------------------------------------#
 *
 * Font-weight for plate letter
 * @type {string}
 *
 * Option -> plateLetterFontWeight
 * Default -> 400
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS.
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
}(function ($) {
  "use strict";
  $.fn.plateCutVisualizer = function (options) {
    $.fn.plateCutVisualizer.defaults = {
      /**
       * Height of the whole plate
       * @type {number}
       */
      plateHeight: 500,
      /**
       * Width of the hole plate
       * @type {number}
       */
      plateWidth: 1000,
      /**
       * The minimum cut size for the remainder or desired plate
       * @type {number}
       */
      minCutSize: 150,
      /**
       * The maximum total cuts per plate
       * @type {number}
       */
      maxCuts: 26,
      /**
       * list of prices and combinations of the product
       * @type {object}
       */
      combiPrices: {
        'A': 0,
        'B': 1.50,
        'C': 1.50,
        'D': 1.50,
        'E': 1.50,
        'F': 1.50,
        'G': 1.50,
        'H': 1.50,
        'I': 1.50,
        'J': 1.50,
        'K': 1.50,
        'L': 1.50,
        'M': 1.50,
        'N': 1.50,
        'O': 1.50,
        'P': 1.50,
        'Q': 1.50,
        'R': 1.50,
        'S': 1.50,
        'T': 1.50,
        'U': 1.50,
        'V': 1.50,
        'W': 1.50,
        'X': 1.50,
        'Y': 1.50,
        'Z': 1.50
      },
      /**
       * price per single cut
       * @type {float}
       */
      cutPrice: 1.50,
      /**
       * The width of the visual cutline
       * @type {number}
       */
      cutLineWidth: 3,
      /**
       * History array with all previous canvas states
       * @type {array}
       */
      plateCutHistory: [],
      /**
       * Current state
       * @type {string}
       */
      state: null,
      /**
       * Font-size of plate letters in pixels
       * @type {number}
       */
      fontSizePX: 18,
      /**
       * Width of a plate border in pixels
       * @type {number}
       */
      plateBorder: 1,
      /**
       * Orientation of whole plate "landscape" of "portrait"
       * @type {string}
       */
      plateOrientation: 'landscape',
      /**
       * All letters used for cuts, each cut is getting its own identification letter
       * @type {array}
       */
      cutIdArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      /**
       * Background color of the active plate
       * @type {string}
       */
      // activePlateBackgroundColor: 'rgba(51,56,255,0.5)',
      activePlateBackgroundColor: 'rgba(33, 160, 85, 1)',
      /**
       * Default background color of the plates
       * @type {string}
       */
      plateBackgroundColor: 'rgba(59, 86, 173, 1)',
      /**
       * Plate border color
       * @type {string}
       */
      plateBorderColor: '#fff',
      /**
       * Plate letter color
       * @type {string}
       */
      plateLetterColor: '#fff',
      /**
       * Default visual cutline color
       * @type {string}
       */
      visualCutLineColor: '#fff',
      /**
       * Visual cutline color when size is invalid
       * @type {string}
       */
      visualCutLineErrorColor: '#dc3545',
      /**
       * Visual cutline dash array to create a dotted or other type of line
       * @type {array}
       */
      visualCutLineDashArray: [10, 5],
      /**
       * Font-family for plate letters
       * @type {string}
       */
      // plateLetterFontFamily: '"Arial Black", Gadget, sans-serif',
      plateLetterFontFamily: '"Open Sans", sans-serif',
      /**
       * Font-weight for a plate letter
       * @type {string}
       */
      plateLetterFontWeight: 'normal',
      /**
       * technicalPlateCutReferenceArray with indexed cuts and cutline orientation.
       * Added as [cutIndex: {'orientation': 'landscape', 'full': true, 'price': 0}]
       * - cutIndex is the index from the cuts starting at 0 for first cut
       * - orientation is the orientation used with the cut, landscape and portrait
       * - full is if the cut is for the full width or length or partial cut-price is the cut price used for that specific cut
       *
       * @type {array}
       */
      technicalPlateCutReferenceArray: [],
      /**
       *
       * Previous data from a single cut form to proceed with already cutted plate
       *
       */
      prevData: {},
    };
    let opts = $.extend({}, $.fn.plateCutVisualizer.defaults, options);
    /**
     * All strings used for messages
     * @type {object}
     */
    let textStrings = function (langString) {
      switch (langString) {
        case 'cut_to_small':
          return 'De ingevoerde maat is te klein, de minimale knipmaat is ' + opts.minCutSize + 'mm';
        case 'remainder_to_small':
          return 'Het rest-deel is kleiner dan de minimale rest-maat van ' + opts.minCutSize + 'mm';
        case 'max_cuts':
          return 'U heeft het maximaal aantal knippen bereikt, u mag in totaal ' + opts.maxCuts + ' maal knippen per plaat';
        case 'same_size':
          return 'De huidig ingevoerde maat is even groot als de plaat die u wilt knippen, er is geen knip nodig';
        default:
          return '';
      }
    };
    /**
     * Initiation of the canvas creates a canvasObject from the canvas element
     * @type {fabric}
     */
    let canvasObject = function (element) {
      let obj = new fabric.Canvas(element, {
        isDrawingMode: false,
        selection: false,
        hoverCursor: 'pointer',
      });
      element.canvasObject = obj;
      return obj;
    };
    /**
     * Set the scale factor of the canvas element
     *
     * @return {number} scaleFactor of the canvas
     */
    let getScaleFactor = function () {
      let container = document.getElementById('canvas-container-block');
      let htmlWidth = container ? container.offsetWidth : 0;
      // If the modal is still hidden, offsetWidth can be 0. Fall back to full size scaling.
      if (!htmlWidth || isNaN(htmlWidth) || htmlWidth <= 0) {
        return 1; // safe default to avoid zero-sized canvas
      }
      return Number(htmlWidth) / Number(opts.plateWidth);
    };
    /**
     * Get the scaled font-size
     *
     * @return {number}  fontsize The fontsize modified by a scale factor
     */
    let getScaledFontSize = function () {
      let scaleFactor = getScaleFactor();
      return Number(opts.fontSizePX) / Number(scaleFactor);
    };
    /**
     * Set the size of the whole canvas
     *
     * @return {object}  canvasObject Object of the canvas
     */
    this.setCanvasSize = function () {
      let canvasObj = this[0].canvasObject;
      let scaleFactor = getScaleFactor();
      canvasObj.setZoom(scaleFactor);
      canvasObj.setDimensions({
        width: opts.plateWidth * scaleFactor,
        height: opts.plateHeight * scaleFactor,
      });
      return canvasObj;
    };

    function addCustomProperty(fabricObject, propertyName, value) {
      fabricObject[propertyName] = value;

      // For Fabric.js 6, override toObject to include custom properties
      const originalToObject = fabricObject.toObject;
      fabricObject.toObject = function (propertiesToInclude = []) {
        const allProps = Array.isArray(propertiesToInclude) ?
          propertiesToInclude.concat([propertyName]) : [propertyName];
        return originalToObject.call(this, allProps);
      };

      return fabricObject;
    }

    function loadCanvasFromJSON(canvas, json) {
      return new Promise((resolve) => {
        canvas.loadFromJSON(json, function () {
          canvas.renderAll();
          resolve(canvas);
        }).then(r => {
          return canvas;
        });
      });
    }

    // Update the letter (A, B, C, ...) shown in the prepend-UI next to inputs
    function updateSelectedPlateLetter(letter) {
      try {
        const nodes = document.querySelectorAll('.cut-prepend-letter .input-group-text');
        if (nodes && nodes.length) {
          nodes.forEach(function (el) {
            el.textContent = String(letter || '').toUpperCase();
          });
        }
      } catch (e) {
        // fail silently; UI update is non-critical
      }
    }


    // --- Linial (ruler) helpers: draw guidelines on the top and left of the selected plate ---
    function removeLinial(canvasObj) {
      const toRemove = [];
      canvasObj.forEachObject(function (o) {
        if (o && o.linial === true) toRemove.push(o);
      });
      toRemove.forEach(function (o) {
        canvasObj.remove(o);
      });
    }

    function drawLinialForPlate(canvasObj, plateRect) {
      if (!plateRect) return;
      // Clear any existing linial objects (lines and labels)
      removeLinial(canvasObj);

      const color = opts.visualCutLineColor || '#ffffff';
      const baseStroke = 2;     // thicker for better visibility
      const tickBase = 10;      // base tick length in mm units
      const step = 50;         // tick spacing in mm units (millimeters)

      const left = Number(plateRect.left);
      const top = Number(plateRect.top);
      const width = Number(plateRect.width);
      const height = Number(plateRect.height);

      // Determine cut orientation: landscape = cutting width (vertical cutline) => show TOP horizontal ruler only
      // else (portrait) = cutting length (horizontal cutline) => show LEFT vertical ruler only
      const format = (typeof getPlateFormat === 'function') ? getPlateFormat() : 'landscape';

      const addLabel = function (txt, x, y) {
        const label = new fabric.Text(String(txt), {
          left: x,
          top: y,
          fill: color,
          fontSize: 20,
          fontFamily: 'Verdana, Arial, sans-serif',
          backgroundColor: '',
          selectable: false,
          evented: false,
        });
        addCustomProperty(label, 'linial', true);
        canvasObj.add(label);
      };

      if (format === 'landscape') {
        // Show only the TOP horizontal ruler
        const baseTop = new fabric.Line([left, top, left + width, top], {
          stroke: color, strokeWidth: baseStroke, selectable: false, evented: false, linial: true, id: 'linial_top'
        });
        canvasObj.add(baseTop);

        // Ticks and labels along the top edge inside the plate (positive y)
        const count = Math.floor(width / step);
        const epsilon = 0.0001;
        for (let i = 1; i <= count; i++) {
          const value = i * step; // in mm
          // Skip the final mark only if it coincides with the plate edge (cutline)
          if (Math.abs(value - width) <= epsilon) {
            continue;
          }
          const x = left + value;
          const len = tickBase * 1.6; // major tick at each step
          const t = new fabric.Line([x, top, x, top + len], {
            stroke: color,
            strokeWidth: baseStroke,
            selectable: false,
            evented: false,
            linial: true,
            id: 'linial_top_tick_' + i
          });
          canvasObj.add(t);
          addLabel(value, x - 17, top + len + 3);
        }
      } else {
        // Show only LEFT vertical ruler
        const baseLeft = new fabric.Line([left, top, left, top + height], {
          stroke: color, strokeWidth: baseStroke, selectable: false, evented: false, linial: true, id: 'linial_left'
        });
        canvasObj.add(baseLeft);

        // Ticks and labels along the left edge inside the plate (positive x)
        const countV = Math.floor(height / step);
        const epsilon = 0.0001;
        for (let i = 1; i <= countV; i++) {
          const value = i * step; // in mm
          // Skip the final mark only if it coincides with the plate edge (cutline)
          if (Math.abs(value - height) <= epsilon) {
            continue;
          }
          const y = top + value;
          const len = tickBase * 1.6;
          const t = new fabric.Line([left, y, left + len, y], {
            stroke: color,
            strokeWidth: baseStroke,
            selectable: false,
            evented: false,
            linial: true,
            id: 'linial_left_tick_' + i
          });
          canvasObj.add(t);
          addLabel(value, left + len + 3, y - 10);
        }
      }

      canvasObj.renderAll();
    }

    function getSelectedPlate(canvasObj) {
      const currentSelectedPlate = (document.getElementById('currentSelectedPlate') || {}).value || '';
      let plateRect = null;
      canvasObj.forEachObject(function (obj) {
        if (obj && obj.id === currentSelectedPlate) plateRect = obj;
      });
      return plateRect;
    }


    function setInputInvalid(inputEl, invalid) {
      if (!inputEl) return;
      inputEl.classList.add('was-validated');
      if (invalid) {
        inputEl.classList.add('is-invalid');
        inputEl.classList.remove('is-valid');
      } else {
        inputEl.classList.remove('is-invalid');
        inputEl.classList.add('is-valid');
      }
    }
    function sortByKey(array, key) {
      return array.sort(function(a, b) {
        let x = a[key]; let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }

    /**
     * Updates the cutted plates list
     *
     * @return {html}  htmllist List of li elements with the cutted plates
     */
    let updateCuttedPlatesList = function (canvasObj) {
      let cutReferenceList = opts.technicalPlateCutReferenceArray;
      let list = '';

      let shownArray = [];
      let plateArray = [];
      canvasObj.forEachObject(function (obj) {
        if (obj && typeof obj.id === 'string' && obj.id.indexOf('plateBox_') !== -1) {
          let letter = obj.id.replace('plateBox_', '');
          let width = obj.width;
          let height = obj.height;

          if (Number(width) > 0 && Number(height) > 0) {
            list += '<li>' + letter + ': ' + width + 'mm X ' + height + 'mm ' + fetchTechnicalPlateCutReference(letter, cutReferenceList) + '</li>';
            shownArray[letter] = '<li>' + letter + ': ' + width + 'mm X ' + height + 'mm ' + fetchTechnicalPlateCutReference(letter, cutReferenceList) + '</li>';
            plateArray.push({'letter': letter, 'width': width, 'height': height});
          }
        }
      });

      let htmlMachineCutReference = [];
      for (let i = 0; i < cutReferenceList.length; i++) {
        if (cutReferenceList[i].orientation === 'landscape') {
          htmlMachineCutReference.push({
            'plate': cutReferenceList[i].letter,
            'format': 'lengte',
            'size': parseInt(cutReferenceList[i].length)
          });
        } else {
          htmlMachineCutReference.push({
            'plate': cutReferenceList[i].letter,
            'format': 'breedte',
            'size': parseInt(cutReferenceList[i].length)
          });
        }
      }

      plateArray = sortByKey(plateArray, 'letter');

      if (htmlMachineCutReference.length > 0) {
        document.getElementById('machineCutList').value = JSON.stringify(htmlMachineCutReference);
      }

      document.getElementById('plates_array').value = JSON.stringify(plateArray);
      let sortedKeys = Object.keys(shownArray).sort();
      document.getElementById('cuttedPlatesList').innerHTML = sortedKeys.map(key => shownArray[key]).join('');

      // Create an offscreen canvas element to avoid DOM dependency and ensure proper sizing
      let offscreen = document.createElement('canvas');
      // Match the original canvas pixel dimensions (which already include scaling)
      offscreen.width = opts.plateWidth;  // Use actual size, not scaled size
      offscreen.height = opts.plateHeight;

      let copiedCanvas = new fabric.Canvas(offscreen, {
        backgroundColor: 'rgba(255,255,255,1)'
      });

      // Match the zoom and dimensions of the original canvas so coordinates align
      try {
        copiedCanvas.setDimensions({width: opts.plateWidth, height: opts.plateHeight});
      } catch (e) {
        // no-op if getZoom is unavailable
      }
      // Get JSON data from the original canvas
      let jsonData = canvasObj.toJSON(['id']); // Include 'id' in serialization


      // Load JSON data into new canvas
      loadCanvasFromJSON(copiedCanvas, jsonData).then(r => {
        // Ensure white background for exported image (Fabric v5: set backgroundColor via set())
        try {
          copiedCanvas.set({backgroundColor: 'rgba(255,255,255,1)'});
        } catch (e) {
          // Fallback: direct assignment
          copiedCanvas.backgroundColor = 'rgba(255,255,255,1)';
        }
        copiedCanvas.renderAll();

        copiedCanvas.forEachObject(function (obj) {
          const type = (obj && obj.get('type')) ? obj.get('type').toLowerCase() : '';

          // Remove any shadows or opacities that could introduce colors/gray
          obj.set({shadow: null, opacity: 1});

          if (type === 'text' || type === 'i-text' || type === 'textbox') {
            obj.set({
              fill: 'rgb(0,0,0)',
              strokeWidth: 0,
              stroke: 'rgb(0,0,0)'
            });
          } else if (type === 'line') {
            // Hide all line objects (including the dotted preview cutline)
            obj.set({
              visible: false,
              strokeWidth: 0,
              stroke: 'rgba(0,0,0,0)',
              fill: 'rgba(0,0,0,0)'
            });
          } else if (type === 'rect') {
            // Ensure all plates export with white fill and black borders
            // Also inset the outermost plate rectangle by 1 px so its stroke is fully inside the canvas,
            // preventing a faint white line at the top/left due to stroke clipping.
            if (obj.width === opts.plateWidth && obj.height === opts.plateHeight) {
              // This is the main plate
              obj.set({
                fill: 'rgba(255,255,255,1)',
                strokeWidth: 2,
                stroke: 'rgb(0,0,0)',
                strokeUniform: true,
                left: 1,
                top: 1,
                width: opts.plateWidth - 2,
                height: opts.plateHeight - 2,
                originX: 'left',
                originY: 'top'
              });
            } else {
              // These are the cut pieces - DON'T hide them!
              obj.set({
                fill: 'rgba(255,255,255,1)',
                strokeWidth: 2,
                stroke: 'rgb(0,0,0)',
                strokeUniform: true,
                visible: true  // Make sure they're visible!
              });
            }

            obj.setCoords();
          } else {
            // Hide any other object types to keep export strictly black/white plates and letters
            obj.set({visible: false});
          }
        });

        // Also, create an SVG debug export so object order can be inspected easily
        try {
          // Add a white background rect at the very back for SVG clarity
          let bgRect = new fabric.Rect({
            left: 0,
            top: 0,
            width: opts.plateWidth,
            height: opts.plateHeight,
            fill: '#ffffff',
            strokeWidth: 0,
            selectable: false,
            evented: false,
            originX: 'left',
            originY: 'top'
          });
          if (bgRect.sendToBack) copiedCanvas.add(bgRect) && bgRect.sendToBack(); else copiedCanvas.add(bgRect);
          reorderExportStack(copiedCanvas);
          copiedCanvas.renderAll();
          const svgStr = copiedCanvas.toSVG();
          const svgEl = document.getElementById('machineCutPreviewSvg');
          if (svgEl) svgEl.value = svgStr;
        } catch (e) { /* ignore SVG export errors */
        }
      });
    };

    // Expose a global helper to force-generate the black/white preview before submitting
    // It reads the current #canvas Fabric canvas, clones it to an offscreen canvas,
    // applies the strict black/white export styling, and stores the JPEG data URL
    // into #machineCutPreview. It invokes the provided callback with (true, dataUrl)
    // on success, or (false) on failure.
    window.generatePlatecutPreview = function (callback) {
      try {
        const el = document.getElementById('canvas');
        if (!el || !el.canvasObject || typeof fabric === 'undefined') {
          if (typeof callback === 'function') callback(false);
          return;
        }

        let canvasObj = el.canvasObject;

        // Defer to the next frame to ensure any pending UI/canvas updates are applied
        requestAnimationFrame(function () {
          // Create an offscreen canvas using the same logic as updateCuttedPlatesList
          const offscreen = document.createElement('canvas');
          const originalWidth = canvasObj.getWidth();
          const originalHeight = canvasObj.getHeight();
          offscreen.width = originalWidth;
          offscreen.height = originalHeight;

          let copiedCanvas = new fabric.Canvas(offscreen, {backgroundColor: 'rgba(255,255,255,1)'});


          try {
            copiedCanvas.setZoom(canvasObj.getZoom());
          } catch (e) {
          }
          copiedCanvas.setDimensions({width: originalWidth, height: originalHeight});

          copiedCanvas.loadFromJSON(canvasObj.toJSON()).then(function () {
            copiedCanvas.renderAll();

            try {
              copiedCanvas.set({backgroundColor: 'rgba(255,255,255,1)'});
            } catch (e) {
              copiedCanvas.backgroundColor = 'rgba(255,255,255,1)';
            }
            copiedCanvas.renderAll();

            copiedCanvas.forEachObject(function (obj) {
              const type = (obj && obj.get('type')) ? obj.get('type').toLowerCase() : '';
              obj.set({shadow: null, opacity: 1});
              if (obj.id === undefined) {
                obj.set({visible: false});
              }
              if (type === 'text' || type === 'i-text' || type === 'textbox') {
                obj.set({fill: 'rgb(0,0,0)', strokeWidth: 0, stroke: 'rgb(0,0,0)'});
              } else if (type === 'line') {
                obj.set({visible: false, strokeWidth: 0, stroke: 'rgba(0,0,0,0)', fill: 'rgba(0,0,0,0)'});
              } else if (type === 'rect') {
                if (obj.width === opts.plateWidth && obj.height === opts.plateHeight) {
                  obj.set({
                    fill: 'rgba(255,255,255,1)',
                    strokeWidth: 2,
                    stroke: 'rgb(0,0,0)',
                    strokeUniform: true,
                    left: 1,
                    top: 1,
                    width: opts.plateWidth - 2,
                    height: opts.plateHeight - 2,
                    originX: 'left',
                    originY: 'top'
                  });
                } else {
                  obj.set({fill: 'rgba(255,255,255,1)', strokeWidth: 2, stroke: 'rgb(0,0,0)', strokeUniform: true});
                }
                obj.setCoords();
              } else if (type === 'circle') {
                obj.set({visible: true, fill: 'rgb(0,0,0)', stroke: 'rgb(0,0,0)', strokeWidth: 0});
              } else {
                obj.set({visible: false});
              }
            });
            copiedCanvas.renderAll();

            // Ensure fonts are ready, then export
            const doExport = function () {
              // Compute export multiplier to fit within max 450x225 without upscaling for a sharper result
              const maxW = 450, maxH = 225;
              let mul = Math.min(maxW / originalWidth, maxH / originalHeight);
              if (!isFinite(mul) || mul <= 0) mul = 1;
              // Avoid upscaling which can make the image blurry; clamp to 1
              mul = Math.min(mul, 1);

              // Improve sharpness by disabling smoothing on the export context
              try {
                const ctx = (copiedCanvas.getContext && copiedCanvas.getContext('2d')) ? copiedCanvas.getContext('2d') : copiedCanvas.contextContainer;
                if (ctx) {
                  ctx.imageSmoothingEnabled = false;
                  ctx.imageSmoothingQuality = 'high';
                }
              } catch (e) {
              }

              try {
                const dataUrl = copiedCanvas.toDataURL({
                  format: 'jpeg',
                  quality: 0.92,
                  multiplier: mul || 1,
                  enableRetinaScaling: false
                });
                const previewEl = document.getElementById('machineCutPreview');
                if (previewEl) previewEl.value = dataUrl;
                if (typeof callback === 'function') callback(true, dataUrl);
              } catch (err) {
                try {
                  const dataPng = copiedCanvas.toDataURL({format: 'png', multiplier: mul || 1});
                  const previewEl = document.getElementById('machineCutPreview');
                  if (previewEl) previewEl.value = dataPng;
                  if (typeof callback === 'function') callback(true, dataPng);
                } catch (e2) {
                  if (typeof callback === 'function') callback(false);
                }
              }
            };
            if (document.fonts && document.fonts.ready) {
              document.fonts.ready.then(doExport).catch(doExport);
            } else {
              doExport();
            }
          })
        });
      } catch (e) {
        if (typeof callback === 'function') callback(false);
      }
    };

    // Generate an SVG preview of the current canvas with enforced black/white styling and proper stacking
    // Stores the SVG markup into #machineCutPreviewSvg and invokes callback(true, svgString) on success
    window.generatePlatecutPreviewSVG = function (callback) {
      try {
        const el = document.getElementById('canvas');
        if (!el || !el.canvasObject || typeof fabric === 'undefined') {
          if (typeof callback === 'function') callback(false);
          return;
        }
        const canvasObj = el.canvasObject;
        requestAnimationFrame(function () {
          // Create an offscreen canvas using the same logic as updateCuttedPlatesList
          const offscreen = document.createElement('canvas');
          const originalWidth = canvasObj.getWidth();
          const originalHeight = canvasObj.getHeight();
          offscreen.width = originalWidth;
          offscreen.height = originalHeight;

          let copiedCanvas = new fabric.Canvas(offscreen, {backgroundColor: 'rgba(255,255,255,1)'});


          try {
            copiedCanvas.setZoom(canvasObj.getZoom());
          } catch (e) {
          }
          copiedCanvas.setDimensions({width: originalWidth, height: originalHeight});

          copiedCanvas.loadFromJSON(canvasObj.toJSON()).then(function () {
            copiedCanvas.renderAll();

            try {
              copiedCanvas.set({backgroundColor: 'rgba(255,255,255,1)'});
            } catch (e) {
              copiedCanvas.backgroundColor = 'rgba(255,255,255,1)';
            }
            copiedCanvas.renderAll();

            copiedCanvas.forEachObject(function (obj) {
              const type = (obj && obj.get('type')) ? obj.get('type').toLowerCase() : '';
              obj.set({shadow: null, opacity: 1});
              if (obj.id === undefined) {
                obj.set({visible: false});
              }
              if (type === 'text' || type === 'i-text' || type === 'textbox') {
                  obj.set({fill: 'rgb(0,0,0)', strokeWidth: 0, stroke: 'rgb(0,0,0)'});
              } else if (type === 'line') {
                obj.set({visible: false, strokeWidth: 0, stroke: 'rgba(0,0,0,0)', fill: 'rgba(0,0,0,0)'});
              } else if (type === 'rect') {
                if (obj.width === opts.plateWidth && obj.height === opts.plateHeight) {
                  obj.set({
                    fill: 'rgba(255,255,255,1)',
                    strokeWidth: 2,
                    stroke: 'rgb(0,0,0)',
                    strokeUniform: true,
                    left: 1,
                    top: 1,
                    width: opts.plateWidth - 2,
                    height: opts.plateHeight - 2,
                    originX: 'left',
                    originY: 'top'
                  });
                } else {
                  obj.set({fill: 'rgba(255,255,255,1)', strokeWidth: 2, stroke: 'rgb(0,0,0)', strokeUniform: true});
                }
                obj.setCoords();
              } else if (type === 'circle') {
                obj.set({visible: true, fill: 'rgb(0,0,0)', stroke: 'rgb(0,0,0)', strokeWidth: 0});
              } else {
                obj.set({visible: false});
              }
            });
            copiedCanvas.renderAll();

            let svgString;
            try {
              svgString = copiedCanvas.toSVG();
            } catch (e) {
              // Fallback: minimal SVG wrapper if toSVG fails
              svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="' + opts.plateWidth + '" height="' + opts.plateHeight + '"><rect width="100%" height="100%" fill="white"/></svg>';
            }
            const svgField = document.getElementById('machineCutPreviewSvg');
            if (svgField) svgField.value = svgString;
            if (typeof callback === 'function') callback(true, svgString);
          })
        });
      } catch (e) {
        if (typeof callback === 'function') callback(false);
      }
    };

    /**
     * Updates the plate cuts array
     *
     * @return {html}  htmllist List of li elements with the cutted plates
     */
    let updateTechnicalPlateCutReferenceArray = function (plateLetter, length, orientation, full, price, oldSize, oldPlateWidth, oldPlateHeight) {
      let list = opts.technicalPlateCutReferenceArray;
      if (typeof plateLetter === "undefined") {
        plateLetter = opts.cutIdArray[0];
      }
      if (typeof orientation === "undefined") {
        orientation = opts.plateOrientation;
      }
      if (typeof full === "undefined") {
        full = true;
      }

      list.push({
        'letter': plateLetter.replace('plateLetter_', ''),
        'length': length,
        'orientation': orientation,
        'full': full,
        'oldSize': oldSize,
        "oldWidth": oldPlateWidth,
        "oldHeight": oldPlateHeight,
      });
      document.getElementById('cuts_array').value = JSON.stringify(list);
      return list;
    };
    /**
     * set the list of cuts
     *
     * @return {html}  htmllist List of li elements with the cuts per cut line
     */
    let fetchTechnicalPlateCutReference = function (plateLetter, list) {
      let htmlCutReference = '';
      let htmlMachineCutReference = [];
      let fullText = '';
      let priceText = ' € 0,00';

      for (let i = 0; i < list.length; i++) {
        if (list[i].letter.replace('plateLetter_', '') === plateLetter) {
          if (list[i].orientation === 'landscape') {
            fullText = '';
            if (!list[i].full) {
              fullText = ' niet volledig de plaat in tween geknip';
            }
            priceText = ' € 0,00';
            if (opts.combiPrices[Object.keys(opts.combiPrices)[i]] > 0) {
              priceText = ' á ' + renderMoneyString(opts.cutPrice);
            }
            htmlCutReference += '<li> <small> <b>Knip ' + (i + 1) + '</b>- in breedte geknipt ' + list[i].length + 'mm' + fullText + priceText + '</small></li>';
          } else {
            fullText = '';
            if (!list[i].full) {
              fullText = ' niet volledig de plaat in tween geknip';
            }
            priceText = ' € 0,00';
            if (opts.combiPrices[Object.keys(opts.combiPrices)[i]] > 0) {
              priceText = ' á ' + renderMoneyString(opts.cutPrice);
            }
            htmlCutReference += '<li> <small> <b>Knip ' + (i + 1) + '</b> - in lengte geknipt ' + list[i].length + 'mm' + fullText + priceText + '</small></li>';
          }
        }
      }

      if (htmlCutReference !== '') {
        return '<ul class="hidden-cut-information" style="display:none;">' + htmlCutReference + '</ul>';
      }
      return '';
    };
    /**
     * Set the size of the input fields by selected plate
     *
     * @param canvasObj
     * @param   {number}  width           Width of the selected plate
     * @param   {number}  height          Height of the selected plate
     * @return  {object}  canvasObj Object of the canvas
     */
    let setSizeInputs = function (canvasObj, width, height) {
      let format = getPlateFormat();
      let currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
      canvasObj.forEachObject(function (obj) {
        if (obj.id === currentSelectedPlate) {
          document.getElementById('width').value = width;
          document.getElementById('width').setAttribute('max', width);
          document.getElementById('height').value = height;
          document.getElementById('height').setAttribute('max', height);
          document.getElementById('error-msg').textContent = '';
          document.getElementById('width').classList.remove('was-validated');
          document.getElementById('width').classList.remove('is-invalid');
          document.getElementById('height').classList.remove('was-validated');
          document.getElementById('height').classList.remove('is-invalid');
        }
      });
      return canvasObj;
    };
    /**
     * Fetch the cut letter of the selected plate
     *
     * @param  {string}   index   The key used to fetch the cut letter
     * @return {string}           The cut letter
     */
    let fetchCutLetter = function (index) {
      return opts.cutIdArray[index];
    };
    /**
     * Fetch the selected plate format to check for vertical or horizontal cutting
     *
     * @return {string}           returns landscape for vertical cut and portrait for horizontal cut
     */
    let getPlateFormat = function () {
      return document.querySelector('.rotate:checked').value;
    };
    /**
     * Switch cut horizontal and vertical
     *
     * @return {object}  canvasObject Object of the canvas
     */
    this.rotatePlate = function (canvasObj) {
      let format = getPlateFormat();
      let widthElem = document.getElementById('width');
      let heightElem = document.getElementById('height');
      widthElem.value = widthElem.getAttribute('max');
      heightElem.value = heightElem.getAttribute('max');
      if (format === 'landscape') {
        widthElem.disabled = false;
        heightElem.disabled = true;
        widthElem.focus();
      } else {
        widthElem.disabled = true;
        heightElem.disabled = false;
        heightElem.focus();
      }
      // Update cut-line position for the new orientation
      this.setCutLinePosition(canvasObj);
      // Redraw the ruler immediately to reflect the new rotating selection
      try {
        const currentId = document.getElementById('currentSelectedPlate').value;
        let currentPlate = null;
        canvasObj.forEachObject(function (obj) {
          if (obj && obj.id === currentId) currentPlate = obj;
        });
        if (currentPlate) {
          drawLinialForPlate(canvasObj, currentPlate);
        }
      } catch (e) { /* ignore */
      }
      return canvasObj;
    };
    /**
     * Create a cutline to visualize cut before cutting
     *
     * @param canvasObj
     * @param  {number}   left            Left position
     * @param  {number}   top             Top position
     * @param  {number}   width           Entered width of the selected plate
     * @param  {number}   height          Entered height of the selected plate
     * @return {object}   canvasObject Object of the canvas
     */
    let createCutLine = function (canvasObj, left = 0, top = 0, width, height) {
      let format = getPlateFormat();
      if (format === 'landscape') {
        let right = Number(left) + Number(width);
        let bottom = Number(top) + Number(height);
        let cutlineObject = new fabric.Line([right - opts.cutLineWidth, top, right - opts.cutLineWidth, bottom], {
          strokeDashArray: opts.visualCutLineDashArray,
          stroke: opts.plateBorderColor,
          strokeWidth: opts.cutLineWidth,
          selectable: false,
          hasControls: false,
          absolutePositioned: true,
          evented: true,
        });
        addCustomProperty(cutlineObject, 'id', 'cutline');
        canvasObj.add(cutlineObject);
      } else {
        let right = Number(left) + Number(width);
        let bottom = Number(top) + Number(height);
        let cutlineObject = new fabric.Line([left, top, right, top], {
          strokeDashArray: opts.visualCutLineDashArray,
          stroke: opts.visualCutLineColor,
          strokeWidth: opts.cutLineWidth,
          selectable: false,
          hasControls: false,
          absolutePositioned: true,
          evented: true,
        });
        addCustomProperty(cutlineObject, 'id', 'cutline');
        canvasObj.add(cutlineObject);
      }
      return canvasObj;
    };
    /**
     * Removes the visual cut line
     *
     * @return {object}  canvasObj Object of the canvas
     */
    let removeCutLine = function (canvasObj) {
      canvasObj.forEachObject(function (obj) {
        if (obj.id === 'cutline') {
          canvasObj.remove(obj);
        }
      });
      return canvasObj;
    };
    /**
     * Updates the position of the visual cutline
     *
     * @return {object}  canvasObj Object of the canvas
     */
    this.setCutLinePosition = function (canvasObj, triggerElem = false) {
      let width = Number(document.getElementById('width').value);
      let maxWidth = Number(document.getElementById('width').getAttribute('max'));
      let height = Number(document.getElementById('height').value);
      let maxHeight = Number(document.getElementById('height').getAttribute('max'));
      let format = getPlateFormat();
      // Determine axis validity: if triggered by an input, run full DOM-updating validation;

      // otherwise, use side-effect-free validation.
      let axisValid;
      if (triggerElem !== false) {
        const _res = checkMinCutSizeBoth(width, maxWidth, height, maxHeight, triggerElem);
        axisValid = (format === 'landscape') ? _res.checkW : _res.checkH;
      } else {
        const validity = isSelectedPartValid ? isSelectedPartValid() : { valid: true, widthErrors: [], heightErrors: [] };
        if (format === 'landscape') {
          axisValid = (validity.widthErrors && validity.widthErrors.length === 0);
        } else {
          axisValid = (validity.heightErrors && validity.heightErrors.length === 0);
        }
      }

      if (format === 'landscape') {
        let currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
        let selectedPlateCoordinates;
        canvasObj.forEachObject(function (obj) {
          if (obj.id === currentSelectedPlate) {
            selectedPlateCoordinates = obj.oCoords;
          }
          if (obj.id === 'cutline') {
            const baseLeft = Number(selectedPlateCoordinates.tl.x / getScaleFactor());
            const x = baseLeft + Number(width);
            obj.set({
              stroke: axisValid ? opts.visualCutLineColor : opts.visualCutLineErrorColor,
              x1: x,
              y1: Number(selectedPlateCoordinates.tl.y / getScaleFactor()),
              x2: x,
              y2: Number(selectedPlateCoordinates.bl.y / getScaleFactor())
            });
          }
        });
        canvasObj.renderAll();
      } else {
        let currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
        let selectedPlateCoordinates;
        canvasObj.forEachObject(function (obj) {
          if (obj.id === currentSelectedPlate) {
            selectedPlateCoordinates = obj.oCoords;
          }
          if (obj.id === 'cutline') {
            const baseTop = Number(selectedPlateCoordinates.tl.y / getScaleFactor());
            const y = baseTop + Number(height);
            obj.set({
              stroke: axisValid ? opts.visualCutLineColor : opts.visualCutLineErrorColor,
              x1: Number(selectedPlateCoordinates.tl.x / getScaleFactor()),
              y1: y,
              x2: Number(selectedPlateCoordinates.tr.x / getScaleFactor()),
              y2: y
            });
          }
        });
        canvasObj.renderAll();
      }
      return canvasObj;
    };
    /**
     * Toggle the state of buttons, click, undo and redo
     *
     * @param  {boolean}    state           Boolean value false to disable and true to enable
     * @return {object}     canvasObject Object of the canvas
     */
    let toggleButtonState = function (state) {
      let addToCartButton = document.getElementById('add-cut-to-cart');

      if (state) {
        document.getElementById('cut').disabled = false;
        document.getElementById('cut').classList.remove('disabled');
        document.getElementById('undo').disabled = false;
        document.getElementById('undo').classList.remove('disabled');
        document.getElementById('redo').disabled = false;
        document.getElementById('redo').classList.remove('disabled');
        if (addToCartButton) {
          addToCartButton.disabled = false;
          addToCartButton.classList.remove('disabled');
          addToCartButton.style.pointerEvents = '';
        }
      } else {
        document.getElementById('cut').disabled = true;
        document.getElementById('cut').classList.add('disabled');
        document.getElementById('undo').disabled = true;
        document.getElementById('undo').classList.add('disabled');
        document.getElementById('redo').disabled = true;
        document.getElementById('redo').classList.add('disabled');
        if (addToCartButton) {
          addToCartButton.disabled = true;
          addToCartButton.classList.add('disabled');
          addToCartButton.style.pointerEvents = 'none';
        }
      }
    };
    // Store the last computed error messages per input so the UI can always show the right messages
    // Structure: { width: string[], height: string[] }
    const fieldErrors = { width: [], height: [] };

    // Side-effect-free validation for the currently selected plate selection.
    // Returns { valid: boolean, widthErrors: string[], heightErrors: string[] }
    const isSelectedPartValid = function () {
      const minAllowed = Math.max(1, Number(opts.minCutSize) || 0);
      const w = Number(document.getElementById('width').value);
      const h = Number(document.getElementById('height').value);
      const maxW = Number(document.getElementById('width').getAttribute('max'));
      const maxH = Number(document.getElementById('height').getAttribute('max'));

      const bothSame = (Number(w) === Number(maxW)) && (Number(h) === Number(maxH));
      const widthErrors = [];
      const heightErrors = [];

      // Width
      if (w !== maxW) {
        if (Number(w) < minAllowed) {
          widthErrors.push(textStrings('cut_to_small', 'width'));
        } else if (((Number(maxW) - Number(w)) < minAllowed) && (Number(maxW) !== Number(w))) {
          if (Number(maxW) < Number(w)) {
            widthErrors.push(textStrings('too_large', 'width'));
          } else {
            widthErrors.push(textStrings('remainder_to_small', 'width'));
          }
        }
      } else if (bothSame) {
        widthErrors.push(textStrings('same_size', 'width'));
      }

      // Height
      if (h !== maxH) {
        if (Number(h) < minAllowed) {
          heightErrors.push(textStrings('cut_to_small', 'height'));
        } else if (((Number(maxH) - Number(h)) < minAllowed) && (Number(maxH) !== Number(h))) {
          if (Number(maxH) < Number(h)) {
            heightErrors.push(textStrings('too_large', 'height'));
          } else {
            heightErrors.push(textStrings('remainder_to_small', 'height'));
          }
        }
      } else if (bothSame) {
        heightErrors.push(textStrings('same_size', 'height'));
      }

      const valid = (widthErrors.length === 0 && heightErrors.length === 0);
      return { valid: valid, widthErrors: widthErrors, heightErrors: heightErrors };
    };

    // Validate both dimensions and update DOM feedback like the SinglePlatecutVisualizer.
    // Returns { ok: boolean, checkW: boolean, checkH: boolean }
    const checkMinCutSizeBoth = function (chosenWidthSize, plateWidthSize, chosenHeightSize, plateHeightSize, triggerElem) {
      const minAllowed = Math.max(1, Number(opts.minCutSize) || 0);
      const bothSame = (Number(chosenWidthSize) === Number(plateWidthSize)) && (Number(chosenHeightSize) === Number(plateHeightSize));
      let orientation = document.querySelector('[name="rotate-plate"]:checked').value;
      let widthErrors = [];
      let heightErrors = [];
      let checkW = true;
      let checkH = true;

      if(orientation === 'landscape'){
        // Width
        if (Number(chosenWidthSize) !== Number(plateWidthSize)) {
          if (Number(chosenWidthSize) < minAllowed) {
            widthErrors.push(textStrings('cut_to_small', 'width'));
            checkW = false;
          } else if (((Number(plateWidthSize) - Number(chosenWidthSize)) < minAllowed) && (Number(plateWidthSize) !== Number(chosenWidthSize))) {
            if (Number(plateWidthSize) < Number(chosenWidthSize)) {
              widthErrors.push(textStrings('too_large', 'width'));
            } else {
              widthErrors.push(textStrings('remainder_to_small', 'width'));
            }
            checkW = false;
          }
        } else {
          // chosen equals plate width -> remainder is zero which is too small
          if (bothSame) {
            widthErrors.push(textStrings('same_size', 'width'));
          } else {
            widthErrors.push(textStrings('remainder_to_small', 'width'));
          }
          checkW = false;
        }
      }

      if(orientation !== 'landscape') {
        // Height
        if (Number(chosenHeightSize) !== Number(plateHeightSize)) {
          if (Number(chosenHeightSize) < minAllowed) {
            heightErrors.push(textStrings('cut_to_small', 'height'));
            checkH = false;
          } else if (((Number(plateHeightSize) - Number(chosenHeightSize)) < minAllowed) && (Number(plateHeightSize) !== Number(chosenHeightSize))) {
            if (Number(plateHeightSize) < Number(chosenHeightSize)) {
              heightErrors.push(textStrings('too_large', 'height'));
            } else {
              heightErrors.push(textStrings('remainder_to_small', 'height'));
            }
            checkH = false;
          }
        } else {
          if (bothSame) {
            heightErrors.push(textStrings('same_size', 'height'));
          } else {
            heightErrors.push(textStrings('remainder_to_small', 'height'));
          }
          checkH = false;
        }
      }
      // Update per-input classes
      const widthEl = document.getElementById('width');
      const heightEl = document.getElementById('height');
      if (checkW) {
        widthEl.classList.add('is-valid');
        widthEl.classList.remove('is-invalid');
      } else {
        widthEl.classList.add('was-validated');
        widthEl.classList.add('is-invalid');
      }
      if (checkH) {
        heightEl.classList.add('is-valid');
        heightEl.classList.remove('is-invalid');
      } else {
        heightEl.classList.add('was-validated');
        heightEl.classList.add('is-invalid');
      }

      // Persist errors and update global box
      fieldErrors.width = widthErrors;
      fieldErrors.height = heightErrors;
      const combinedErrors = [].concat(widthErrors, heightErrors);
      const errorBox = document.getElementById('error-msg-box');
      const errorArea = document.getElementById('error-msg');
      if (combinedErrors.length) {
        errorArea.innerHTML = combinedErrors.join('<br>');
        errorBox.classList.add('show');
        toggleButtonState(false);
      } else {
        errorArea.innerHTML = '';
        errorBox.classList.remove('show');
        toggleButtonState(true);
        // also clear was-validated when both fine for nicer UX
        widthEl.classList.remove('was-validated');
        heightEl.classList.remove('was-validated');
      }
      return { ok: combinedErrors.length === 0, checkW: checkW, checkH: checkH };
    };

    /**
     * Check if the chosen size validates with the minimum cut size restrictions
     *
     * @param  {number}   chosenSize          The chosen cut size
     * @param  {number}   plateSize           The plate size which is going to be cut
     * @param  {boolean}  fromPlateCutLine    If the function is called from the plateCutLine function
     * @return {boolean}                      Returns boolean if the chosen size is valid or not
     */
    let checkMinCutSize = function (chosenSize, plateSize, fromPlateCutLine) {
      if (typeof fromPlateCutLine === "undefined") {
        fromPlateCutLine = false;
      }
      const format = getPlateFormat();
      const minAllowed = Math.max(1, Number(opts.minCutSize) || 0); // never allow 0
      const eps = 1e-6; // treat near-zero as zero

      const chosen = Number(chosenSize);
      const plate = Number(plateSize);
      const remainder = plate - chosen;

      // Base numeric validation, regardless of UI context
      let isValid = true;
      if (!isFinite(chosen) || !isFinite(plate)) {
        isValid = false;
      } else {
        // Prevent full-plate cut (no remainder) and zero/negative results
        if ((chosen + eps) >= plate) {
          isValid = false; // equal or larger than plate -> invalid
        }
        if (chosen < minAllowed - eps) {
          isValid = false;
        }
        if (remainder < minAllowed - eps) {
          isValid = false;
        }
      }

      // When not called from the visual cutline updater, just return the boolean
      if (!fromPlateCutLine) {
        return isValid;
      }

      // From here on: update UI feedback for the active axis only
      const axisInputId = (format === 'landscape') ? 'width' : 'height';
      const inputEl = document.getElementById(axisInputId);
      const errorBox = document.getElementById('error-msg-box');
      const errorMsg = document.getElementById('error-msg');

      let msg = '';
      const axis = (axisInputId === 'width') ? 'width' : 'height';
      // Detailed messages to explain the failure reason
      if (!isFinite(chosen) || !isFinite(plate)) {
        msg = textStrings('cut_to_small', axis);
      } else if ((chosen + eps) > plate) {
        // Larger than plate size
        msg = textStrings('too_large', axis);
      } else if (Math.abs(chosen - plate) <= eps) {
        // Equal to plate (within epsilon)
        msg = textStrings('same_size', axis);
      } else {
        if (chosen < minAllowed - eps) {
          msg += textStrings('cut_to_small', axis);
        }
        if (remainder < minAllowed - eps) {
          msg += textStrings('remainder_to_small', axis);
        }
      }

      if (isValid) {
        if (errorMsg) errorMsg.textContent = '';
        if (inputEl) {
          inputEl.classList.remove('was-validated');
          inputEl.classList.remove('is-invalid');
        }
        if (errorBox) errorBox.classList.remove('show');
        toggleButtonState(true);
      } else {
        if (errorMsg) errorMsg.textContent = msg;
        if (inputEl) {
          inputEl.classList.add('was-validated');
          inputEl.classList.add('is-invalid');
        }
        if (errorBox) errorBox.classList.add('show');
        toggleButtonState(false);
      }

      return isValid;
    };

    /**
     * Creates the first plate to visualize the whole plate
     *
     * @return {object}  canvasObject Object of the canvas
     */
    this.createFirstCutBlock = function (canvasObj) {
      let width = opts.plateWidth - opts.plateBorder;
      let height = opts.plateHeight - opts.plateBorder;
      let format = getPlateFormat();
      let lineCharacter = fetchCutLetter(0);
      document.getElementById('currentCutNumber').value = 0;
      // Reflect the current selected plate letter in the UI
      updateSelectedPlateLetter(lineCharacter);
      let letterObject = new fabric.Text(lineCharacter, {
        left: ((opts.plateWidth / 2) - (getScaledFontSize() / 2)),
        top: (opts.plateHeight / 2) - (getScaledFontSize() / 2),
        fill: opts.plateLetterColor,
        fontWeight: opts.plateLetterFontWeight,
        fontSize: getScaledFontSize(),
        fontFamily: opts.plateLetterFontFamily,
        selectable: false,
        hasControls: false,
        absolutePositioned: true,
        evented: false,
      });
      addCustomProperty(letterObject, 'id', 'plateLetter_' + lineCharacter);

      let plateObject = new fabric.Rect({
        left: 0,
        top: 0,
        fill: opts.activePlateBackgroundColor,
        width: opts.plateWidth,
        height: opts.plateHeight,
        hasBorder: true,
        hasControls: false,
        stroke: opts.plateBorderColor,
        strokeWidth: 1,
        selectable: false,
        evented: true,
        cancelBubble: true,
      });
      addCustomProperty(plateObject, 'id', 'plateBox_' + lineCharacter);
      plateObject.on('mousedown', function (e) {
        if (e.target) {
          let width = this.width;
          let height = this.height;
          let current = this;
          removeCutLine(canvasObj);
          document.getElementById('error-msg-box').classList.remove('show');
          onMouseDownEventSetColor(canvasObj, current, width, height);
          return false;
        }
      });
      canvasObj.add(plateObject, letterObject);
      createCutLine(canvasObj, 0, 0, opts.plateWidth, opts.plateHeight);
      try {
        drawLinialForPlate(canvasObj, plateObject);
      } catch (e) {
      }
      return canvasObj;
    };
    /**
     * Resize a cut
     *
     * @param canvasObj
     * @param  {string}   blockId         Current selected plate
     * @param  {string}   blockLetterId   Id of the letter attached to current selected plate
     * @param  {number}   newWidth        The entered new width
     * @param  {number}   newHeight       The entered new height
     * @return {array}                    Array with coordinates of the resized object
     */
    let resizeCutBlock = function (canvasObj, blockId, blockLetterId, newWidth, newHeight) {
      let format = getPlateFormat();
      let fontSize = getScaledFontSize();
      let rectangleCoords = '';

      canvasObj.forEachObject(function (obj) {
        if (format === 'landscape') {
          if (obj.id === blockId) {
            setSizeInputs(canvasObj, newWidth, newHeight);
            obj.set('width', Number(newWidth));
            obj.backgroundColor = opts.activePlateBackgroundColor;
            obj.setCoords();
            try {
              drawLinialForPlate(canvasObj, obj);
            } catch (e) {
            }
            rectangleCoords = obj.oCoords;
            return rectangleCoords;
          }
          if (obj.id === blockLetterId) {
            obj.set('left', (rectangleCoords['mt'].x / getScaleFactor()) - (parseFloat(fontSize) / 2));
            obj.setCoords();
          }
        } else {
          if (obj.id === blockId) {
            setSizeInputs(canvasObj, newWidth, newHeight);
            obj.set('height', Number(newHeight));
            obj.backgroundColor = opts.activePlateBackgroundColor;
            obj.setCoords();
            try {
              drawLinialForPlate(canvasObj, obj);
            } catch (e) {
            }
            rectangleCoords = obj.oCoords;
            return rectangleCoords;
          }
          if (obj.id === blockLetterId) {
            obj.set('top', (rectangleCoords['ml'].y / getScaleFactor()) - (parseFloat(fontSize) / 2));
            obj.setCoords();
          }
        }
      });
      return rectangleCoords;
    };

    /**
     * on mousedown event for plate-object
     *
     * @param canvasObj {object}  The canvas-object
     * @param current {object}  The current selected plate-object
     * @param height {number}  The height of the plate-object
     * @param width {number}  The width of the plate-object
     * @param  {array}    coordinates     The coordinates for the newly created plate-object
     */
    let onMouseDownEventSetColor = function (canvasObj, current, width, height, coordinates = null) {
      canvasObj.forEachObject(function (obj) {
        if (obj && typeof obj.id === 'string' && obj.id.indexOf('plateBox_') !== -1) {
          if (current.id === obj.id) {
            document.getElementById('currentSelectedPlate').value = obj.id;
            // Update UI to show a selected plate letter (e.g., A, B, C)
            try {
              updateSelectedPlateLetter(String(obj.id).replace('plateBox_', ''));
            } catch (e) {
            }
            setSizeInputs(canvasObj, width, height);
            if (coordinates !== null) {
              createCutLine(canvasObj, coordinates['tl'].x / getScaleFactor(), coordinates['tl'].y / getScaleFactor(), width, height);
            } else {
              // No external coordinates provided (e.g., clicking initial plate A): derive from the current plate itself
              try {
                current.setCoords();
                const c = current.aCoords || current.oCoords;
                if (c && c.tl) {
                  createCutLine(canvasObj, Number(c.tl.x) / getScaleFactor(), Number(c.tl.y) / getScaleFactor(), width, height);
                }
              } catch (e) {
                // ignore
              }
            }
            try {
              drawLinialForPlate(canvasObj, current);
            } catch (e) {
            }
            obj.set('fill', opts.activePlateBackgroundColor);
          } else {
            obj.set('fill', opts.plateBackgroundColor);
          }
        }
      });
    }

    /**
     * Create a new cut for the remainder of the cut plate
     *
     * @param canvasObj
     * @param  {array}    coordinates     The coordinates for the newly created plate-object
     * @param height
     * @param width
     * @param  {string}   lineCharacter   The character of the newly created plateObject
     * @return {object}   canvasObj Object of the canvas
     */
    let createCutBlock = function (canvasObj, coordinates, height, width, lineCharacter) {
      let fontSize = getScaledFontSize();
      let format = getPlateFormat();
      // Do not create zero-sized plates (safety guard)
      if (!(Number(width) > 0 && Number(height) > 0)) {
        return canvasObj;
      }
      if (format === 'landscape') {
        let letterObject = new fabric.Text(lineCharacter, {
          left: Number(coordinates['tr'].x) - (Number(width) / 2) - (Number(fontSize) / 2),
          top: Number(coordinates['tr'].y) + (Number(height) / 2) - (Number(fontSize) / 2),
          fill: opts.plateLetterColor,
          fontWeight: opts.plateLetterFontWeight,
          selectable: false,
          hasControls: false,
          fontSize: fontSize,
          fontFamily: opts.plateLetterFontFamily,
        });
        addCustomProperty(letterObject, 'id', 'plateLetter_' + lineCharacter);
        letterObject.setCoords();

        let plateObject = new fabric.Rect({
          left: coordinates['tr'].x - width,
          top: coordinates['tr'].y,
          fill: opts.plateBackgroundColor,
          width: width,
          height: height,
          hasBorder: true,
          hasControls: false,
          stroke: opts.plateBorderColor,
          strokeWidth: 1,
          selectable: false,
          originX: 'left',
          originY: 'top'
        });

        addCustomProperty(plateObject, 'id', 'plateBox_' + lineCharacter);

        plateObject.on('mousedown', function (e) {
          let width = this.width;
          let height = this.height;
          let current = this;
          removeCutLine(canvasObj);
          document.getElementById('error-msg-box').classList.remove('show');
          onMouseDownEventSetColor(canvasObj, current, width, height, coordinates);
        });

        plateObject.setCoords();
        canvasObj.add(plateObject, letterObject);
      } else {
        let letterObject = new fabric.Text(lineCharacter, {
          left: (Number(coordinates['tl'].x) / getScaleFactor()) + (Number(width) / 2) - (Number(fontSize) / 2),
          top: (Number(coordinates['tl'].y) / getScaleFactor()) + (Number(height) / 2) - (Number(fontSize) / 2),
          fill: opts.plateLetterColor,
          fontWeight: opts.plateLetterFontWeight,
          selectable: false,
          hasControls: false,
          fontSize: fontSize,
          fontFamily: opts.plateLetterFontFamily,
        });
        addCustomProperty(letterObject, 'id', 'plateLetter_' + lineCharacter);

        letterObject.setCoords();

        let plateObject = new fabric.Rect({
          left: Number(coordinates['tl'].x) / getScaleFactor(),
          top: Number(coordinates['tl'].y) / getScaleFactor(),
          fill: opts.plateBackgroundColor,
          width: width,
          height: height,
          hasBorder: true,
          hasControls: false,
          stroke: opts.plateBorderColor,
          strokeWidth: 1,
          selectable: false,
          originX: 'left',
          originY: 'top'
        });

        addCustomProperty(plateObject, 'id', 'plateBox_' + lineCharacter);

        plateObject.on('mousedown', function (e) {
          let width = this.width;
          let height = this.height;
          let current = this;
          removeCutLine(canvasObj);
          document.getElementById('error-msg-box').classList.remove('show');
          onMouseDownEventSetColor(canvasObj, current, width, height, coordinates);
        });

        plateObject.setCoords();
        canvasObj.add(plateObject, letterObject);
      }
      return canvasObj;
    };
    /**
     * Cut action
     *
     * @return {object}  canvasObj Object of the canvas
     */
    this.loadPreviousData = function (canvasObj) {
      let prevData = JSON.parse(opts.prevData.cut_history)[0];
      let plateCutData = JSON.parse(opts.prevData.plates_array);
      let currentCutNumber = 0;
      let cuttedLetter = 'plateLetter_' + prevData.letter;
      let currentSelectedPlate = 'plateBox_' + prevData.letter;
      let format = prevData.sequence;

      canvasObj.forEachObject(function (obj) {
        if (obj.id === currentSelectedPlate) {
          let oldCoordinates = obj.aCoords;
          if (format === 'lw') {
            if (Number(prevData.width) !== Number(prevData.oldWidth)) {
              //First length of plate
              let newCoordinates = resizeCutBlock(canvasObj, currentSelectedPlate, cuttedLetter, Number(prevData.width), Number(prevData.oldHeight));
              let coordinates = {
                'tl': newCoordinates['tr'],
                'tr': oldCoordinates['tr'],
                'bl': newCoordinates['br'],
                'br': oldCoordinates['br']
              }

              let newHeight = Number(prevData.oldHeight);
              let newWidth = Number(prevData.oldWidth) - Number(prevData.width);

              plateCutData.forEach(function(plate, idx){
                // console.log(plate, idx, currentCutNumber, newHeight === plate.height && newWidth === plate.width);
                if(newHeight === plate.height && newWidth === plate.width){
                  currentCutNumber = idx;
                }
              })

              createCutBlock(canvasObj, coordinates, newHeight, newWidth, fetchCutLetter(currentCutNumber))
              document.getElementById('currentCutNumber').value = currentCutNumber;
              document.getElementById('undo').disabled = false;
              document.getElementById('redo').disabled = false;
              document.getElementById('cutTotal').textContent = currentCutNumber;
              updateTechnicalPlateCutReferenceArray(cuttedLetter, prevData.width, "landscape", true, 0, prevData.oldHeight);
            }

            document.getElementById('rotate-height').checked = true;

            if (Number(prevData.height) !== Number(prevData.oldHeight)) {
              //Than width of plate
              let newCoordinates = resizeCutBlock(canvasObj, currentSelectedPlate, cuttedLetter, Number(prevData.width), Number(prevData.height));
              let coordinates = {
                'tl': newCoordinates['bl'],
                'tr': newCoordinates['br'],
                'bl': oldCoordinates['bl'],
                'br': oldCoordinates['br']
              }

              let newHeight = Number(prevData.oldHeight) - Number(prevData.height);
              let newWidth = Number(prevData.width);

              plateCutData.forEach(function(plate, idx){
                if(newHeight === plate.height && newWidth === plate.width){
                  currentCutNumber = idx;
                }
              })

              createCutBlock(canvasObj, coordinates, newHeight, newWidth, fetchCutLetter(currentCutNumber))
              document.getElementById('currentCutNumber').value = currentCutNumber;
              document.getElementById('undo').disabled = false;
              document.getElementById('redo').disabled = false;
              document.getElementById('cutTotal').textContent = currentCutNumber;

              updateTechnicalPlateCutReferenceArray(cuttedLetter, prevData.height, "portrait", true, 0, prevData.oldHeight);
            }
            document.getElementById('rotate-width').checked = true;

          } else {
            if (Number(prevData.height) !== Number(prevData.oldHeight)) {
              document.getElementById('rotate-height').checked = true;

              //Than width of plate
              currentCutNumber++;
              let newCoordinates = resizeCutBlock(canvasObj, currentSelectedPlate, cuttedLetter, Number(prevData.oldWidth), Number(prevData.height));
              let coordinates = {
                'tl': newCoordinates['bl'],
                'tr': newCoordinates['br'],
                'bl': oldCoordinates['bl'],
                'br': oldCoordinates['br']
              }

              let newHeight = Number(prevData.oldHeight) - Number(prevData.height);
              let newWidth = Number(prevData.oldWidth);

              plateCutData.forEach(function(plate, idx){
                if(newHeight === plate.height && newWidth === plate.width){
                  currentCutNumber = idx;
                }
              })


              createCutBlock(canvasObj, coordinates, newHeight, newWidth, fetchCutLetter(currentCutNumber))
              document.getElementById('currentCutNumber').value = currentCutNumber;
              document.getElementById('undo').disabled = false;
              document.getElementById('redo').disabled = false;
              document.getElementById('cutTotal').textContent = currentCutNumber;

              updateTechnicalPlateCutReferenceArray(cuttedLetter, prevData.height, "portrait", true, 0, prevData.oldHeight);
            }
            document.getElementById('rotate-width').checked = true;
            if (Number(prevData.width) !== Number(prevData.oldWidth)) {
              //First length of plate
              currentCutNumber++;
              let newCoordinates = resizeCutBlock(canvasObj, currentSelectedPlate, cuttedLetter, Number(prevData.width), Number(prevData.height));
              let coordinates = {
                'tl': newCoordinates['tr'],
                'tr': oldCoordinates['tr'],
                'bl': newCoordinates['br'],
                'br': oldCoordinates['br']
              }

              let newHeight = Number(prevData.height);
              let newWidth = Number(prevData.oldWidth) - Number(prevData.width);

              plateCutData.forEach(function(plate, idx){
                if(newHeight === plate.height && newWidth === plate.width){
                  currentCutNumber = idx;
                }
              })

              createCutBlock(canvasObj, coordinates, newHeight, newWidth, fetchCutLetter(currentCutNumber))
              document.getElementById('currentCutNumber').value = currentCutNumber;
              document.getElementById('undo').disabled = false;
              document.getElementById('redo').disabled = false;
              document.getElementById('cutTotal').textContent = currentCutNumber;
              updateTechnicalPlateCutReferenceArray(cuttedLetter, prevData.width, "landscape", true, 0, prevData.oldWidth);
            }
          }
        }
      });

      canvasObj.renderAll();
      updateCuttedPlatesList(canvasObj);
      document.getElementById('width').select();
    }

    /**
     * Cut action
     *
     * @return {object}  canvasObj Object of the canvas
     */
    this.cutActionPlate = function (canvasObj) {
      let updated = false;
      let cutNumber = document.getElementById('currentCutNumber').value;
      let currentCutNumber = Number(cutNumber) + 1;
      let format = getPlateFormat();
      let lineCharacter = fetchCutLetter(currentCutNumber);

      let widthElem = document.getElementById('width');
      let heightElem = document.getElementById('height');

      let widthMin = Number(widthElem.getAttribute('min'));
      let widthMax = Number(widthElem.getAttribute('max'));
      let heightMin = Number(heightElem.getAttribute('min'));
      let heightMax = Number(heightElem.getAttribute('max'));

      let width = widthElem.value;
      let height = heightElem.value;

      // Clamp width to [widthMin, widthMax] — use post-clamp value for validation below
      widthElem.value = (!width || width === '0' || width === '') ? widthMax :
        (width < widthMin ? widthMin : Math.min(width, widthMax));
      width = widthElem.value;

      // Clamp height to [heightMin, heightMax] — use post-clamp value for validation below
      heightElem.value = (!height || height === '0' || height === '') ? heightMax :
        (height < heightMin ? heightMin : Math.min(height, heightMax));
      height = heightElem.value;

      let currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
      let cuttedLetter = currentSelectedPlate.replace('plateBox_', 'plateLetter_');
      if (Number(cutNumber) > (Number(opts.maxCuts) - 1)) {
        document.getElementById('error-msg').textContent = textStrings('max_cuts');
        document.getElementById('error-msg-box').classList.add('show');
        return;
      } else {
        canvasObj.forEachObject(function (obj) {
          if (obj.id === currentSelectedPlate) {
            let oldWidth = obj.width;
            let oldHeight = obj.height;
            let oldCoordinates = obj.aCoords;
            if (format === 'landscape') {
              const _res2 = checkMinCutSizeBoth(width, oldWidth, height, oldHeight);
              let check = _res2.checkW;
              // console.log('_res2.checkW', _res2, check);
              if (check) {
                let newCoordinates = resizeCutBlock(canvasObj, currentSelectedPlate, cuttedLetter, Number(width), Number(height));
                let coordinates = {
                  'tl': newCoordinates['tr'],
                  'tr': oldCoordinates['tr'],
                  'bl': newCoordinates['br'],
                  'br': oldCoordinates['br']
                }
                createCutBlock(canvasObj, coordinates, Number(height), Number(oldWidth) - Number(width), fetchCutLetter(currentCutNumber))
                updateTechnicalPlateCutReferenceArray(cuttedLetter, width, format, true, 0, oldWidth, oldWidth, oldHeight);
                updated = true;
              }
            } else {
              const _res3 = checkMinCutSizeBoth(width, oldWidth, height, oldHeight);
              let check = _res3.checkH;
              // console.log('_res3.checkH', _res3, check);
              if (check) {
                let newCoordinates = resizeCutBlock(canvasObj, currentSelectedPlate, cuttedLetter, Number(width), Number(height));
                let coordinates = {
                  'tl': newCoordinates['bl'],
                  'tr': newCoordinates['br'],
                  'bl': oldCoordinates['bl'],
                  'br': oldCoordinates['br']
                }
                createCutBlock(canvasObj, coordinates, Number(oldHeight) - Number(height), Number(oldWidth), fetchCutLetter(currentCutNumber))
                updateTechnicalPlateCutReferenceArray(cuttedLetter, height, format, true, 0, oldHeight, oldWidth, oldHeight);
                updated = true;
              }
            }
          }
        });
        canvasObj.renderAll();
        if(updated){
          updateCuttedPlatesList(canvasObj);

          document.getElementById('currentCutNumber').value = currentCutNumber;
          document.getElementById('cutTotal').textContent = currentCutNumber;
        }
      }
      $('form.platecutting #quantity').trigger("change");

    }
    // public methods
    this.initialize = function () {
      let $this = this;

      //create canvas fabric object
      let canvasObj = canvasObject($this[0]);
      $this.setCanvasSize();
      $this.createFirstCutBlock(canvasObj);
      // Disable add-to-cart on init; it is only enabled once a valid cut is confirmed
      toggleButtonState(false);
      //bind click event to cut the button
      let cutButton = document.getElementById('cut');
      cutButton.addEventListener("click", function onEvent(event) {
        event.preventDefault();
        $this.cutActionPlate(canvasObj);
        // Do not auto-switch rotate on cut; ruler orientation is controlled by the rotate radio buttons.
      }, {
        passive: false
      });

      //add on keypress to width and height fields
      let widthInput = document.getElementById('width');
      let heightInput = document.getElementById('height');
      widthInput.addEventListener("change", function onEvent(event) {
        $this.setCutLinePosition(canvasObj, 'width')
      }, {
        passive: true
      });
      widthInput.addEventListener("keyup", function onEvent(event) {
        $this.setCutLinePosition(canvasObj, 'width')
        if (event.key === "Enter") {
          document.getElementById('cut').click();
        }
      }, {
        passive: true
      });
      heightInput.addEventListener("change", function onEvent(event) {
        $this.setCutLinePosition(canvasObj, 'height')
      }, {
        passive: true
      });
      heightInput.addEventListener("keyup", function onEvent(event) {
        $this.setCutLinePosition(canvasObj, 'height')
        if (event.key === "Enter") {
          document.getElementById('cut').click();
        }
      }, {
        passive: true
      });

      //bind onclick option to radios to rotate on click
      let rotateButtons = document.getElementsByClassName('rotate');
      for (let i = 0; i < rotateButtons.length; i++) {
        rotateButtons[i].addEventListener("click", function (e) {
          $this.rotatePlate(canvasObj);
        }, {
          passive: false
        });
      }
      document.getElementById('width').focus();

      /**
       * Loading previous data from a single-cut form
       */
      // Load previous data if either a cut_history or plates_array is provided
      if (opts.prevData && (
        (typeof opts.prevData.cut_history === 'string' && opts.prevData.cut_history.trim() !== '') ||
        (typeof opts.prevData.plates_array === 'string' && opts.prevData.plates_array.trim() !== '')
      )) {
        $this.loadPreviousData(canvasObj);
      }

      if (opts.prevData.quantity !== undefined) {
        document.querySelector('.platecutting #quantity').value = opts.prevData.quantity;
        $('form.platecutting #quantity').trigger("change");
      }
      return $this;
    };
    this.initialize();
    return this;
  };
}));
