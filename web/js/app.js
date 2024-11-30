const p_content = document.getElementById("dialog_title");
const bookContent = document.getElementById("make_group");
const groupContent = document.getElementById("check_group");
const chatbotContent = document.getElementById("chatbot");
const btn_success = document.getElementById("btn-success");
const btn_logout = document.getElementById("btn-logout");
const loading_location = document.getElementById("loading-location");

function goBack() {
    window.location.href = "index.html";
}
function logOut(){
    p_content.innerText = "Bạn có đăng xuất không ?"
    openDialog();
    btn_logout.onclick = () => {
        dismissDialog()
        loading_location.style.opacity="1";
        loading_location.style.display="flex";
        setTimeout(function () {
            window.location.href = "load.html";
        }, 500);
    }
}
// setTimeout(function () {
//     window.location.href = "load.html";
// }, 10000);

function openDialog() {
    const background = document.getElementsByClassName("background_tranparents");
    background[0].style.display = "flex";
    background[0].style.opacity = "1";
}

function make_group() {
    p_content.innerText = "Bạn có muốn phân chia nhóm không ?"
    openDialog();
    btn_success.onclick = () => {
        dismissDialog()
        loading_location.style.opacity="1";
        loading_location.style.display="flex";
        setTimeout(function () {
            window.location.href = "load.html";
        }, 500);
    }
}

function check_group() {
    p_content.innerText = "Bạn có muốn vào xem nhóm đã chia ?"
    openDialog();
    btn_success.onclick = () => {
        dismissDialog()
        loading_location.style.opacity="1";
        loading_location.style.display="flex";
        setTimeout(function () {
            window.location.href = "group.html";
        }, 1500);
    }
}

function check_user() {
    p_content.innerText = "Mở chatbot ?"
    openDialog();
    btn_success.onclick = () => {
        dismissDialog()
        loading_location.style.opacity="1";
        loading_location.style.display="flex";
        setTimeout(function () {
            window.location.href = "../BOTOPENAI1/html/index.html";
        }, 1500);
    }
}

function dismissDialog() {
    const background = document.getElementsByClassName("background_tranparents");
    background[0].style.display = "none";
    background[0].style.opacity = "0";
}


setTimeout(function () {
    let chainElement = document.getElementsByClassName("chain")[0];
    chainElement.style.top = "0px";
}, 2000);
setTimeout(function () {
    let chainElement = document.getElementsByClassName("chain")[0];
    chainElement.style.top = "-200px";
    let title = document.getElementById("title");
    title.style.transform = "rotate(0deg)";
}, 4000);


bookContent.addEventListener("click", make_group);
groupContent.addEventListener("click", check_group);
chatbotContent.addEventListener("click", check_user);



eel.expose(ping);
function ping() {
    console.log("Eel connected!");
}
ping();