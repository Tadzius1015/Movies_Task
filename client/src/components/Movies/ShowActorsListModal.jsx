import React from "react";
import Paper from "@material-ui/core/Paper";
import '../../ModalAndTable.css';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default class ShowActorsListModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Paper className="modalSize">
                    <Paper>
                        <Typography style={{marginBottom:'30px', marginTop:'30px', textAlign:'left'}} variant="h5" component="h1">
                            Movie {this.props.row.name} actors list
                        </Typography>
                    </Paper>
                    <Paper>
                        {this.props.row.movieActor.map((element, ind) => (
                            <div>{element.actor.name + ' ' + element.actor.lastName}</div>
                        ))}
                    </Paper>
                    <Paper style={{marginTop: '20px'}}>
                        <Button onClick={this.props.closeModal} variant="contained" color="primary">Close</Button>
                    </Paper>
                </Paper>
            </div>
        );
    }
}