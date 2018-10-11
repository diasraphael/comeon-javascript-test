import React from 'react';
import {withRouter} from 'react-router-dom';
import Comeon from '../reducers/Comeon';
import FetchRequest from '../actions/FetchRequest';
import FetchSuccess from '../actions/FetchSuccess';
import FetchFailure from '../actions/FetchFailure';
import { connect } from 'react-redux';
import Loader from './Loader/Loader';
import './Loader/Loader.css';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
        }
        this.loginDetails = {
            loginMessage : '',
            loginStatus:'',
            loginError: '',
            player: {},
        }
    }

    login = () => {
        if(this.state.username === '' || this.state.password === ''){
            this.loginDetails ={
                    loginStatus: 'fail',
                    loginError: 'Enter username/ password'
                };
        }else{
            this.dispatchFetchRequest();
            setTimeout(()=>{
                this.apiRequest();
            },2000);
        }
    }
    apiRequest(){
        fetch('mockData/Login.json').then(response => 
            response.json().then(data => {
                this.props.store.credentials = data.players;
                this.dispatchSuccessRequest();
                this.authenticate();    
        })).catch(e =>{
            console.log(e);
            this.dispatchFailureRequest();
        });
    }
    dispatchFetchRequest(){
        this.props.dispatch(FetchRequest());
    }
    dispatchSuccessRequest(){
        this.props.dispatch(FetchSuccess());
    }
    dispatchFailureRequest(){
        this.props.dispatch(FetchFailure());
    }
    authenticate(){
        if (this.state.username in this.props.store.credentials && this.props.store.credentials[this.state.username].password === this.state.password) {
                this.loginDetails = {
                    loginStatus: 'success',
                    player: this.props.store.credentials[this.state.username]
                };
                this.props.store.player = this.loginDetails.player;
            } else {
                this.loginDetails ={
                    loginStatus: 'fail',
                    loginError: 'player does not exist or wrong password'
                };
            }
            if(this.loginDetails.loginStatus === 'success'){
                this.props.history.push("/gameList");
            }else{
                this.props.history.push("/");
            }
    }
    handleUsernameChange = (event) => {
        this.setState({
            username : event.target.value
        });
    }
    handlePasswordChange = (event) => {
        this.setState({
            password : event.target.value
        });
    }


    render(){
        const stateProps = this.props.store;
        const status = stateProps.status; 
        const loginMessage = this.loginDetails.loginStatus === 'fail' ?  this.loginDetails.loginError :'';   
        return (  
            <div>
                {status === "loading" ? (<Loader />) : 
            (<div className="login">
                <div className="ui grid centered">
                   
                    <form>
                        <div className="fields">
                            <div className="required field">
                                <div className="ui icon input">
                                    <input type="text" name="username" onChange={this.handleUsernameChange} value={this.state.username} placeholder="Username"/>
                                    <i className="user icon"></i>
                                </div>
                            </div>
                            <div className="required field">
                                <div className="ui icon input">
                                    <input type="password" name="password" onChange={this.handlePasswordChange} value={this.state.password} placeholder="Password"/>
                                    <i className="lock icon"></i>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui icon input">
                                    <input type="button" value="Login" onClick={this.login} />
                                    <i className="right chevron icon"></i>
                                </div>
                            </div>
                            <div className="field err-message">{loginMessage}</div>
                        </div>
                    </form>
                   
                </div>
            </div>)}
            </div> 
        )
    }
}



const mapStateToProps = (state) => {
    return {
        store : state
    };
};


export default withRouter(connect(mapStateToProps)(Login));