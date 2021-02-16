"use strict";// env
var wsurl="wss://"+window.location.host+"/chat/websocket.aspx";"http:"===window.location.protocol&&(wsurl="ws://"+window.location.host+"/chat/websocket.aspx"),"localhost"===window.location.host.slice(0,9)&&(wsurl="ws://localhost:8080/chat/websocket.aspx");var currentlyDisplayedUserIds=[],curChatOffset=0,canLoadMore=!1,latestMessage={};userId=parseInt(userId,10);function getCsrf(){// For now, since the ws connection can't validate csrf tokens, we have to make this request which will result in a csrf validation error. 
// 
// In the future, I would probably like to look into either a) using a custom 'csrf'/'authentication' type system for ws connections, or an endpoint that returns a csrf token in the body/headers while returning '200 OK'
return new Promise(function(a){$.ajax({type:"POST",url:"/api/v1/chat/metadata",data:"",complete:function complete(b){a(b.getResponseHeader("X-CSRF-Token"))}})})}function chatInit(){function a(){return unreadChatMessages?void $("#chatModalTextBar").html("<i class=\"fas fa-comments\"></i> Chat <span class=\"badge badge-dark\">("+unreadChatMessages+" Unread)</span>"):void $("#chatModalTextBar").html("<i class=\"fas fa-comments\"></i> Chat")}function b(){request("/chat/unread/count","GET").then(function(b){unreadChatMessages=b.total,a()})["catch"](function(){})}function c(a){return!("true"!==a)}function d(){isTrying||(isTrying=!0,setTimeout(function(){e(),isTrying=!1},1500))}function e(){getCsrf().then(function(a){openUserId&&j(openUserId),sock=new WebSocket(wsurl+"?csrf="+a),sock.onmessage=function(a){var b=JSON.parse(a.data);b.pong||g(b)},sock.onopen=function(){},sock.onclose=function(a){unload||// console.log('close');
// console.log(event);
d(a)},sock.onerror=function(a){unload||// console.log('error');
// console.log(event);
d(a)},window.onbeforeunload=function(){// localStorage.setItem('notifSystemInUse', false);
unload=!0,sock.close()}})}function f(a){"notifSystemJson"===a.key?g(JSON.parse(a.newValue)):"notifSystemInUse"===a.key&&!1===c(localStorage.getItem("notifSystemInUse"))&&e()}/**
     * Handle a Chat Message
     * @param {string} data Json String
     */function g(b){if(!b.chatMessageId){var c=b.typing;b.userIdFrom===openUserId&&1===c&&(lastTypeUpdate=moment())}else b.userIdFrom===openUserId?(lastTypeUpdate=!1,$("#partnerChatStatus").css("opacity",0),k([b])):(unreadChatMessages+=1,a())}// Load latest convos
function h(){return request("/chat/latest","GET").then(function(a){if(0===a.length)// $('#latestChatUsersParent').empty();
// $('#chatUsersLatest').append('<div class="row"><div class="col-12"><p class="text-center">N/A</p></div></div>');
return void $("#latest-chats-header").hide();var b=0,c=!0,d=!1,e=void 0;try{for(var f,g,h=a[Symbol.iterator]();!(c=(f=h.next()).done);c=!0){g=f.value,b++;var i=g.userIdTo;if(i===userId&&(console.log("Using userIdFrom instead"),i=g.userIdFrom),console.log(i),currentlyDisplayedUserIds.includes(i)){console.log("already includes");continue}currentlyDisplayedUserIds.push(i),$("#latestChatUsers").append("<div class=\"row userChatCard\" style=\"cursor:pointer;\" data-userid=\"".concat(i,"\"></div>")),latestMessage=g,latestMessage?(latestMessage=latestMessage.content,!latestMessage&&(latestMessage="")):latestMessage="",$("#latestChatUsers").find(".userChatCard[data-userid=\""+i+"\"]").append("\n                            <div class=\"col-4\">\n                                <img data-userid=\"".concat(i,"\" style=\"width:100%;max-width:50px;margin:0 auto;display: block;\" />\n                            </div>\n                            <div class=\"col-8\">\n                                <p data-userid=\"").concat(i,"\" class=\"text-truncate\" style=\"font-weight:500;font-size:0.75rem;\">Loading...</p>\n                                <p class=\"chatMessageTrunc text-truncate\" style=\"font-size: small;\">").concat(latestMessage.escape(),"</p>\n                            </div>\n                        ")),$("#latestUserChats").append("<div class=\"row\"><div class=\"col-12\"> <hr style=\"margin: 0.05rem;\" /></div></div>")}}catch(a){d=!0,e=a}finally{try{c||null==h["return"]||h["return"]()}finally{if(d)throw e}}setUserThumbs(currentlyDisplayedUserIds),setUserNames(currentlyDisplayedUserIds)})["catch"](function(a){console.log(a)})}// Load Friends
function i(a){canLoadMore=!1,request("/user/"+userId+"/friends?limit=25&offset="+a,"GET").then(function(a){if(console.log(a),0===a.total,console.log(a),25<=a.friends.length&&(canLoadMore=!0,curChatOffset+=25),0===a.total)$("#latest-chats-header").hide(),$("#latest-friends-header").hide(),$("#chatUsers").append("<div class=\"row\" style=\"margin-top:1rem;padding-left:1rem;padding-right:1rem;\"><div class=\"col-12\"><p class=\"text-center\" style=\"font-size:0.85rem;\">Make some Friends to chat with them!</p></div></div>");else{var b=[];a.friends.forEach(function(a){currentlyDisplayedUserIds.includes(a.userId)||(currentlyDisplayedUserIds.push(a.userId),b.push(a.userId),(!a.UserStatus||null===a.UserStatus||void 0===a.UserStatus)&&(a.UserStatus=""),$("#chatUsers").append("\n                        <div class=\"row userChatCard\" style=\"cursor:pointer;\" data-userid=\"".concat(a.userId,"\">\n                            <div class=\"col-4\">\n                                <img data-userid=\"").concat(a.userId,"\" style=\"width:100%;max-width:50px;margin:0 auto;display: block;\" />\n                            </div>\n                            <div class=\"col-8\">\n                                <p data-userid=\"").concat(a.userId,"\" class=\"text-truncate\" style=\"font-weight:500;\">Loading...</p>\n                                <p class=\"chatMessageTrunc text-truncate\" style=\"font-size: small;\">").concat(a.UserStatus.escape(),"</p>\n                            </div>\n                            <div class=\"col-12\">\n                                <hr style=\"margin: 0.05rem;\" />\n                            </div>\n                        </div>\n                        ")))}),setUserNames(b),setUserThumbs(b)}})["catch"](function(a){console.log(a)})}/**
     * Load Chat Messages
     */function j(a){canLoadMoreChat&&(localStorage.setItem("ChatModalOpenUserId",a),canLoadMoreChat=!1,request("/chat/"+a+"/history?offset="+chatDmOffset,"GET").then(function(c){0===c.length?console.log("No Chat History"):(k(c),25<=c.length,request("/chat/"+a+"/read","PATCH").then(function(){b()})["catch"](function(a){console.log(a)}))})["catch"](function(a){console.log(a)}))}function k(a){userId=parseInt(userId);var b=[];a=a.reverse(),a.forEach(function(a){b.push(a.userIdFrom),b.push(a.userIdTo),a.UserStatus||(a.UserStatus="");var c="";c=a.userIdFrom===userId?"text-right":"text-left",pastUserId===a.userIdFrom?0===$("#dmchatmessages").children().length?$("#dmchatmessages").append("\n                    <div class=\"row userChatMessageCard\" style=\"cursor:pointer;\" data-userid=\"".concat(a.userIdFrom,"\">\n                        <div class=\"col-12\" style=\"padding: 0;padding-right:0.25rem;padding-left:0.25rem;\">\n                            <a href=\"/users/").concat(a.userIdFrom,"/profile\"><p data-userid=\"").concat(a.userIdFrom,"\" class=\"text-truncate text-right\" style=\"font-weight:500;\">...</p></a>\n                            <p class=\"text ").concat(c,"\" style=\"font-size: small;\">").concat(a.content.escape(),"</p>\n                        </div>\n                    </div>\n                    ")):$("#dmchatmessages").append("\n                    <div class=\"row userChatMessageCard\" style=\"cursor:pointer;\" data-userid=\"".concat(a.userIdFrom,"\">\n                        <div class=\"col-12\" style=\"padding: 0;padding-right:0.25rem;padding-left:0.25rem;\">\n                            <p class=\"text ").concat(c,"\" style=\"font-size: small;\">").concat(a.content.escape(),"</p>\n                        </div>\n                    </div>\n                    ")):$("#dmchatmessages").append("\n                    <div class=\"row userChatMessageCard\" style=\"cursor:pointer;\" data-userid=\"".concat(a.userIdFrom,"\">\n                        <div class=\"col-12\" style=\"padding: 0;padding-right:0.25rem;padding-left:0.25rem;\">\n                            <a href=\"/users/").concat(a.userIdFrom,"/profile\"><p data-userid=\"").concat(a.userIdFrom,"\" class=\"text-truncate ").concat(c,"\" style=\"font-weight:500;\">Loading...</p></a>\n                            <p class=\"text ").concat(c,"\" style=\"font-size: small;\">").concat(a.content.escape(),"</p>\n                        </div>\n                        <div class=\"col-12\">\n                        </div>\n                    </div>\n                    ")),pastUserId=a.userIdFrom}),setUserNames(b),setUserThumbs(b),$("#dmchatmessages").scrollTop($("#dmchatmessages")[0].scrollHeight)}function l(){lastKeyUp=!1;var a=$("#chatMessageContent").val();""===a||($("#chatMessageContent").attr("disabled","disabled"),$("#sendChatMessage").attr("disabled","disabled"),request("/chat/"+openUserId+"/send","PUT",JSON.stringify({content:a})).then(function(){$("#chatMessageContent").val(""),$("#chatMessageContent").removeAttr("disabled"),$("#sendChatMessage").removeAttr("disabled"),k([{chatMessageId:0,userIdFrom:userId,userIdTo:openUserId,content:a,dateCreated:moment().format("YYYY-MM-DD HH:mm:ss"),read:0}]),$("#chatMessageContent").focus()})["catch"](function(a){warning(a.responseJSON.message),$("#chatMessageContent").removeAttr("disabled"),$("#sendChatMessage").removeAttr("disabled")}))}// Random Vars
}chatInit();





































