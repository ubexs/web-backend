"use strict";/**
 * Game Data
 */var gamedata=document.getElementById("gamedata");gamedata||(window.location.href="/game-error");var gameId=parseInt(gamedata.getAttribute("data-gameid"),10);(!gameId||isNaN(gameId))&&(window.location.href="/game-error"),BABYLON.OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY=!1,BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV=!0,Math.radians=function(a){return a*Math.PI/180},Math.degrees=function(a){return 180*a/Math.PI};function rotateVector(a,b){var c=new BABYLON.Matrix;b.toRotationMatrix(c);var d=BABYLON.Vector3.TransformCoordinates(a,c);return d}window.addEventListener("DOMContentLoaded",function(){// Canvas
var a=document.getElementById("renderCanvas"),b=new BABYLON.Engine(a,!0),c=function createScene(){var c=new BABYLON.Scene(b);// Use Right Handed (since I believe it's what blender uses)
c.useRightHandedSystem=!0;var d=new BABYLON.Vector3(0,-9.81,0),e=new BABYLON.CannonJSPlugin;c.enablePhysics(d,e);// Setup Player Camera
var f=new BABYLON.ArcRotateCamera("Camera",Math.PI/4,Math.PI/6,45,new BABYLON.Vector3(0,10,-10),c);f.maxZ=1e5,f.angularSensibilityX=2500,f.angularSensibilityY=2500,f.panningSensibility=2500,f.checkCollisions=!0,f.wheelPrecision=10,f.useInputToRestoreState=!0,f.allowUpsideDown=!1,f.attachControl(a,!1),f.useBouncingBehavior=!1,f.useAutoRotationBehavior=!1,f.useFramingBehavior=!1;// Create a basic light, aiming 0,1,0 - meaning, to the sky.
var g=new BABYLON.HemisphericLight("light1",new BABYLON.Vector3(0,1,0),c);g.intensity=1.5;// Skybox
var h=BABYLON.Mesh.CreateBox("BackgroundSkybox",2048,c,void 0,BABYLON.Mesh.BACKSIDE),i=new BABYLON.BackgroundMaterial("backgroundMaterial",c);// Create and tweak the background material.
// ... \\
// Return the created scene.
return i.reflectionTexture=new BABYLON.CubeTexture("https://hindigamerclub-game.ewr1.vultrobjects.com/default_assets/TropicalSunnyDay",c),i.reflectionTexture.coordinatesMode=BABYLON.Texture.SKYBOX_MODE,h.material=i,fetch("/api/v1/game/"+gameId+"/map",{credentials:"include"}).then(function(a){return a.text()}).then(function(a){Function(""+a+"")(c)}),c}();// Game Engine
b.runRenderLoop(function(){c.render()}),window.addEventListener("resize",function(){b.resize()})});





































