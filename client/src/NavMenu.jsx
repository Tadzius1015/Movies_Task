import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import './NavMenu.css';
import Actors from "./Actors";

class NavMenu extends React.Component {
    render() {
        return (
            <Router>
                <AppBar style={{ background: '#2E3B55' }} position="static">
                    <Toolbar>
                        <div className="toolbar-align">
                            <div className="toolbar-items">
                                <Button variant="contained" color="primary" href="/actors">Actors</Button>
                                <Button variant="contained" color="primary" href="/genres">Genres</Button>
                                <Button variant="contained" color="primary" href="/movies">Movies</Button>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route path={'/actors'} component={Actors}/>
                    {/*<Route path={'/profile'} component={Profile}/>*/}
                    {/*<Route path={'/'} exact component={Home}/>*/}
                    {/*<Route path={`/shops/:user_id/bicycles`} exact component={Bicycles}/>*/}
                    {/*<Route component={pageNotFoundError} />*/}
                </Switch>
            </Router>
        );
    }
}

export default NavMenu;

if (document.getElementById('menu')) {
    ReactDOM.render(<NavMenu />, document.getElementById('menu'));
}