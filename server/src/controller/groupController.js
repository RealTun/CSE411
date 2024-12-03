const axios = require('axios');
const https = require('https');
const pool = require("../../config/db");
const Topic = require('../model/topic');
const Group = require('../model/group');
const Student = require('../model/student');
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

            try {
                // Thực hiện truy vấn với await
                const [rows] = await pool.query(
                    'SELECT s.username,s.fullname,s.Average_MIS_Score,s.Average_BigData_Score,s.GPA,s.Average_Self_Study_Time,s.Number_of_Late_Attendances_in_Phase_1,s.Soft_Skills,s.Technology_Usage_Skills,s.Strengths,s.Muc_do,COALESCE(ts.Topic, 0) AS Topic FROM students s LEFT JOIN topic_selects ts ON s.username = ts.username;',
                );
                if (rows.length < 12){
                    res.status(500).json({ message: 'Không đủ thành thành viên để phân nhóm!' });
                    return;
                }
                const csvWriter = createCsvWriter({
                    path: csvFilePath,
                    header: [
                        { id: 'username', title: 'MSV' },
                        { id: 'fullname', title: 'Họ tên' },
                        { id: 'Average_MIS_Score', title: 'Điểm TB MIS' },
                        { id: 'Average_BigData_Score', title: 'Điểm TB BigData' },
                        { id: 'GPA', title: 'GPA' },
                        { id: 'Average_Self_Study_Time', title: 'Thời gian tự học TB trong ngày' },
                        { id: 'Number_of_Late_Attendances_in_Phase_1', title: 'Số lần đi học muộn trong giai đoạn 1' },
                        { id: 'Soft_Skills', title: 'Kỹ năng mềm' },
                        { id: 'Technology_Usage_Skills', title: 'Khả năng sử dụng công nghệ' },
                        { id: 'Strengths', title: 'Sở trường' },
                        { id: 'Muc_do', title: 'Mức độ' },
                        { id: 'Topic', title: 'topic' },
                    ],
                });
            
                // Ghi dữ liệu vào file CSV
                await csvWriter.writeRecords(rows);
            } catch (err) {
                console.error('Lỗi khi xử lý hàng:', err);
                res.status(500).json({ message: 'Có lỗi xảy ra khi lưu thành viên!' });
            }

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
    // dùng để lưu thành viên
    // {
    //     "username": 2151163709,
    //     "fullname": "Nguyễn Tuấn Ngọc",
    //     "Average_MIS_Score": 7.5,
    //     "Average_BigData_Score": 6.0,
    //     "GPA": 3.0,
    //     "Average_Self_Study_Time": 3.0,
    //     "Number_of_Late_Attendances_in_Phase_1": 0,
    //     "Soft_Skills": "Tốt",
    //     "Technology_Usage_Skills": "Khá",
    //     "Strengths": "Kỹ thuật",
    //     "Muc_do": 1
    // }
    saveStudent: async (req, res) => {
        const { 
            username, 
            fullname, 
            Average_MIS_Score, 
            Average_BigData_Score, 
            GPA, 
            Average_Self_Study_Time, 
            Number_of_Late_Attendances_in_Phase_1, 
            Soft_Skills, 
            Technology_Usage_Skills, 
            Strengths, 
            Muc_do
        } = req.body;
        try {
            const student = new Student(username, 
                fullname, 
                Average_MIS_Score, 
                Average_BigData_Score, 
                GPA, 
                Average_Self_Study_Time, 
                Number_of_Late_Attendances_in_Phase_1, 
                Soft_Skills, 
                Technology_Usage_Skills, 
                Strengths, 
                Muc_do);
            const [rows] = await pool.query('SELECT * FROM students WHERE username = ?', [username]);
            let query;
            if (rows.length <= 0) {
                query = 'INSERT INTO students (username, fullname, Average_MIS_Score, Average_BigData_Score, GPA, Average_Self_Study_Time, Number_of_Late_Attendances_in_Phase_1, Soft_Skills, Technology_Usage_Skills, Strengths, Muc_do) VALUES (?, ?,?,?,?,?,?,?,?,?,?)';
                await pool.query(query, [student.username, 
                    student.fullname, 
                    student.Average_MIS_Score, 
                    student.Average_BigData_Score, 
                    student.GPA, 
                    student.Average_Self_Study_Time, 
                    student.Number_of_Late_Attendances_in_Phase_1, 
                    student.Soft_Skills, 
                    student.Technology_Usage_Skills, 
                    student.Strengths, 
                    student.Muc_do]);
            }

            res.status(200).json({
                message: 'Lưu thành viên thành công!'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Lỗi cơ sở dữ liệu!" });
        }
    },
    saveFullStudents: async (req, res) => {
        try {
            const csvFilePath = '../data/data_standard.csv';
            const rawData = []; // Lưu dữ liệu thô từ CSV
            let headers_0 = 'MSV';

            // Đọc dữ liệu từ file CSV
            await new Promise((resolve, reject) => {
                fs.createReadStream(csvFilePath)
                    .pipe(csvParser())
                    .on('headers', (headers) => {
                        headers_0 = headers[0]; // headers là mảng chứa tất cả các tiêu đề
                    })
                    .on('data', (row) => {
                        rawData.push(row);
                    }) // Lưu từng hàng vào rawData
                    .on('end', resolve) // Hoàn tất quá trình đọc
                    .on('error', reject); // Xử lý lỗi nếu xảy ra
            });
            let query = 'DELETE FROM students';
            await pool.query(query);
            // Dữ liệu đã đọc
            for (const row of rawData) {
                try {
                    const student = new Student(
                        row[headers_0],
                        row['Họ tên'],
                        row['Điểm TB MIS'],
                        row['Điểm TB BigData'],
                        row['GPA'],
                        row['Thời gian tự học TB trong ngày'],
                        row['Số lần đi học muộn trong giai đoạn 1'],
                        row['Kỹ năng mềm'],
                        row['Khả năng sử dụng công nghệ'],
                        row['Sở trường'],
                        row['Mức độ']
                    );
                    query = 'INSERT INTO students (username, fullname, Average_MIS_Score, Average_BigData_Score, GPA, Average_Self_Study_Time, Number_of_Late_Attendances_in_Phase_1, Soft_Skills, Technology_Usage_Skills, Strengths, Muc_do) VALUES (?, ?,?,?,?,?,?,?,?,?,?)';
                    await pool.query(query, [student.username, 
                        student.fullname, 
                        student.Average_MIS_Score, 
                        student.Average_BigData_Score, 
                        student.GPA, 
                        student.Average_Self_Study_Time, 
                        student.Number_of_Late_Attendances_in_Phase_1, 
                        student.Soft_Skills, 
                        student.Technology_Usage_Skills, 
                        student.Strengths, 
                        student.Muc_do]);
                } catch (err) {
                    console.error('Lỗi khi xử lý hàng:', err);
                }
            }

            res.status(200).json({
                message: 'Lưu thành viên thành công!'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Lỗi cơ sở dữ liệu!" });
        }
    },
    deleteData: async (req, res) => {
        try {
            let query = 'DELETE FROM students';
            await pool.query(query);
            query = 'DELETE FROM group_selects';
            await pool.query(query);

            res.status(200).json({
                message: 'Xoá dữ liệu thành công!'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Lỗi cơ sở dữ liệu!" });
        }
    },
    getUserSameGroup: async (req, res) => {
        try {
            const query = `SELECT * from group_selects WHERE \`Group\` = ?`;
            const { group } = req.query;
            const userData = await pool.query(query, [group]);
            res.status(200).json(userData[0]);
        }
        catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra khi lấy dữ liệu ! ", error });
        }
    },
    getMyInfor: async (req, res) => {
        try {
            const query = `SELECT * from group_selects WHERE \`username\` = ?`;
            const { username } = req.query;
            const userData = await pool.query(query, [username]);
            res.status(200).json(userData[0][0]);
        }
        catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra khi lấy dữ liệu ! ", error });
        }
    },
    getMyTopic: async (req, res) => {
        try {
            const query = `SELECT * from topic_selects WHERE \`username\` = ?`;
            const { username } = req.query;
            const userData = await pool.query(query, [username]);
            res.status(200).json(userData[0]);
        }
        catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra khi lấy dữ liệu ! ", error });
        }
    }
}

module.exports = groupController;