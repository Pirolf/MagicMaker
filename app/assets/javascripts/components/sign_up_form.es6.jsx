const SubmiteBtn = require('./submit_btn.es6.jsx');
class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', email: '', password: '', password_confirmation: ''};
    }

    handleChange(key, e) {
        console.log(`{"${key}": "${e.target.value}}"`)
        const kv = JSON.parse(`{"${key}": "${e.target.value}"}`);
        console.log(kv);
        this.setState(kv);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {auth_token} = this.props;
        const {username, email, password, password_confirmation} = this.state;

        $.ajax({
            url: '/users',
            type: 'POST',
            dataType: 'json',
            data: {
                utf8: '✓',
                auth_token,
                user: {
                    username,
                    email,
                    password,
                    password_confirmation,
                    commit: "Sign up"
                }
            }
        })
        .done((data) => {
            console.log(data)
        });
    }

    render() {
        const {username, email, password, password_confirmation} = this.state;
        return (
            <form className="new_user" id="new_user">
                <label htmlFor='user_username'>Username</label>
                <input onChange={this.handleChange.bind(this, "username")} className="form-control" value={username} id="user_username" name="user[username]" type="text"></input>
                
                <label htmlFor='user_email'>Email</label>
                <input onChange={this.handleChange.bind(this, "email")}  className="form-control" value={email} id="user_email" name="user[email]" type="email"></input>
                
                <label htmlFor='user_password'>Password</label>
                <input onChange={this.handleChange.bind(this, "password")}  className="form-control" value={password} id="user_password" name="user[password]" type="password"></input>
                
                <label htmlFor='user_password_confirmation'>Confirm password</label>
                <input onChange={this.handleChange.bind(this, "password_confirmation")}  className="form-control" value={password_confirmation} id="user_password_confirmation" name="user[password_confirmation]" type="password"></input>
                
                <div onClick={this.handleSubmit.bind(this)}>
                    <SubmiteBtn value="Sign up"/>
                </div>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    auth_token: React.PropTypes.string
}

module.exports = SignUpForm
window.SignUpForm = SignUpForm