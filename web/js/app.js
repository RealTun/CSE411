const p_content = document.getElementById("dialog_title");
const bookContent = document.getElementById("make_group");
const groupContent = document.getElementById("check_group");
const chatbotContent = document.getElementById("chatbot");
const topicContent = document.getElementById("topic");
const myInforContent = document.getElementById("my-infor");
const btn_success = document.getElementById("btn-success");
const loading_location = document.getElementById("loading-location");


const checkRole = async () => {
    const user = await fetch('../json/users.json');
    const userData = await user.json();
    if (userData != null) {
        if (userData[0].role == "normal") {
            bookContent.parentElement.remove();
        }
        else{
            bookContent.parentElement.classList.remove("hide");
        }
    }
}

function goBack() {
    window.location.href = "index.html";
}

// setTimeout(function () {
//     window.location.href = "load.html";
// }, 10000);

function openDialog() {
    const background = document.getElementsByClassName("background_tranparents");
    background[0].style.display = "flex";
    background[0].style.opacity = "1";
}

function dismissDialog() {
    const background = document.getElementsByClassName("background_tranparents");
    background[0].style.display = "none";
    background[0].style.opacity = "0";
}

function make_group() {
    p_content.innerText = "Bạn có muốn phân chia nhóm không ?"
    openDialog();
    btn_success.onclick = () => {
        dismissDialog()
        loading_location.style.opacity = "1";
        loading_location.style.display = "flex";
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
        loading_location.style.opacity = "1";
        loading_location.style.display = "flex";
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
        loading_location.style.opacity = "1";
        loading_location.style.display = "flex";
        setTimeout(function () {
            window.location.href = "../BOTOPENAI1/html/index.html";
        }, 1500);
    }
}

function topic_open() {
    p_content.innerText = "Mở topic ?"
    openDialog();
    btn_success.onclick = () => {
        dismissDialog()
        loading_location.style.opacity = "1";
        loading_location.style.display = "flex";
        setTimeout(function () {
            window.location.href = "chooseTopics.html";
        }, 1500);
    }
}

function myInfor_open(){
    p_content.innerText = "Xem thông tin cá nhân ?"
    openDialog();
    btn_success.onclick = () => {
        dismissDialog()
        loading_location.style.opacity = "1";
        loading_location.style.display = "flex";
        setTimeout(function () {
            window.location.href = "infUser.html";
        }, 1500);
    }
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
topicContent.addEventListener("click", topic_open);
myInforContent.addEventListener("click",myInfor_open)
checkRole();


// eel.expose(ping);
// function ping() {
//     console.log("Eel connected!");
// }
// ping();