import React, { Component } from 'react';
import Config from '../../Config';

import picture1 from '../../picture1.png';
import picture2 from '../../picture2.png';
import './CardActor.css';

class CardActor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { actor, language, key } = this.props;
        let src = '';
        let alt = '';
        if (actor.profile !== null) {
            src = Config.IMG_ROOT + actor.profile;
            alt = 'Poster of ' + actor.name;
        } else {
            if (actor.gender === 1) {
                src = picture1
                alt = 'picture 1'
            } else if (actor.gender === 2) {
                src = picture2
                alt = 'picture 2'
            }
            
        }

        let character = '';
        if (language === "en") {
            character = 'Character : ';
        } else if (language === "fr") {
            character = 'Personnage : ';
        }

        return(
            <div className="card" key={key}>                
                <img src={src} className="card-img-top" alt={alt} />
                <div className="card-body">
                    <h6 className="card-title">{actor.name}</h6>
                    <p className="card-text">{character}{actor.character}</p>
                </div>  
            </div>            
        );
    }    
}

export default CardActor;