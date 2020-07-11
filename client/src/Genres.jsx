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
import AddGenreModal from "./components/Genre/AddGenreModal";
import SuccessSnackbar from "./components/Snackbar/SuccessSnackbar";
import ErrorSnackbar from "./components/Snackbar/ErrorSnackbar";
import EditGenreModal from "./components/Genre/EditGenreModal";
import DeleteGenreModal from "./components/Genre/DeleteGenreModal";
import Pagination from "@material-ui/lab/Pagination/Pagination";

class Genres extends React.Component {

    constructor(props) {
        super(props);
        this.state = {genres: [], genresShowing: [], openAdding: false, nameErrors: '', openEditing: false, row: '', genreId: '',
            openDeleting: false, message: '', openSnackbar: false, openSnackbarError: false, currentPage: '', pagesCount: ''};

        this.getAllGenres = this.getAllGenres.bind(this);
        this.insertGenre = this.insertGenre.bind(this);
        this.editGenre = this.editGenre.bind(this);
        this.deleteGenre = this.deleteGenre.bind(this);
        this.handleOpenAddingNewGenre = this.handleOpenAddingNewGenre.bind(this);
        this.handleCloseAddingNewGenre = this.handleCloseAddingNewGenre.bind(this);
        this.handleOpenEditingGenre = this.handleOpenEditingGenre.bind(this);
        this.handleCloseEditingGenre = this.handleCloseEditingGenre.bind(this);
        this.handleOpenDeletingGenre = this.handleOpenDeletingGenre.bind(this);
        this.handleCloseDeletingGenre = this.handleCloseDeletingGenre.bind(this);
        this.unsetSnackbar = this.unsetSnackbar.bind(this);
        this.setErrorsForInputs = this.setErrorsForInputs.bind(this);
        this.clearInputErrors = this.clearInputErrors.bind(this);
        this.makeData = this.makeData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.calculatePagesCount = this.calculatePagesCount.bind(this);
    }

    componentWillMount() {
        this.getAllGenres();
    }

    async insertGenre(name) {
        this.clearInputErrors();
        try {
            await axios.post(API_BASE_URL + `/genres`, {
                name: name,
            });
            this.setState({message: 'New genre inserted successfully!'});
            this.setState({openSnackbar: true});
            this.handleCloseAddingNewGenre();
            this.getAllGenres();
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

    async editGenre(name, id) {
        this.clearInputErrors();
        try {
            await axios.put(API_BASE_URL + `/genres/${id}`, {
                name: name,
                id: id,
            });
            this.setState({message: 'Genre updated successfully!'});
            this.setState({openSnackbar: true});
            this.handleCloseEditingGenre();
            this.getAllGenres();
        } catch (err) {
            if (err.response && err.response.data.errors) {
                this.setErrorsForInputs(err);
            }
        }
    }

    async getAllGenres() {
        try {
            const response = await axios.get(API_BASE_URL + `/genres`);
            this.setState({genres: response.data});
            this.makeData(response.data, 1);
            this.setState({currentPage: 1});
            this.calculatePagesCount(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteGenre(id) {
        try {
            await axios.delete(API_BASE_URL + `/genres/${id}`);
            this.setState({message: 'Genre deleted successfully!'});
            this.setState({openSnackbar: true});
            this.handleCloseDeletingGenre();
            this.getAllGenres();
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
    }

    clearInputErrors() {
        this.setState({nameErrors: ''});
        this.setState({lastNameErrors: ''});
        this.setState({birthDateErrors: ''});
    }

    handleOpenAddingNewGenre() {
        this.setState({openAdding: true});
    }

    handleCloseAddingNewGenre() {
        this.setState({openAdding: false});
        this.unsetSnackbar();
        this.clearInputErrors();
    }

    handleOpenEditingGenre(row) {
        this.setState({openEditing: true});
        this.setState({row: row});
    }

    handleCloseEditingGenre() {
        this.setState({openEditing: false});
        this.unsetSnackbar();
        this.clearInputErrors();
    }

    handleOpenDeletingGenre(id) {
        this.setState({genreId: id});
        this.setState({openDeleting: true});
    }

    handleCloseDeletingGenre() {
        this.setState({genreId: ''});
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

    makeData(array, page) {
        let tmpGenres = [];
        const itemsPerPage = 10;
        this.setState({genresShowing: []});
        for (let i = (page - 1) * itemsPerPage; i < ((page - 1) * itemsPerPage) + itemsPerPage; i++) {
            if (array[i] !== undefined) {
                tmpGenres.push(array[i]);
            } else {
                break;
            }
        }
        this.setState({genresShowing: tmpGenres});
    }

    calculatePagesCount(array) {
        let pagesCount = 0;
        const itemsPerPage = 10;
        if (array.length % itemsPerPage === 0) {
            pagesCount = Math.floor(array.length / itemsPerPage);
        } else {
            pagesCount = Math.floor(array.length / itemsPerPage) + 1;
        }
        this.setState({pagesCount: pagesCount});
    }

    handlePageChange(event, page) {
        this.makeData(this.state.genres, page);
        this.setState({currentPage: page});
    }

    render() {
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Choices&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.genresShowing.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right"><img className="cursor" src={editIcon} onClick={() => this.handleOpenEditingGenre(row)}></img>
                                    <img className="cursor" src={deleteIcon} onClick={() => this.handleOpenDeletingGenre(row.id)}></img></TableCell>
                            </TableRow>
                        ))}
                        {this.state.genres.length === 0 &&
                        <TableRow>
                            <TableCell style={{textAlign:"center"}} colSpan={4}>Sorry, but genres list is empty.</TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
                <div>
                    <img className="cursor" src={addIcon} onClick={this.handleOpenAddingNewGenre}></img>
                </div>
                <div className="pagination">
                    <Pagination count={this.state.pagesCount} variant="outlined" onChange={this.handlePageChange} page={this.state.currentPage}/>
                </div>
                <Modal
                    open={this.state.openAdding}
                    onClose={this.handleCloseAddingNewGenre}
                    className="alignCenter"
                >
                    <AddGenreModal insertGenre={this.insertGenre} nameErrors={this.state.nameErrors}/>
                </Modal>
                <Modal
                    open={this.state.openEditing}
                    onClose={this.handleCloseEditingGenre}
                    className="alignCenter"
                >
                    <EditGenreModal editGenre={this.editGenre} row={this.state.row} nameErrors={this.state.nameErrors}/>
                </Modal>
                <Modal
                    open={this.state.openDeleting}
                    onClose={this.handleCloseDeletingGenre}
                    className="alignCenter"
                >
                    <DeleteGenreModal id={this.state.genreId} closeModal={this.handleCloseDeletingGenre} deleteGenre={this.deleteGenre}/>
                </Modal>
                <SuccessSnackbar message={this.state.message} openSnackbar={this.state.openSnackbar}/>
                <ErrorSnackbar message={this.state.message} openSnackbarError={this.state.openSnackbarError}/>
            </div>
        );
    }
}

export default Genres;

if (document.getElementById('genres')) {
    ReactDOM.render(<Genres />, document.getElementById('genres'));
}