// ==UserScript==
// @name       Bitcoiner Automation
// @author     T. Knight
// @version    4
// @description  Automates the 'Bitcoiner' game
// @include      http://bitcoinergame.com/
// ==/UserScript==

var delayValue = 50;

function parseNumber(string) {
    var getValue = string.split(" ");
    getValue[0] = Number(getValue[0].replace(/,/g, "").replace(/\$/g, ""));
    if(getValue[1] == "million") { getValue[0] = getValue[0] * 1000000; }
    else if(getValue[1] == "billion") { getValue[0] = getValue[0] * 1000000000; }
    else if(getValue[1] == "trillion") { getValue[0] = getValue[0] * 1000000000000; }
    else if(getValue[1] == "quadrillion") { getValue[0] = getValue[0] * 1000000000000000; }
    else if(getValue[1] == "quintillion") { getValue[0] = getValue[0] * 1000000000000000000; }
    //console.log("Eff: " + getValue[0]);
    return getValue[0];
}

// Main
setInterval(function() {
    // Autoclick the 'Hack Some Dollars' button
    var hackButton = document.getElementById("begging");
    hackButton.click();
}, delayValue);

setInterval(function() {
    var machineBTC, machineCost, machineEfficiency;
    // Find the best machine value
    var storeBTC = document.getElementsByClassName("storeBTC"),
        bestMachine = storeBTC[0].parentNode,
        bestMachineEff = 0,
        machinesOwned = Number(document.getElementById("storeOwned").innerText),
        machinesMax = Number(document.getElementById("storeMax").innerText);

    for(var i=0; i<storeBTC.length; i++) {
        //var machineBTC = Number(storeBTC[i].children[0].innerText.replace(/,/g, ""));
        machineBTC = parseNumber(storeBTC[i].children[0].innerText);
        machineCost = parseNumber(storeBTC[i].nextSibling.innerText);
        machineEfficiency = machineBTC / machineCost;
        if(!isNaN(machineBTC) && !isNaN(machineCost)) {
            if(machineEfficiency > bestMachineEff) {
                bestMachine.style.backgroundColor = 'transparent';
                bestMachine = storeBTC[i].parentNode;
                bestMachineEff = machineEfficiency;
                bestMachine.style.backgroundColor = 'green';
            } else {
                storeBTC[i].parentNode.style.backgroundColor = 'transparent';
            }
        }
    }
    if(bestMachine.children[3].style.color == "black" && machinesOwned < machinesMax) {
        console.log("# Buying machine " + bestMachine.children[1].innerText + " | Eff: " + bestMachineEff);
        bestMachine.click();
    }

    // Click 'randomEvent()' buttons
    var randomEvent = document.getElementById("randomButton");
    if(randomEvent.style.display == 'block') {
        console.log("# Clicked random event");
        randomEvent.click();
    }

    // Display note messages in console
    /*
    var noteElement = document.getElementById("notes");
    if(noteElement.children[0] && noteElement.children[0].innerText != noteText) {
        var noteText = document.getElementById(noteElement.children[0].innerText);
        console.log("# Note: " + noteElement.children[0].children[0].innerText + " - " + noteText);
    }
    */

    // Get current BTC price
    var currentPriceElement = document.getElementById("btcusd");
    var currentPrice = Number(currentPriceElement.innerText.split("$")[0]);
    if(currentPrice > 800) {
        currentPriceElement.style.color = 'green';
    } else if(currentPrice < 600) {
        currentPriceElement.style.color = 'red';
    } else {
        currentPriceElement.style.color = 'black';
    }
}, 2000);