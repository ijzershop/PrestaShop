/**
 *
 *
 *       ░█████████  ░██               ░██                 ░██████                ░██
 *       ░██     ░██ ░██               ░██                ░██   ░██               ░██
 *       ░██     ░██ ░██  ░██████   ░████████  ░███████  ░██        ░██    ░██ ░████████
 *       ░█████████  ░██       ░██     ░██    ░██    ░██ ░██        ░██    ░██    ░██
 *       ░██         ░██  ░███████     ░██    ░█████████ ░██        ░██    ░██    ░██
 *       ░██         ░██ ░██   ░██     ░██    ░██         ░██   ░██ ░██   ░███    ░██
 *       ░██         ░██  ░█████░██     ░████  ░███████    ░██████   ░█████░██     ░████
 *    ░██    ░██ ░██                                 ░██ ░██
 *    ░██    ░██                                     ░██
 *    ░██    ░██ ░██ ░███████  ░██    ░██  ░██████   ░██ ░██░█████████  ░███████  ░██░████
 *    ░██    ░██ ░██░██        ░██    ░██       ░██  ░██ ░██     ░███  ░██    ░██ ░███
 *     ░██  ░██  ░██ ░███████  ░██    ░██  ░███████  ░██ ░██   ░███    ░█████████ ░██
 *      ░██░██   ░██       ░██ ░██   ░███ ░██   ░██  ░██ ░██ ░███      ░██        ░██
 *       ░███    ░██ ░███████   ░█████░██  ░█████░██ ░██ ░██░█████████  ░███████  ░██
 *
 *
 *
 *
 *
 * Creates an interactive visualizer to preview a single rectangular cut on a plate.
 * Users enter desired width/height and optionally switch the cut sequence
 * (length-then-width or width-then-length). The module validates sizes against
 * a minimum cut size and enables/disables UI controls accordingly. It renders
 * the plate, current selection, remainder areas, labels (A, B, C), and a cutline
 * using Fabric.js.
 *
 * High-level behavior:
 * - Draw base plate (A) and live selection overlay.
 * - Show dashed visual cutline for the current sequence (vertical for 'lw',
 *   horizontal for 'wl').
 * - Validate the selected size against min cut size and remainders.
 * - Update labels and preview information (A, B, C sizes).
 * - Export a compact preview image of the current cut setup.
 *
 *==============================================================================================================================
 *
 * Options & defaults
 *
 * Option -> minCutSize          Minimum allowed size for the desired part AND for each remainder (mm)
 *   @type {number}
 *   Default -> 150
 *
 * Option -> maxCuts             Max number of cuts (not used for actual limiting here, but kept for compatibility)
 *   @type {number}
 *   Default -> 26
 *
 * Option -> cutLineWidth        Stroke width of the visual cutline (pixels)
 *   @type {number}
 *   Default -> 3
 *
 * Option -> plateCutHistory     History array of previous canvas states (used in preview generation)
 *   @type {array}
 *   Default -> []
 *
 * Option -> state               Current state identifier (reserved)
 *   @type {string|null}
 *   Default -> null
 *
 * Option -> fontSizePX          Base font size for plate letters (A, B, C) in pixels (before scaling)
 *   @type {number}
 *   Default -> 18
 *
 * Option -> plateBorder         Stroke width for the plate border (pixels)
 *   @type {number}
 *   Default -> 1
 *
 * Option -> plateHeight         Total height of the plate (mm and canvas units)
 *   @type {number}
 *   Default -> 500
 *
 * Option -> plateWidth          Total width of the plate (mm and canvas units)
 *   @type {number}
 *   Default -> 1000
 *
 * Option -> plateOrientation    Orientation label for the whole plate (informational)
 *   @type {string} 'landscape'|'portrait'
 *   Default -> 'landscape'
 *
 * Option -> cutIdArray          Letters used to identify parts/cuts
 *   @type {array<string>}
 *   Default -> ['A'..'Z']
 *
 * Option -> activePlateBackgroundColor  Fill color for the selected (desired) area
 *   @type {string}
 *   Default -> 'rgba(33, 160, 85, 1)'
 *
 * Option -> plateBackgroundColor        Fill color for the base plate
 *   @type {string}
 *   Default -> 'rgba(59, 86, 173, 1)'
 *
 * Option -> plateBorderColor            Stroke color for the plate border
 *   @type {string}
 *   Default -> '#fff'
 *
 * Option -> plateLetterColor            Color for A/B/C labels
 *   @type {string}
 *   Default -> '#fff'
 *
 * Option -> visualCutLineColor          Color for the visual cutline (normal)
 *   @type {string}
 *   Default -> '#fff'
 *
 * Option -> visualCutLineErrorColor     Color for the visual cutline on invalid input (reserved)
 *   @type {string}
 *   Default -> '#dc3545'
 *
 * Option -> visualCutLineDashArray      Dash pattern for the visual cutline
 *   @type {number[]}
 *   Default -> [10, 5]
 *
 * Option -> plateLetterFontFamily       Font-family used for labels
 *   @type {string}
 *   Default -> '"Open Sans", sans-serif'
 *
 * Option -> plateLetterFontWeight       Font-weight used for labels
 *   @type {string}
 *   Default -> 'normal'
 *
 * Option -> technicalPlateCutReferenceArray
 *   Array describing each cut (index, orientation, is full cut, price).
 *   Not all fields are used in this single-cut preview but kept for compatibility.
 *   @type {Array<{orientation:'landscape'|'portrait', full:boolean, price:number}>}
 *   Default -> []
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
  $.fn.singlePlateCutVisualizer = function (options) {
    /**
     * Check if the chosen size validates with the minimum cut size restrictions
     *
     * @return {boolean}                      Returns boolean if the chosen size is valid or not
     * @param chosenWidthSize
     * @param plateWidthSize
     * @param chosenHeightSize
     * @param plateHeightSize
     * @param triggerElem                     Triggered element to show the error message
     */
    // Stores the last computed error messages per input so the UI can always show the right messages
    // Structure: { width: string[], height: string[] }
    const fieldErrors = { width: [], height: [] };
    // null = not yet validated (initial load), true/false after first user input
    let lastKnownValid = null;

    const checkMinCutSize = function (chosenWidthSize, plateWidthSize, chosenHeightSize, plateHeightSize, triggerElem) {
      if(!triggerElem){
        // If no specific trigger, still validate both to show all relevant messages
        // but keep existing behavior to avoid side effects elsewhere
      }

      const minAttrValue = Number(document.getElementById('width') && document.getElementById('width').getAttribute('min')) || 0;
      const minAllowed = Math.max(1, (Number(opts.minCutSize) > 0 ? Number(opts.minCutSize) : minAttrValue));

      // Always collect and show messages for both width and height
      let messagesWidth = 1;
      let messagesHeight  = 1;
      let checkW;
      let checkH;
      let widthErrors = [];
      let heightErrors = [];
      const bothSame = (Number(chosenWidthSize) === Number(plateWidthSize)) && (Number(chosenHeightSize) === Number(plateHeightSize));

       if (chosenWidthSize !== plateWidthSize) {
          if (Number(chosenWidthSize) < minAllowed) {
            if(messagesWidth){
              widthErrors.push(textStrings('cut_to_small', 'width'));
              document.getElementById('width').classList.add('was-validated');
              document.getElementById('width').classList.add('is-invalid');
            }
            checkW = false;
          }else if (((Number(plateWidthSize) - Number(chosenWidthSize)) < minAllowed) &&
            (Number(plateWidthSize) !== Number(chosenWidthSize))) {
            if(messagesWidth) {
              if (Number(plateWidthSize) < Number(chosenWidthSize)) {
                widthErrors.push(textStrings('too_large', 'width'));
              } else {
                widthErrors.push(textStrings('remainder_to_small', 'width'));
              }
              document.getElementById('width').classList.add('was-validated');
              document.getElementById('width').classList.add('is-invalid');
            }
            checkW = false;
          } else {
            if(messagesWidth) {
              document.getElementById('width').classList.add('is-valid');
              document.getElementById('width').classList.remove('is-invalid');
              checkW = true;
            }
          }
        } else {
           if(messagesWidth && bothSame) {
             widthErrors.push(textStrings('same_size', 'width'));
             document.getElementById('width').classList.add('was-validated');
             document.getElementById('width').classList.add('is-invalid');
           }
          checkW = false;
        }


        //Height check
        if (chosenHeightSize !== plateHeightSize) {
          if (Number(chosenHeightSize) < minAllowed) {
            if(messagesHeight) {
              heightErrors.push(textStrings('cut_to_small', 'height'));
              document.getElementById('height').classList.add('was-validated');
              document.getElementById('height').classList.add('is-invalid');
            }
            checkH = false;
          }else if (((Number(plateHeightSize) - Number(chosenHeightSize)) < minAllowed) &&
            (Number(plateHeightSize) !== Number(chosenHeightSize))) {
            if(messagesHeight) {
              if (Number(plateHeightSize) < Number(chosenHeightSize)) {
                heightErrors.push(textStrings('too_large', 'height'));
              } else {
                heightErrors.push(textStrings('remainder_to_small', 'height'));
              }

              document.getElementById('height').classList.add('was-validated');
              document.getElementById('height').classList.add('is-invalid');
            }
            checkH = false;
          } else {
            if(messagesHeight) {
              document.getElementById('height').classList.add('is-valid');
              document.getElementById('height').classList.remove('is-invalid');
            }
            checkH = true;
          }
        } else {
          if(messagesHeight && bothSame) {
            heightErrors.push(textStrings('same_size', 'height'));
            document.getElementById('height').classList.add('was-validated');
            document.getElementById('height').classList.add('is-invalid');
          }
          checkH = false;
        }


      if((triggerElem === 'width') && checkW){
        document.getElementById('error-msg').innerHTML = '';
        document.getElementById('error-msg-box').classList.remove('show');
        toggleButtonState(true);
        document.getElementById('width').classList.add('is-valid');
        document.getElementById('width').classList.remove('is-invalid');
      } else if((triggerElem === 'height') && checkH){
        document.getElementById('error-msg').innerHTML = '';
        document.getElementById('error-msg-box').classList.remove('show');
        toggleButtonState(true);
        document.getElementById('height').classList.add('is-valid');
        document.getElementById('height').classList.remove('is-invalid');
      }


      if((triggerElem === 'width') && (chosenHeightSize === plateHeightSize) && checkW) {
        document.getElementById('switch').classList.add('disabled');
        // use the boolean disabled property instead of attributes API
        document.getElementById('switch').disabled = true;
      } else if((triggerElem === 'height') && (chosenWidthSize === plateWidthSize) && checkH) {
        document.getElementById('switch').classList.add('disabled');
        document.getElementById('switch').disabled = true;
      } else {
        document.getElementById('switch').classList.remove('disabled');
        document.getElementById('switch').disabled = false;
      }

      // Persist per-field errors so the UI can always show the right messages per input
      fieldErrors.width = widthErrors;
      fieldErrors.height = heightErrors;
      // Combine errors for existing single error box
      const combinedErrors = [...widthErrors, ...heightErrors];

      if(combinedErrors.length){
        document.getElementById('error-msg').innerHTML = combinedErrors.join('<br>');
        document.getElementById('error-msg-box').classList.add('show');
        toggleButtonState(false);
        return false;
      }
      // No errors: clear messages and enable actions
      document.getElementById('error-msg').innerHTML = '';
      document.getElementById('error-msg-box').classList.remove('show');
      toggleButtonState(true);
      return true;
    };
    /**
     * set the list of cuts
     *
     * @return {html}  htmllist List of li elements with the cuts per cut line
     */
    const fetchTechnicalPlateCutReference = function (plateLetter, list) {
      let htmlCutReference = '';
      let htmlMachineCutReference = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].letter.replace('plateLetter_', '') === plateLetter) {
          let fullText = '';
          let priceText = ' € 0,00';
          if (list[i].orientation === 'landscape') {
            if (!list[i].full) {
              fullText = ' niet volledig de plaat in tween geknip';
            }
            if (opts.combiPrices[Object.keys(opts.combiPrices)[i]] > 0) {
              priceText = ' á ' + renderMoneyString(opts.cutPrice);
            }
            htmlCutReference += '<li> <small> <b>Knip ' + (i + 1) + '</b> - in breedte geknipt ' + list[i].length + 'mm' + fullText + priceText + '</small></li>';
          } else {
            if (!list[i].full) {
              fullText = ' niet volledig de plaat in tween geknip';
            }
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
     * Fetch the selected plate format to check for vertical or horizontal cutting
     *
     * @return {string}           returns landscape for vertical cut and portrait for horizontal cut
     */
    const getPlateFormat = function () {
      return 'landscape';
    };

    // Expose a getter for the latest per-field error messages
    $.fn.singlePlateCutVisualizer.defaults = {
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
      activePlateBackgroundColor: 'rgba(33, 160, 85, 1)',
      /**
       * Default background color of the plates
       * @type {string}
       */
      // plateBackgroundColor: 'rgba(51,56,255,0.5)',
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
    };
    const opts = $.extend({}, $.fn.singlePlateCutVisualizer.defaults, options);

    // Ensure Fabric.js 5/6 keeps custom properties like `id` when serializing objects
    if (typeof fabric !== 'undefined' && fabric.Object && !fabric.Object.__idPatched) {
      fabric.Object.__idPatched = true;
      const __origToObject = fabric.Object.prototype.toObject;
      fabric.Object.prototype.toObject = function (propertiesToInclude) {
        let extra = Array.isArray(propertiesToInclude) ? propertiesToInclude.concat(['id']) : ['id'];
        return __origToObject.call(this, extra);
      };
    }


    /**
     * All strings used for messages
     * @type {object}
     */
    const textStrings = function (langString, widthOrHeight = 'width') {
      let orientation = 'breedte';
      if (widthOrHeight === 'width') {
        orientation = 'lengte';
      }

      switch (langString) {
        case 'cut_to_small':
          return 'De ingevoerde ' + orientation + ' maat is te klein, de minimale knipmaat is ' + opts.minCutSize + 'mm.<br/>';
        case 'remainder_to_small':
          return 'Het rest-deel van de ' + orientation + 'knip is kleiner dan de minimale rest-maat van ' + opts.minCutSize + 'mm.<br/>';
        case 'max_cuts':
          return 'U heeft het maximaal aantal knippen bereikt, u mag in totaal ' + opts.maxCuts + 'maal knippen per plaat.<br/>';
        case 'same_size':
          return 'De ingevoerde ' + orientation + 'maat is even groot al de plaat die u wilt knippen, er is geen knip nodig.<br/>';
       case 'too_large':
          return 'De ingevoerde ' + orientation + 'maat is groter dan de plaat die u wilt knippen.<br/>';
        default:
          return '';
      }
    };
    /**
     * Initiation of the canvas creates a canvasObject from the canvas element
     * @type {fabric}
     */
    const canvasObject = function (element) {
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
    const getScaleFactor = function () {
      let container = document.getElementById('canvas-container-block');
      let htmlWidth = container ? container.offsetWidth : 0;
      if (!htmlWidth || isNaN(htmlWidth) || htmlWidth <= 0) {
        return 1;
      }
      return Number(htmlWidth) / Number(opts.plateWidth);
  };
  /**
   * Get the scaled font-size (mirrors PlatecutVisualizer)
   * @return {number}
   */
  const getScaledFontSize = function(){
    const sf = getScaleFactor();
    const base = Number(opts.fontSizePX) || 18;
    if (!sf || isNaN(sf) || sf <= 0) { return base; }
    return Number(base) / Number(sf);
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
    /**
     * Fetch the cut-letter of the selected plate
     *
     * @param  {string}   index   The key used to fetch the cut letter
     * @return {string}           The cut letter
     */
    let fetchCutLetter = function (index) {
      return opts.cutIdArray[index];
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
    const createCutLine = function (canvasObj, left, top, width, height) {
      let right = Number(left) + Number(width);
      let bottom = Number(top) + Number(height);

      const cutlineWidthObject = new fabric.Line([right - opts.cutLineWidth, top, right - opts.cutLineWidth, bottom], {
        strokeDashArray: opts.visualCutLineDashArray,
        stroke: opts.visualCutLineColor,
        strokeWidth: opts.cutLineWidth,
        strokeUniform: true,
        id: 'cutline-width',
        selectable: false,
        hasControls: false,
        absolutePositioned: true,
        evented: true,
      });
      const cutlineLengthObject = new fabric.Line([left, top, right, top], {
        strokeDashArray: opts.visualCutLineDashArray,
        stroke: opts.visualCutLineColor,
        strokeWidth: opts.cutLineWidth,
        strokeUniform: true,
        id: 'cutline-length',
        selectable: false,
        hasControls: false,
        absolutePositioned: true,
        evented: true,
      });
      canvasObj.add(cutlineWidthObject, cutlineLengthObject);
      try { cutlineWidthObject.bringToFront(); cutlineLengthObject.bringToFront(); } catch(e) {}

      return canvasObj;
    };

    /**
     * Updates the position of the visual cutline
     *
     * @return {object}  canvasObj Object of the canvas
     */
    this.setCutLinePosition = function (canvasObj, triggerElem = false) {
      let currentSelectedPlate;
      const width = Number(document.getElementById('width').value);
      const maxWidth = Number(document.getElementById('width').getAttribute('max'));
      const height = Number(document.getElementById('height').value);
      const maxHeight = Number(document.getElementById('height').getAttribute('max'));
      const seqEl = document.getElementById('sequence');
      const sequence = (seqEl && seqEl.value) ? seqEl.value : 'lw';
      // Offset used to shorten the horizontal cutline when needed
      const x2Number = (sequence === 'lw') ? (maxWidth - width) : 0;
      let isValid = false;
      if (triggerElem !== false) {
        // Validate inputs and update UI messages if this was triggered by an input change
        isValid = checkMinCutSize(width, maxWidth, height, maxHeight, triggerElem);
        lastKnownValid = isValid;
      }

      currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
      let selectedPlateCoordinates;


      // First, resolve the coordinates of the currently selected plate
      let selectedPlate = null;
      canvasObj.forEachObject(function (obj) {
        if (obj.id === currentSelectedPlate) {
          selectedPlate = obj;
        }
      });
      if (!selectedPlate) {
        // No plate found; nothing to update
        canvasObj.renderAll();
        return canvasObj;
      }
      selectedPlateCoordinates = selectedPlate.aCoords || selectedPlate.oCoords;

      // Then update the cutlines using the resolved coordinates
      canvasObj.forEachObject(function (obj) {
        if (obj.id === 'cutline-width') {
          const x = Number(selectedPlateCoordinates.tr.x) - (maxWidth - width);
          obj.set({
            stroke: (lastKnownValid === false) ? opts.visualCutLineErrorColor : opts.visualCutLineColor,
            x1: x,
            y1: Number(selectedPlateCoordinates.tr.y),
            x2: x,
            y2: Number(selectedPlateCoordinates.br.y),
            visible: (sequence === 'lw')
          });
        }

        if (obj.id === 'cutline-length') {
          const y = Number(selectedPlateCoordinates.tl.y) + height;
          obj.set({
            stroke: (lastKnownValid === false) ? opts.visualCutLineErrorColor : opts.visualCutLineColor,
            x1: Number(selectedPlateCoordinates.tl.x),
            y1: y,
            x2: Number(selectedPlateCoordinates.tr.x) - x2Number,
            y2: y,
            visible: (sequence === 'wl')
          });
        }
      });
      // Keep the cutlines on top for visibility
      try {
        let cw = null, cl = null;
        canvasObj.forEachObject(function (o) {
          if (o.id === 'cutline-width') cw = o;
          if (o.id === 'cutline-length') cl = o;
        });
        if (cw) cw.bringToFront();
        if (cl) cl.bringToFront();
      } catch(e) {}
      canvasObj.renderAll();


      const lineCharacter = fetchCutLetter(0);

      canvasObj.forEachObject(function (obj) {
        if (obj.id === 'cuttedPlateOverlay_' + lineCharacter) {
          obj.set({
            width: width,
            height: height,
            left: 0,
            top: 0
          });
        }
      });

      // Position labels A, B, C like in PlatecutVisualizer
      const plateW = opts.plateWidth;
      const plateH = opts.plateHeight;
      const Apos = { x: width / 2, y: height / 2 };

      // Determine which remainders exist
      const rightExists = (plateW - width) > 0;   // remainder to the right of A
      const bottomExists = (plateH - height) > 0; // the remainder below A

      // Compute positions for potential right and bottom remainders, depending on a sequence
      let posRight, posBottom;
      if (sequence === 'lw') {
        // The right remainder spans full height; the bottom remainder spans cut width
        posBottom = { x: Math.max(1, width / 2), y: height + Math.max(1, (plateH - height) / 2) };
        posRight  = { x: width + Math.max(1, (plateW - width) / 2), y: Math.max(1, plateH / 2) };
      } else { // 'wl'
        // Right remainder spans cut height; bottom remainder spans full width
        posRight  = { x: width + Math.max(1, (plateW - width) / 2), y: Math.max(1, height / 2) };
        posBottom = { x: Math.max(1, plateW / 2), y: height + Math.max(1, (plateH - height) / 2) };
      }

      // Resolve labels
      let Bvisible, Cvisible, Bpos = {x: 0, y: 0}, Cpos = {x: 0, y: 0};
      if (rightExists && bottomExists) {
        // Both remainders exist: keep original mapping
        if (sequence === 'lw') {
          Bvisible = true; Cvisible = true;
          Bpos = posBottom; // B = bottom remainder
          Cpos = posRight;  // C = right remainder
        } else { // 'wl'
          Bvisible = true; Cvisible = true;
          Bpos = posRight;  // B = right remainder
          Cpos = posBottom; // C = bottom remainder
        }
      } else if (rightExists) {
        // Only one remainder exists: label it B
        Bvisible = true; Cvisible = false;
        Bpos = posRight;
      } else if (bottomExists) {
        Bvisible = true; Cvisible = false;
        Bpos = posBottom;
      } else {
        Bvisible = false; Cvisible = false;
      }

      let labelA=null,labelB=null,labelC=null;
      canvasObj.forEachObject(function (obj) {
        if (obj.id === 'plateLetter_A') labelA = obj;
        if (obj.id === 'plateLetter_B') labelB = obj;
        if (obj.id === 'plateLetter_C') labelC = obj;
      });
      if (labelA) { labelA.set({ left: Apos.x, top: Apos.y, visible: true }); }
      if (labelB) { labelB.set({ left: Bpos.x, top: Bpos.y, visible: Bvisible }); }
      if (labelC) { labelC.set({ left: Cpos.x, top: Cpos.y, visible: Cvisible }); }

      // Bring labels to the front
      try { if (labelA) labelA.bringToFront(); if (labelB) labelB.bringToFront(); if (labelC) labelC.bringToFront(); } catch(e) {}

      // Update preview and render
      if(isValid){
        updatePreviewCutList(canvasObj);
      }
      canvasObj.renderAll();
    };
    /**
     * Toggle the state of buttons, click, undo and redo
     *
     * @param  {boolean}    state           Boolean value false to disable and true to enable
     * @return {object}     canvasObject Object of the canvas
     */
    let toggleButtonState = function (state) {
      let addToCartButton = document.getElementById('add-cut-to-cart');
      let switchButton = document.getElementById('switch');
      let extendedCutButton = document.querySelectorAll('.extended-cut-button');

      if (state) {
        addToCartButton.disabled = false;
        addToCartButton.classList.remove('disabled');
        addToCartButton.style.cursor = 'pointer';

        extendedCutButton.forEach(function (e) {
          e.disabled = false;
          e.classList.remove('disabled');
          e.style.cursor = 'pointer';
        });

        switchButton.disabled = false;
        switchButton.classList.remove('disabled');
        switchButton.style.cursor = 'pointer';
      } else {
        addToCartButton.disabled = true;
        addToCartButton.classList.add('disabled');
        addToCartButton.style.cursor = 'not-allowed';


        extendedCutButton.forEach(function (e) {
          e.disabled = true;
          e.classList.add('disabled');
          e.style.cursor = 'not-allowed';
        });

        switchButton.disabled = true;
        switchButton.classList.add('disabled');
        switchButton.style.cursor = 'not-allowed';
      }
    };
    /**
     * Update previewCutList
     */
    let updatePreviewCutList = function (canvasObj) {
      const cutsArray = [];
      const platesArray = [];
      const cutReferenceList = [];
      const prevCutHistory = [];

      const lineCharacter = fetchCutLetter(0);
      const seqEl2 = document.getElementById('sequence');
      const sequence = (seqEl2 && seqEl2.value) ? seqEl2.value : 'lw';
      let currentCutNumber = 1;
      let cutWidth = 0;
      let cutHeight = 0;
      let plateWidth = 0;
      let plateHeight = 0;

      canvasObj.forEachObject(function (obj) {
        if (obj.id === 'cuttedPlateOverlay_' + lineCharacter) {
          cutWidth = obj.width;
          cutHeight = obj.height;
        }

        if (obj.id === 'plateBox_' + lineCharacter) {
          plateWidth = obj.width;
          plateHeight = obj.height;
        }
      });

      let cutSize;
      let rem1Size;
      let rem2Size;

      if (sequence === 'lw') {
        cutSize = cutWidth + 'mm x ' + cutHeight + 'mm';

        if ((plateWidth - cutWidth) > 0) {
          rem1Size = plateWidth - cutWidth + 'mm x ' + plateHeight + 'mm';
        } else {
          rem1Size = '';
        }
        prevCutHistory.push({
          "sequence": "lw",
          "width": cutWidth,
          "oldWidth": plateWidth,
          "height": cutHeight,
          "oldHeight": plateHeight,
          "letter": lineCharacter,
        })
        cutReferenceList.push({"plate": "A", "format": "lengte", "size": cutWidth});
        platesArray.push({"letter": "A", "width": cutWidth, "height": cutHeight});
        cutsArray.push({
          "letter": lineCharacter,
          "length": cutWidth,
          "orientation": "landscape",
          "full": true,
          "oldSize": plateWidth,
          "oldWidth": plateWidth,
          "oldHeight": plateHeight,
        });

        if ((plateHeight - cutHeight) > 0) {
          rem2Size = cutWidth + 'mm x ' +  (plateHeight - cutHeight) + 'mm';
          cutReferenceList.push({"plate": "A", "format": "breedte", "size": cutHeight});
          platesArray.push({"letter": "B", "width": cutWidth, "height": plateHeight - cutHeight});
          platesArray.push({"letter": "C", "width": plateWidth - cutWidth, "height": plateHeight});
          cutsArray.push({
            "letter": lineCharacter,
            "length": cutHeight,
            "orientation": "portrait",
            "full": true,
            "oldSize": plateHeight,
            "oldWidth": plateWidth,
            "oldHeight": plateHeight,
          });
          currentCutNumber = 2;

        } else {
          rem2Size = '';
          if ((plateWidth - cutWidth) > 0) {
            platesArray.push({"letter": "B", "width": plateWidth - cutWidth, "height": plateHeight});
          }
        }
      } else {
        cutSize = cutWidth + 'mm x ' + cutHeight + 'mm';
        if ((plateHeight - cutHeight) > 0) {
          rem1Size = plateWidth + 'mm x ' + (plateHeight - cutHeight) + 'mm';
        } else {
          rem1Size = '';
        }

        prevCutHistory.push({
          "sequence": "wl",
          "width": cutWidth,
          "oldWidth": plateWidth,
          "height": cutHeight,
          "oldHeight": plateHeight,
          "letter": lineCharacter,
        })
        cutReferenceList.push({"plate": "A", "format": "breedte", "size": cutHeight});
        platesArray.push({"letter": "A", "width": cutWidth, "height": cutHeight});
        cutsArray.push({
          "letter": lineCharacter,
          "length": cutHeight,
          "orientation": "portrait",
          "full": true,
          "oldSize": plateHeight,
          "oldWidth": plateWidth,
          "oldHeight": plateHeight,
        });

        if ((plateWidth - cutWidth) > 0) {
          rem2Size = plateWidth - cutWidth + 'mm x ' + cutHeight + 'mm';
          cutReferenceList.push({"plate": "A", "format": "lengte", "size": cutWidth});
          platesArray.push({"letter": "B", "width": plateWidth - cutWidth, "height": cutHeight});
          platesArray.push({"letter": "C", "width": plateWidth, "height": plateHeight - cutHeight});
          cutsArray.push({
            "letter": lineCharacter,
            "length": cutWidth,
            "orientation": "landscape",
            "full": true,
            "oldSize": plateWidth,
            "oldWidth": plateWidth,
            "oldHeight": plateHeight,
          });
          currentCutNumber = 2;
        } else {
          rem2Size = '';
          if ((plateHeight - cutHeight) > 0) {
            platesArray.push({"letter": "B", "width": plateWidth, "height": plateHeight - cutHeight});
          }
        }
      }
      document.getElementById('machineCutList').value = JSON.stringify(cutReferenceList);
      document.getElementById('plates_array').value = JSON.stringify(platesArray);
      document.getElementById('cuts_array').value = JSON.stringify(cutsArray);
      document.getElementById('cut_history').value = JSON.stringify(prevCutHistory);
      document.getElementById('currentCutNumber').value = currentCutNumber;

      // Show letters with sizes in the result table so users can see size per plate
      // A is always the selected cut piece
      const aText = (cutSize ? ('A: ' + cutSize) : '');

      // Map sizes to physical remainders (right vs. bottom), independent of rem1/rem2 variables
      let rightSizeStr;
      let bottomSizeStr;
      if (sequence === 'lw') {
        rightSizeStr = rem1Size; // right remainder
        bottomSizeStr = rem2Size; // bottom remainder
      } else { // 'wl'
        bottomSizeStr = rem1Size; // bottom remainder
        rightSizeStr = rem2Size; // right remainder
      }
      const rightExists = !!rightSizeStr;
      const bottomExists = !!bottomSizeStr;

      let rem1Label;
      let rem2Label;
      if (rightExists && bottomExists) {
        // Both remainders exist: keep orientation-based mapping of which side is B/C,
        // but always show table rows in A, B, C order
        let bText, cText;
        if (sequence === 'lw') {
          // bottom = B, right = C
          bText = bottomSizeStr;
          cText = rightSizeStr;
        } else {
          // 'wl': right = B, bottom = C
          bText = rightSizeStr;
          cText = bottomSizeStr;
        }
        rem1Label = 'B: ' + bText;
        rem2Label = 'C: ' + cText;
      } else if (rightExists) {
        // Only the right remainder exists -> label it B
        rem1Label = 'B: ' + rightSizeStr;
        rem2Label = '';
      } else if (bottomExists) {
        // Only the bottom remainder exists -> label it B
        rem1Label = 'B: ' + bottomSizeStr;
        rem2Label = '';
      } else {
        rem1Label = '';
        rem2Label = '';
      }
      // console.log('rem-labels', rem1Label, rem1Label, rem1Size, rem2Size);
      document.getElementById('cutPreviewSize').innerText = aText;
      document.getElementById('cutPreviewRemainder1').innerText = rem1Label;
      document.getElementById('cutPreviewRemainder2').innerText = rem2Label;

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

            // Default normalization
            obj.set({shadow: null, opacity: 1});

            if (type === 'text' || type === 'i-text' || type === 'textbox') {
              // Keep labels readable in black
              obj.set({fill: 'rgb(0,0,0)', strokeWidth: 0, stroke: 'rgb(0,0,0)'});
            } else if (type === 'line') {
              // Show only the active cutline; hide all other lines in the export
              const seqEl = document.getElementById('sequence');
              const sequence = (seqEl && seqEl.value) ? seqEl.value : 'lw';
              let visible = false;
              // In this visualizer: 'lw' = length cut = VERTICAL line = id 'cutline-width'
              //                     'wl' = width cut = HORIZONTAL line = id 'cutline-length'
              if (sequence === 'lw' && obj.id === 'cutline-width') {
                visible = true;
              } else if (sequence === 'wl' && obj.id === 'cutline-length') {
                visible = true;
              }
              obj.set({
                visible: visible,
                strokeWidth: opts.cutLineWidth || 3,
                stroke: 'rgb(0,0,0)',
                fill: 'rgb(0,0,0)',
                // Force a solid straight line in the export
                strokeDashArray: []
              });
            } else if (type === 'rect') {
              if (obj.width === opts.plateWidth && obj.height === opts.plateHeight) {
                //main plate
                obj.set({
                  fill: 'rgba(255,255,255,1)',
                  strokeWidth: 0,
                  stroke: 'rgb(255,255,255)',
                  strokeUniform: true,
                  left: 1,
                  top: 1,
                  width: opts.plateWidth - 2,
                  height: opts.plateHeight - 2,
                  originX: 'left',
                  originY: 'top'
                });
              } else {
                //desired cut plate
                obj.set({fill: 'rgb(147,147,147)', strokeWidth: 2, stroke: 'rgb(0,0,0)', strokeUniform: true});
              }
              obj.setCoords();
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


      $('form.platecutting #quantity').trigger("change");
    }
    /**
     * Creates the first plate to visualize the whole plate
     *
     * @return {object}  canvasObject Object of the canvas
     */
    this.createFirstCutBlock = function (canvasObj) {
      const lineCharacter = fetchCutLetter(0);
      document.getElementById('currentCutNumber').value = 0;

      const plateObject = new fabric.Rect({
        id: 'plateBox_' + lineCharacter,
        left: 0,
        bottom: 0,
        fill: opts.plateBackgroundColor,
        width: opts.plateWidth,
        height: opts.plateHeight,
        hasBorder: true,
        hasControls: false,
        stroke: opts.plateBorderColor,
        strokeWidth: 1,
        selectable: false,
        evented: true,
        cancelBubble: true,
      })
      const cuttedPlateOverlay = new fabric.Rect({
        id: 'cuttedPlateOverlay_' + lineCharacter,
        left: 0,
        bottom: 0,
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
      })
      canvasObj.add(plateObject, cuttedPlateOverlay);

      // Create label texts A, B, C similar to PlatecutVisualizer
      const makeLabel = function(text, id){
        return new fabric.Text(text, {
          id: id,
          left: opts.plateWidth / 2,
          top: opts.plateHeight / 2,
          originX: 'center',
          originY: 'center',
          fill: opts.plateLetterColor,
          fontWeight: opts.plateLetterFontWeight,
          fontFamily: opts.plateLetterFontFamily,
          fontSize: getScaledFontSize(),
          selectable: false,
          hasControls: false,
          absolutePositioned: true,
          evented: false
        });
      };
      const letterA = makeLabel('A', 'plateLetter_A');
      const letterB = makeLabel('B', 'plateLetter_B');
      const letterC = makeLabel('C', 'plateLetter_C');
      canvasObj.add(letterA, letterB, letterC);

      createCutLine(canvasObj, 0, 0, opts.plateWidth, opts.plateHeight);
      return canvasObj;
    };


    // public methods
    this.initialize = function () {
      const $this = this;
      //create canvas fabric object
      const canvasObj = canvasObject($this[0]);
      $this.setCanvasSize();
      $this.createFirstCutBlock(canvasObj);
      // Disable add-to-cart on init; it is only enabled once a valid cut is confirmed
      toggleButtonState(false);
      // Force initial orientation to length cut (vertical cutline) and position the cutline immediately
      try {
        const seqElInit = document.getElementById('sequence');
        if (seqElInit){
          seqElInit.value = 'lw';
        }
        $this.setCutLinePosition(canvasObj);
      } catch(e) {}

      const lengthElem = document.getElementById('input-group-length');
      const widthElem = document.getElementById('input-group-width');

      const widthInput = document.getElementById('width');
      const heightInput = document.getElementById('height');

      // var clearButton = document.getElementById('clear');
      const cutButton = document.getElementById('cut');
      const switchBtn = document.getElementById('switch');

      switchBtn.addEventListener('click', function onEvent(event) {

        const seqElem = document.getElementById('sequence');

        if (!seqElem) { return; }
        // Toggle only the cut sequence and update the visual; do not reorder inputs.
        seqElem.value = (seqElem.value === 'lw') ? 'wl' : 'lw';
        $this.setCutLinePosition(canvasObj);
        // Refresh result table sizes only if the current selection is known-valid
        try {
          if (lastKnownValid === true) {
            updatePreviewCutList(canvasObj);
          }
        } catch (e) {}
      }, {
        passive: true
      });

      //add on keypress to width and height fields
      widthInput.addEventListener("change", function onEvent(event) {
        $this.setCutLinePosition(canvasObj, 'width')
      }, {
        passive: true
      });

      widthInput.addEventListener("keyup", function onEvent(event) {
        $this.setCutLinePosition(canvasObj, 'width')
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
      }, {
        passive: true
      });

      document.getElementById('width').focus();
      return $this;
    };
    this.initialize();
    return this;
  };
}));
