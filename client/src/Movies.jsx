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
import documentIcon from './images/documentIcon.png';
import SuccessSnackbar from "./components/Snackbar/SuccessSnackbar";
import ErrorSnackbar from "./components/Snackbar/ErrorSnackbar";
import AddMovieModal from "./components/Movies/AddMovieModal";
import DeleteMovieModal from "./components/Movies/DeleteMovieModal";
import ShowActorsListModal from "./components/Movies/ShowActorsListModal";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import EditMovieModal from "./components/Movies/EditMovieModal";
import Pagination from "@material-ui/lab/Pagination/Pagination";

class Movies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {movies: [], moviesShowing: [], actors: [], genres: [], openAdding: false, nameErrors: '', releaseDateErrors: '',
            openEditing: false, row: {}, movieId: '', openDeleting: false, message: '', openSnackbar: false,
            openSnackbarError: false, openActorsList: false, pattern: '', searchType: '', currentPage: '', pagesCount: ''};

        this.getData = this.getData.bind(this);
        this.insertMovie = this.insertMovie.bind(this);
        this.editMovie = this.editMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.handleOpenAddingNewMovie = this.handleOpenAddingNewMovie.bind(this);
        this.handleCloseAddingNewMovie = this.handleCloseAddingNewMovie.bind(this);
        this.handleOpenEditingMovie = this.handleOpenEditingMovie.bind(this);
        this.handleCloseEditingMovie = this.handleCloseEditingMovie.bind(this);
        this.handleOpenDeletingMovie = this.handleOpenDeletingMovie.bind(this);
        this.handleCloseDeletingMovie = this.handleCloseDeletingMovie.bind(this);
        this.handleOpenMovieActorsList = this.handleOpenMovieActorsList.bind(this);
        this.handleCloseMovieActorsList = this.handleCloseMovieActorsList.bind(this);
        this.handleInputSearchText = this.handleInputSearchText.bind(this);
        this.handleChangeSearchType = this.handleChangeSearchType.bind(this);
        this.unsetSnackbar = this.unsetSnackbar.bind(this);
        this.setErrorsForInputs = this.setErrorsForInputs.bind(this);
        this.clearInputErrors = this.clearInputErrors.bind(this);
        this.searchByPattern = this.searchByPattern.bind(this);
        this.addNewActorsToMovie = this.addNewActorsToMovie.bind(this);
        this.addNewGenresToMovie = this.addNewGenresToMovie.bind(this);
        this.deleteActorsFromMovie = this.deleteActorsFromMovie.bind(this);
        this.deleteGenresFromMovie = this.deleteGenresFromMovie.bind(this);
        this.makeData = this.makeData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.calculatePagesCount = this.calculatePagesCount.bind(this);
        this.addAndRemoveMoviesAndActors = this.addAndRemoveMoviesAndActors.bind(this);
        this.addActorsOrGenres = this.addActorsOrGenres.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    async addActorsOrGenres(actorsArray, genresArray, id) {
        if (actorsArray.length > 0) {
            this.addNewActorsToMovie(actorsArray, id);
        }
        if (genresArray.length > 0) {
            this.addNewGenresToMovie(genresArray, id);
        }
    }

    async insertMovie(name, releaseDate, genresArray, actorsArray) {
        this.clearInputErrors();
        try {
            const response = await axios.post(API_BASE_URL + `/movies`, {
                name: name,
                releaseDate: releaseDate,
            });
            this.addActorsOrGenres(actorsArray, genresArray, response.data.id);
            this.setState({message: 'New movie inserted successfully!'});
            this.setState({openSnackbar: true});
            this.handleCloseAddingNewMovie();
            setTimeout(() => {
                this.getData();
            }, 500);
        } catch (err) {
            if (err.response && err.response.data.errors) {
                this.setErrorsForInputs(err);
            }
        }
    }

    async editMovie(name, releaseDate, addingActorsArray, deletingActorsArray, addingGenresArray, deletingGenresArray, id) {
        this.clearInputErrors();
        try {
            await axios.put(API_BASE_URL + `/movies/${id}`, {
                name: name,
                releaseDate: releaseDate,
                id: id,
            });
            this.addAndRemoveMoviesAndActors(deletingGenresArray, deletingActorsArray, addingActorsArray, addingGenresArray, id);
            this.setState({message: 'Movie updated successfully!'});
            this.setState({openSnackbar: true});
            this.handleCloseEditingMovie();
            setTimeout(() => {
                this.getData();
            }, 500);
        } catch (err) {
            if (err.response && err.response.data.errors) {
                this.setErrorsForInputs(err);
            }
        }
    }

    async getData() {
        try {
            const moviesResponse = await axios.get(API_BASE_URL + `/movies`);
            const actorsResponse = await axios.get(API_BASE_URL + `/actors`);
            const genresResponse = await axios.get(API_BASE_URL + `/genres`);
            this.makeData(moviesResponse.data, 1);
            this.setState({currentPage: 1});
            this.calculatePagesCount(moviesResponse.data);
            this.setState({movies: moviesResponse.data});
            this.setState({actors: actorsResponse.data});
            this.setState({genres: genresResponse.data});
        } catch (err) {
            console.log(err);
        }
    }

    async deleteMovie(id) {
        try {
            await axios.delete(API_BASE_URL + `/movies/${id}`);
            this.setState({message: 'Movie deleted successfully!'});
            this.setState({openSnackbar: true});
            this.handleCloseDeletingMovie();
            this.getData();
        } catch (err) {
            console.log(err);
        }
    }

    setErrorsForInputs(err) {
        let errorMsg;
        if (err.response.data.errors.Name) {
            errorMsg = err.response.data.errors.Name[0];
            this.setState({nameErrors: errorMsg});
        } else {
            this.setState({nameErrors: ""});
        }
        if (err.response.data.errors.ReleaseDate) {
            errorMsg = err.response.data.errors.ReleaseDate[0];
            this.setState({releaseDateErrors: errorMsg});
        } else {
            this.setState({releaseDateErrors: ""});
        }
    }

    async addAndRemoveMoviesAndActors(deletingGenresArray, deletingActorsArray, addingActorsArray, addingGenresArray, id) {
        if (deletingGenresArray.length > 0) {
            this.deleteGenresFromMovie(deletingGenresArray, id);
        }
        if (deletingActorsArray.length > 0) {
            this.deleteActorsFromMovie(deletingActorsArray, id);
        }
        if (addingActorsArray.length > 0) {
            this.addNewActorsToMovie(addingActorsArray, id);
        }
        if (addingGenresArray.length > 0) {
            this.addNewGenresToMovie(addingGenresArray, id);
        }
    }

    clearInputErrors() {
        this.setState({nameErrors: ''});
        this.setState({releaseDateErrors: ''});
    }

    handleOpenAddingNewMovie() {
        this.setState({openAdding: true});
    }

    handleCloseAddingNewMovie() {
        this.setState({openAdding: false});
        this.unsetSnackbar();
        this.clearInputErrors();
    }

    handleOpenEditingMovie(row) {
        this.setState({openEditing: true});
        this.setState({row: row});
    }

    handleCloseEditingMovie() {
        this.setState({openEditing: false});
        this.unsetSnackbar();
        this.clearInputErrors();
    }

    handleOpenDeletingMovie(id) {
        this.setState({movieId: id});
        this.setState({openDeleting: true});
    }

    handleCloseDeletingMovie() {
        this.setState({movieId: ''});
        this.setState({openDeleting: false});
        this.unsetSnackbar();
    }

    handleOpenMovieActorsList(row) {
        this.setState({openActorsList: true});
        this.setState({row: row});
    }

    handleCloseMovieActorsList() {
        this.setState({openActorsList: false});
        this.setState({row: {}});
    }

    handleInputSearchText() {
        const searchText = document.getElementById('searchText').value;
        this.searchByPattern(searchText, this.state.searchType);
    }

    handleChangeSearchType(event) {
        const searchText = document.getElementById('searchText').value;
        this.setState({searchType: event.target.value});
        this.searchByPattern(searchText, event.target.value);
    }

    async searchByPattern(searchText, searchType) {
        if (searchText !== '' && searchType !== '') {
            const response = await axios.get(API_BASE_URL + `/movies/${searchText}/${searchType}`);
            this.setState({movies: response.data});
            this.makeData(response.data, 1);
            this.calculatePagesCount(response.data);
            this.setState({currentPage: 1});
        } else if (searchText === '' || searchType === '') {
            this.getData();
        }
    }

    async addNewActorsToMovie(actorsArray, movieId) {
        await axios.post(API_BASE_URL + `/movieActors`, {
            MovieId: movieId,
            AddingActors: actorsArray,
        });
    }

    async deleteActorsFromMovie(actorsArray, movieId) {
        await axios.delete(API_BASE_URL + `/movieActors/${movieId}`, {
            data: { DeletingActors: actorsArray }
        });
    }

    async addNewGenresToMovie(genresArray, movieId) {
        await axios.post(API_BASE_URL + `/movieGenres`, {
            AddingGenres: genresArray,
            MovieId: movieId,
        })
    }

    async deleteGenresFromMovie(genresArray, movieId) {
        await axios.delete(API_BASE_URL + `/movieGenres/${movieId}`, {
            data: { DeletingGenres: genresArray }
        });
    }

    unsetSnackbar() {
        setTimeout(() => {
            this.setState({openSnackbar: false});
            this.setState({openSnackbarError: false});
            this.setState({message: ''});
        }, 4000);
    }

    makeData(array, page) {
        let tmpMovies = [];
        const itemsPerPage = 10;
        this.setState({moviesShowing: []});
        for (let i = (page - 1) * itemsPerPage; i < ((page - 1) * itemsPerPage) + itemsPerPage; i++) {
            if (array[i] !== undefined) {
                tmpMovies.push(array[i]);
            } else {
                break;
            }
        }
        this.setState({moviesShowing: tmpMovies});
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
        this.makeData(this.state.movies, page);
        this.setState({currentPage: page});
    }

    render() {
        return (
            <div>
                <div style={{float:"right", marginRight:"20px"}}>
                        <TextField
                            label="Search"
                            id="searchText"
                            placeholder="For ex. Tom"
                            margin="dense"
                            variant="outlined"
                            onChange={this.handleInputSearchText}
                            />
                </div>
                <div style={{float:"right", marginRight:"20px"}}>
                    <InputLabel id="typeLabel">Search by</InputLabel>
                    <Select
                        labelId="typeLabel"
                        id="searchType"
                        style={{width:'150px'}}
                        onChange={this.handleChangeSearchType}
                    >
                        <MenuItem value={"name"}>Name</MenuItem>
                        <MenuItem value={"releaseDate"}>Release date</MenuItem>
                        <MenuItem value={"genre"}>Genre</MenuItem>
                    </Select>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Release Date</TableCell>
                            <TableCell align="left">Genres</TableCell>
                            <TableCell align="left">Actors List</TableCell>
                            <TableCell align="right">Choices&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.moviesShowing.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.releaseDate.split('T')[0]}</TableCell>
                                <TableCell align="left">
                                    {row.movieGenre.map((element, ind) => (
                                        <a>{element.genre.name + ' '}</a>
                                    ))}
                                </TableCell>
                                <TableCell align="left">
                                    <img className="cursor" src={documentIcon} onClick={() => this.handleOpenMovieActorsList(row)}/>
                                </TableCell>
                                <TableCell align="right"><img className="cursor" src={editIcon} onClick={() => this.handleOpenEditingMovie(row)}></img>
                                    <img className="cursor" src={deleteIcon} onClick={() => this.handleOpenDeletingMovie(row.id)}></img></TableCell>
                            </TableRow>
                        ))}
                        {this.state.movies.length === 0 &&
                        <TableRow>
                            <TableCell style={{textAlign:"center"}} colSpan={5}>Sorry, but movies list is empty.</TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
                <div>
                    <img className="cursor" src={addIcon} onClick={this.handleOpenAddingNewMovie}></img>
                </div>
                <div className="pagination">
                    <Pagination count={this.state.pagesCount} variant="outlined" onChange={this.handlePageChange} page={this.state.currentPage}/>
                </div>
                <Modal
                    open={this.state.openAdding}
                    onClose={this.handleCloseAddingNewMovie}
                    className="alignCenter"
                >
                    <AddMovieModal insertMovie={this.insertMovie} genres={this.state.genres} actors={this.state.actors} nameErrors={this.state.nameErrors}
                                   releaseDateErrors={this.state.releaseDateErrors}/>
                </Modal>
                <Modal
                    open={this.state.openEditing}
                    onClose={this.handleCloseEditingMovie}
                    className="alignCenter"
                >
                    <EditMovieModal editMovie={this.editMovie} row={this.state.row} genres={this.state.genres} actors={this.state.actors}
                                    closeModal={this.handleCloseEditingMovie} nameErrors={this.state.nameErrors}
                                    releaseDateErrors={this.state.releaseDateErrors}/>
                </Modal>
                <Modal
                    open={this.state.openDeleting}
                    onClose={this.handleCloseDeletingMovie}
                    className="alignCenter"
                >
                    <DeleteMovieModal id={this.state.movieId} closeModal={this.handleCloseDeletingMovie} deleteMovie={this.deleteMovie}/>
                </Modal>
                <Modal
                    open={this.state.openActorsList}
                    onClose={this.handleCloseMovieActorsList}
                    className="alignCenter"
                >
                    <ShowActorsListModal row={this.state.row} closeModal={this.handleCloseMovieActorsList}/>
                </Modal>
                <SuccessSnackbar message={this.state.message} openSnackbar={this.state.openSnackbar}/>
                <ErrorSnackbar message={this.state.message} openSnackbarError={this.state.openSnackbarError}/>
            </div>
        );
    }
}

export default Movies;

if (document.getElementById('movies')) {
    ReactDOM.render(<Movies />, document.getElementById('movies'));
}