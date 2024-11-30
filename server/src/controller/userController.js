const axios = require('axios');

const userController = {
    getAlluser: (req, res) => {
        const getAllusers = [
            {
                "username": "hello"
            }
        ]
        res.status(200).json(getAllusers);
    },
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

        try {
            const response = await axios.post(url, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error logging in:', error.message);
            res.status(error.response?.status || 500).json({
                message: 'Failed to login',
                error: error.response?.data || error.message
            });
        }
    }
}

module.exports = userController;