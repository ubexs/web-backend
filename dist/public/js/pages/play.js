"use strict";// extension to uhh show when divs are visible
// default = featured
var currentSortMode=1,currentGenre=1,currentOffset=0,currentLimit=25,metaInfo=$("#meta-play-info"),possibleGenres=JSON.parse(metaInfo.attr("data-genres")),isLoading=!1,gamesLoaded=0,areMoreAvailable=!1;// default = any
request("/game/metadata","GET").then(function(a){a.canCreateGames&&$("#create-game").show()})["catch"](function(a){console.log("probably logged out",a)});/**
 * get url vars from page url
 */function getUrlVars(){var a={},b=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(b,c,d){a[c]=d});return a}var _selectedGenreQueryParam=getUrlVars().genre;_selectedGenreQueryParam&&(currentGenre=parseInt(_selectedGenreQueryParam)),$(window).scroll(function(){isLoading||!areMoreAvailable||$(window).scrollTop()+$(window).height()>$(document).height()-$("div#footerUpper").innerHeight()&&(currentOffset+=25,loadGames())}),$(document).on("click","#open-search-filters-mobile",function(a){a.preventDefault();var b=$("#search-filters");console.log(b.css("display")),"block"===b.css("display")?b.css("display","none"):b.attr("style","display: block!important;")});/**
 * load games via XHR request and append to #topTwoGames
 * @param {boolean} addTopTwoGamesToHeader Wheather or not the top two games list will be visible
 */function loadGames(){var a=!!(0<arguments.length&&arguments[0]!==void 0)&&arguments[0];history.replaceState({genre:currentGenre,sort:currentSortMode},"Free 3D Games","?genre="+currentGenre+"&sortBy="+currentSortMode+"&offset="+currentOffset),isLoading=!0,request("/game/search?genre="+currentGenre+"&sortBy="+currentSortMode+"&limit="+currentLimit+"&offset="+currentOffset).then(function(b){var c=b.total,e=b.data;gamesLoaded+=e.length,areMoreAvailable=!(gamesLoaded>=c),1===currentGenre?$("title").html("Free 3D Games - BlocksHub"):$("title").html("Free 3D "+possibleGenres[currentGenre]+" Games - BlocksHub"),1===currentGenre?$("#free-games-description").html("Experience thousands of user-created 3D games designed for all ages, all for free! No download required. Our games are supported on all major devices, including Desktop Computers, Laptop Computers, Tablets, and Phones."):$("#free-games-description").html("Experience thousands of user-created 3D ".concat(possibleGenres[currentGenre]," games designed for all ages, all for free! No download required. Our games are supported on all major devices, including Desktop Computers, Laptop Computers, Tablets, and Phones.")),$("#topTwoGames").empty();var d=[],f=$("#topTwoGames");if(a&&$("#header-when-top-two-games-are-visible").show(),0===e.length&&0===currentOffset)return void $("#popularGamesList").append("\n            \n            <div class=\"col-12\">\n                <div class=\"card\">\n                    <div class=\"card-body\">\n                        <p><span class=\"font-weight-bold\">Uh-oh!</span> It looks like your search didn't return any results.</p>\n                    </div>\n                </div>\n            </div>\n            \n            ");var g=0,h=[],i=!0,j=!1,k=void 0;try{for(var l,m,n=e[Symbol.iterator]();!(i=(l=n.next()).done);i=!0){if(m=l.value,h.push(m.gameId),a&&0===g||a&&1===g)f.append("\n                    \n                <div class=\"col-12 col-md-6\">\n                    <div class=\"card\">\n                        <a href=\"/game/".concat(m.gameId,"\" class=\"hidehover\">\n                            <img data-gameid=\"").concat(m.gameId,"\" class=\"card-img-top\" alt=\"Game Thumbnail\">\n                            <div class=\"card-body\">\n                                <h5 class=\"card-title\">").concat(xss(m.gameName),"</h5>\n                                <p class=\"card-text\" style=\"margin-top:0.5rem;font-size:0.85rem;\">\n\n                                Created By: <span data-userid=\"").concat(m.creatorId,"\"></span>\n                                <br>\n                                <span class=\"font-weight-bold\">").concat(m.playerCount,"</span> Playing\n                                \n                                </p>\n                                <a href=\"/game/").concat(m.gameId,"\" class=\"btn btn-success\" style=\"margin-top:1rem;width:100%;\"><i class=\"fas fa-play\"></i></a>\n                            </div>\n                        </a>\n                    </div>\n                </div>\n                    \n                ")/*`
                <div class="col-12 col-md-6">
                <div class="card">
                    <a href="/game/${game.gameId}" class="hidehover">
                        <div class="card-body" style="cursor:pointer;">
                            <div class="row">
                                <div class="col-12">
                                    <h1 style="overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    font-size:1.15rem;
                                    padding-bottom:1rem;">${filterXSS(game.gameName)}</h1>
                                </div>
                                <div class="col-6 col-md-8">
                                    ${img}
                                </div>
                                <div class="col-6 col-md-4">
                                    <img src="" data-userid="${game.creatorId}" style="width:100%;" />
                                    Created By <span data-userid="${game.creatorId}"></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12" style="padding-top:1rem;">
                                    <p>${game.playerCount} Playing</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>`
            */);else{var o="<img class=\"card-img-top\" data-gameid=\"".concat(m.gameId,"\" style=\"width:100%;object-fit: fill;display:block;margin: 0 auto;height: 150px;\" />");$("#popularGamesList").append("\n                <div class=\"col-6 col-md-4 col-lg-3 on-hover-show-game-info-tooltip\" style=\"padding: 0 0.25rem  0.25rem 0.25rem;\">\n                    <div class=\"card\">\n                        <a href=\"/game/".concat(m.gameId,"\" class=\"normal\">\n                            ").concat(o,"\n                            <div class=\"card-body\" style=\"cursor:pointer;\">\n                                <div class=\"row\">\n                                    <div class=\"col-12\">\n                                        <h1 style=\"overflow: hidden;\n                                        font-size:0.85rem;\n                                        margin-bottom:0;\n                                        line-height:1rem;\n                                        height: 2rem;\n                                        \">").concat(filterXSS(m.gameName),"</h1>\n                                    </div>\n\n                                </div>\n                                <div class=\"row\" style=\"padding-top:0.5rem;\">\n                                    <div class=\"col-12\">\n                                        <p style=\"font-size:0.75rem;\"><span class=\"font-weight-bold\">").concat(number_format(m.playerCount),"</span> People Playing</p>\n                                    </div>\n                                </div>\n                            </div>\n                        </a>\n                    </div>\n                    <div class=\"game-info-tooltip\">\n                        <div class=\"card\" style=\"width:100%;padding:0;\">\n                            <div class=\"card-body\" style=\"width:100%;padding:0 1rem 1rem 1rem;\">\n                                <div style=\"padding-left:0.25rem;\">\n                                    <p style=\"line-height:1;font-size:0.65rem;\">\n                                        <span class=\"font-weight-bold\">Creator</span>: <a href=\"/users/").concat(m.creatorId,"/profile\"><span data-userid=\"").concat(m.creatorId,"\"></span></a>\n                                    </p>\n                                    <p style=\"line-height:1;font-size:0.65rem;margin-top:0.25rem;\">\n                                        <span class=\"font-weight-bold\">Last Updated</span>: ").concat(moment(m.updatedAt).fromNow(),"</a>\n                                    </p>\n                                </div>\n                                <a href=\"/game/").concat(m.gameId,"\" class=\"btn btn-success\" style=\"margin-top:1rem;width:100%;\"><i class=\"fas fa-play\"></i></a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                \n                "))}0===m.creatorType&&d.push(m.creatorId),g++}}catch(a){j=!0,k=a}finally{try{i||null==n["return"]||n["return"]()}finally{if(j)throw k}}setUserNames(d),setUserThumbs(d),setGameThumbs(h)})["catch"](function(a){console.error(a),warning(a.responseJSON.message)})["finally"](function(){isLoading=!1})}1===currentGenre?(gamesLoaded=0,areMoreAvailable=!1,loadGames(!0)):($(".genreoption").find("li").css("opacity","0.5"),$(".genreoption").find("li").css("font-weight","400"),$(".genreoption[data-id="+currentGenre+"]").find("li").css("opacity",1).css("font-weight",600),gamesLoaded=0,areMoreAvailable=!1,loadGames()),$(document).on("click",".sortoption",function(a){if(a.preventDefault(),!isLoading){$("#popularGamesList").empty(),$("#header-when-top-two-games-are-visible").hide(),$("#topTwoGames").empty().append("\n    <div class=\"spinner-border\" role=\"status\" style=\"display:block;margin:1rem auto 0 auto;\">\n        <span class=\"sr-only\">Loading...</span>\n    </div>\n    ");var b=parseInt($(this).attr("data-id")),c=xss($(this).attr("data-title"));$(".sortoption").find("li").css("opacity","0.5"),$(".sortoption").find("li").css("font-weight","400"),$(this).find("li").css("opacity",1),$(this).find("li").css("font-weight",600),currentSortMode=b,$("#title").html(c),gamesLoaded=0,areMoreAvailable=!1,loadGames()}}),$(document).on("click",".genreoption",function(a){if(a.preventDefault(),!isLoading){$("#popularGamesList").empty(),$("#header-when-top-two-games-are-visible").hide(),$("#topTwoGames").empty().append("\n    <div class=\"spinner-border\" role=\"status\" style=\"display:block;margin:1rem auto 0 auto;\">\n        <span class=\"sr-only\">Loading...</span>\n    </div>\n    ");var b=parseInt($(this).attr("data-id"));$(".genreoption").find("li").css("opacity","0.5"),$(".genreoption").find("li").css("font-weight","400"),$(this).find("li").css("opacity",1),$(this).find("li").css("font-weight",600),currentGenre=b,gamesLoaded=0,areMoreAvailable=!1,loadGames()}});






































