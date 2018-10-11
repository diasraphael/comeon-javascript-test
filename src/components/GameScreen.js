import React from 'react';
import {withRouter} from 'react-router-dom';

class GameScreen extends React.Component {
    goBack = () => {
        this.props.history.push({
            pathname: "/gameList",
            });
    }
    componentDidMount(){
        window.comeon.game.launch(this.props.history.location.state);
    } 
    render(props){
        return  (
                    <div className="ingame">
                    <div className="ui grid centered">
                        <div className="three wide column">
                            <div className="ui right floated secondary button inverted" onClick={this.goBack}><i className="left chevron icon"></i>Back
                            </div>
                        </div>
                        <div className="ten wide column">
                            <div id="game-launch">
                            </div>
                        </div>
                        <div className="three wide column"></div>
                    </div>
                    </div>
            )
   }
}

export default withRouter(GameScreen);