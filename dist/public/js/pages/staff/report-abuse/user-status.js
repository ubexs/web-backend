"use strict";var isLoading=!1,noReports=!1;$(document).on("click",".confirm-status-ok",function(a){if(a.preventDefault(),!isLoading){var b=parseInt($(this).attr("data-reportid"),10),c=parseInt($(this).attr("data-statusid"),10);request("/staff/feed/friends/abuse-report/"+b+"/","PATCH",{status:3}).then(function(){// yay
}),loadStatus()}}),$(document).on("click",".confirm-status-bad",function(a){if(a.preventDefault(),!isLoading){var b=parseInt($(this).attr("data-reportid"),10),c=parseInt($(this).attr("data-statusid"),10);request("/staff/feed/friends/abuse-report/"+b+"/","PATCH",{status:2}).then(function(){// yay
}),request("/staff/feed/friends/"+c+"/","DELETE",{}).then(function(){// yay
}),loadStatus()}}),setInterval(function(){noReports&&!1===isLoading&&loadStatus()},5e3);var loadStatus=function(){isLoading=!0,$("div#pendingAssetsDiv").empty(),request("/staff/feed/friends/abuse-reports","GET").then(function(a){var b=[];if(0===a.length)return noReports=!0,isLoading=!1,void $("div#pendingAssetsDiv").append("<div class=\"col-12\"><h3>There are no user status reports at this time.</h3></div>");noReports=!1;var c=a[0];console.log(c),b.push(c.userId,c.reportUserId),$("div#pendingAssetsDiv").append("\n            \n            <div class=\"col-12\" style=\"margin-bottom:1rem;\">\n                <div class=\"card\">\n                    <div class=\"card-body\">\n                        <p style=\"font-size:0.75rem;\" class=\"font-weight-bold\">Reported By: <span data-userid=\"".concat(c.reportUserId,"\"></span> (").concat(moment(c.createdAt).fromNow(),")</p>\n                        <div id=\"user-status\">\n                            <p style=\"white-space:pre-wrap;margin-top:1rem;\" class=\"user-status-linkify\">").concat(xss(c.status),"</p>\n                        </div>\n                        <div class=\"row\" style=\"margin-top:1rem;\">\n                            <div class=\"col-6\">\n                                <button type=\"button\" class=\"btn btn-success confirm-status-ok\" data-statusid=\"").concat(c.userStatusId,"\" data-reportid=\"").concat(c.reportId,"\" style=\"width: 100%;\" disabled=\"disabled\">STATUS OK</button>\n                            </div>\n                            <div class=\"col-6\">\n                                <button type=\"button\" class=\"btn btn-danger confirm-status-bad\" data-statusid=\"").concat(c.userStatusId,"\" data-reportid=\"").concat(c.reportId,"\" style=\"width: 100%;\" disabled=\"disabled\">STATUS BAD</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            \n            ")),c.status.match(/https:\/\/[a-zA-Z\d-]+\./g)?request("/feed/friends/multi-get-og-info?ids="+c.userStatusId).then(function(a){var b=!0,c=!1,d=void 0;try{for(var e,f=a[Symbol.iterator]();!(b=(e=f.next()).done);b=!0){var g=e.value,h="";if(console.log(g),g.ogInfo){var i=g.ogInfo;i.title&&(h+="<p><span class=\"font-weight-bold\">Title: </span>".concat(xss(i.title),"</p>")),i.description&&(h+="<p><span class=\"font-weight-bold\">Description: </span>".concat(xss(i.description),"</p>")),i.thumbnailUrl&&(h+="<p><span class=\"font-weight-bold\">Image: </span></p> <img class=\"hover-to-view-image\" src=\"".concat(xss(i.thumbnailUrl),"\" />")),h+="<hr />"}$("#user-status").append(h)}}catch(a){c=!0,d=a}finally{try{b||null==f["return"]||f["return"]()}finally{if(c)throw d}}setTimeout(function(){isLoading=!1,$(".confirm-status-bad").removeAttr("disabled"),$(".confirm-status-ok").removeAttr("disabled")},750)})["catch"](function(a){console.error(a),setTimeout(function(){isLoading=!1,$(".confirm-status-bad").removeAttr("disabled"),$(".confirm-status-ok").removeAttr("disabled")},500)}):setTimeout(function(){isLoading=!1,$(".confirm-status-bad").removeAttr("disabled"),$(".confirm-status-ok").removeAttr("disabled")},500),setUserNames(b),$(".user-status-linkify").linkify({target:"_blank",attributes:{rel:"noopener nofollow"}})})["catch"](function(a){isLoading=!1,console.error(a),warning(a.responseJSON.message)})};loadStatus();






































