import React,{ Component } from "react";

export default class Register extends Component {

    handleSubmit(e) {
        e.preventDefault();
        const data = {
            nick_name: this.nickname,
            password: this.password,
            password_confirm: this.confirmPassword
        }
        console.log(data)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>NickName</label>
                    <input type="text" className="form-control" placeholder="Your nickname"
                        onChange={e => this.nickname = e.target.value}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                        onChange={e => this.password = e.target.value}/>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm password"
                        onChange={e => this.confirmPassword = e.target.value}/>
                </div>
                <button className="btn btn-primary btn-block">Sign Up</button>
            </form>
        );
    }
}