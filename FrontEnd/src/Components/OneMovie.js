import React from 'react';

class OneMovie extends React.Component {
    render(){
        const { movie } = this.props
        return(
            <div>{ movie }</div>
        )
    }
}
export default OneMovie;

