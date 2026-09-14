(function () {
  'use strict';

  function initialize() {
    var form = document.getElementById('plasma-library-upload');
    if (!form || form.dataset.initialized) return;
    form.dataset.initialized = '1';
    var fileInput = document.getElementById('plasma-library-file');
    var dropzone = document.getElementById('plasma-library-dropzone');
    var feedback = document.getElementById('plasma-library-feedback');
    var button = form.querySelector('button[type="submit"]');

    ['dragenter', 'dragover'].forEach(function (name) {
      dropzone.addEventListener(name, function (event) {
        event.preventDefault();
        dropzone.classList.add('bg-info');
      });
    });
    ['dragleave', 'drop'].forEach(function (name) {
      dropzone.addEventListener(name, function (event) {
        event.preventDefault();
        dropzone.classList.remove('bg-info');
      });
    });
    dropzone.addEventListener('drop', function (event) {
      if (event.dataTransfer && event.dataTransfer.files.length === 1) {
        fileInput.files = event.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change', {bubbles: true}));
      }
    });

    form.addEventListener('submit', function (event) {
      if (!window.fetch || !window.FormData) return;
      event.preventDefault();
      if (button.disabled) return;
      var data = new FormData(form);
      data.set('plasma_ajax', '1');
      button.disabled = true;
      button.textContent = button.dataset.busyLabel;
      form.setAttribute('aria-busy', 'true');
      feedback.className = '';
      feedback.textContent = '';
      fetch(form.action, {method: 'POST', body: data, credentials: 'same-origin'})
        .then(function (response) {
          if (!(response.headers.get('content-type') || '').includes('application/json')) {
            throw new Error('De sessie is verlopen of de upload kon niet worden verwerkt. Herlaad de pagina en probeer opnieuw.');
          }
          return response.json();
        })
        .then(function (result) {
          if (!result.success) throw new Error(result.message || 'De tekening kon niet worden verwerkt.');
          feedback.className = 'alert alert-success';
          feedback.textContent = result.message;
          window.location.assign(form.action);
        })
        .catch(function (error) {
          feedback.className = 'alert alert-danger';
          feedback.textContent = error.message;
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = button.dataset.idleLabel;
          form.removeAttribute('aria-busy');
        });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})();
