const loading_location = document.getElementById("loading-location");
function loading() {
    loading_location.style.opacity = "1";
    loading_location.style.display = "flex";
}
function stopLoading() {
    loading_location.style.opacity = "0";
    loading_location.style.display = "none";
}