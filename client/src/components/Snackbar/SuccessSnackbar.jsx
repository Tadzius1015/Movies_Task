import React from "react";
import '../../ModalAndTable.css';
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert/Alert";

export default class SuccessSnackbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {openSnackbar: false, message: ''};
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({openSnackbar: this.props.openSnackbar});
        this.setState({message: this.props.message});
    }

    handleCloseMessage() {
        this.setState({openSnackbar: false});
        this.setState({message: ''});
    }

    render() {
        return (
            <Snackbar open={this.state.openSnackbar}
                      anchorOrigin={{
                          vertical: "top",
                          horizontal: "right"
                      }}
                      TransitionComponent={Slide}
                      autoHideDuration={4000}
                      onClose={this.handleCloseMessage}>
                <Alert severity="success">
                    {this.state.message}
                </Alert>
            </Snackbar>
        );
    }
}