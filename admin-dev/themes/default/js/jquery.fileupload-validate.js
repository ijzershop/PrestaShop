/*
 * jQuery File Upload Validation Plugin 1.1.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jslint nomen: true, unparam: true, regexp: true */
/* global define, window */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module:
    define([
      'jquery',
      './jquery.fileupload-process',
    ], factory);
  } else {
    // Browser globals:
    factory(
      window.jQuery,
    );
  }
}(($) => {
  // Append to the default processQueue:
  $.blueimp.fileupload.prototype.options.processQueue.push(
    {
      action: 'validate',
      // Always trigger this action,
      // even if the previous action was rejected:
      always: true,
      // Options taken from the global options map:
      acceptFileTypes: '@',
      maxFileSize: '@',
      minFileSize: '@',
      maxNumberOfFiles: '@',
      disabled: '@disableValidation',
    },
  );

  // The File Upload Validation plugin extends the fileupload widget
  // with file validation functionality:
  $.widget('blueimp.fileupload', $.blueimp.fileupload, {

    options: {
      /*
            // The regular expression for allowed file types, matches
            // against either file type or file name:
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            // The maximum allowed file size in bytes:
            maxFileSize: 10000000, // 10 MB
            // The minimum allowed file size in bytes:
            minFileSize: undefined, // No minimal file size
            // The limit of files to be uploaded:
            maxNumberOfFiles: 10,
            */

      // Function returning the current number of files,
      // has to be overriden for maxNumberOfFiles validation:
      getNumberOfFiles: $.noop,

      // Error and info messages:
      messages: {
        maxNumberOfFiles: 'Maximum number of files exceeded',
        acceptFileTypes: 'File type not allowed',
        maxFileSize: 'File is too large',
        minFileSize: 'File is too small',
      },
    },

    processActions: {

      validate(data, options) {
        if (options.disabled) {
          return data;
        }
        const dfd = $.Deferred();
        const settings = this.options;
        const file = data.files[data.index];
        if ($.type(options.maxNumberOfFiles) === 'number'
                        && (settings.getNumberOfFiles() || 0) + data.files.length
                            > options.maxNumberOfFiles) {
          file.error = settings.i18n('maxNumberOfFiles');
        } else if (options.acceptFileTypes
                        && !(options.acceptFileTypes.test(file.type)
                        || options.acceptFileTypes.test(file.name))) {
          file.error = settings.i18n('acceptFileTypes');
        } else if (options.maxFileSize && file.size
                        > options.maxFileSize) {
          file.error = settings.i18n('maxFileSize');
        } else if ($.type(file.size) === 'number'
                        && file.size < options.minFileSize) {
          file.error = settings.i18n('minFileSize');
        } else {
          delete file.error;
        }
        if (file.error || data.files.error) {
          data.files.error = true;
          dfd.rejectWith(this, [data]);
        } else {
          dfd.resolveWith(this, [data]);
        }
        return dfd.promise();
      },

    },

  });
}));
