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
const deletebtn = document.getElementById("deletebtn");
// const history = import("../../data/history.json");

import { UserComponent, UserMyInfor } from '../object/user.js';

// loadGroupUsers("all");
let roleUser;

const user = await fetch('../json/users.json');
const userData = await user.json();
const userDB = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getMyInfor/?username=${userData[0].username}`, {
    method: 'GET',
    headers: {
        'ngrok-skip-browser-warning': 'true',
        'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
    }
});
const userDBData = await userDB.json();


const checkRole = async () => {
    const id1 = document.getElementById("1");
    const id2 = document.getElementById("2");
    const id3 = document.getElementById("3");
    const id4 = document.getElementById("4");
    const idAll = document.querySelector("#all");
    const idHistory = document.querySelector("#history");
    roleUser = userData[0].role;
    if (userData != null) {
        if (roleUser == "normal") {
            infor.classList.remove("hide");
            infor.classList.add("active");
            for (let i = 1; i <= 4; i++) {
                if (userDBData.Group == i) {
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
            deletebtn.classList.remove("hide");
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
        let userDiv = new UserComponent(user["username"], user["fullname"]).render();
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
            if (groupId != "all") {
                const userData = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getUserSameGroup?group=${groupId}`,
                    {
                        method: 'GET',
                        headers: {
                            'ngrok-skip-browser-warning': 'true',
                            'User-Agent': 'CustomUserAgent'
                        }
                    }
                );
                const users = await userData.json();
                showMember(users)
            }
            else {
                const userData = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getAll`, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
                    }
                });
                const users = await userData.json();
                showMember(users)
            }
        }
        else {
            const history = await fetch("https://secure-koi-wholly.ngrok-free.app/public/history.json", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },
            });
            const historyData = await history.json();
            const historyContainer = document.createElement("div");
            historyContainer.className = "d-flex flex-column";
            const index = Object.keys(historyData[0]);
            index.forEach((turn, index) => {
                const historyDiv = document.createElement("div");
                historyContainer.appendChild(historyDiv)
                historyDiv.id = `turn${index + 1}`;
                historyDiv.className = "turn";

                const historyDiv_title = document.createElement("div");
                historyDiv_title.id = `title${index + 1}`;
                historyDiv_title.className = "turn-title";
                historyDiv_title.innerHTML = `Lần ${index + 1}`;

                historyDiv.appendChild(historyDiv_title)

                const historyDiv_container_group = document.createElement("div");
                historyDiv_container_group.className = "history-container-group";
                historyDiv.appendChild(historyDiv_container_group);

                for (let i = 1; i <= 4; i++) {
                    const historyDiv_group = document.createElement("div");
                    historyDiv_group.className = "group-history";

                    const p = document.createElement("p");
                    p.innerHTML = `Nhóm ${i}`;
                    historyDiv_group.appendChild(p);

                    const ul = document.createElement("ul");
                    ul.className = "user-history";
                    ul.id = `gr${i}`;

                    historyDiv_group.appendChild(ul);
                    historyDiv_container_group.appendChild(historyDiv_group)

                    historyData[0][turn].forEach(user => {
                        if (user["Nhóm"] == i) {
                            const li = document.createElement("li");
                            li.innerHTML = user["Họ tên"]
                            ul.appendChild(li);
                        }
                    });
                    const line = document.createElement("div");
                    line.className = "line";
                    historyDiv_group.appendChild(line);
                }
                groupDiv.appendChild(historyContainer);
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
        if (groupId == "infor") {
            const topic = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getMyTopic/?username=${username}`, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
                }
            });
            const topicData = await topic.json();
            console.log(userDBData)
            let userDiv = new UserMyInfor(userDBData["fullname"], userDBData["Group"], topicData[0].Topic,
                userDBData["Average_MIS_Score"], userDBData["Average_BigData_Score"], userDBData["Average_Self_Study_Time"],
                userDBData["Number_of_Late_Attendances_in_Phase_1"], userDBData["Soft_Skills"],
                userDBData["Technology_Usage_Skills"], userDBData["Strengths"]);
            const html = await userDiv.build();
            groupDiv.innerHTML = html;
            userDiv.render();
        }
        else {
            const users = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getUserSameGroup/?group=${groupId}`, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
                }
            });
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


const delete_btn = document.getElementById("delete-btn");
delete_btn.addEventListener("click", (event) => {
    event.preventDefault();
    p_content.innerText = "Bạn có muốn xóa nhóm và thông tin thành viên?"
    openDialog();
    btn_success.addEventListener("click", async () => {
        loading_location.style.opacity = "1";
        loading_location.style.display = "flex";
        dismissDialog();
        await fetch("https://secure-koi-wholly.ngrok-free.app/api/group/deleteStudents", {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
            }
        })
            .then(con => {
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 5000);
            })
    })
})

checkRole();
