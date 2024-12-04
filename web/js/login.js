const toast = document.getElementById("toast");
const chatbox = document.getElementsByClassName("chatbox");
async function fetchWithTimeout(url, options, timeout = 10000) {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
    );

    return Promise.race([fetch(url, options), timeoutPromise]);
}
async function login() {
    loading();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const data = {
        username: username,
        password: password,
    };

    try {
        const response = await fetch('https://secure-koi-wholly.ngrok-free.app/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify(data),
        });
        const userDataset = await fetch(`https://secure-koi-wholly.ngrok-free.app/api/group/getMyInfor/?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        });
        const userDatas = await userDataset.json();
        if (response.status === 200) {
            toast.style.display = "flex";
            toast.style.opacity = "1";
            toast.style.animation = 'none';
            setTimeout(() => {
                toast.style.animation = "flyDown 1s ease-in-out forwards";
                toast.style.transition = "opacity 2s ease-in-out";
                setTimeout(() => {
                    chatbox[0].innerHTML = "Đăng nhập thành công!";
                    chatbox[0].style.color = "#00d29e";
                })
                setTimeout(() => {
                    toast.style.opacity = "0";
                    setTimeout(() => {
                        toast.style.display = "none";
                    }, 1000);
                }, 3000);
            }, 500);
            const userData = await response.json();
            await logout();
            if (userDatas != null) {
                userData.infor = userDatas
            }
            eel.login(userData);
            sessionStorage.setItem("username",username);
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            toast.style.display = "flex";
            toast.style.opacity = "1";
            toast.style.animation = 'none';
            setTimeout(() => {
                toast.style.animation = "flyDown 1s ease-in-out forwards";
                toast.style.transition = "opacity 1s ease-in-out";
                setTimeout(() => {
                    chatbox[0].innerHTML = "Đăng nhập không thành công!";
                    chatbox[0].style.color = "red";
                })
                setTimeout(() => {
                    toast.style.opacity = "0";
                    setTimeout(() => {
                        toast.style.display = "none";
                    }, 1000);
                }, 3000);
            }, 500);
            setTimeout(() => {
                stopLoading();
            }, 3500)
            console.log("Đăng nhập không thành công!")
        }
    } catch (error) {
        toast.style.display = "flex";
        toast.style.opacity = "1";
        toast.style.animation = 'none';
        setTimeout(() => {
            toast.style.animation = "flyDown 1s ease-in-out forwards";
            toast.style.transition = "opacity 1s ease-in-out";
            setTimeout(() => {
                chatbox[0].innerHTML = "Đăng nhập không thành công!";
                chatbox[0].style.color = "red";
            })
            setTimeout(() => {
                toast.style.opacity = "0";
                setTimeout(() => {
                    toast.style.display = "none";
                }, 1000);
            }, 3000);
        }, 500);
        setTimeout(() => {
            stopLoading();
        }, 3500)
        console.error('Error logging in:', error);
    }
}

async function logout() {
    try {
        const user = await fetch('../json/users.json');
        const userData = await user.json();
        const username = userData[0].username;
        // console.log(username)
        const response = await fetch('https://secure-koi-wholly.ngrok-free.app/api/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
            body: JSON.stringify({ username }),
        });

        if (response.status === 200) {
            eel.logout();
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            stopLoading()
            console.log("Đăng xuất không thành công!")
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
}


