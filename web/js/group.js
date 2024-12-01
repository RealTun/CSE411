const groupDiv = document.querySelector('.group');
const batman = document.querySelector(".batman");
const navItems = document.querySelectorAll('.nav-item');
const groupName = document.querySelector('#gr-name');
const btn_success = document.getElementById("btn-success");
const backBtn = document.querySelector('.back');
const loading_location = document.getElementById("loading-location");
const imgVip = document.getElementById("vip");
const p_content = document.getElementById("dialog_title");
const btn_quit = document.getElementById("btn-quit");
const infor = document.getElementById("infor");

import { UserComponent } from '../object/user.js';

loadGroupUsers("all");

const checkRole = async () => {
    const id1 = document.querySelector("#\\1");
    const id2 = document.querySelector("#\\2");
    const id3 = document.querySelector("#\\3");
    const id4 = document.querySelector("#\\4");
    const idAll = document.querySelector("#all");

    const user = await fetch('../json/users.json');
    const userData = await user.json();
    if (userData != null) {
        if (userData[0].role == "normal") {
            idAll.remove();
            infor.classList.remove("hide");
        }
        else{
            infor.remove();
            id1.remove();
        }
    }
}
checkRole();

backBtn.addEventListener('click', () => {
    loading_location.style.opacity = "1";
    loading_location.style.display = "flex";
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1500);
})

function showMember(users) {
    users.forEach(user => {
        let userDiv = new UserComponent(user["Họ tên"], user["Họ tên"]).render();
        groupDiv.appendChild(userDiv);
    });
}

function loadGroupUsers(groupId) {
    groupDiv.innerHTML = "";
    eel.get_users_by_group(groupId)(function (users) {
        showMember(users)
    });
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add("active")
        const rect = item.getBoundingClientRect();
        batman.style.left = `${rect.x}px`;
        loadGroupUsers(item.id)
        if (item.id == "1") {
            imgVip.src = "../img/9679.png";
        }
        else if (item.id == "2") {
            imgVip.src = "../img/9680.png";
        }
        else if (item.id == "3") {
            imgVip.src = "../img/9681.png";
        }
        else if (item.id == "4") {
            imgVip.src = "../img/9682.png";
        }
        else {
            imgVip.src = "";
        }
        setTimeout(() => {
            const allUser = document.querySelectorAll('.user');
            allUser.forEach(user => {
                user.addEventListener('click', async () => {
                    // console.log(user.id)
                    sessionStorage.setItem("userName", user.id);

                    setTimeout(function () {
                        window.location.href = "user.html";
                    }, 1000);

                    loading_location.style.opacity = "1";
                    loading_location.style.display = "flex";
                })
            })
        }, 500)
        groupName.innerHTML = `${item.innerHTML}`
    })
})

setTimeout(() => {
    const allUser = document.querySelectorAll('.user');
    allUser.forEach(user => {
        user.addEventListener('click', async () => {
            // console.log(user.id)
            sessionStorage.setItem("userName", user.id);

            setTimeout(function () {
                window.location.href = "user.html";
            }, 1000);

            loading_location.style.opacity = "1";
            loading_location.style.display = "flex";
        })
    })
}, 500)

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

function logOutDialog() {
    p_content.innerText = "Bạn có đăng xuất không ?"
    openDialog();
    btn_success.onclick =async () => {
        dismissDialog()
        loading_location.style.opacity = "1";
        loading_location.style.display = "flex";
        await logout();
        setTimeout(function () {
            window.location.href = "login.html";
        }, 3000);
    }
}
btn_quit.onclick = ()=>{
    dismissDialog();
};
const logOutbtn = document.querySelectorAll(".logout");
logOutbtn[0].onclick = () => { logOutDialog() };
batman.style.left = `${navItems[0].getBoundingClientRect().x}px`;
