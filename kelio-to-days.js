// ==UserScript==
// @name           Kelio Days
// @description    transfers hours to remaining days
// @version        1.6.2
// @run-at         document-start
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant          none
// ==/UserScript==


window.addEventListener("DOMContentLoaded", function(){
    updateSoldesSidebar();
    updateMotifAbsences();
    updateAnticipatedAbsences();
}, false);

function normalized(timeString) {
    return timeString
        .replace("&nbsp;", "")
        .replace("<b>", "")
        .replace("</b>", "")
        .replace("(U)", "")
        .replace(" U", "")
        .replace("\n", " ")
        .replace("\t", " ")
        .replace(/\s\s+/g, ' ')
        .replace(/(^\s+|\s+$)/g, '');
}

function minutesPerWorkDay() {
    return 7 * 60 + 48;
}

function toMinutes(timeString) {
    var matchData = /(-?)(\d+):(\d+)/.exec(timeString);
    var matchString = matchData && matchData[0] || null;
    if (matchString == timeString) {
        return (matchData[1] ? -1 : 1) * (parseInt(matchData[2], 10) * 60 + parseInt(matchData[3], 10));
   }

    return null;
}

function toDays(timeString) {
    var matchData = /(\d+) D/.exec(timeString);
    var matchString = matchData && matchData[0] || null;
    if (matchString == timeString) {
        return matchData[1];
    }

    return null;
}


function updateTooltip(element) {

    var timeString = normalized(element.innerHTML);
    var minutes = toMinutes(timeString);
    if (minutes !== null) {
        var days = minutes/minutesPerWorkDay();
        element.innerHTML = ((days%1 !== 0) ? days.toFixed(2) : days) + " D";
        element.title = timeString;
    }
    else {
        minutes = toDays(timeString) * minutesPerWorkDay();
    }
    return minutes;
}

function updateSoldesSidebar() {
    var totalMinutes = 0;
    var teleworkMinutes = 0;
    jQuery(".soldes .valeur").each(function(index, element){
        totalMinutes = totalMinutes + updateTooltip(element);
    });
    jQuery(".soldes li:contains(Telework) .valeur").each(function(index, element){
        teleworkMinutes = toMinutes(element.title);
    });
    jQuery(".soldes #infosSoldes").append('<hr><li id="solde7"><table cellpadding="0" cellspacing="0" border="0" width="200px" style="table-layout: fixed;"><tbody><tr><td class="libelle" width="60%" style="word-wrap: break-word">Total Remaining days</td><td class="valeur soldeNegatif" width="30%" title="0:00">'
                                         + ((totalMinutes-teleworkMinutes) / minutesPerWorkDay()).toFixed(2)
                                         + ' D</td></tbody></table></li>');
}

function updateMotifAbsences() {
    jQuery(".motifAbsences .mono_solde,.motifAbsences .solde_value").each(function(index, element){
        updateTooltip(element);
    });
}

function updateAnticipatedAbsences() {
    jQuery("tr td:nth-of-type(5),tr td:nth-of-type(7),tr td:nth-of-type(8),tr td:nth-of-type(9)").each(function(index, element){
       updateTooltip(element);
    });
}
