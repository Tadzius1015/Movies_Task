import React from "react";
import Paper from "@material-ui/core/Paper";
import '../../ModalAndTable.css';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default class EditActorModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', lastName: '', birthDate: ''};

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleBirthDate = this.handleBirthDate.bind(this);
    }

    handleFirstName(event) {
        this.setState({name: event.target.value});
    }

    handleLastName(event) {
        this.setState({lastName: event.target.value});
    }

    handleBirthDate(event) {
        this.setState({birthDate: event.target.value});
    }

    componentWillMount() {
        this.setState({name: this.props.row.name});
        this.setState({lastName: this.props.row.lastName});
        this.setState({birthDate: this.props.row.birthDate.split('T')[0]});
    }

    render() {
        return (
            <div>
                <Paper className="modalSize">
                    <Typography style={{marginBottom:'30px', marginTop:'30px', textAlign:'center'}} variant="h5" component="h1">
                        Actor {this.state.name + ' ' + this.state.lastName} editing form
                    </Typography>
                    <FormControl>
                        <TextField
                            error={this.props.nameErrors !== ''}
                            variant="outlined"
                            label="First Name"
                            id="name"
                            className="inputSize"
                            required
                            margin="dense"
                            value={this.state.name}
                            onChange={this.handleFirstName}
                            helperText={this.props.nameErrors}
                        />
                        <TextField
                            error={this.props.lastNameErrors !== ''}
                            variant="outlined"
                            label="Last Name"
                            id="lastname"
                            className="inputSize"
                            margin="dense"
                            required
                            value={this.state.lastName}
                            onChange={this.handleLastName}
                            helperText={this.props.lastNameErrors}
                        />
                        <TextField
                            error={this.props.birthDateErrors !== ''}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            label="Birth Date"
                            id="birthdate"
                            className="inputSize"
                            margin="dense"
                            type="date"
                            required
                            value={this.state.birthDate}
                            onChange={this.handleBirthDate}
                            helperText={this.props.birthDateErrors}
                        />
                        <Button variant="contained" color="primary" onClick={() => this.props.editActor(this.state.name, this.state.lastName, this.state.birthDate,
                            this.props.row.id)}>Edit</Button>
                    </FormControl>
                </Paper>
            </div>
        );
    }
}