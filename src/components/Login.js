import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';

class Login extends React.Component{

    state = {
      login: true,
      email: "",
      password: "",
      name: ""
    }


    render() {
        return (
          <div className="App_Login">
            <div className="App__Aside_login">
              <div className="App__Aside_Heading">
                SAMACHAAR
              </div>
              <div className="App__Aside__text_login">
                Share what's happening around you with one click
              </div>
            </div>
            <div className="App__Form_login">
              <div style={{fontSize:'3em', marginTop:'10%', textWeight:'700', textAlign:'center'}} onClick={() => this.confirm()}>
                {this.state.login ? 'Login' : 'Signin' }
              </div>
              <div style={{padding:'10px', marginTop:'7%', textAlign:'center'}}>
                    <form onSubmit={this.signupUser}>
                      <div className="FormField">
                        {!this.state.login &&
                          <input
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                            type='text'
                            className='FormField__Input'
                            placeholder='Your name'
                          />}
                      </div>
                      <div className="FormField">
                        <input
                          value={this.state.email}
                          onChange={(e) => this.setState({ email: e.target.value })}
                          type='email'
                          className='FormField__Input'
                          placeholder='Your email address'
                        />
                      </div>
                      <div className="FormField">

                        <input
                          value={this.state.password}
                          onChange={(e) => this.setState({ password: e.target.value })}
                          type='password'
                          className='FormField__Input'
                          placeholder='Choose a safe password'
                        />
                      </div>

                      <div
                        className='FormField__Button1'
                        onClick={() => this.confirm()}
                      >
                        {this.state.login ? 'Login Here' : 'Create Account' }
                      </div>
                      <div
                        className="FormField__Button2"
                        onClick={() => this.setState({ login: !this.state.login})}
                      >
                        {this.state.login ? 'Create an account' : 'Already have an account'}
                      </div>
                    </form>
              </div>
            </div>
          </div>
        )
    }

      confirm = async() => {
        const { name, email, password } = this.state
        if(this.state.login) {
          const result = await this.props.signinUserMutation({
            variables: {
              email,
              password
            }
          })
          const id = result.data.signinUser.user.id
          const token = result.data.signinUser.token
          this.saveUserData(id, token)
        } else {
          const result = await this.props.createUserMutation({
            variables: {
              name,
              email,
              password
            }
          })
          const id = result.data.signinUser.user.id
          const token = result.data.signinUser.token
          this.saveUserData(id, token)
        }
        this.props.history.push('/home')
      }

      saveUserData = ( id, token ) => {
        localStorage.setItem(GC_USER_ID, id)
        localStorage.setItem(GC_AUTH_TOKEN, token)
      }

    }

    const CREATE_USER_MUTATION = gql`
      mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
        createUser(
          name: $name,
          authProvider: {
            email: {
              email: $email,
              password: $password
            }
          }
        ) {
          id
        }

        signinUser(email: {
          email: $email,
          password: $password
        }) {
          token
          user {
            id
          }
        }
      }
    `

    const SIGNIN_USER_MUTATION = gql`
      mutation SigninUserMutation($email: String!, $password: String!) {
        signinUser(email: {
          email: $email,
          password: $password
        }) {
          token
          user {
            id
          }
        }
      }
    `

    export default compose(
      graphql(CREATE_USER_MUTATION, {name: 'createUserMutation'}),
      graphql(SIGNIN_USER_MUTATION, {name: 'signinUserMutation'})
    )(withRouter(Login));
