const axios = require('axios');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvParser = require('csv-parser');
// const https = require('https');

const baseUrl = 'https://sinhvien1.tlu.edu.vn';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// login
const login = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/oauth/token`;

        // Mẫu body request
        // {
        //     "client_id": "education_client",
        //     "grant_type": "password",
        //     "username": "",
        //     "password": "",
        //     "client_secret": "password"
        // }

        // Dữ liệu gửi đi từ body của client
        const requestData = req.body;

        // Gửi yêu cầu POST đến API
        const response = await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Trả kết quả từ API cho client
        res.status(200).json({
            message: 'Get token success',
            token: `Bearer ${response.data['access_token']}`,
            // data: response.data
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
};

const getCurrentStudent = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/api/users/getCurrentUser`;     

        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                message: 'Authorization token is required',
            });
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': token
            },
        });

        res.status(200).json({
            message: 'Get current user success',
            data: response.data,
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

const getListMarkDetail = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/api/studentsubjectmark/getListMarkDetailStudent`;     

        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                message: 'Authorization token is required',
            });
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': token
            },
        });

        const idsToFind = [354, 358];
        const filteredData = response.data.filter(item => 
            item.subject && idsToFind.includes(item.subject.id)
        );

        const result = filteredData.map(item => {
            const name = item.id === 354 ? 'Phân tích dữ liệu lớn' : 'Quản trị hệ thống thông tin'
        
            return {
                subject: name,
                mark: item.mark,
                mark4: item.mark4,
            };
        });

        res.status(200).json({
            message: 'Get list mark success',
            data: result  
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

const testAPIs = async (req, res, next) => {
    try {
        const loginUrl = `${baseUrl}/education/oauth/token`;

        // Mẫu body request
        // {
        //     "client_id": "education_client",
        //     "grant_type": "password",
        //     "username": "",
        //     "password": "",
        //     "client_secret": "password"
        // }

        // Dữ liệu gửi đi từ body của client
        const loginPayload = req.body;

        const loginResponse = await axios.post(loginUrl, loginPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const token = `Bearer ${loginResponse.data['access_token']}`;
        // console.log("Login Successful! Token:", token);

        const getListMarkDetailUrl = `${baseUrl}/education/api/studentsubjectmark/getListMarkDetailStudent`;

        const listMarkResponse = await axios.get(getListMarkDetailUrl, {
            headers: {
                'Authorization': token,
            },
        });

        // console.log("Marks Data:", listMarkResponse.data);
        const idsToFind = [354, 358];
        const filteredData = listMarkResponse.data.filter(item =>
            item.subject && idsToFind.includes(item.subject.id)
        );

        const result = filteredData.map(item => {
            const name = item.id === 354 ? 'Phân tích dữ liệu lớn' : 'Quản trị hệ thống thông tin';

            return {
                subject: name,
                mark: item.mark
            };
        });

        // console.log("Filtered Data:", result);

        const csvFilePath = '../data/data_standard.csv'; // File CSV của bạn
        const updatedData = [];

        // Đọc file CSV
        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (row) => {
                const firstKey = Object.keys(row)[0];  // Lấy key đầu tiên
                const firstValue = row[firstKey];
                if (firstValue == req.body['username']) {
                    // Nếu mã sinh viên có trong danh sách cập nhật, sửa điểm
                    row['Điểm TB MIS'] = result[1].mark || 0;
                    row['Điểm TB BigData'] = result[0].mark || 0;
                }
                updatedData.push(row); // Thêm dữ liệu đã cập nhật vào danh sách
            })
            .on('end', async () => {
                // console.log('Dữ liệu mới:', updatedData);

                // Ghi lại file CSV
                const csvWriter = createCsvWriter({
                    path: csvFilePath, // Ghi đè file cũ
                    header: Object.keys(updatedData[0]).map((key) => ({
                        id: key,
                        title: key,
                    })),
                });

                await csvWriter.writeRecords(updatedData);
            });

        res.status(200).json({
            data: result  
        });

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
};

module.exports = {
    login,
    getCurrentStudent,
    getListMarkDetail,
    testAPIs
};
