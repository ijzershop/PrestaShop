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
 * sawCutVisualizer class for creating different cuts on a plate
 *
 *
 *
 * --Options & defaults are--
 * 
 * The minimum cut size for remainder or desired plate
 * @type {number}
 *
 * 
 * Option -> minSawCutSize
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
 * Option -> sawcutLineWidth
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
 * Option -> visualSawLineColor
 * Default -> '#fff'
 *
 *--------------------------------------#
 *
 * Visual cutline color when size is unvalid
 * @type {string}
 *
 * Option -> visualSawLineErrorColor
 * Default -> '#dc3545'
 *
 *--------------------------------------#
 *
 * Visual cutline dash array to create dotted or other type of line
 * @type {array}
 *
 * Option -> visualSawLineDashArray
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
(function(factory) {
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
}(function($) {
    "use strict";
    $.fn.sawCutVisualizer = function(options) {
        $.fn.sawCutVisualizer.defaults = {
            /**
             * The minimum cut size for remainder or desired plate
             * @type {number}
             */
            minSawCutSize: 150,
            /**
             * The maximum total cuts per plate
             * @type {number}
             */
            maxCuts: 26,
            /**
             * The width of the visual cutline
             * @type {number}
             */
            sawcutLineWidth: 3,
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
            activePlateBackgroundColor: 'rgba(51,56,255,0.5)',
            /**
             * Default background color of the plates
             * @type {string}
             */
            plateBackgroundColor: '#ccc',
            /**
             * Plate border color
             * @type {string}
             */
            plateBorderColor: '#fff',
            /**
             * Plate letter color
             * @type {string}
             */
            plateLetterColor: '#000',
            /**
             * Default visual cutline color
             * @type {string}
             */
            visualSawLineColor: '#fff',
            /**
             * Visual cutline color when size is unvalid
             * @type {string}
             */
            visualSawLineErrorColor: '#dc3545',
            /**
             * Visual cutline dash array to create dotted or other type of line
             * @type {array}
             */
            visualSawLineDashArray: [10, 5],
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
             * technicalSawCutReferenceArray with indexed cuts and cutline orientation. 
             * Added as [cutIndex : {'orientation': 'lanscape', 'full': true, 'price': 0}]
             * - cutIndex is the index from the cuts starting at 0 for first cut
             * - orientation is the orientation used with the cut, landscape and portrait
             * - full is if the cut is for the full width or length or partial cut 
             * - price is the cut price used for that specific cut
             * 
             * @type {array}
             */
            technicalSawCutReferenceArray: [],
        };
        var opts = $.extend({}, $.fn.sawCutVisualizer.defaults, options);
        /**
         * All strings used for messages
         * @type {object}
         */
        var textStrings = function(langString) {
            switch (langString) {
                case 'cut_to_small':
                    return 'De ingevoerde maat is te klein, de minimale zaagmaat is ' + opts.minSawCutSize + 'mm';
                    break;
                case 'remainder_to_small':
                    return 'Het rest-deel is kleiner dan de minimale rest-maat van' + opts.minSawCutSize + 'mm';
                    break;
                case 'max_cuts':
                    return 'U heeft het maximaal aantal zaagsnedes bereikt, u mag in totaal ' + opts.maxCuts + ' maal zagen per plaat';
                    break;
                case 'same_size':
                    return 'De ingevoerde maat is even groot al de plaat die u wilt zagen, er is geen zaagsnede nodig';
                    break;
                default:
                    return '';
                    break;
            }
        };
        /**
         * Initiation of the canvas creates an canvasObject from the canvas element
         * @type {fabric}
         */
        var canvasObject = function(element) {
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
        this.canvasObjectToObject = function() {
            var canvasObj = this[0].canvasObject;
            var object = canvasObj.toObject();
            return object;
        };
        /**
         * Parse the canvas to an string
         * @type {string} json string
         */
        this.canvasObjectToString = function() {
            var canvasObj = this[0].canvasObject;
            var string = canvasObj.toString();
            return string;
        };
        /**
         * Parse the canvas to an object
         * @type {svg} image
         */
        this.canvasObjectToSVG = function() {
            var canvasObj = this[0].canvasObject;
            var svg = canvasObj.toSVG();
            return svg;
        };
        /**
         * Set the scale factor of the canvas element
         * 
         * @return {number} scaleFactor of the canvas
         */
        var getScaleFactor = function() {
            var htmlWidth = document.getElementById('canvas-container-block').offsetWidth;
            var scaleFactor = Number(htmlWidth) / Number(opts.plateWidth);
            return scaleFactor;
        };
        /**
         * Get the scaled font-size
         * 
         * @return {number}  fontsize  The fontsize modified by scale factor
         */
        var getScaledFontSize = function() {
            var scaleFactor = getScaleFactor();
            var fontSize = Number(opts.fontSizePX) / Number(scaleFactor);
            return fontSize;
        };
        /**
         * Set the size of the whole canvas
         * 
         * @return {object}  canvasObject    Object of the canvas
         */
        this.setCanvasSize = function() {
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
         * Updates the cutted plates list
         * 
         * @return {html}  htmllist    List of li elememts with the cutted plates
         */
        var updateCuttedPlatesList = function(canvasObj) {
            var cutReferenceList = opts.technicalSawCutReferenceArray;
            var list = '';
            canvasObj.forEachObject(function(obj) {
                if (obj.id.indexOf('plateBox') !== -1) {
                    var letter = obj.id.replace('plateBox_', '');
                    var width = obj.width;
                    var height = obj.height;
                    list += '<li>' + letter + ': ' + width + 'mm X ' + height + 'mm ' + fetchTechnicalSawCutReference(letter, cutReferenceList) + '</li>';
                }
            });
            document.getElementById('cuttedPlatesList').innerHTML = list;
        };
        /**
         * Updates the plate cuts array
         * 
         * @return {html}  htmllist    List of li elememts with the cutted plates
         */
        var updateTechnicalSawCutReferenceArray = function(plateLetter, length, orientation, full, price) {
            var list = opts.technicalSawCutReferenceArray;
            if (typeof plateLetter === "undefined") {
                plateLetter = opts.cutIdArray[0];
            }
            if (typeof orientation === "undefined") {
                orientation = opts.plateOrientation;
            }
            if (typeof full === "undefined") {
                full = true;
            }
            if (typeof price === "undefined") {
                price = 0;
            }
            list.push({
                'letter': plateLetter,
                'length': length,
                'orientation': orientation,
                'full': full,
                'price': price
            });
            return list;
        };
        /**
         * set the list of cuts
         * 
         * @return {html}  htmllist  List of li elememts with the cuts per cut line
         */
        var fetchTechnicalSawCutReference = function(plateLetter, list) {
            var htmlCutReference = '';
            for (var i = 0; i < list.length; i++) {
                if (list[i].letter.replace('plateLetter_', '') === plateLetter) {
                    if (list[i].orientation === 'landscape') {
                        var fullText = '';
                        if (!list[i].full) {
                            fullText = ' niet volledig de plaat in tween gezaagd';
                        }
                        var priceText = '';
                        if (list[i].price > 0) {
                            priceText = ', á €' + list[i].price;
                        }
                        htmlCutReference += '<li> <small> <b>Knip ' + (i + 1) + '</b> - in breedte gezaagdt ' + list[i].length + 'mm' + fullText + priceText + '</small></li>';
                    } else {
                        var fullText = '';
                        if (!list[i].full) {
                            fullText = ' niet volledig de plaat in tween gezaagd';
                        }
                        var priceText = '';
                        if (list[i].price > 0) {
                            priceText = ', á €' + list[i].price;
                        }
                        htmlCutReference += '<li> <small> <b>Knip ' + (i + 1) + '</b> - in lengte gezaagdt ' + list[i].length + 'mm' + fullText + priceText + '</small></li>';
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
         * @param   {number}  width           Width of the selected plate
         * @param   {number}  height          Height of the selected plate
         * @return  {object}  canvasObj    Object of the canvas
         */
        var setSizeInputs = function(canvasObj, width, height) {
            var format = getPlateFormat();
            var currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
            canvasObj.forEachObject(function(obj) {
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
         * Fetch the cutletter of the selected plate
         * 
         * @param  {string}   index   The key used to fetch the cut letter
         * @return {string}           The cut letter
         */
        var fetchCutLetter = function(index) {
            return opts.cutIdArray[index];
        };
        /**
         * Fetch the selected plate format to check for vertical or horizontal cutting
         * 
         * @return {string}           returns landscape for vertical cut and portrait for horizontal cut
         */
        var getPlateFormat = function() {
            return document.querySelector('.rotate:checked').value;
        };
        /**
         * Switch cut horizontal and vertical
         * 
         * @return {object}  canvasObject    Object of the canvas
         */
        this.rotatePlate = function(canvasObj) {
            var format = getPlateFormat();
            if (format === 'landscape') {
                document.getElementById('width').disabled = false;
                document.getElementById('height').disabled = true;
                document.getElementById('width').focus();
            } else {
                document.getElementById('width').disabled = true;
                document.getElementById('height').disabled = false;
                document.getElementById('height').focus();
            }
            this.setSawLinePosition(canvasObj);
            return canvasObj;
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
        var createSawLine = function(canvasObj, left, top, width, height) {
            var format = getPlateFormat();
            if (format === 'landscape') {
                var left = left;
                var top = top;
                var right = Number(left) + Number(width);
                var bottom = Number(top) + Number(height);
                var cutlineObject = new fabric.Line([right - opts.sawcutLineWidth, top, right - opts.sawcutLineWidth, bottom], {
                    strokeDashArray: opts.visualSawLineDashArray,
                    stroke: opts.plateBorderColor,
                    strokeWidth: opts.sawcutLineWidth,
                    id: 'cutline',
                    selectable: false,
                    hasControls: false,
                    absolutePositioned: true,
                    evented: true,
                });
                canvasObj.add(cutlineObject);
            } else {
                var left = left;
                var top = top;
                var right = Number(left) + Number(width);
                var bottom = Number(top) + Number(height);
                var cutlineObject = new fabric.Line([left, top, right, top], {
                    strokeDashArray: opts.visualSawLineDashArray,
                    stroke: opts.visualSawLineColor,
                    strokeWidth: opts.sawcutLineWidth,
                    id: 'cutline',
                    selectable: false,
                    hasControls: false,
                    absolutePositioned: true,
                    evented: true,
                });
                canvasObj.add(cutlineObject);
            }
            return canvasObj;
        };
        /**
         * Removes the visual cut line
         * 
         * @return {object}  canvasObj    Object of the canvas
         */
        var removeSawLine = function(canvasObj) {
            canvasObj.forEachObject(function(obj) {
                if (obj.id == 'cutline') {
                    canvasObj.remove(obj);
                }
            });
            return canvasObj;
        };
        /**
         * Updates the position of the visual cutline
         * 
         * @return {object}  canvasObj    Object of the canvas
         */
        this.setSawLinePosition = function(canvasObj) {
            var width = Number(document.getElementById('width').value);
            var maxWidth = Number(document.getElementById('width').getAttribute('max'));
            var height = Number(document.getElementById('height').value);
            var maxHeight = Number(document.getElementById('height').getAttribute('max'));
            var format = getPlateFormat();
            if (format === 'landscape') {
                if (checkMinCutSize(width, maxWidth, true)) {
                    var currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
                    var selectedPlateCoordinates;
                    canvasObj.forEachObject(function(obj) {
                        if (obj.id === currentSelectedPlate) {
                            selectedPlateCoordinates = obj.oCoords;
                        }
                        if (obj.id === 'cutline') {
                            obj.set({
                                stroke: opts.visualSawLineColor,
                                x1: Number(selectedPlateCoordinates.tr.x / getScaleFactor()) - (maxWidth - width + opts.sawcutLineWidth),
                                y1: Number(selectedPlateCoordinates.tr.y / getScaleFactor()),
                                x2: Number(selectedPlateCoordinates.br.x / getScaleFactor()) - (maxWidth - width + opts.sawcutLineWidth),
                                y2: Number(selectedPlateCoordinates.br.y / getScaleFactor())
                            });
                        }
                    });
                    canvasObj.renderAll();
                } else {
                    var currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
                    var selectedPlateCoordinates;
                    canvasObj.forEachObject(function(obj) {
                        if (obj.id === currentSelectedPlate) {
                            selectedPlateCoordinates = obj.oCoords;
                        }
                        if (obj.id === 'cutline') {
                            obj.set({
                                stroke: opts.visualSawLineErrorColor,
                                x1: Number(selectedPlateCoordinates.tr.x / getScaleFactor()) - (maxWidth - width + opts.sawcutLineWidth),
                                y1: Number(selectedPlateCoordinates.tr.y / getScaleFactor()),
                                x2: Number(selectedPlateCoordinates.br.x / getScaleFactor()) - (maxWidth - width + opts.sawcutLineWidth),
                                y2: Number(selectedPlateCoordinates.br.y / getScaleFactor())
                            });
                        }
                    });
                    canvasObj.renderAll();
                }
            } else {
                if (checkMinCutSize(height, maxHeight, true)) {
                    var currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
                    var selectedPlateCoordinates;
                    canvasObj.forEachObject(function(obj) {
                        if (obj.id === currentSelectedPlate) {
                            selectedPlateCoordinates = obj.oCoords;
                        }
                        if (obj.id === 'cutline') {
                            obj.set({
                                stroke: opts.visualSawLineColor,
                                x1: Number(selectedPlateCoordinates.tl.x / getScaleFactor()),
                                y1: Number(selectedPlateCoordinates.tl.y / getScaleFactor()) + (maxHeight - height + opts.sawcutLineWidth),
                                x2: Number(selectedPlateCoordinates.tr.x / getScaleFactor()),
                                y2: Number(selectedPlateCoordinates.tr.y / getScaleFactor()) + (maxHeight - height + opts.sawcutLineWidth)
                            });
                        }
                    });
                    canvasObj.renderAll();
                } else {
                    var currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
                    var selectedPlateCoordinates;
                    canvasObj.forEachObject(function(obj) {
                        if (obj.id === currentSelectedPlate) {
                            selectedPlateCoordinates = obj.oCoords;
                        }
                        if (obj.id === 'cutline') {
                            obj.set({
                                stroke: opts.visualSawLineErrorColor,
                                x1: Number(selectedPlateCoordinates.tl.x / getScaleFactor()),
                                y1: Number(selectedPlateCoordinates.tl.y / getScaleFactor()) + (maxHeight - height + opts.sawcutLineWidth),
                                x2: Number(selectedPlateCoordinates.tr.x / getScaleFactor()),
                                y2: Number(selectedPlateCoordinates.tr.y / getScaleFactor()) + (maxHeight - height + opts.sawcutLineWidth)
                            });
                        }
                    });
                    canvasObj.renderAll();
                }
            }
            return canvasObj;
        };
        /**
         * Toggle the state of buttons click, undo and redo
         * 
         * @param  {boolean}    state           Boolean value false to disable and true to enable
         * @return {object}     canvasObject    Object of the canvas
         */
        var toggleButtonState = function(state) {
            if (state) {
                document.getElementById('cut').disabled = false;
                document.getElementById('cut').classList.remove('disabled');
                document.getElementById('undo').disabled = false;
                document.getElementById('undo').classList.remove('disabled');
                document.getElementById('redo').disabled = false;
                document.getElementById('redo').classList.remove('disabled');
            } else {
                document.getElementById('cut').disabled = true;
                document.getElementById('cut').classList.add('disabled');
                document.getElementById('undo').disabled = true;
                document.getElementById('undo').classList.add('disabled');
                document.getElementById('redo').disabled = true;
                document.getElementById('redo').classList.add('disabled');
            }
        };
        /**
         * Check if chosen size validates with the minimum cutsize restrictions
         * 
         * @param  {number}   chosenSize          The chosen cut size
         * @param  {number}   plateSize           The plate size which is going to be cut
         * @param  {boolean}  fromPlateSawLine    If the function is called from the plateSawLine function 
         * @return {boolean}                      Returns boolean if the chosen size is valid or not
         */
        var checkMinCutSize = function(chosenSize, plateSize, fromPlateSawLine) {
            if (typeof fromPlateSawLine === "undefined") {
                fromPlateSawLine = false;
            }
            var format = getPlateFormat();
            var check = true;
            if (fromPlateSawLine) {
                if (chosenSize !== plateSize) {
                    if (format === 'landscape') {
                        if (Number(chosenSize) < Number(opts.minSawCutSize)) {
                            document.getElementById('error-msg').textContent = textStrings('cut_to_small');
                            document.getElementById('width').classList.add('was-validated');
                            document.getElementById('width').classList.add('is-invalid');
                            document.getElementById('error-msg-box').classList.add('show');
                            check = false;
                        }
                        if ((Number(plateSize) - Number(chosenSize)) < Number(opts.minSawCutSize)) {
                            document.getElementById('error-msg').textContent = textStrings('remainder_to_small');
                            document.getElementById('width').classList.add('was-validated');
                            document.getElementById('width').classList.add('is-invalid');
                            document.getElementById('error-msg-box').classList.add('show');
                            check = false;
                        }
                    } else {
                        if (Number(chosenSize) < Number(opts.minSawCutSize)) {
                            document.getElementById('error-msg').textContent = textStrings('cut_to_small');
                            document.getElementById('height').classList.add('was-validated');
                            document.getElementById('height').classList.add('is-invalid');
                            document.getElementById('error-msg-box').classList.add('show');
                            check = false;
                        }
                        if ((Number(plateSize) - Number(chosenSize)) < Number(opts.minSawCutSize)) {
                            document.getElementById('error-msg').textContent = textStrings('remainder_to_small');
                            document.getElementById('height').classList.add('was-validated');
                            document.getElementById('height').classList.add('is-invalid');
                            document.getElementById('error-msg-box').classList.add('show');
                            check = false;
                        }
                    }
                } else {
                    if (format === 'landscape') {
                        document.getElementById('error-msg').textContent = '';
                        document.getElementById('error-msg-box').classList.remove('show');
                        document.getElementById('width').classList.add('was-validated');
                        document.getElementById('width').classList.add('is-invalid');
                        check = false;
                    } else {
                        document.getElementById('error-msg').textContent = '';
                        document.getElementById('error-msg-box').classList.remove('show');
                        document.getElementById('height').classList.add('was-validated');
                        document.getElementById('height').classList.add('is-invalid');
                        check = false;
                    }
                }
                if (check) {
                    document.getElementById('error-msg').textContent = '';
                    document.getElementById('width').classList.remove('was-validated');
                    document.getElementById('width').classList.remove('is-invalid');
                    document.getElementById('height').classList.remove('was-validated');
                    document.getElementById('height').classList.remove('is-invalid');
                    document.getElementById('error-msg-box').classList.remove('show');
                    toggleButtonState(true);
                } else {
                    toggleButtonState(false);
                }
            } else {
                document.getElementById('error-msg').textContent = '';
                document.getElementById('width').classList.remove('was-validated');
                document.getElementById('width').classList.remove('is-invalid');
                document.getElementById('height').classList.remove('was-validated');
                document.getElementById('height').classList.remove('is-invalid');
                document.getElementById('error-msg-box').classList.remove('show');
            }
            return check;
        };
        /**
         * Creates the first plate to visualize the whole plate
         * 
         * @return {object}  canvasObject    Object of the canvas
         */
        this.createFirstCutBlock = function(canvasObj) {
            var width = opts.plateWidth - opts.plateBorder;
            var height = opts.plateHeight - opts.plateBorder;
            var format = getPlateFormat();
            var lineCharacter = fetchCutLetter(0);
            document.getElementById('currentCutNumber').value = 0;
            var letterObject = new fabric.Text(lineCharacter, {
                id: 'plateLetter_' + lineCharacter,
                left: 0 + ((opts.plateWidth / 2) - (getScaledFontSize() / 2)),
                top: 0 + (opts.plateHeight / 2) - (getScaledFontSize() / 2),
                fill: opts.plateLetterColor,
                fontWeight: opts.plateLetterFontWeight,
                fontSize: getScaledFontSize(),
                fontFamily: opts.plateLetterFontFamily,
                selectable: false,
                hasControls: false,
                absolutePositioned: true,
                evented: false,
            });
            var plateObject = new fabric.Rect({
                id: 'plateBox_' + lineCharacter,
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
            }).on('mousedown', function(e) {
                if (e.target) {
                    var width = this.width;
                    var height = this.height;
                    var current = this;
                    removeSawLine(canvasObj);
                    document.getElementById('error-msg-box').classList.remove('show');
                    canvasObj.forEachObject(function(obj) {
                        if (obj.id.includes('plateBox_')) {
                            obj.setColor(opts.plateBackgroundColor);
                            if (current.id === obj.id) {
                                createSawLine(canvasObj, obj.left, obj.top, width, height);
                                current.setColor(opts.activePlateBackgroundColor);
                                document.getElementById('currentSelectedPlate').value = obj.id;
                                setSizeInputs(canvasObj, width, height);
                            }
                        }
                    });
                    return false;
                }
            });
            canvasObj.add(plateObject, letterObject);
            createSawLine(canvasObj, 0, 0, opts.plateWidth, opts.plateHeight);
            return canvasObj;
        };
        /**
         * Creates the first plate to visualize the whole plate
         * 
         * @return {object}  canvasObject    Object of the canvas
         */
        var createFirstCutBlock = function(canvasObj) {
            var width = opts.plateWidth - opts.plateBorder;
            var height = opts.plateHeight - opts.plateBorder;
            var format = getPlateFormat();
            var lineCharacter = fetchCutLetter(0);
            document.getElementById('currentCutNumber').value = 0;
            var letterObject = new fabric.Text(lineCharacter, {
                id: 'plateLetter_' + lineCharacter,
                left: 0 + ((opts.plateWidth / 2) - (getScaledFontSize() / 2)),
                top: 0 + (opts.plateHeight / 2) - (getScaledFontSize() / 2),
                fill: opts.plateLetterColor,
                fontWeight: opts.plateLetterFontWeight,
                fontSize: getScaledFontSize(),
                fontFamily: opts.plateLetterFontFamily,
                selectable: false,
                hasControls: false,
                absolutePositioned: true,
                evented: false,
            });
            var plateObject = new fabric.Rect({
                id: 'plateBox_' + lineCharacter,
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
            }).on('mousedown', function(e) {
                if (e.target) {
                    var width = this.width;
                    var height = this.height;
                    var current = this;
                    removeSawLine(canvasOb);
                    document.getElementById('error-msg-box').classList.remove('show');
                    canvasObj.forEachObject(function(obj) {
                        if (obj.id.includes('plateBox_')) {
                            obj.setColor(opts.plateBackgroundColor);
                            if (current.id === obj.id) {
                                createSawLine(canvasObj, obj.left, obj.top, width, height);
                                current.setColor(opts.activePlateBackgroundColor);
                                document.getElementById('currentSelectedPlate').value = obj.id;
                                setSizeInputs(canvasObj, width, height);
                            }
                        }
                    });
                    return false;
                }
            });
            canvasObj.add(plateObject, letterObject);
            createSawLine(canvasObj, 0, 0, opts.plateWidth, opts.plateHeight);
            return canvasObj;
        };
        /**
         * Resize an cut
         * 
         * @param  {string}   blockId         Current selected plate
         * @param  {string}   blockLetterId   Id of the letter attached to current selected plate
         * @param  {number}   newWidth        The entered new width
         * @param  {number}   newHeight       The entered new height
         * @return {array}                    Array with coordinates of the resized object
         */
        var resizeCutBlock = function(canvasObj, blockId, blockLetterId, newWidth, newHeight) {
            var format = getPlateFormat();
            var rectangleCoords = '';
            canvasObj.forEachObject(function(obj) {
                if (format == 'landscape') {
                    if (obj.id === blockId) {
                        setSizeInputs(canvasObj, newWidth, newHeight);
                        obj.set('width', Number(newWidth));
                        obj.setColor(opts.activePlateBackgroundColor);
                        obj.setCoords();
                        rectangleCoords = obj.oCoords;
                        return rectangleCoords;
                    }
                    if (obj.id === blockLetterId) {
                        obj.set('left', (rectangleCoords['tl'].x / getScaleFactor()) + (parseFloat(newWidth) / 2));
                        obj.setCoords();
                    }
                } else {
                    if (obj.id === blockId) {
                        setSizeInputs(canvasObj, newWidth, newHeight);
                        obj.set('height', Number(newHeight));
                        obj.setColor(opts.activePlateBackgroundColor);
                        obj.setCoords();
                        rectangleCoords = obj.oCoords;
                        return rectangleCoords;
                    }
                    if (obj.id === blockLetterId) {
                        obj.set('top', (rectangleCoords['tl'].y / getScaleFactor()) + (parseFloat(newHeight) / 2));
                        obj.setCoords();
                    }
                }
            });
            return rectangleCoords;
        };
        /**
         * Create an new cut for the remainder of the cutted plate
         * 
         * @param  {array}    coordinates     The coordinates for the newly created plateobject 
         * @param  {number}   newWidth        The entered new width
         * @param  {number}   newHeight       The entered new height
         * @param  {string}   lineCharacter   The character of the newly created plateObject
         * @return {object}   canvasObj    Object of the canvas
         */
        var createCutBlock = function(canvasObj, coordinates, height, width, lineCharacter) {
            var fontSize = getScaledFontSize();
            var format = getPlateFormat();
            if (format == 'landscape') {
                var letterObject = new fabric.Text(lineCharacter, {
                    id: 'plateLetter_' + lineCharacter,
                    left: Number(coordinates['tr'].x) - (Number(width) / 2) - (Number(fontSize)),
                    top: Number(coordinates['tr'].y) + (Number(height) / 2) - (Number(fontSize) / 2),
                    fill: opts.plateLetterColor,
                    fontWeight: opts.plateLetterFontWeight,
                    selectable: false,
                    hasControls: false,
                    fontSize: fontSize,
                    fontFamily: opts.plateLetterFontFamily,
                }).setCoords();
                var plateObject = new fabric.Rect({
                    id: 'plateBox_' + lineCharacter,
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
                }).on('mousedown', function(e) {
                    var width = this.width;
                    var height = this.height;
                    var current = this;
                    removeSawLine(canvasObj);
                    document.getElementById('error-msg-box').classList.remove('show');
                    //on select set color rectangle
                    canvasObj.forEachObject(function(obj) {
                        if (obj.id.includes('plateBox_')) {
                            obj.setColor(opts.plateBackgroundColor);
                            if (current.id === obj.id) {
                                current.setColor(opts.activePlateBackgroundColor);
                                document.getElementById('currentSelectedPlate').value = obj.id;
                                setSizeInputs(canvasObj, width, height);
                                createSawLine(canvasObj, coordinates['tl'].x / getScaleFactor(), coordinates['tl'].y / getScaleFactor(), width, height);
                            }
                        }
                    });
                }).setCoords();
                canvasObj.add(plateObject, letterObject);
            } else {
                var letterObject = new fabric.Text(lineCharacter, {
                    id: 'plateLetter_' + lineCharacter,
                    left: (Number(coordinates['tl'].x) / getScaleFactor()) + (Number(width) / 2) - (Number(fontSize) / 2),
                    top: (Number(coordinates['tl'].y) / getScaleFactor()) + (Number(height) / 2) - (Number(fontSize) / 2),
                    fill: opts.plateLetterColor,
                    fontWeight: opts.plateLetterFontWeight,
                    selectable: false,
                    hasControls: false,
                    fontSize: fontSize,
                    fontFamily: opts.plateLetterFontFamily,
                }).setCoords();
                var plateObject = new fabric.Rect({
                    id: 'plateBox_' + lineCharacter,
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
                }).on('mousedown', function(e) {
                    var width = this.width;
                    var height = this.height;
                    var current = this;
                    removeSawLine(canvasObj);
                    document.getElementById('error-msg-box').classList.remove('show');
                    //on select set color rectangle
                    this.canvas.forEachObject(function(obj) {
                        if (obj.id.includes('plateBox_')) {
                            obj.setColor(opts.plateBackgroundColor);
                            if (current.id === obj.id) {
                                current.setColor(opts.activePlateBackgroundColor);
                                document.getElementById('currentSelectedPlate').value = obj.id;
                                setSizeInputs(canvasObj, width, height);
                                createSawLine(canvasObj, coordinates['tl'].x / getScaleFactor(), coordinates['tl'].y / getScaleFactor(), width, height);
                            }
                        }
                    });
                }).setCoords();
                canvasObj.add(plateObject, letterObject);
            }
            return canvasObj;
        };
        /**
         * Cut action
         * 
         * @return {object}  canvasObj    Object of the canvas
         */
        this.cutActionPlate = function(canvasObj) {
            var cutNumber = document.getElementById('currentCutNumber').value;
            var currentCutNumber = Number(cutNumber) + 1;
            var format = getPlateFormat();
            var lineCharacter = fetchCutLetter(currentCutNumber);
            var width = document.getElementById('width').value;
            var height = document.getElementById('height').value;
            var currentSelectedPlate = document.getElementById('currentSelectedPlate').value;
            var cuttedLetter = currentSelectedPlate.replace('plateBox_', 'plateLetter_');
            if (Number(cutNumber) > (Number(opts.maxCuts) - 1)) {
                document.getElementById('error-msg').textContent = textStrings('max_cuts');
                document.getElementById('error-msg-box').classList.add('show');
                return;
            } else {
                canvasObj.forEachObject(function(obj) {
                    if (obj.id === currentSelectedPlate) {
                        var oldWidth = obj.width;
                        var oldHeight = obj.height;
                        var oldCoordinates = obj.aCoords;
                        if (format == 'landscape') {
                            var check = checkMinCutSize(width, oldWidth);
                            if (check) {
                                var newCoordinates = resizeCutBlock(canvasObj, currentSelectedPlate, cuttedLetter, Number(width), Number(height));
                                var coordinates = {
                                    'tl': newCoordinates['tr'],
                                    'tr': oldCoordinates['tr'],
                                    'bl': newCoordinates['br'],
                                    'br': oldCoordinates['br']
                                }
                                createCutBlock(canvasObj, coordinates, Number(height), Number(oldWidth) - Number(width), fetchCutLetter(currentCutNumber))
                                document.getElementById('currentCutNumber').value = currentCutNumber;
                                document.getElementById('undo').disabled = false;
                                document.getElementById('redo').disabled = false;
                                document.getElementById('cutTotal').textContent = currentCutNumber;
                            }
                            updateTechnicalSawCutReferenceArray(cuttedLetter, width, format, true, 0);
                        } else {
                            var check = checkMinCutSize(height, oldHeight);
                            if (check) {
                                var newCoordinates = resizeCutBlock(canvasObj, currentSelectedPlate, cuttedLetter, Number(width), Number(height));
                                var coordinates = {
                                    'tl': newCoordinates['bl'],
                                    'tr': newCoordinates['br'],
                                    'bl': oldCoordinates['bl'],
                                    'br': oldCoordinates['br']
                                }
                                createCutBlock(canvasObj, coordinates, Number(oldHeight) - Number(height), Number(oldWidth), fetchCutLetter(currentCutNumber))
                                document.getElementById('currentCutNumber').value = currentCutNumber;
                                document.getElementById('undo').disabled = false;
                                document.getElementById('redo').disabled = false;
                                document.getElementById('cutTotal').textContent = currentCutNumber;
                            }
                            updateTechnicalSawCutReferenceArray(cuttedLetter, height, format, true, 0);
                        }
                    }
                });
                canvasObj.renderAll();
                updateCuttedPlatesList(canvasObj);
            }
        }
        // public methods 
        this.initialize = function() {
            var $this = this;
            //create canvas fabric object
            var canvasObj = canvasObject($this[0]);
            $this.setCanvasSize();
            $this.createFirstCutBlock(canvasObj);
            //bind click event to cut button
            var cutButton = document.getElementById('cut');
            cutButton.addEventListener("click", function onEvent(event) {
                event.preventDefault();
                $this.cutActionPlate(canvasObj);
                //switch inputs after cut
                if (document.querySelector('input.rotate:checked').value === 'landscape') {
                    document.querySelector('input.rotate[value="portrait"]').click();
                } else {
                    document.querySelector('input.rotate[value="landscape"]').click();
                }
            }, {
                passive: false
            });
            //add on keypress to width and height fields
            var widthInput = document.getElementById('width');
            var heightInput = document.getElementById('height');
            widthInput.addEventListener("change", function onEvent(event) {
                $this.setSawLinePosition(canvasObj)
            }, {
                passive: true
            });
            widthInput.addEventListener("wheel", function onEvent(event) {
                $this.setSawLinePosition(canvasObj)
            }, {
                passive: false
            });
            widthInput.addEventListener("keyup", function onEvent(event) {
                $this.setSawLinePosition(canvasObj)
                if (event.key === "Enter") {
                    document.getElementById('cut').click();
                }
            }, {
                passive: true
            });
            heightInput.addEventListener("change", function onEvent(event) {
                $this.setSawLinePosition(canvasObj)
            }, {
                passive: true
            });
            heightInput.addEventListener("wheel", function onEvent(event) {
                $this.setSawLinePosition(canvasObj)
            }, {
                passive: false
            });
            heightInput.addEventListener("keyup", function onEvent(event) {
                $this.setSawLinePosition(canvasObj)
                if (event.key === "Enter") {
                    document.getElementById('cut').click();
                }
            }, {
                passive: true
            });
            //bind onclick option to radios to rotate on click
            var rotateButtons = document.getElementsByClassName('rotate');
            for (var i = 0; i < rotateButtons.length; i++) {
                rotateButtons[i].addEventListener("click", function(e) {
                    $this.rotatePlate(canvasObj);
                }, {
                    passive: false
                });
            }
            document.getElementById('width').focus();
            return $this;
        };
        this.initialize();
        return this;
    };
}));