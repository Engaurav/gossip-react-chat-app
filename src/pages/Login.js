import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div>
          <div>
            <div>
                <form>
                    <div>
                        <label>Email</label>
                        <input type='email' name="email" placeholder="Enter Email..." required />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='password' name="password" placeholder="Enter Password..." required />
                    </div>
                    <div>
                        <input type='submit' value="Register"/>
                    </div>
                </form>
            </div>
        </div>
      </div>
    )
  }
}


export default Login;