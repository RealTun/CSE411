const axios = require('axios');
const https = require('https');
const pool = require("../../config/db");
const Topic = require('../model/topic');
const Group = require('../model/group');
const fs = require('fs');

const groupController = {
    selectTopic: async (req, res) => {
        const { username, topic } = req.body;
        try {
            const topic_selects = new Topic(username, topic);
            const [rows] = await pool.query('SELECT * FROM topic_selects WHERE topic = ?', [topic]);
            let query;
            if (rows.length < 5) {
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
        const filePath = '../data/thongtincanhan_with_groups.json';
        try {
            let query = 'DELETE FROM group_selects';
            await pool.query(query);
            fs.readFile(filePath, 'utf8', (err, data) => {
                const students = JSON.parse(data);
                students.forEach(student => {
                    const group_selects = new Group(
                        student["MSV"], 
                        student["Họ tên"],
                        student["Điểm TB MIS"],
                        student["Điểm TB BigData"],
                        student["Thời gian tự học TB trong ngày"],
                        student["Số lần đi học muộn trong giai đoạn 1"],
                        student["Kỹ năng mềm"],
                        student["Khả năng sử dụng công nghệ"],
                        student["Sở trường"],
                        student["Nhóm"],
                        student["Gợi ý"]
                    );
                    query = `
                        INSERT INTO \`group_selects\` 
                        (\`username\`, \`fullname\`, \`Average_MIS_Score\`, \`Average_BigData_Score\`, 
                        \`Average_Self_Study_Time\`, \`Number_of_Late_Attendances_in_Phase_1\`, 
                        \`Soft_Skills\`, \`Technology_Usage_Skills\`, \`Strengths\`, \`Group\`, \`Topic\`) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `;
                    pool.query(query, [
                        group_selects.username, 
                        group_selects.fullname,
                        group_selects.Average_MIS_Score,
                        group_selects.Average_BigData_Score,
                        group_selects.Average_Self_Study_Time,
                        group_selects.Number_of_Late_Attendances_in_Phase_1,
                        group_selects.Soft_Skills,
                        group_selects.Technology_Usage_Skills,
                        group_selects.Strengths,
                        group_selects.Group,
                        group_selects.Topic
                    ]);
                });
            });
            res.status(200).json({ message: "Lưu nhóm thành công!" })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Có lỗi xảy ra khi lưu nhóm!" })
        }
    }
}

module.exports = groupController;