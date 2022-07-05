import React, { Component } from 'react'

class Register extends Component {
  render() {
    return (
      <div>
        <div>
            <div>
                <form>
                    <div>
                        <label>Name</label>
                        <input type='text' name="name" placeholder="Enter Name..." required />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type='email' name="email" placeholder="Enter Email..." required />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='password' name="password" placeholder="Enter Password..." required />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input type='password' name="confirm_password" placeholder="Enter Confirm Password..." required />
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


export default Register;