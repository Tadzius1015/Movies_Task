import React from "react";
import Paper from "@material-ui/core/Paper";
import '../../ModalAndTable.css';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import deleteIcon from "../../images/deleteCircle.png";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";

export default class EditMovieModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', releaseDate: '', genresArray: [], actorsArray: [], addingActorsArray: [], deletingActorsArray: [], addingGenresArray: [],
        deletingGenresArray: []};

        this.handleName = this.handleName.bind(this);
        this.handleReleaseDate = this.handleReleaseDate.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleRemoveGenre = this.handleRemoveGenre.bind(this);
        this.handleActorChange = this.handleActorChange.bind(this);
        this.handleRemoveActor = this.handleRemoveActor.bind(this);
    }

    componentWillMount() {
        let tmpGenres = [];
        let tmpActors = [];
        this.setState({name: this.props.row.name});
        this.setState({releaseDate: this.props.row.releaseDate.split('T')[0]});
        this.props.row.movieGenre.map((row, index) => (
            tmpGenres.push(row.genre)
        ));
        this.setState({genresArray: tmpGenres});
        this.props.row.movieActor.map((row, index) => (
            tmpActors.push(row.actor)
        ));
        this.setState({actorsArray: tmpActors});
    }

    handleName(event) {
        this.setState({name: event.target.value});
    }

    handleReleaseDate(event) {
        this.setState({releaseDate: event.target.value})
    }

    handleGenreChange(event, value) {
        if (value !== null) {
            if (!this.state.deletingGenresArray.includes(value)) {
                if (this.state.genresArray.filter(val => val.id === value.id).length === 0 && !this.state.addingGenresArray.includes(value)) {
                    this.setState({ genresArray: [...this.state.genresArray, value] });
                    this.setState({ addingGenresArray: [...this.state.addingGenresArray, value] });
                    this.setState({deletingGenresArray: this.state.deletingGenresArray.filter(genre => genre.id !== value.id)});
                }
            }
        }
    }

    handleRemoveGenre(value) {
        if (!this.state.addingGenresArray.includes(value)) {
            if (this.state.genresArray.includes(value) && !this.state.deletingGenresArray.includes(value)) {
                this.setState({deletingGenresArray: [...this.state.deletingGenresArray, value]});
                this.setState({genresArray: this.state.genresArray.filter(genre => genre.id !== value.id)});
            }
        } else {
            this.setState({addingGenresArray: this.state.addingGenresArray.filter(genre => genre.id !== value.id)});
            this.setState({genresArray: this.state.genresArray.filter(genre => genre.id !== value.id)});
        }
    }

    handleActorChange(event, value) {
        if (value !== null) {
            if (!this.state.deletingActorsArray.includes(value)) {
                if (this.state.actorsArray.filter(val => val.id === value.id).length === 0 && !this.state.addingActorsArray.includes(value)) {
                    this.setState({ actorsArray: [...this.state.actorsArray, value] });
                    this.setState({ addingActorsArray: [...this.state.addingActorsArray, value] });
                    this.setState({deletingActorsArray: this.state.deletingActorsArray.filter(actor => actor.id !== value.id)});
                }
            }
        }
    }

    handleRemoveActor(value) {
        if (!this.state.addingActorsArray.includes(value)) {
            if (this.state.actorsArray.includes(value) && !this.state.deletingActorsArray.includes(value)) {
                this.setState({deletingActorsArray: [...this.state.deletingActorsArray, value]});
                this.setState({actorsArray: this.state.actorsArray.filter(actor => actor.id !== value.id)});
            }
        } else {
            this.setState({addingActorsArray: this.state.addingActorsArray.filter(actor => actor.id !== value.id)});
            this.setState({actorsArray: this.state.actorsArray.filter(actor => actor.id !== value.id)});
        }
    }

    render() {
        return (
            <div>
                <Paper className="modalSize">
                    <Typography style={{marginBottom:'30px', marginTop:'30px', textAlign:'center'}} variant="h5" component="h1">
                        Editing {this.props.row.name} film form
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
                            helperText={this.props.nameErrors}
                            onChange={this.handleName}
                            value={this.state.name}
                        />
                        <TextField
                            error={this.props.releaseDateErrors !== ''}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            label="Release Date"
                            id="releasedate"
                            className="inputSize"
                            margin="dense"
                            type="date"
                            required
                            helperText={this.props.releaseDateErrors}
                            onChange={this.handleReleaseDate}
                            value={this.state.releaseDate}
                        />
                        <Paper style={{marginTop:'20px'}}>
                            <Autocomplete
                                id="genre"
                                options={this.props.genres}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="Select genre(-s)" variant="outlined" />}
                                onChange={(event, value) => this.handleGenreChange(event, value)}
                            />
                            {this.state.genresArray.length !== 0 &&
                            <div className="actorsOrGenresDiv">
                                <Table style={{marginTop:'10px'}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Genre</TableCell>
                                            <TableCell align="right">Choices&nbsp;</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.genresArray.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right"><img className="cursor" src={deleteIcon} onClick={() => this.handleRemoveGenre(row)}></img></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            }
                        </Paper>

                        <Paper style={{marginTop:'20px'}}>
                            <Autocomplete
                                id="actor"
                                options={this.props.actors}
                                getOptionLabel={(option) => option.name + ' ' + option.lastName}
                                renderInput={(params) => <TextField {...params} label="Select actor(-s)" variant="outlined" />}
                                onChange={(event, value) => this.handleActorChange(event, value)}
                            />
                            {this.state.actorsArray.length !== 0 &&
                            <div className="actorsOrGenresDiv">
                                <Table style={{marginTop:'10px'}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Actor</TableCell>
                                            <TableCell align="right">Choices&nbsp;</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.actorsArray.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {row.name + ' ' + row.lastName}
                                                </TableCell>
                                                <TableCell align="right"><img className="cursor" src={deleteIcon} onClick={() => this.handleRemoveActor(row)}></img></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            }
                        </Paper>

                        <Button variant="contained" color="primary" onClick={() => this.props.editMovie(this.state.name, this.state.releaseDate,
                            this.state.addingActorsArray, this.state.deletingActorsArray, this.state.addingGenresArray, this.state.deletingGenresArray,
                            this.props.row.id)}>Edit</Button>
                    </FormControl>
                </Paper>
            </div>
        );
    }
}