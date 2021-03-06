import React from "react";
import Paper from "@material-ui/core/Paper";
import '../../ModalAndTable.css';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default class DeleteActorModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Paper className="modalSize">
                    <Paper>
                        <Typography style={{marginBottom:'30px', marginTop:'30px', textAlign:'left'}} variant="h5" component="h1">
                            Deleting an actor
                        </Typography>
                    </Paper>
                    <Paper>
                        <p>Are you sure to delete this Actor? This action can't be undone.</p>
                    </Paper>
                    <Paper>
                        <Button onClick={this.props.closeModal} variant="contained" color="primary">Close</Button>
                        <Button style={{marginLeft:'25px'}} onClick={() => this.props.deleteActor(this.props.id)} variant="contained" color="secondary">Delete</Button>
                    </Paper>
                </Paper>
            </div>
        );
    }
}