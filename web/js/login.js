async function login() {
    loading();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const data = {
        username: username,
        password: password,
    };

    try {
        const response = await fetch('http://localhost:3001/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const userDataset = await fetch(`http://localhost:3001/api/group/getMyInfor/?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const userDatas = await userDataset.json();
        if (response.status === 200) {
            const userData = await response.json();
            // await logout();
            if (userDatas != null) {
                userData.infor = userDatas
            }
            eel.login(userData);
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            stopLoading()
            console.log("Đăng nhập không thành công!")
        }
    } catch (error) {
        stopLoading()
        console.error('Error logging in:', error);
    }
}

async function logout() {
    try {
        const user = await fetch('../json/users.json');
        const userData = await user.json();
        const username = userData[0].username;
        // console.log(username)
        const response = await fetch('http://localhost:3001/api/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

