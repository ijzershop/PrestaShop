{*
* Replaces the string order reference with numeric one
*
* @package   gmnumericreference
* @author    Dariusz Tryba (contact@greenmousestudio.com)
* @copyright Copyright (c) Green Mouse Studio (http://www.greenmousestudio.com)
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*}
<div class="row-fluid">
   <div class="panel col-md-3 text-center">
      <a href="http://greenmousestudio.com" target="_blank"><img style="margin-bottom: 7px;" height="50" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARkAAAB4CAYAAADGz4ZcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjNCRjAyNTdBRDc5MTFFNUFBQjdGNENDRjRBNjczQUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjNCRjAyNThBRDc5MTFFNUFBQjdGNENDRjRBNjczQUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGM0JGMDI1NUFENzkxMUU1QUFCN0Y0Q0NGNEE2NzNBQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGM0JGMDI1NkFENzkxMUU1QUFCN0Y0Q0NGNEE2NzNBQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps/BGHIAADU0SURBVHja7F0HWFRH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" /></a>
      <p><strong><a style="color: #74C044;" href="http://greenmousestudio.com" target="_blank">GreenMouseStudio.com</a></strong></p>
      <p>Power Up Your Prestashop!</p>
   </div>
</div>
<div class="row clearfix">
   <div class="panel col-md-12">
      <a href="https://www.paypal.me/DTryba/10usd" class="btn btn-warning btn-large">{l s='Click here to donate if you enjoy using this module :)' mod='gmgetfreeshipping'}</a>
   </div>
</div>