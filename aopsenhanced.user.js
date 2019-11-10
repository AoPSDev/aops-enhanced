// ==UserScript==
// @name         AoPS Enhanced
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       happycupcake/EpicCakeKing
// @match        https://artofproblemsolving.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //Enhanced quotes
    AoPS.Community.Views.Post.prototype.onClickQuote=function() {
        this.topic.appendToReply("[quote name=\"" +this.model.get("username") +"\" url=\"https://artofproblemsolving.com/community/p"+this.model.get("post_id")+"\"]\n" +this.model.get("post_canonical").trim()+"\n[/quote]\n\n");
    }
    //Copy links
    AoPS.Community.Views.Post.prototype.onClickDirectLink=function(){
        var copytemp = document.createElement("input");
        copytemp.type="text";
        copytemp.style="position: fixed; top: -1000px;"; //May be unnecessary but it should keep the temporary element from briefly causing issues.
        copytemp.value='https://artofproblemsolving.com/community/p'+this.model.get("post_id");
        document.getElementsByTagName('body')[0].append(copytemp);
        copytemp.select();
        document.execCommand("copy");
        copytemp.remove();
        AoPS.Ui.Flyout.display("Url copied (https://artofproblemsolving.com/community/p"+this.model.get("post_id")+").");
    }
    //Notifications
    if (Notification.permission == "default"){
        setTimeout(function(){
            alert("AoPS Enhanced can change flyouts into browser notifications. Grant the permission and refresh the page to enable, block notifications to disable.");
            document.onclick=function(){
                Notification.requestPermission();
            }
        }, 1000);
    }else{
        AoPS.Ui.Flyout.display=function(x){
            var textextract=document.createElement("div")
            textextract.innerHTML=x.replace('<br>','\n');
            var y=$(textextract).text()
            var notification = new Notification("AoPS Enhanced", {body: y, icon: 'https://artofproblemsolving.com/online-favicon.ico',tag: y});
            setTimeout(notification.close.bind(notification), 4000);
        }
    }
    //Disable idle monitor
    AoPS.Community.Constants.idle_monitor_interval=0;
    //Add custom stylesheet
    var sheet=document.createElement('style')
    sheet.innerHTML=`
#feed-topic .cmty-topic-moderate{
display: inline !Important;
}
`
    document.getElementsByTagName('head')[0].appendChild(sheet)
})();
