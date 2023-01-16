/**
* 2007-2020 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2020 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*
* Don't forget to prefix your containers with your own identifier
* to avoid any conflicts with others containers.
*/
var kiyohXml;
var xmlObject;
var kiyohReviews = '';

var monthArray = new Array("Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December");

function firstLetterUppercase(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function fetchIjzershopXmlPage(pageNr, reviewsPerPage=10) {
if(latestSavedFeed !== '' && pageNr === 0){
	var latestFeed = JSON.parse(latestSavedFeed).reviews.reviews;
	            var listElement = '';
                for (var i = 0; i < latestFeed.length; i++) {
                    var reviewContent = latestFeed[i].reviewContent.reviewContent;
                    var reviewReaction = latestFeed[i].reviewComments;
                    var date = new Date(latestFeed[i].dateSince);
                    listElement += `<li class="col-md-12">
						<table>
							<tr>
								<td class="rating-number-td">
									<div class="rating-number">
									    <svg width="88px" height="96px" viewBox="0 0 88 96" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#3b56ad">
									        <g transform="translate(-22.000000, -16.000000)">
									            <path d="M19.8135517,88.6138147 C23.8956008,95.0045785 29.4192056,100.006816 35.6894849,103.450723 L35.729738,103.475727 C42.1684482,106.998217 49.3917506,108.878023 56.6657471,108.914292 C60.5032552,108.934762 64.3586231,108.440734 68.1132895,107.399649 L68.1255166,107.427125 C72.406221,106.337132 76.3394848,104.910963 79.9305286,103.257701 C87.6067813,99.7310894 93.744349,95.1694376 98.5363914,90.6088848 C108.36488,81.2494205 112.514659,71.8916047 112.622642,71.4784952 C112.622642,71.4784952 105.677402,74.5320983 98.1357838,76.4937844 C99.1146348,72.8271802 99.6098991,69.0369317 99.6094869,65.2273122 C99.6052281,60.526217 98.8394574,55.7954472 97.2669762,51.2273384 C96.1712126,48.0506405 94.6906403,44.9517012 92.8025913,41.9941286 C91.4526698,39.8821459 89.9459949,37.9234822 88.3163625,36.1313262 C79.2062475,26.1172337 66.0781037,21.1439836 53.034038,22.1207739 C46.1272652,22.6399428 39.2457708,24.8240513 32.9956868,28.8118561 C15.6266796,39.9066 8.8434137,61.3256463 15.5431509,79.9332952 C16.6173455,82.9166957 18.0337601,85.8275582 19.8135517,88.6138147" id="txt_balloon" transform="translate(62.811321, 65.457451) scale(-1, 1) rotate(-300.000000) translate(-62.811321, -65.457451) "></path>
									        </g>
									    </svg>`;
					                    listElement += '<span>' + reviewContent[0].rating + '</span>';
					                    listElement += `</div></td><td><table class="review-inner-table"><tr>`;
					                    listElement += '<td class="review-title">' + firstLetterUppercase(reviewContent[1].rating) + '</td>';
					                    listElement += `</tr><tr>`;
					                    listElement += '<td class="review-comment">' + reviewContent[2].rating.replace(new RegExp('\r?\n','g'), '<br />') + '</td>';
					                    listElement += `</tr><tr>`;
					                    listElement += `</tr><tr>`;
					                    listElement += '<td class="review-author"><strong>' + date.getDate() + ' ' + monthArray[date.getMonth()] + ' ' + date.getFullYear() + '</strong>  <span>' + firstLetterUppercase(latestFeed[i].reviewAuthor) + ', ' + firstLetterUppercase(latestFeed[i].city) + '</span></td>';
					                    listElement += `</tr><tr>`;
					                    if(reviewReaction !== undefined){
					                    	listElement += `<td><hr></hr></td></tr><tr>`;
					                    	listElement += '<td class="review-company-reaction"><strong>'+ourReactionText+'</strong><br/><span>'+reviewReaction.replace(new RegExp('\r?\n','g'), '<br />')+'</span></td>';
					                    }
					                    listElement += `</tr>
									</table>
								</td>
							</tr>
						</table>
					</li>`;
                }
                document.getElementById('kiyoh-comment-list').innerHTML = document.getElementById('kiyoh-comment-list').innerHTML + listElement;
return;
} else {


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.kiyoh.com/v1/review/feed.xml?hash=e1fk9hurmsnjxrv&pageNumber="+pageNr+"&limit="+reviewsPerPage);
    xhr.setRequestHeader('Content-Type', 'application/xml');

    xhr.onload = function(e) {
        var data = e.target;
        if (data.readyState === 4) {
            if (data.status === 200) {
                xmlObject = xmlToJson.parse(data.responseXML).ReviewFeedDto;
                if(parseInt(totalReviewsInDatabase) === parseInt(xmlObject.numberReviews) && pageNr == 0){
                	checkReviewsTotalAndUpdateLatest(xmlObject);
            	}

                kiyohReviews = xmlObject.reviews.reviews;

                var listElement = '';
                for (var i = 0; i < kiyohReviews.length; i++) {
                    var reviewContent = kiyohReviews[i].reviewContent.reviewContent;
                    var reviewReaction = kiyohReviews[i].reviewComments;
                    var date = new Date(kiyohReviews[i].dateSince);
                    listElement += `<li class="col-md-12">
						<table>
							<tr>
								<td class="rating-number-td">
									<div class="rating-number">
									    <svg width="88px" height="96px" viewBox="0 0 88 96" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#3b56ad">
									        <g transform="translate(-22.000000, -16.000000)">
									            <path d="M19.8135517,88.6138147 C23.8956008,95.0045785 29.4192056,100.006816 35.6894849,103.450723 L35.729738,103.475727 C42.1684482,106.998217 49.3917506,108.878023 56.6657471,108.914292 C60.5032552,108.934762 64.3586231,108.440734 68.1132895,107.399649 L68.1255166,107.427125 C72.406221,106.337132 76.3394848,104.910963 79.9305286,103.257701 C87.6067813,99.7310894 93.744349,95.1694376 98.5363914,90.6088848 C108.36488,81.2494205 112.514659,71.8916047 112.622642,71.4784952 C112.622642,71.4784952 105.677402,74.5320983 98.1357838,76.4937844 C99.1146348,72.8271802 99.6098991,69.0369317 99.6094869,65.2273122 C99.6052281,60.526217 98.8394574,55.7954472 97.2669762,51.2273384 C96.1712126,48.0506405 94.6906403,44.9517012 92.8025913,41.9941286 C91.4526698,39.8821459 89.9459949,37.9234822 88.3163625,36.1313262 C79.2062475,26.1172337 66.0781037,21.1439836 53.034038,22.1207739 C46.1272652,22.6399428 39.2457708,24.8240513 32.9956868,28.8118561 C15.6266796,39.9066 8.8434137,61.3256463 15.5431509,79.9332952 C16.6173455,82.9166957 18.0337601,85.8275582 19.8135517,88.6138147" id="txt_balloon" transform="translate(62.811321, 65.457451) scale(-1, 1) rotate(-300.000000) translate(-62.811321, -65.457451) "></path>
									        </g>
									    </svg>`;
					                    listElement += '<span>' + reviewContent[0].rating + '</span>';
					                    listElement += `</div></td><td><table class="review-inner-table"><tr>`;
					                    listElement += '<td class="review-title">' + firstLetterUppercase(reviewContent[1].rating) + '</td>';
					                    listElement += `</tr><tr>`;
					                    listElement += '<td class="review-comment">' + reviewContent[2].rating.replace(new RegExp('\r?\n','g'), '<br />') + '</td>';
					                    listElement += `</tr><tr>`;
					                    listElement += `</tr><tr>`;
					                    listElement += '<td class="review-author"><strong>' + date.getDate() + ' ' + monthArray[date.getMonth()] + ' ' + date.getFullYear() + '</strong>  <span>' + firstLetterUppercase(kiyohReviews[i].reviewAuthor) + ', ' + firstLetterUppercase(kiyohReviews[i].city) + '</span></td>';
					                    listElement += `</tr><tr>`;
					                    if(reviewReaction !== undefined){
					                    	listElement += `<td><hr></hr></td></tr><tr>`;
					                    	listElement += '<td class="review-company-reaction"><strong>'+ourReactionText+'</strong><br/><span>'+reviewReaction.replace(new RegExp('\r?\n','g'), '<br />')+'</span></td>';
					                    }
					                    listElement += `</tr>
									</table>
								</td>
							</tr>
						</table>
					</li>`;
                }
                document.getElementById('kiyoh-comment-list').innerHTML = document.getElementById('kiyoh-comment-list').innerHTML + listElement;
            } else {
                document.getElementById('kiyoh-banner-block').style.display = 'none';
            }
        }
    };
    xhr.onerror = function(e) {
        document.getElementById('kiyoh-banner-block').style.display = 'none';
    };
    xhr.send(null);
	}
}
function fetchNextIjzershopXmlPage(){
	var pageNr = parseInt(document.getElementById('review-page').value)+1;
	fetchIjzershopXmlPage(pageNr, reviewsPerPage);
	document.getElementById('review-page').value = pageNr;
}
function readMoreOnKiyohWebsite(){
	var pageNr = parseInt(document.getElementById('review-page').value);
	window.open('https://www.kiyoh.com/reviews/1046584/ijzershop?lang=nl&limit='+reviewsPerPage+'&pageNumber='+pageNr, '_blank');
}
var kiyohButtonElem = document.getElementById('loadMoreReviews');
if (typeof(kiyohButtonElem) != 'undefined' && kiyohButtonElem != null)
{
	kiyohButtonElem.setAttribute('onclick','fetchNextIjzershopXmlPage()');
}
fetchIjzershopXmlPage(0,10);
