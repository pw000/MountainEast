var myDiv = document.getElementById('myDiv'),
    results = document.getElementById('results');

myDiv.onmouseover = function() {
    results.innerHTML += "Le curseur vient d'entrer.";
};

myDiv.onmouseout = function() {
    results.innerHTML += "Le curseur vient de sortir.";
};
