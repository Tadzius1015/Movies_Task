import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from "@material-ui/core/Button";

class pageNotFoundError extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <div style={{marginTop:'10%'}}>
                <div>
                    <h1 style={{fontSize:'130px', display:'flex',alignItems:'center',justifyContent:'center'}}>404</h1>
                </div>
                <div>
                    <h1 style={{fontSize:'30px', display:'flex',alignItems:'center',justifyContent:'center'}}>
                        Sorry, but page: {window.location.pathname} has not been founded.
                    </h1>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center', marginTop:'2%'}}>
                    <Button onClick={() => window.history.go(-1)} variant="contained" color="primary" style={{fontSize:'15px'}}>Go back</Button>
                </div>
            </div>
        );
    }
}

export default pageNotFoundError;

if (document.getElementById('pageNotFoundError')) {
    ReactDOM.render(<pageNotFoundError/>, document.getElementById('pageNotFoundError'));
}