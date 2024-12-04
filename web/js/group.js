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
// const history = import("../../data/history.json");

import { UserComponent, UserMyInfor } from '../object/user.js';

// loadGroupUsers("all");
let roleUser;

const user = await fetch('../json/users.json');
const userData = await user.json();

const checkRole = async () => {
    const id1 = document.getElementById("1");
    const id2 = document.getElementById("2");
    const id3 = document.getElementById("3");
    const id4 = document.getElementById("4");
    const idAll = document.querySelector("#all");
    const idHistory = document.querySelector("#history");
    console.log(idHistory)
    roleUser = userData[0].role;
    if (userData != null) {
        if (roleUser == "normal") {
            infor.classList.remove("hide");
            infor.classList.add("active");
            for (let i = 1; i <= 4; i++) {
                if (userData[0].infor.Group == i) {
                    const idClass = document.getElementById(`${i}`);
                    idClass.classList.remove("hide");
                }
            }
            idAll.remove();
        }
        else {
            infor.remove();
            id1.classList.remove("hide");
            id2.classList.remove("hide");
            id3.classList.remove("hide");
            id4.classList.remove("hide");
            idHistory.classList.remove("hide");
        }
        const activeOb = document.querySelector(".active");
        getBatX(activeOb);
        groupName.innerHTML = `${activeOb.innerHTML}`
        switch (roleUser) {
            case "normal": {
                loadGroupUsersDB(activeOb.id, userData[0].username);
                break;
            }
            case "admin": {
                loadGroupUsers(activeOb.id);
                break;
            }
        }
    }
}

backBtn.addEventListener('click', () => {
    loading_location.style.opacity = "1";
    loading_location.style.display = "flex";
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1500);
})

function showMember(users) {
    users.forEach(user => {
        let userDiv = new UserComponent(user["MSV"], user["Họ tên"]).render();
        groupDiv.appendChild(userDiv);
    });
}
function showMemberDB(users) {
    users.forEach(user => {
        let userDiv = new UserComponent(user["username"], user["fullname"]).render();
        groupDiv.appendChild(userDiv);
    });
}

async function loadGroupUsers(groupId) {
    try {
        groupDiv.innerHTML = "";
        if (groupId != "history") {
            eel.get_users_by_group(groupId)(function (users) {
                showMember(users)
            });
        }
        else {
            const history = await fetch("../json/history.json");
            const historyData =await history.json();
            historyData.forEach(turn => {
                const historyDiv = document.createElement("div");
                historyDiv.innerHTML="group123"
                console.log(turn);
            });
        };
    }
    catch (error) {
        console.log(error);
    }

}

async function loadGroupUsersDB(groupId, username) {
    try {
        groupDiv.innerHTML = "";
        let users;
        if (groupId == "infor") {
            users = await fetch(`http://localhost:3001/api/group/getMyInfor/?username=${username}`);
            const data = await users.json();
            const topic = await fetch(`http://localhost:3001/api/group/getMyTopic/?username=${username}`);
            const topicData = await topic.json();
            let userDiv = new UserMyInfor(data["fullname"], data["Group"], topicData, data["Topic"],
                data["Average_MIS_Score"], data["Average_BigData_Score"], data["Average_Self_Study_Time"],
                data["Number_of_Late_Attendances_in_Phase_1"], data["Soft_Skills"],
                data["Technology_Usage_Skills"], data["Strengths"]);
            const html = await userDiv.build();
            groupDiv.innerHTML = html;
            userDiv.render();
        }
        else {
            users = await fetch(`http://localhost:3001/api/group/getUserSameGroup/?group=${groupId}`);
            const data = await users.json();
            showMemberDB(data);
        }
    }
    catch (error) {
        console.log(error);
    }
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add("active")
        const rect = item.getBoundingClientRect();
        batman.style.left = `${rect.x}px`;
        if (roleUser == "normal") {
            loadGroupUsersDB(item.id, userData[0].username);
        }
        else
            loadGroupUsers(item.id);
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
                    sessionStorage.setItem("MSV", user.id);

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
            sessionStorage.setItem("MSV", user.id);

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
    btn_success.onclick = async () => {
        dismissDialog()
        loading_location.style.opacity = "1";
        loading_location.style.display = "flex";
        await logout();
        setTimeout(function () {
            window.location.href = "login.html";
        }, 3000);
    }
}
btn_quit.onclick = () => {
    dismissDialog();
};

const getBatX = (item) => {
    batman.style.left = `${item.getBoundingClientRect().x}px`;
}

const logOutbtn = document.querySelectorAll(".logout");
logOutbtn[0].onclick = () => { logOutDialog() };
getBatX(navItems[0]);
checkRole();
