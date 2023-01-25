let i = "movieName"

function goToMovie(a) {
    if (a.className == "movie2") {
        window.location.href = "./listenspecific.html";
    } else {
        window.location.href = "./watchspecific.html";
    }
}