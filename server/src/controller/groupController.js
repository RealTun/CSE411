const axios = require('axios');
const https = require('https');
const pool = require("../../config/db");
const Topic = require('../model/topic');
const Group = require('../model/group');
const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { exec } = require('child_process');

const groupController = {
    // dùng để chọn topic
    // Mẫu body request
    // {
    //     "username": "",
    //     "topic": ""
    // }
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
            else if (rows[0]['username'] == '2151160519') {

            }

            res.status(200).json({
                message: 'Lưu topic thành công!'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Lỗi cơ sở dữ liệu!" });
        }
    },
    // dùng để phân nhóm
    grouping: async (req, res) => {
        try {
            const csvFilePath = '../data/data_standard.csv';
            const rawData = []; // Lưu dữ liệu thô từ CSV

            // Đọc dữ liệu từ file CSV
            await new Promise((resolve, reject) => {
                fs.createReadStream(csvFilePath)
                    .pipe(csvParser())
                    .on('data', (row) => rawData.push(row)) // Lưu từng hàng vào rawData
                    .on('end', resolve) // Hoàn tất quá trình đọc
                    .on('error', reject); // Xử lý lỗi nếu xảy ra
            });
            // Dữ liệu đã đọc
            const updatedData = [];
            for (const row of rawData) {
                try {
                    const firstKey = Object.keys(row)[0]; // Lấy key đầu tiên
                    const firstValue = row[firstKey];

                    // Thực hiện truy vấn với await
                    const [rows] = await pool.query(
                        'SELECT * FROM topic_selects WHERE username = ?',
                        [firstValue]
                    );
                    // Cập nhật hàng với dữ liệu từ cơ sở dữ liệu
                    row['topic'] = rows.length > 0 ? rows[0]['Topic'] : 0;
                    updatedData.push(row);
                } catch (err) {
                    console.error('Lỗi khi xử lý hàng:', err);
                }
            }
            // Ghi lại file CSV
            const csvWriter = createCsvWriter({
                path: csvFilePath, // Ghi đè file cũ
                header: Object.keys(updatedData[0]).map((key) => ({
                    id: key,
                    title: key,
                })),
            });

            await csvWriter.writeRecords(updatedData);

            exec(`python ../backend2.py`, (err, stdout, stderr) => {
                if (err) {
                    console.error(`${err}`);
                    return;
                }
                if (stderr) {
                    console.error(`${stderr}`);
                    return;
                }
            });

            const filePath = '../data/thongtincanhan_with_groups.json';

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
                        student["GPA"],
                        student["Thời gian tự học TB trong ngày"],
                        student["Số lần đi học muộn trong giai đoạn 1"],
                        student["Kỹ năng mềm"],
                        student["Khả năng sử dụng công nghệ"],
                        student["Sở trường"],
                        student["Nhóm"],
                        student["topic"]
                    );
                    query = `
                        INSERT INTO \`group_selects\` 
                        (\`username\`, \`fullname\`, \`Average_MIS_Score\`, \`Average_BigData_Score\`, \`GPA\`, 
                        \`Average_Self_Study_Time\`, \`Number_of_Late_Attendances_in_Phase_1\`, 
                        \`Soft_Skills\`, \`Technology_Usage_Skills\`, \`Strengths\`, \`Group\`, \`Topic\`) 
                        VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)
                        `;
                    pool.query(query, [
                        group_selects.username,
                        group_selects.fullname,
                        group_selects.Average_MIS_Score,
                        group_selects.Average_BigData_Score,
                        group_selects.GPA,
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

            res.status(200).json({ message: 'Lưu nhóm thành công!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi lưu nhóm!' });
        }
    },
    // dùng để chốt nhóm
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
                        student["GPA"],
                        student["Thời gian tự học TB trong ngày"],
                        student["Số lần đi học muộn trong giai đoạn 1"],
                        student["Kỹ năng mềm"],
                        student["Khả năng sử dụng công nghệ"],
                        student["Sở trường"],
                        student["Nhóm"],
                        student["topic"]
                    );
                    query = `
                        INSERT INTO \`group_selects\` 
                        (\`username\`, \`fullname\`, \`Average_MIS_Score\`, \`Average_BigData_Score\`, \`GPA\`, 
                        \`Average_Self_Study_Time\`, \`Number_of_Late_Attendances_in_Phase_1\`, 
                        \`Soft_Skills\`, \`Technology_Usage_Skills\`, \`Strengths\`, \`Group\`, \`Topic\`) 
                        VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)
                        `;
                    pool.query(query, [
                        group_selects.username,
                        group_selects.fullname,
                        group_selects.Average_MIS_Score,
                        group_selects.Average_BigData_Score,
                        group_selects.GPA,
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
    },
    getUserSameGroup: async (req, res) => {
        try {
            const query = `SELECT * from group_selects WHERE \`Group\` = ?`;
            const { group } = req.query;
            const userData = await pool.query(query,[group]);
            res.status(200).json(userData[0]);
        }
        catch (error) {
            res.status(500).json({ message:"Có lỗi xảy ra khi lấy dữ liệu ! ",error });
        }
    },
    getMyInfor: async (req,res) =>{
        try{
            const query = `SELECT * from group_selects WHERE \`username\` = ?`;
            const { username } = req.query;
            const userData = await pool.query(query,[username]);
            res.status(200).json(userData[0][0]);
        }
        catch(error){
            res.status(500).json({ message:"Có lỗi xảy ra khi lấy dữ liệu ! ",error });
        }
    }
}

module.exports = groupController;