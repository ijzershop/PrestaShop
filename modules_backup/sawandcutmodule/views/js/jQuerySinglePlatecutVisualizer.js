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
 * singlePlateCutVisualizer class for creating single length and width cuts on a plate
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
 * Aistory array with all previous canvas states
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
 * Heigth of the whole plate
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
 * Visual cutline color when size is unvalid
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
    // AMD. Register as anonymous module.
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
     * Check if chosen size validates with the minimum cutsize restrictions
     *
     * @param  {number}   chosenSize          The chosen cut size
     * @param  {number}   plateSize           The plate size which is going to be cut
     * @param  {string}  fromPlateCutLine    If the function is called from the plateCutLine function
     * @return {boolean}                      Returns boolean if the chosen size is valid or not
     */
    var checkMinCutSize = function (chosenWidthSize, plateWidthSize, chosenHeightSize, plateHeightSize) {
      let checkW = true;
      let checkH = true;
      let alertText = '';

      if (chosenWidthSize !== plateWidthSize) {

        if (Number(chosenWidthSize) < Number(opts.minCutSize)) {
          alertText += textStrings('cut_to_small', 'width');
          document.getElementById('width').classList.add('was-validated');
          document.getElementById('width').classList.add('is-invalid');
          checkW = false;
        }
        if (((Number(plateWidthSize) - Number(chosenWidthSize)) < Number(opts.minCutSize)) && (Number(plateWidthSize) !== Number(chosenWidthSize))) {
          alertText += textStrings('remainder_to_small', 'width');
          document.getElementById('width').classList.add('was-validated');
          document.getElementById('width').classList.add('is-invalid');
          checkW = false;
        }
      } else {
        document.getElementById('width').classList.add('is-valid');
        document.getElementById('width').classList.remove('is-invalid');
        checkW = true;
        console.log(checkW);
      }


      //Height check
      if (chosenHeightSize !== plateHeightSize) {
        if (Number(chosenHeightSize) < Number(opts.minCutSize)) {
          alertText += textStrings('cut_to_small', 'height');
          document.getElementById('height').classList.add('was-validated');
          document.getElementById('height').classList.add('is-invalid');
          checkH = false;
        }
        if (((Number(plateHeightSize) - Number(chosenHeightSize)) < Number(opts.minCutSize)) && (Number(plateHeightSize) !== Number(chosenHeightSize))) {
          alertText += textStrings('remainder_to_small', 'height');
          document.getElementById('height').classList.add('was-validated');
          document.getElementById('height').classList.add('is-invalid');
          checkH = false;
        }
      } else {
        document.getElementById('height').classList.add('is-valid');
        document.getElementById('height').classList.remove('is-invalid');
        checkH = true;
      }


      if (checkW && checkH) {
        document.getElementById('error-msg').innerHTML = '';
        document.getElementById('error-msg-box').classList.remove('show');
        toggleButtonState(true);
        document.getElementById('height').classList.add('is-valid');
        document.getElementById('height').classList.remove('is-invalid');
        document.getElementById('width').classList.add('is-valid');
        document.getElementById('width').classList.remove('is-invalid');
        return true;
      } else {
        document.getElementById('error-msg').innerHTML = alertText;
        document.getElementById('error-msg-box').classList.add('show');
        toggleButtonState(false);

        return false;
      }
    };
    /**
     * set the list of cuts
     *
     * @return {html}  htmllist  List of li elememts with the cuts per cut line
     */
    var fetchTechnicalPlateCutReference = function (plateLetter, list) {
      var htmlCutReference = '';
      var htmlMachineCutReference = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].letter.replace('plateLetter_', '') === plateLetter) {
          if (list[i].orientation === 'landscape') {
            var fullText = '';
            if (!list[i].full) {
              fullText = ' niet volledig de plaat in tween geknip';
            }
            var priceText = ' € 0,00';
            if (opts.combiPrices[Object.keys(opts.combiPrices)[i]] > 0) {
              priceText = ' á ' + renderMoneyString(opts.cutPrice);
            }
            htmlCutReference += '<li> <small> <b>Knip ' + (i + 1) + '</b> - in breedte geknipt ' + list[i].length + 'mm' + fullText + priceText + '</small></li>';
          } else {
            var fullText = '';
            if (!list[i].full) {
              fullText = ' niet volledig de plaat in tween geknip';
            }
            var priceText = ' € 0,00';
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
    var getPlateFormat = function () {
      return 'landscape';
    };
    $.fn.singlePlateCutVisualizer.defaults = {
      /**
       * Heigth of the whole plate
       * @type {number}
       */
      plateHeight: 500,
      /**
       * Width of the hole plate
       * @type {number}
       */
      plateWidth: 1000,
      /**
       * The minimum cut size for remainder or desired plate
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
       * Aistory array with all previous canvas states
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
       * Width of plate border in pixels
       * @type {number}
       */
      plateBorder: 1,
      /**
       * Orientation of whole plate "landscape" of "portrait"
       * @type {string}
       */
      plateOrientation: 'landscape',
      /**
       * All letters used for cuts, each cut is getting it's own identification letter
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
       * Visual cutline color when size is unvalid
       * @type {string}
       */
      visualCutLineErrorColor: '#dc3545',
      /**
       * Visual cutline dash array to create dotted or other type of line
       * @type {array}
       */
      visualCutLineDashArray: [10, 5],
      /**
       * Font-family for plate letters
       * @type {string}
       */
      plateLetterFontFamily: '"Arial Black", Gadget, sans-serif',
      /**
       * Font-weight for plate letter
       * @type {string}
       */
      plateLetterFontWeight: 400,
      /**
       * technicalPlateCutReferenceArray with indexed cuts and cutline orientation.
       * Added as [cutIndex : {'orientation': 'lanscape', 'full': true, 'price': 0}]
       * - cutIndex is the index from the cuts starting at 0 for first cut
       * - orientation is the orientation used with the cut, landscape and portrait
       * - full is if the cut is for the full width or length or partial cut
       * - price is the cut price used for that specific cut
       *
       * @type {array}
       */
      technicalPlateCutReferenceArray: [],
    };
    var opts = $.extend({}, $.fn.singlePlateCutVisualizer.defaults, options);
    /**
     * All strings used for messages
     * @type {object}
     */
    var textStrings = function (langString, widthOrHeight = 'width') {
      if (widthOrHeight == 'width') {
        var orientation = 'lengte';
      } else {
        var orientation = 'breedte';
      }

      switch (langString) {
        case 'cut_to_small':
          return 'De ingevoerde ' + orientation + ' maat is te klein, de minimale knipmaat is ' + opts.minCutSize + 'mm.<br/>';
        case 'remainder_to_small':
          return 'Het rest-deel van de ' + orientation + ' knip is kleiner dan de minimale rest-maat van ' + opts.minCutSize + 'mm.<br/>';
        case 'max_cuts':
          return 'U heeft het maximaal aantal knippen bereikt, u mag in totaal ' + opts.maxCuts + ' maal knippen per plaat.<br/>';
        case 'same_size':
          return 'De ingevoerde ' + orientation + ' maat is even groot al de plaat die u wilt knippen, er is geen knip nodig.<br/>';
        default:
          return '';
      }
    };
    /**
     * Initiation of the canvas creates an canvasObject from the canvas element
     * @type {fabric}
     */
    var canvasObject = function (element) {
      var obj = new fabric.Canvas(element, {
        isDrawingMode: false,
        selection: false,
      });
      element.canvasObject = obj;
      return obj;
    };
    /**
     * Parse the canvas to an svg image
     * @type {object} canvas object
     */
    this.canvasObjectToObject = function () {
      var canvasObj = this[0].canvasObject;
      return canvasObj.toObject();
    };
    /**
     * Parse the canvas to an string
     * @type {string} json string
     */
    this.canvasObjectToString = function () {
      var canvasObj = this[0].canvasObject;
      return canvasObj.toString();
    };
    /**
     * Parse the canvas to an object
     * @type {svg} image
     */
    this.canvasObjectToSVG = function () {
      var canvasObj = this[0].canvasObject;
      return canvasObj.toSVG();
    };
    /**
     * Set the scale factor of the canvas element
     *
     * @return {number} scaleFactor of the canvas
     */
    var getScaleFactor = function () {
      var htmlWidth = document.getElementById('canvas-container-block').offsetWidth;
      var scaleFactor = Number(htmlWidth) / Number(opts.plateWidth);
      return scaleFactor;
    };
    /**
     * Set the size of the whole canvas
     *
     * @return {object}  canvasObject    Object of the canvas
     */
    this.setCanvasSize = function () {
      var canvasObj = this[0].canvasObject;
      var scaleFactor = getScaleFactor();
      canvasObj.setZoom(scaleFactor);
      canvasObj.setDimensions({
        width: opts.plateWidth * scaleFactor,
        height: opts.plateHeight * scaleFactor,
      });
      return canvasObj;
    };
    /**
     * Fetch the cutletter of the selected plate
     *
     * @param  {string}   index   The key used to fetch the cut letter
     * @return {string}           The cut letter
     */
    var fetchCutLetter = function (index) {
      return opts.cutIdArray[index];
    };

    /**
     * Create cutline to visualize cut before cutting
     *
     * @param  {number}   left            Left position
     * @param  {number}   top             Top position
     * @param  {number}   width           Entered width of the selected plate
     * @param  {number}   height          Entered height of the selected plate
     * @return {object}   canvasObject    Object of the canvas
     */
    var createCutLine = function (canvasObj, left, top, width, height) {
      var left = left;
      var top = top;
      var right = Number(left) + Number(width);
      var bottom = Number(top) + Number(height);

      var cutlineWidthObject = new fabric.Line([right - opts.cutLineWidth, top, right - opts.cutLineWidth, bottom], {
        strokeDashArray: opts.visualCutLineDashArray,
        stroke: opts.plateBorderColor,
        strokeWidth: opts.cutLineWidth,
        id: 'cutline-width',
        selectable: false,
        hasControls: false,
        absolutePositioned: true,
        evented: true,
      });
      var cutlineLengthObject = new fabric.Line([left, top, right, top], {
        strokeDashArray: opts.visualCutLineDashArray,
        stroke: opts.visualCutLineColor,
        strokeWidth: opts.cutLineWidth,
        id: 'cutline-length',
        selectable: false,
        hasControls: false,
        absolutePositioned: true,
        evented: true,
      });
      canvasObj.add(cutlineWidthObject, cutlineLengthObject);

      return canvasObj;
    };
    /**
     * Updates the position of the visual cutline
     *
     * @return {object}  canvasObj    Object of the canvas
     */
    this.setCutLinePosition = function (canvasObj) {
      let currentSelectedPlate;
      var width = Number(document.getElementById('width').value);
      var maxWidth = Number(document.getElementById('width').getAttribute('max'));
      var height = Number(document.getElementById('height').value);
      var maxHeight = Number(document.getElementById('height').getAttribute('max'));
      let centerPoint;
      var sequence = document.getElementById('sequence').value;
      var y1Number = 0;
      var x2Number = 0;


      checkMinCutSize(width, maxWidth, height, maxHeight);

      if (sequence === 'wl') {
        y1Number = maxHeight - height;
      } else {
        y1Number = 0;
      }
      if (sequence === 'lw') {
        x2Number = maxWidth - width;
      } else {
        x2Number = 0;
      }

      currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
      let selectedPlateCoordinates;

      canvasObj.forEachObject(function (obj) {
        if (obj.id === currentSelectedPlate) {
          selectedPlateCoordinates = obj.oCoords;
        }
        if (obj.id === 'cutline-width') {
          obj.set({
            stroke: opts.visualCutLineColor,
            x1: Number(selectedPlateCoordinates.tr.x / getScaleFactor()) - (maxWidth - width + opts.cutLineWidth),
            y1: Number(selectedPlateCoordinates.tr.y / getScaleFactor()) + y1Number,
            x2: Number(selectedPlateCoordinates.br.x / getScaleFactor()) - (maxWidth - width + opts.cutLineWidth),
            y2: Number(selectedPlateCoordinates.br.y / getScaleFactor())
          });
        }

        if (obj.id === 'cutline-length') {
          obj.set({
            stroke: opts.visualCutLineColor,
            x1: Number(selectedPlateCoordinates.tl.x / getScaleFactor()),
            y1: Number(selectedPlateCoordinates.tl.y / getScaleFactor()) + (maxHeight - height + opts.cutLineWidth),
            x2: Number(selectedPlateCoordinates.tr.x / getScaleFactor()) - x2Number,
            y2: Number(selectedPlateCoordinates.tr.y / getScaleFactor()) + (maxHeight - height + opts.cutLineWidth)
          });
        }
      });
      canvasObj.renderAll();


      var lineCharacter = fetchCutLetter(0);

      canvasObj.forEachObject(function (obj) {

        if (obj.id === 'cuttedPlateOverlay_' + lineCharacter) {
          obj.set({
            width: width,
            height: height,
            left: 0,
            top: Number(opts.plateHeight) - Number(height)
          });
          centerPoint = obj.getCenterPoint();
        }

      });
      updatePreviewCutList(canvasObj);
      canvasObj.renderAll();
    };
    /**
     * Toggle the state of buttons click, undo and redo
     *
     * @param  {boolean}    state           Boolean value false to disable and true to enable
     * @return {object}     canvasObject    Object of the canvas
     */
    let toggleButtonState = function (state) {
      if (state) {
        document.getElementById('add-cut-to-cart').disabled = false;
        document.getElementById('add-cut-to-cart').classList.remove('disabled');
        document.getElementById('switch').disabled = false;
        document.getElementById('switch').classList.remove('disabled');
        // document.getElementById('clear').disabled = false;
        // document.getElementById('clear').classList.remove('disabled');
      } else {
        document.getElementById('add-cut-to-cart').disabled = true;
        document.getElementById('add-cut-to-cart').classList.add('disabled');
        document.getElementById('switch').disabled = true;
        document.getElementById('switch').classList.add('disabled');
        // document.getElementById('clear').disabled = true;
        // document.getElementById('clear').classList.add('disabled');
      }
    };
    /**
     * Update previewCutList
     */
    let updatePreviewCutList = function (canvasObj) {
      var cutsArray = [];
      var platesArray = [];
      var cutReferenceList = [];
      var prevCutHistory = [];

      var lineCharacter = fetchCutLetter(0);
      var sequence = document.getElementById('sequence').value;
      var currentCutNumber = 1;
      var cutWidth = 0;
      var cutHeight = 0;
      var plateWidth = 0;
      var plateHeight = 0;

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

      if (sequence === 'lw') {
        var cutSize = cutWidth + 'mm x ' + cutHeight + 'mm';

        if ((plateWidth - cutWidth) > 0) {
          var rem1Size = plateWidth - cutWidth + 'mm x ' + plateHeight + 'mm';
        } else {
          var rem1Size = '';
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
          "oldSize": plateWidth
        });

        if ((plateHeight - cutHeight) > 0) {
          var rem2Size = plateHeight - cutHeight + 'mm x ' + cutWidth + 'mm';
          cutReferenceList.push({"plate": "A", "format": "breedte", "size": cutHeight});
          platesArray.push({"letter": "B", "width": cutWidth, "height": plateHeight - cutHeight});
          platesArray.push({"letter": "C", "width": plateWidth - cutWidth, "height": plateHeight});
          cutsArray.push({
            "letter": lineCharacter,
            "length": cutHeight,
            "orientation": "portrait",
            "full": true,
            "oldSize": plateHeight
          });
          currentCutNumber = 2;

        } else {
          var rem2Size = '';
          if ((plateWidth - cutWidth) > 0) {
            platesArray.push({"letter": "B", "width": plateWidth - cutWidth, "height": plateHeight});
          }
        }
      } else {
        var cutSize = cutWidth + 'mm x ' + cutHeight + 'mm';
        if ((plateHeight - cutHeight) > 0) {
          var rem1Size = plateHeight - cutHeight + 'mm x ' + plateWidth + 'mm';
        } else {
          var rem1Size = '';
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
          "oldSize": plateHeight
        });

        if ((plateWidth - cutWidth) > 0) {
          var rem2Size = plateWidth - cutWidth + 'mm x ' + cutHeight + 'mm';
          cutReferenceList.push({"plate": "A", "format": "lengte", "size": cutWidth});
          platesArray.push({"letter": "B", "width": plateWidth - cutWidth, "height": cutHeight});
          platesArray.push({"letter": "C", "width": plateWidth, "height": plateHeight - cutHeight});
          cutsArray.push({
            "letter": lineCharacter,
            "length": cutWidth,
            "orientation": "landscape",
            "full": true,
            "oldSize": plateWidth
          });
          currentCutNumber = 2;
        } else {
          var rem2Size = '';
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

      document.getElementById('cutPreviewSize').innerText = cutSize;
      if (rem1Size === '') {
        document.getElementById('cutPreviewRemainder1').innerText = rem2Size;
      } else {
        document.getElementById('cutPreviewRemainder1').innerText = rem1Size;
        document.getElementById('cutPreviewRemainder2').innerText = rem2Size;
      }

      let JpegPreview = canvasObj.toDataURL({
        'format':'jpeg',
        'quality':0.8,
        'multiplier': 0.8
      });

      // document.getElementById('machineCutPreview').value = canvasObj.toSVG();
      document.getElementById('machineCutPreview').value = JpegPreview;

      $('form.platecutting #quantity').trigger("change");
    }
    /**
     * Creates the first plate to visualize the whole plate
     *
     * @return {object}  canvasObject    Object of the canvas
     */
    this.createFirstCutBlock = function (canvasObj) {
      var lineCharacter = fetchCutLetter(0);
      document.getElementById('currentCutNumber').value = 0;

      var plateObject = new fabric.Rect({
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
      var cuttedPlateOverlay = new fabric.Rect({
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
      createCutLine(canvasObj, 0, 0, opts.plateWidth, opts.plateHeight);
      return canvasObj;
    };


    // public methods
    this.initialize = function () {
      var $this = this;
      //create canvas fabric object
      var canvasObj = canvasObject($this[0]);
      $this.setCanvasSize();
      $this.createFirstCutBlock(canvasObj);

      var lengthElem = document.getElementById('input-group-length');
      var widthElem = document.getElementById('input-group-width');

      var widthInput = document.getElementById('width');
      var heightInput = document.getElementById('height');

      // var clearButton = document.getElementById('clear');
      var cutButton = document.getElementById('cut');
      var switchBtn = document.getElementById('switch');


      // clearButton.addEventListener("click", function onEvent(event) {
      //   event.preventDefault();
      //   widthInput.value = widthInput.getAttribute('max');
      //   heigthInput.value = heightInput.getAttribute('max');
      // }, {
      //   passive: false
      // });

      // cutButton.addEventListener("click", function onEvent(event) {
      //   event.preventDefault();
      //   $this.cutActionPlate(canvasObj);
      // }, {
      //   passive: false
      // });


      switchBtn.addEventListener('click', function onEvent(event) {
        var seqElem = document.getElementById('sequence');

        if (seqElem.value === 'lw') {
          widthElem.parentNode.insertBefore(lengthElem, widthElem.nextSibling);
          seqElem.value = 'wl';
        } else {
          lengthElem.parentNode.insertBefore(widthElem, lengthElem.nextSibling);
          seqElem.value = 'lw'
        }
        $this.setCutLinePosition(canvasObj)
      }, {
        passive: true
      });

      //add on keypress to width and height fields

      widthInput.addEventListener("change", function onEvent(event) {
        $this.setCutLinePosition(canvasObj)
      }, {
        passive: true
      });
      widthInput.addEventListener("wheel", function onEvent(event) {
        $this.setCutLinePosition(canvasObj)
      }, {
        passive: false
      });
      widthInput.addEventListener("keyup", function onEvent(event) {
        $this.setCutLinePosition(canvasObj)
      }, {
        passive: true
      });
      heightInput.addEventListener("change", function onEvent(event) {
        $this.setCutLinePosition(canvasObj)
      }, {
        passive: true
      });
      heightInput.addEventListener("wheel", function onEvent(event) {
        $this.setCutLinePosition(canvasObj)
      }, {
        passive: false
      });
      heightInput.addEventListener("keyup", function onEvent(event) {
        $this.setCutLinePosition(canvasObj)
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
