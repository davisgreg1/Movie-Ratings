import React from 'react';


class OneMovie extends React.Component {
constructor(){
    super();
    const { movie } = this.props
    }
    render(){
        const { movie } = this.props
        return(
            <div>{ movie }</div>
        )
    }
}
export default OneMovie;