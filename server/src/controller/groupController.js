const axios = require('axios');
const https = require('https');
const pool = require("../../config/db");
const Topic = require('../model/topic');

const groupController = {
    selectTopic: async (req, res) => {
        const { username, topic } = req.body;
        try {
            const topic_selects = new Topic(username, topic);
            const [rows] = await pool.query('SELECT * FROM topic_selects WHERE topic = ?', [topic]);
            let query;
            if (rows.length <= 5) {
                query = 'INSERT INTO topic_selects (username, topic) VALUES (?, ?)';
                await pool.query(query, [topic_selects.username, topic_selects.topic]);
            }

            res.status(200).json({
                message: 'Login successful, data saved!'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Lỗi cơ sở dữ liệu!"});
        }
    },
    selectGroups: async (req, res) => {
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

module.exports = groupController;