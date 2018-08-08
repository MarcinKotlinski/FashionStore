function openCity(evt, cityName) {

    document.getElementById("Paris").hidden;
    document.getElementById("Tokyo").hidden;

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if (cityName) {
        document.getElementById(cityName).style.display = "block";
    }
    if (evt) {
        evt.currentTarget.className += " active";
    }
}


window.onload = function () {

 openCity();

};