const loading_location = document.getElementById("loading-location");

async function runBackendAndRedirect() {
    // await eel.run_back_end();
    await fetch("https://secure-koi-wholly.ngrok-free.app/api/group/grouping",{
        headers:{
            'ngrok-skip-browser-warning': 'true',
        }
    })
    setTimeout(function () {
        window.location.href = "group.html";
    }, 7000);

    setTimeout(function(){
        loading_location.style.opacity = "1";
        loading_location.style.display = "flex";
    }, 6000);
}
runBackendAndRedirect();