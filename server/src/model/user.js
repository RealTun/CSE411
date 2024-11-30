class User{
    constructor(username, password,access_token,role,state) {
        this.username = username;
        this.password = password;
        this.access_token = access_token;
        this.role = role;
        this.state = state;
    }
}
module.exports = User;