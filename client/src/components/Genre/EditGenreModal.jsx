import React from "react";
import Paper from "@material-ui/core/Paper";
import '../../ModalAndTable.css';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default class EditGenreModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: ''};

        this.handleName = this.handleName.bind(this);
    }

    handleName(event) {
        this.setState({name: event.target.value});
    }

    componentWillMount() {
        this.setState({name: this.props.row.name});
    }

    render() {
        return (
            <div>
                <Paper className="modalSize">
                    <Typography style={{marginBottom:'30px', marginTop:'30px', textAlign:'center'}} variant="h5" component="h1">
                        Genre editing form
                    </Typography>
                    <FormControl>
                        <TextField
                            error={this.props.nameErrors !== ''}
                            variant="outlined"
                            label="Name"
                            id="name"
                            className="inputSize"
                            required
                            margin="dense"
                            value={this.state.name}
                            onChange={this.handleName}
                            helperText={this.props.nameErrors}
                        />
                        <Button variant="contained" color="primary" onClick={() => this.props.editGenre(this.state.name, this.props.row.id)}>Edit</Button>
                    </FormControl>
                </Paper>
            </div>
        );
    }
}