/*
* jQuery Prestagify plugin
* https://www.prestashop.com
*
* Copyright PrestaShop and other contributors
* Released under the MIT license
* https://tldrlegal.com/license/mit-license
*
* Date: 2016-01-13
*/

(function ( $ ) {
    var config = null;
    var validateKeyCode = 13;
    var tagsList = [];
    var fullTagsString = null;
    var prestagifyInput = null;
    var defaultConfig = {
        /* Global css config */
        wrapperClassAdditional: '',
        /* Tags part */
        tagsWrapperClassAdditional: '',
        tagClassAdditional: '',
        closingCrossClassAdditionnal: '',
        /* Tag Input part */
        tagInputWrapperClassAdditional: '',
        tagInputClassAdditional: '',
        /* Global configuration */
        delimiter: ' ',
        inputPlaceholder: 'Add tag ...',
        closingCross: true,
        context: null,
        clearAllBtn: false,
        clearAllIconClassAdditional: '',
        clearAllSpanClassAdditional: '',
        /* Callbacks */
        onTagsChanged: null,
        onResetTags: null,
    };
    var immutableConfig = {
        /* Global css config */
        wrapperClass: 'prestagifyWrapper',
        /* Tags part */
        tagsWrapperClass: 'prestagifyTagsWrapper',
        tagClass: 'prestagifyTag',
        /* Tag Input part */
        tagInputWrapperClass: 'prestagifyAddTagWrapper',
        tagInputClass: 'prestagifyAddTagInput',
        clearAllIconClass: '',
        clearAllSpanClass: 'prestagifyResetTagsBtn',
        closingCrossClass: 'prestagifyClosingCross',
    };

    var bindValidationInputEvent = function() {
        // Validate input whenever validateKeyCode is pressed
        prestagifyInput.keypress(function(event) {
            if (event.keyCode == validateKeyCode) {
                tagsList = [];
                processInput();
            }
        });
        // If focusout of input, display tagsWrapper if not empty or leave input as is
        prestagifyInput.focusout(function(event){

         // Necessarry to avoid race condition when focusout input because we want to reset :-)
          if ($('.' + immutableConfig.clearAllSpanClass + ':hover').length) {
              return false;
          }
            // Only redisplay tags on focusOut if there's something in tagsList
            if (prestagifyInput.val().length) {
                tagsList = [];
                processInput();
            }
        });
    };

    var processInput = function() {
        var fullTagsStringRaw = prestagifyInput.val();
        var tagsListRaw = fullTagsStringRaw.split(config.delimiter);

        // Check that's not an empty input
        if (fullTagsStringRaw.length) {
            // Loop over each tags we got this round
            for (var key in tagsListRaw) {
                var tagRaw = tagsListRaw[key];
                // No empty values
                if (tagRaw === '') {
                    continue;
                }
                // Add tag into persistent list
                tagsList.push(tagRaw);
            }
            var spanTagsHtml = '';
            // Create HTML dom from list of tags we have
            for (key in tagsList) {
                var tag = tagsList[key];
                spanTagsHtml += formatSpanTag(tag);
            }
            //  Delete previous if any, then add recreated html content
            $('.' + immutableConfig.tagsWrapperClass).empty().prepend(spanTagsHtml).css('display', 'block');
            // Hide input until user click on tagify_tags_wrapper
            $('.' + immutableConfig.tagInputWrapperClass).css('display', 'none');

        } else {
            $('.' + immutableConfig.tagsWrapperClass).css('display', 'none');
            $('.' + immutableConfig.tagInputWrapperClass).css('display', 'block');
            prestagifyInput.focus();
        }
        // Call the callback ! (if one)
        if (config.onTagsChanged !== null) {
            config.onTagsChanged.call(config.context, tagsList);
        }
    };

    var formatSpanTag = function(tag) {
        var spanTag =   '<span class="' + immutableConfig.tagClass + ' ' + config.tagClassAdditional+'">' +
                            '<span>' +
                                tag +
                            '</span>';
        // Add closingCross if set to true
        if (config.closingCross === true) {
            spanTag += '<a class="' + immutableConfig.closingCrossClass + ' ' + config.closingCrossClassAdditionnal+'" href="#">x</a>';
        }
        spanTag += '</span>';
        return spanTag;
    };

    var constructTagInputForm = function() {
        // First hide native input
        config.originalInput.css('display', 'none');
        var addClearBtnHtml = '';
        // If reset button required add it following user decription
        if (config.clearAllBtn === true) {
            addClearBtnHtml += '<span class="' + immutableConfig.clearAllSpanClass + ' ' + config.clearAllSpanClassAdditional +'">' +
                                        '<i class="' + immutableConfig.clearAllIconClass + ' ' + config.clearAllIconClassAdditional +'"></i>' +
                                    '</span>';
            // Bind the click on the reset icon
            bindResetTagsEvent();
        }
        // Add Tagify form after it
        var formHtml = '<div class="' + immutableConfig.wrapperClass + ' ' + config.wrapperClassAdditional +'">' +
                        addClearBtnHtml +
                        '<div class="' + immutableConfig.tagsWrapperClass + ' ' + config.tagsWrapperClassAdditional +'"></div>' +
                        '<div class="' + immutableConfig.tagInputWrapperClass + ' ' + config.tagInputWrapperClassAdditional +'">' +
                            '<input class="' + immutableConfig.tagInputClass + ' ' + config.tagInputClassAdditional +'">' +
                        '</div>' +
                        '</div>';
        // Insert form after the originalInput
        config.originalInput.after(formHtml);
        // Save tagify input in our object
        prestagifyInput = $('.' + immutableConfig.tagInputClass);
        // Add placeholder on tagify's input
        prestagifyInput.attr('placeholder',  config.inputPlaceholder);
        return true;
    };

    var bindFocusInputEvent = function() {
        // Bind click on tagsWrapper to switch and focus on input
        $('.' + immutableConfig.tagsWrapperClass).on('click', function(event) {
            var clickedElementClasses = event.target.className;
            // Regexp to check if not clicked on closingCross to avoid focusing input if so
            var checkClosingCrossRegex = new RegExp(immutableConfig.closingCrossClass, 'g');
            var closingCrossClicked = clickedElementClasses.match(checkClosingCrossRegex);
            if ($('.' + immutableConfig.tagInputWrapperClass).is(':hidden') &&  closingCrossClicked === null) {
                $('.' + immutableConfig.tagsWrapperClass).css('display', 'none');
                $('.' + immutableConfig.tagInputWrapperClass).css('display', 'block');
                prestagifyInput.focus();
            }
        });
    };

    var bindResetTagsEvent = function() {
        // Use delegate since we bind it before we insert the html in the DOM
        var _this = this;
        $(document).delegate('.' + immutableConfig.clearAllSpanClass, 'click', function(){
            resetTags(true);
        });
    };

    var resetTags = function(withCallback) {
        // Empty tags list and tagify input
        tagsList = [];
        prestagifyInput.val('');
        $('.' + immutableConfig.tagsWrapperClass).css('display', 'none');
        $('.' + immutableConfig.tagInputWrapperClass).css('display', 'block');
        prestagifyInput.focus();
        // Empty existing Tags
        $('.' + immutableConfig.tagClass).remove();
        // Call the callback if one !
        if (config.onResetTags !== null && withCallback === true) {
            config.onResetTags.call(config.context);
        }
    }


    var bindClosingCrossEvent = function() {
        $(document).delegate('.' + immutableConfig.closingCrossClass, 'click', function(event){
            var thisTagWrapper = $(this).parent();
            var clickedTagIndex = thisTagWrapper.index();
            // Iterate through tags to reconstruct new prestagifyInput value
            var newInputValue = reconstructInputValFromRemovedTag(clickedTagIndex);
            // Apply new input value
            prestagifyInput.val(newInputValue);
            thisTagWrapper.remove();
            tagsList = [];
            processInput();
        });
    };

    var reconstructInputValFromRemovedTag = function(clickedTagIndex) {
        var finalStr = '';
        $('.' + immutableConfig.tagClass).each(function(index, value) {
            // If this is the tag we want to remove then continue else add to return string val
            if (clickedTagIndex == $(this).index()) {
                // jQuery.each() continue;
                return true;
            }
            // Add to return value
            finalStr += ' ' + $(this).children().first().text();
        });
        return finalStr;
    };

    var getTagsListOccurencesCount = function() {
        var obj = {};
        for (var i = 0, j = tagsList.length; i < j; i++) {
           obj[tagsList[i]] = (obj[tagsList[i]] || 0) + 1;
        }
        return obj;
    };

    var setConfig = function(givenConfig, originalObject) {
        var finalConfig = {};
        // Loop on each default values, check if one given by user, if so -> override default
        for (var property in defaultConfig) {
            if (givenConfig.hasOwnProperty(property)) {
                finalConfig[property] = givenConfig[property];
            } else {
                finalConfig[property] = defaultConfig[property];
            }
        }
        finalConfig.originalInput = originalObject;
        return finalConfig;
    };

    // jQuery extends function
    $.fn.Prestagify = function(_config) {
        config = setConfig(_config, this);
        constructTagInputForm();
        bindValidationInputEvent();
        bindFocusInputEvent();
        bindClosingCrossEvent();

        return {
            'resetTags': resetTags,
        }
    };
}(jQuery));
