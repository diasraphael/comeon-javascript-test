import React from 'react';
import Games from './Games';
import FetchRequest from '../actions/FetchRequest';
import FetchSuccess from '../actions/FetchSuccess';
import FetchFailure from '../actions/FetchFailure';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from './Loader/Loader';
import './Loader/Loader.css';
class GameList extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            games: [],
            search: '',
            setCategory: false
        };
        this.filteredCategory = [];
    };
    
    updateSearch = (event) => {
        this.setState({
            search: event.target.value.substr(0,20),
            setCategory: false
        })
    }
    setCategory = (category) => {
        this.filteredCategory = this.state.games.filter((game)=>{
            return game.categoryIds.indexOf(category.id) !== -1;
        })
        this.setState({
            setCategory: true
        }) 
        console.log(this.filteredCategory);
    }
    logout = () => {
        this.props.history.push("/");
    }
    componentDidMount(){
        this.dispatchFetchRequest();
            setTimeout(()=>{
                this.apiRequest();
            },2000);
        
    }
    apiRequest(){

        fetch('mockData/Categories.json').then(response => 
            response.json().then(data => {
                this.setState({categories:data.categories});
                fetch('mockData/Games.json').then(response => 
                    response.json().then(data => {
                        this.setState({games:data.games});
                        this.dispatchSuccessRequest();
                })).catch(e =>{
                        console.log(e);
                        this.dispatchFailureRequest();
                    });
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
    render(){
        let gamesList;
        const filteredGames = this.state.games.filter((game)=>{
            return game.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });
        const categoryItems = this.state.categories.map((category,i) =>{
        return  (<div className="category item" key={category.id} onClick={()=>this.setCategory(category)}>
                    <div className="content">
                        <div className="header">{category.name}</div>
                    </div>
                </div>)
        });
        this.state.setCategory ? gamesList = this.filteredCategory.map((game,i) =>{
           return (<Games key= {i} stateProps= {game} />)
        }) :
        gamesList = filteredGames.map((game,i) =>{
           return (<Games key= {i} stateProps= {game} />)
        });
        const stateProps = this.props.games;
        const status = stateProps.status;
        return (
            <div>
                {status === "loading" ? (<Loader />) : 
            (<div className="casino">
                <div className="ui grid centered">
                    <div className="twelve wide column">
                        <div className="ui list">
                            <div className="player item">
                                <img className="ui avatar image" src={this.props.games.player.avatar} alt="avatar" />

                                <div className="content">
                                    <div className="header"><b className="name">{this.props.games.player.name}</b></div>
                                    <div className="description event">{this.props.games.player.event}</div>
                                </div>
                            </div>

                        </div>
                        <div className="logout ui left floated secondary button inverted" onClick={this.logout}>
                            <i className="left chevron icon"></i>Log Out
                        </div>
                    </div>
                    <div className="four wide column">
                        <div className="search ui small icon input ">
                            <input type="text" placeholder="Search Game" value={this.state.search} onChange={this.updateSearch}/>
                            <i className="search icon"></i>
                        </div>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="twelve wide column">
                        <h3 className="ui dividing header">Games</h3>

                        <div className="ui relaxed divided game items links">
                           { gamesList }
                        </div>
                    </div>
                    <div className="four wide column">
                        <h3 className="ui dividing header">Categories</h3>
                        <div className="ui selection animated list category items">
                           { categoryItems }
                        </div>
                    </div>
                </div>

            </div>)}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        games : state
    };
};


export default withRouter(connect(mapStateToProps)(GameList));