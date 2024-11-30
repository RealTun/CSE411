const axios = require('axios');
const https = require('https');
const bcrypt = require('bcrypt');
const pool = require("../../config/db");
const User = require('../model/user');

const agent = new https.Agent({
    rejectUnauthorized: false,
});

const userController = {
    login: async (req, res) => {
        const { username, password } = req.body;
        const url = 'https://sinhvien1.tlu.edu.vn/education/oauth/token';
        const data = {
            client_id: 'education_client',
            grant_type: 'password',
            username: username,
            password: password,
            client_secret: 'password',
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        let role = "normal";
        let state = "online";
        if(username === "2151160519"){
            role = "admin";
        }
        try {
            // throw new Error('Test error');
            const response = await axios.post(url, data, {
                headers: { 'Content-Type': 'application/json' },
                httpsAgent: agent,
            });
            const tokenData = response.data;
            const user = new User(username, hashedPassword, tokenData.access_token, role, state);
            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            let query;
            if (rows.length > 0) {
                query = 'UPDATE users SET access_token = ?, state= ? WHERE username = ?';
                await pool.query(query, [user.access_token, user.state, user.username]);
            } else {
                query = 'INSERT INTO users (username, password, access_token,role,state) VALUES (?, ?, ?,?,?)';
                await pool.query(query, [user.username, user.password, user.access_token, user.role, user.state]);
            }
            res.status(200).json({
                message: 'Login successful, data saved!',
                data: tokenData,
                role:user.role
            });
        } catch (error) {
            try {
                // nếu mà không vào được web trường thì check csdl xem có không ,cái quan trọng là access_token
                // nếu không có login được thì vẫn phải check mới cho vào
                const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
                if (rows.length > 0) {
                    const isMatch = await bcrypt.compare(password, rows[0].password);
                    if (isMatch) {
                        query = 'UPDATE users SET state= ? WHERE username = ?';
                        await pool.query(query, ["online", username]);
                        res.status(200).json({
                            message: 'Login successful, data saved!',
                            role:rows[0].role
                        });
                    } else {
                        res.status(400).json({ message: 'Mật khẩu sai!' });
                    }
                } else {
                    res.status(400).json({
                        message: 'Tên tài khoản sai!',
                    });
                }
            }
            catch(error){
                console.log(error);
                res.status(500).json({message:"Lỗi cơ sở dữ liệu!"});
            }
        }
    },
    logout: async (req, res) => {
        try {
            const { username } = req.body;
            query = 'UPDATE users SET state= ? WHERE username = ?';
            await pool.query(query, ["offline", username]);
            res.status(200).json({ message: "Đăng xuất thành công!" })
        }
        catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra khi đăng xuất!" })
        }
    }
}

module.exports = userController;