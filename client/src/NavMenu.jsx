import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import './NavMenu.css';
import Actors from "./Actors";
import Genres from "./Genres";
import Movies from "./Movies";
import pageNotFoundError from "./pageNotFoundError";

class NavMenu extends React.Component {
    render() {
        return (
            <Router>
                <AppBar style={{ background: '#2E3B55' }} position="static">
                    <Toolbar>
                        <div className="toolbar-align">
                            <div className="toolbar-items">
                                <div className="link-align">
                                    <Button variant="contained" color="primary"><Link className="toolbar-link" to={"/actors"}>Actors</Link></Button>
                                </div>
                                <div className="link-align">
                                    <Button variant="contained" color="primary"><Link className="toolbar-link" to={"/genres"}>Genres</Link></Button>
                                </div>
                                <div className="link-align">
                                    <Button variant="contained" color="primary"><Link className="toolbar-link" to={"/movies"}>Movies</Link></Button>
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route path={'/actors'} component={Actors}/>
                    <Route path={'/genres'} component={Genres}/>
                    <Route path={'/movies'} component={Movies}/>
                    <Route path={'/'} exact component={Movies}/>
                    <Route component={pageNotFoundError} />
                </Switch>
            </Router>
        );
    }
}

export default NavMenu;

if (document.getElementById('menu')) {
    ReactDOM.render(<NavMenu />, document.getElementById('menu'));
}