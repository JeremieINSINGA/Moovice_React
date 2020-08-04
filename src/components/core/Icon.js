import React, { Component } from 'react';

class Icon extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(id) {
        this.props.onClickFavorite(id)
    }

    render() {
        const { icon, id } = this.props
        return(
            <span className="material-icons" onClick={() => {this.onClick(id)}}>
                {icon}
            </span>
        );
    }
}

export default Icon;