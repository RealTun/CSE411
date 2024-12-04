
const pushBtn = document.getElementById("pushBtn");
const mis = document.getElementById("mis");
const bigdata = document.getElementById("bigdata");
const gpa = document.getElementById("gpa");
const late_time = document.getElementById("late-time");
const learn_time = document.getElementById("learn-time");
const fullname = document.getElementById("fullname");

async function getUser(username) {
    try {
        const userdata = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getStudent?username=${username}`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
            }
        })
        const data = await userdata.json();
        return data;
    }
    catch (error) {
        return undefined;
    }
};
const username = sessionStorage.getItem("username");

setTimeout(async () => {
    const data = await getUser(username);
    if (data != null && data != undefined) {
        bigdata.value = data["Average_BigData_Score"];
        mis.value = data["Average_MIS_Score"];
        gpa.value = data["GPA"];
        late_time.value = data["Number_of_Late_Attendances_in_Phase_1"];
        learn_time.value = data["Average_Self_Study_Time"];
        fullname.value = data["fullname"];
        selectRadioButton("Soft_Skills", data["Soft_Skills"]);
        selectRadioButton("Technology_Usage_Skills", data["Technology_Usage_Skills"]);
        selectRadioButton("Strengths", data["Strengths"]);
    }
    const userData = await fetch("../json/users.json");
    let user = await userData.json();
    try {
        let token;
        if (user[0].data == undefined) {
            token = null
        }
        else {
            token = user[0].data.access_token
        }
        const point = await fetch("https://secure-koi-wholly.ngrok-free.app/api/point/getListMarkDetail", {
            method: "GET",
            headers: {
                'authorization': token,
                'ngrok-skip-browser-warning': 'true',
                'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
            },
        })
        const pointData = await point.json();
        pointData.data.forEach(sub => {
            if (sub.subject == "Bigdata") {
                bigdata.value = sub.mark;
            }
            else {
                mis.value = sub.mark;
            }
        })
    }
    catch (error) {
        console.log(error);
    }
})

function selectRadioButton(name, value) {
    const radios = document.getElementsByName(name);
    radios.forEach(radio => {
        if (radio.value === value) {
            radio.checked = true;
        }
    });
}
async function addMyInfor(event) {
    event.preventDefault();
    loading();
    const form = document.getElementById('my-form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    data["username"] = username;
    let mucdo = 0;
    try {
        const checkExist = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getStudent?username=${username}`, {
            method: "GET",
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
            },
        });
        if (checkExist.status == 200) {
            // update
            const response = await fetch("https://secure-koi-wholly.ngrok-free.app/api/group/updateStudent", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
                },
                body: JSON.stringify(data),
            });
            toast.style.display = "flex";
            toast.style.opacity = "1";
            toast.animation = "none";
            setTimeout(() => {
                toast.style.animation = "flyDown 1s ease-in-out forwards";
                toast.style.transition = "opacity 2s ease-in-out";
                setTimeout(() => {
                    chatbox[0].innerHTML = "Cập nhập thành công!";
                    chatbox[0].style.color = "#00d29e";
                })
                setTimeout(() => {
                    toast.style.opacity = "0";
                    setTimeout(() => {
                        toast.style.display = "none";
                    }, 1000);
                }, 3000);
            }, 500);
        }
        else {
            const check = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getStudent/cluster_1?username=${username}`, {
                method: "GET",
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'User-Agent': 'CustomUserAgent'  // Tùy chọn: có thể thêm User-Agent tùy chỉnh
                },
            });
            if (check.status == 200) {
                const checkData = await check.json();
                data["Muc_do"] = checkData["Muc_do"];
                await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/saveStudent`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                    body: JSON.stringify(data),
                })
            }
            else {
                data["Muc_do"] = mucdo;
                await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/saveStudent`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                    body: JSON.stringify(data),
                })
            }
            toast.style.opacity = "1";
            toast.style.display = "flex";
            toast.style.animation = 'none';
            setTimeout(() => {
                toast.style.animation = "flyDown 1s ease-in-out forwards";
                toast.style.transition = "opacity 2s ease-in-out";
                setTimeout(() => {
                    chatbox[0].innerHTML = "Lưu thành công!";
                    chatbox[0].style.color = "#00d29e";
                })
                setTimeout(() => {
                    toast.style.opacity = "0";
                    setTimeout(() => {
                        toast.style.display = "none";
                    }, 1000);
                }, 3000);
            }, 500);
        }
        setTimeout(() => {
            stopLoading()
        }, 4000);
    } catch (error) {
        toast.style.display = "flex";
        toast.style.opacity = "1";
        toast.style.animation = 'none';
        setTimeout(() => {
            toast.style.animation = "flyDown 1s ease-in-out forwards";
            toast.style.transition = "opacity 1s ease-in-out";
            setTimeout(() => {
                chatbox[0].innerHTML = "Cập nhật dữ liệu không thành công!";
                chatbox[0].style.color = "red";
            })
            setTimeout(() => {
                toast.style.opacity = "0";
                setTimeout(() => {
                    toast.style.display = "flex";
                }, 1000);
            }, 3000);
        }, 500);
        setTimeout(() => {
            stopLoading();
        }, 3500)
        console.log(error);
    }
}

const backbtn = document.querySelectorAll(".back");
function back() {
    loading();
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
}
backbtn[0].addEventListener("click", back)

pushBtn.addEventListener("click", addMyInfor);
