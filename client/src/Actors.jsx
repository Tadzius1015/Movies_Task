import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { API_BASE_URL } from "./config";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Modal from "@material-ui/core/Modal";
import './ModalAndTable.css';
import addIcon from './images/addIcon.png';
import editIcon from './images/editIcon.png';
import deleteIcon from './images/deleteIcon.png';
import AddActorModal from "./components/Actor/AddActorModal";
import EditActorModal from "./components/Actor/EditActorModal";
import DeleteActorModal from "./components/Actor/DeleteActorModal";
import SuccessSnackbar from "./components/Snackbar/SuccessSnackbar";
import ErrorSnackbar from "./components/Snackbar/ErrorSnackbar";

class Actors extends React.Component {


    constructor(props) {
        super(props);
        this.state = {actors: [], openAdding: false, nameErrors: '', lastNameErrors: '', birthDateErrors: '', openEditing: false,
            row: '', actorId: '', openDeleting: false, message: '', openSnackbar: false, openSnackbarError: false};

        this.getAllActors = this.getAllActors.bind(this);
        this.insertActor = this.insertActor.bind(this);
        this.editActor = this.editActor.bind(this);
        this.deleteActor = this.deleteActor.bind(this);
        this.handleOpenAddingNewActor = this.handleOpenAddingNewActor.bind(this);
        this.handleCloseAddingNewActor = this.handleCloseAddingNewActor.bind(this);
        this.handleOpenEditingActor = this.handleOpenEditingActor.bind(this);
        this.handleCloseEditingActor = this.handleCloseEditingActor.bind(this);
        this.handleOpenDeletingActor = this.handleOpenDeletingActor.bind(this);
        this.handleCloseDeletingActor = this.handleCloseDeletingActor.bind(this);
        this.unsetSnackbar = this.unsetSnackbar.bind(this);
        this.setErrorsForInputs = this.setErrorsForInputs.bind(this);
        this.clearInputErrors = this.clearInputErrors.bind(this);
    }

    componentWillMount() {
        this.getAllActors();
    }

    async insertActor(name, lastName, birthDate) {
        this.clearInputErrors();
        try {
            await axios.post(API_BASE_URL + `/actors`, {
                name: name,
                lastName: lastName,
                birthDate: birthDate,
            });
            this.setState({message: 'New actor inserted successfully!'});
            this.setState({openSnackbar: true});
            this.handleCloseAddingNewActor();
            this.getAllActors();
        } catch (err) {
            if (err.response && err.response.data.errors) {
                this.setErrorsForInputs(err);
            } else {
                this.setState({message: err.response.data});
                this.setState({openSnackbarError: true});
                this.unsetSnackbar();
            }
        }
    }

    async editActor(name, lastName, birthDate, id) {
        this.clearInputErrors();
        try {
            await axios.put(API_BASE_URL + `/actors/${id}`, {
                name: name,
                lastName: lastName,
                birthDate: birthDate,
                id: id,
            });
            this.setState({message: 'Actor updated successfully!'});
            this.setState({openSnackbar: true});
            this.handleCloseEditingActor();
            this.getAllActors();
        } catch (err) {
            if (err.response && err.response.data.errors) {
                this.setErrorsForInputs(err);
            }
            // this.setState({message: err.response.data});
            // this.setState({openSnackbarError: true});
            // this.unsetSnackbar();
        }
    }

    async getAllActors() {
        try {
            const response = await axios.get(API_BASE_URL + `/actors`);
            this.setState({actors: response.data});
        } catch (err) {
            console.log(err);
        }
    }

    async deleteActor(id) {
        try {
            await axios.delete(API_BASE_URL + `/actors/${id}`);
            this.setState({message: 'Actor deleted successfully!'});
            this.setState({openSnackbar: true});
            this.handleCloseDeletingActor();
            this.getAllActors();
        } catch (err) {
            this.setState({message: err.response.data});
            this.setState({openSnackbarError: true});
            this.unsetSnackbar();
        }
    }

    setErrorsForInputs(err) {
        let errorMsg;
        if(err.response.data.errors.Name) {
            errorMsg = err.response.data.errors.Name[0];
            this.setState({nameErrors: errorMsg});
        } else {
            this.setState({nameErrors: ""});
        }
        if(err.response.data.errors.LastName) {
            errorMsg = err.response.data.errors.LastName[0];
            this.setState({lastNameErrors: errorMsg});
        } else {
            this.setState({lastNameErrors: ""});
        }
        if(err.response.data.errors.BirthDate) {
            errorMsg = err.response.data.errors.BirthDate[0];
            this.setState({birthDateErrors: errorMsg});
        } else {
            this.setState({birthDateErrors: ""});
        }
    }

    clearInputErrors() {
        this.setState({nameErrors: ''});
        this.setState({lastNameErrors: ''});
        this.setState({birthDateErrors: ''});
    }

    handleOpenAddingNewActor() {
        this.setState({openAdding: true});
    }

    handleCloseAddingNewActor() {
        this.setState({openAdding: false});
        this.unsetSnackbar();
        this.clearInputErrors();
    }

    handleOpenEditingActor(row) {
        this.setState({openEditing: true});
        this.setState({row: row});
    }

    handleCloseEditingActor() {
        this.setState({openEditing: false});
        this.unsetSnackbar();
        this.clearInputErrors();
    }

    handleOpenDeletingActor(id) {
        this.setState({actorId: id});
        this.setState({openDeleting: true});
    }

    handleCloseDeletingActor() {
        this.setState({actorId: ''});
        this.setState({openDeleting: false});
        this.unsetSnackbar();
    }

    unsetSnackbar() {
        setTimeout(() => {
            this.setState({openSnackbar: false});
            this.setState({openSnackbarError: false});
            this.setState({message: ''});
        }, 4000);
    }

    render() {
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Lastname&nbsp;</TableCell>
                            <TableCell align="left">Birth date&nbsp;</TableCell>
                            <TableCell align="right">Choices&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.actors.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.lastName}</TableCell>
                                <TableCell align="left">{row.birthDate.split('T')[0]}</TableCell>
                                <TableCell align="right"><img className="cursor" src={editIcon} onClick={() => this.handleOpenEditingActor(row)}></img>
                                    <img className="cursor" src={deleteIcon} onClick={() => this.handleOpenDeletingActor(row.id)}></img></TableCell>
                            </TableRow>
                        ))}
                        {this.state.actors.length === 0 &&
                        <TableRow>
                            <TableCell style={{textAlign:"center"}} colSpan={4}>Sorry, but actors list is empty.</TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
                <div>
                    <img className="cursor" src={addIcon} onClick={this.handleOpenAddingNewActor}></img>
                </div>
                <Modal
                    open={this.state.openAdding}
                    onClose={this.handleCloseAddingNewActor}
                    className="alignCenter"
                >
                    <AddActorModal insertActor={this.insertActor} nameErrors={this.state.nameErrors} lastNameErrors={this.state.lastNameErrors}
                                   birthDateErrors={this.state.birthDateErrors}/>
                </Modal>
                <Modal
                    open={this.state.openEditing}
                    onClose={this.handleCloseEditingActor}
                    className="alignCenter"
                >
                    <EditActorModal editActor={this.editActor} row={this.state.row} nameErrors={this.state.nameErrors}
                                    lastNameErrors={this.state.lastNameErrors} birthDateErrors={this.state.birthDateErrors}/>
                </Modal>
                <Modal
                    open={this.state.openDeleting}
                    onClose={this.handleCloseDeletingActor}
                    className="alignCenter"
                >
                    <DeleteActorModal id={this.state.actorId} closeModal={this.handleCloseDeletingActor} deleteActor={this.deleteActor}/>
                </Modal>
                <SuccessSnackbar message={this.state.message} openSnackbar={this.state.openSnackbar}/>
                <ErrorSnackbar message={this.state.message} openSnackbarError={this.state.openSnackbarError}/>
            </div>
        );
    }
}

export default Actors;

if (document.getElementById('actors')) {
    ReactDOM.render(<Actors />, document.getElementById('actors'));
}