import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';
// import { createUserInfo } from '../../actions/userinfoActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      role:'user'
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // onClick = (e)=> {
  //   this.setState({ role: "teacher" });
  // }

  // onClick1 = (e)=> {
  //   this.setState({ role: "student" });
  // }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="landing">
        <div className="register container">
              <h1 className="display-4 text-center text-light">Sign Up</h1>
              <p className="text-light text-center">
                Create your new account
              </p>
              <br/>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Full Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                {/* <div align="center" className="checkgroup">
                  <input type="checkbox" name="teacher" defaultChecked={false} onClick={this.onClick}/> <span className="mr-5">Teacher</span>
                  <input type="checkbox" name="student" defaultChecked={false} onClick={this.onClick1}/> <span>Student</span>
                </div> */}
                <input type="submit" className="btn btn-primary btn-block mt-4 mb-5"/>
                <Link to="/login"><p className="text-center text-light">
                  Sign in
                </p></Link>
              </form>
            </div>
          </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
