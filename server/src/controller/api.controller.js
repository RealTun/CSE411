const axios = require('axios');
const https = require('https');

const baseUrl = 'https://sinhvien1.tlu.edu.vn';

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
const agent = new https.Agent({
    rejectUnauthorized: false,
});
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
            httpsAgent: agent,
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
            httpsAgent: agent,
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
                'Authorization':"Bearer "+ token
            },
            httpsAgent: agent,
        });

        const idsToFind = [354, 358];
        const filteredData = response.data.filter(item => 
            item.subject && idsToFind.includes(item.subject.id)
        );

        const result = filteredData.map(item => {
            const name = item.subject.id === 354 ? 'Bigdata' : 'MIS'
        
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

module.exports = {
    login,
    getCurrentStudent,
    getListMarkDetail
};
