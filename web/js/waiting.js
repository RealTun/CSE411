const loading_location = document.getElementById("loading-location");

async function runBackendAndRedirect() {
    // await eel.run_back_end();
    await fetch("http://localhost:3001/api/group/grouping")
    setTimeout(function () {
        window.location.href = "group.html";
    }, 7000);

    setTimeout(function(){
        loading_location.style.opacity = "1";
        loading_location.style.display = "flex";
    }, 6000);
}
runBackendAndRedirect();