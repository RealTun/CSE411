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

        if (response.status === 200) {
            console.log("Đăng nhập thành công!");
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

