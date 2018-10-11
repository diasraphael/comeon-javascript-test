import React from 'react';
import {withRouter} from 'react-router-dom';
const startGame = (code,props) => {
    props.history.push({
            pathname: "/gameScreen",
            state: code
            });
    }
const Games = (props) => {
    return  (
                <div className="game item">
                    <div className="ui small image">
                        <img src={props.stateProps.icon} alt="game-icon"/>
                    </div>
                    <div className="content">
                        <div className="header"><b className="name">{props.stateProps.name}</b></div>
                        <div className="description">{props.stateProps.description}
                        </div>
                        <div className="extra">
                            <div className="play ui right floated secondary button inverted" onClick={startGame.bind(null,props.stateProps.code,props)}>
                                Play
                                <i className="right chevron icon"></i>
                            </div>

                        </div>
                    </div>
                </div>
        )
}

export default withRouter(Games);