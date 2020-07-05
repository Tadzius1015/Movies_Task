import React from "react";
import '../../ModalAndTable.css';
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert/Alert";

export default class ErrorSnackbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {openSnackbarError: false, message: ''};
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({openSnackbarError: nextProps.openSnackbarError});
        this.setState({message: nextProps.message});
    }

    handleCloseMessage() {
        this.setState({openSnackbarError: false});
        this.setState({message: ''});
    }

    render() {
        return (
            <Snackbar open={this.state.openSnackbarError}
                      anchorOrigin={{
                          vertical: "top",
                          horizontal: "right"
                      }}
                      TransitionComponent={Slide}
                      autoHideDuration={4000}
                      onClose={this.handleCloseMessage}>
                <Alert severity="error">
                    {this.state.message}
                </Alert>
            </Snackbar>
        );
    }
}