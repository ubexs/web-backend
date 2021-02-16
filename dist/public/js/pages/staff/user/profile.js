"use strict";$("#deleteUserBlurb").click(function(){// delete here
request("/staff/user/"+$("#userId").val()+"/blurb","DELETE").then(function(){success("This user's blurb has been deleted."),$("#userblurb").val("[ Content Deleted ]")})["catch"](function(a){warning(a.responseJSON.message)})}),$("#deleteUserStatus").click(function(){// delete
request("/staff/user/"+$("#userId").val()+"/status","DELETE").then(function(){success("This user's status has been deleted."),$("#userstatus").val("[ Content Deleted ]")})["catch"](function(a){warning(a.responseJSON.message)})}),$("#deleteUserForumSignature").click(function(){// delete
request("/staff/user/"+$("#userId").val()+"/forum/signature","DELETE").then(function(){success("This user's forum signature has been deleted."),$("#userforumsignature").val("[ Content Deleted ]")})["catch"](function(a){warning(a.responseJSON.message)})}),$("#disableTwoFactor").click(function(){questionYesNo("Are you sure you'd like to disable 2FA for this user?",function(){request("/staff/user/"+$("#userId").val()+"/two-factor","DELETE").then(function(){success("This user's two-factor authentication has been disabled."),$("#two-factor-enabled").empty().append("<span style=\"font-weight:600;\" id=\"two-factor-enabled\">2-Factor Enabled: </span><span style=\"font-weight:100;\">No</span>")})["catch"](function(a){warning(a.responseJSON.message)})})}),$("#deleteUserPrimaryBalance").click(function(){questionYesNo("Are you sure you'd like to clear the primary balance of this user?",function(){request("/staff/user/"+$("#userId").val()+"/clear-balance/1","DELETE").then(function(){success("This user's balance has been cleared."),$("#user-balance-primary").empty().append("0")})["catch"](function(a){warning(a.responseJSON.message)})})}),$("#deleteUserSecondaryBalance").click(function(){questionYesNo("Are you sure you'd like to clear the secondary balance of this user?",function(){request("/staff/user/"+$("#userId").val()+"/clear-balance/2","DELETE").then(function(){success("This user's balance has been cleared."),$("#user-balance-secondary").empty().append("0")})["catch"](function(a){warning(a.responseJSON.message)})})}),$(document).on("click","#sendStaffComment",function(){var a=$("#staffCommentText").val();request("/staff/user/"+$("#userId").val()+"/comment","POST",JSON.stringify({comment:a})).then(function(){window.location.reload()})["catch"](function(a){warning(a.responseJSON.message)})}),request("/staff/user/"+$("#userId").val()+"/associated-accounts").then(function(a){var b=function(a){return 1===a?"Same IP Address":void 0},c=[],d=!0,e=!1,f=void 0;try{for(var g,h,i=a.accounts[Symbol.iterator]();!(d=(g=i.next()).done);d=!0)h=g.value,c.push(h.userId),$("#associatedAccountsArray").append("\n        <div class=\"row\" style=\"padding-top:1rem;\">\n            <div class=\"col-12\">\n                <p>Username: <a href=\"/staff/user/profile?userId=".concat(h.userId,"\"><span data-userid=\"").concat(h.userId,"\">N/A</span></a></p>\n                <p>Reason: ").concat(b(h.reason),"</p>\n                <hr />\n            </div>\n        </div>"))}catch(a){e=!0,f=a}finally{try{d||null==i["return"]||i["return"]()}finally{if(e)throw f}}setUserNames(c)})["catch"](function(){$("#associatedAccountsArray").html("<p>There was an error loading the accounts. Try again later.</p>")});/**
 * Load User Profile Comments
 */var commentsLoading=!1,areThereMoreComments=!1,getComments=function(a){commentsLoading||(commentsLoading=!0,request("/staff/user/"+$("#userId").val()+"/comments?offset="+a).then(function(b){var c=[];0===b.comments.length&&0===a&&$("#staffComments").append("\n            <div class=\"col-12\">\n                <p>This user does not have any comments</p>\n            </div>\n            "),25<=b.comments.length&&(areThereMoreComments=!0);var d=!0,e=!1,f=void 0;try{for(var g,h,i=b.comments[Symbol.iterator]();!(d=(g=i.next()).done);d=!0)h=g.value,c.push(h.staffUserId),$("#staffComments").append("\n            <div class=\"col-12\" style=\"padding-top:0.5rem;\">\n                <div class=\"row\">\n                    <div class=\"col-2\">\n                        <img data-userid=\"".concat(h.staffUserId,"\" style=\"width:100%;max-width:150px;margin:0 auto;display: block;\" />\n                        <p class=\"text-center\">\n                            <span data-userid=\"").concat(h.staffUserId,"\" style=\"font-weight:600;\"></span>\n                        </p>\n                        <p class=\"text-center\">\n                            <span>").concat(moment(h.dateCreated).format("DD MMM YYYY"),"</span>\n                        </p>\n                    </div>\n                    <div class=\"col-10\">\n                        <p>").concat(h.comment.escapeAllowFormattingBasic(),"</p>\n                    </div>\n                </div>\n            </div>\n            "))}catch(a){e=!0,f=a}finally{try{d||null==i["return"]||i["return"]()}finally{if(e)throw f}}commentsLoading=!1,setUserThumbs(c),setUserNames(c)})["catch"](function(a){console.log(a),commentsLoading=!1}))};getComments(0);var _isDevLocked=!1;$("#is-developer").change(function(){var a=this;console.log("Change"),$(this).attr("disabled","disabled"),_isDevLocked=!0,request("/staff/user/"+$("#userId").val()+"/game-dev","POST",{isDeveloper:"true"===$(this).val()}).then(function(){toast(!0,"This users game dev state has been modified."),$(a).removeAttr("disabled")})["catch"](function(b){$(a).removeAttr("disabled"),warning(b.responseJSON.message)})}),$(document).on("click","#uncheck-all-full-permissions",function(a){a.preventDefault(),$(".update-permissions-checkbox").each(function(){$(this).attr("checked",!1)})}),$(document).on("click","#update-full-permissions",function(a){a.preventDefault();var b=$("#userId").val();loading(),request("/staff/permissions/"+b,"GET").then(function(){var a=[];$(".update-permissions-checkbox").each(function(){$(this).is(":checked")?a.push({name:$(this).attr("data-permission"),selected:!0}):a.push({name:$(this).attr("data-permission"),selected:!1})});for(var c,d=[],e=0,f=a;e<f.length;e++)c=f[e],c.selected?d.push(request("/staff/permissions/"+b+"/"+c.name,"PUT")["catch"](function(){})):d.push(request("/staff/permissions/"+b+"/"+c.name,"DELETE")["catch"](function(){}));Promise.all(d).then(function(){success("The permissions for this user have been updated.")})["catch"](function(a){throw warning(a.responseJSON.message||"An unknown error has occurred."),console.error(a),a})})["catch"](function(a){throw console.error(a),a})});






































