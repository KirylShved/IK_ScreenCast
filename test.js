var firstKey = 'adjectives';
var secondKey = 'cities';
var allCombinations = 0;

var adjectives, cities, generatedCombinations = [];


fetch('https://gp-js-test.herokuapp.com/api')
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        adjectives = jsonData[firstKey];
        cities = jsonData[secondKey];
        generate();
    })
    .catch(alert);



function generate() {
    var i, j;

    for (i = 0; i < adjectives.length; i++) {
        for (j = 0; j < cities.length; j++) {
            generatedCombinations.push(capitalize(adjectives[i]) + ' ' + capitalize(cities[j]));
        }
    }
    generatedCombinations.sort(compareRandom);

    allCombinations = generatedCombinations.length;
}

var lastCombinationField = document.getElementById('last-combination');
var combinationsList = document.getElementById('combinations-list');
var generateButton = document.getElementById('generate-combination-btn');
var combinationsCounter = document.getElementById('combination-counter');

generateButton.onclick = function (event) {
    event.preventDefault();
    outPrint(extract());
}

function outPrint(combination) {
    if (combination) {
        lastCombinationField.value = combination;
        var textAreaContent = combinationsList.innerHTML;
        combinationsList.innerHTML = combination + '\n' + textAreaContent;
        resizeTextArea(combinationsList);
        combinationsCounter.innerHTML = 'Generated ' + (allCombinations - generatedCombinations.length) + ' of ' + allCombinations;
    }
    if (!generatedCombinations.length) {
        generateButton.setAttribute('disabled', '');
    }
}

function extract() {

    var random = getRandomInt(0, generatedCombinations.length);
    var currentCombination = generatedCombinations[random];
    generatedCombinations.splice(random, 1);
    return currentCombination;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function resizeTextArea(element) {
    element.style.height = "0px";
    element.style.height = (element.scrollHeight)+"px";
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function compareRandom(a, b) {
    return Math.random() - 0.5;
}