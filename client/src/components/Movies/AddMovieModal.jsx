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

export default class AddMovieModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', releaseDate: '', genresArray: [], actorsArray: []};

        this.handleName = this.handleName.bind(this);
        this.handleReleaseDate = this.handleReleaseDate.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleRemoveGenre = this.handleRemoveGenre.bind(this);
        this.handleActorChange = this.handleActorChange.bind(this);
        this.handleRemoveActor = this.handleRemoveActor.bind(this);
    }

    handleName(event) {
        this.setState({name: event.target.value});
    }

    handleReleaseDate(event) {
        this.setState({releaseDate: event.target.value})
    }

    handleGenreChange(event, value) {
        if (value !== null) {
            if (!this.state.genresArray.includes(value)) {
                this.setState({ genresArray: [...this.state.genresArray, value] });
            }
        }
    }

    handleRemoveGenre(index) {
        this.setState({genresArray: this.state.genresArray.filter(genre => genre.id !== index)});
    }

    handleActorChange(event, value) {
        if (value !== null) {
            if (!this.state.actorsArray.includes(value)) {
                this.setState({ actorsArray: [...this.state.actorsArray, value] });
            }
        }
    }

    handleRemoveActor(index) {
        this.setState({actorsArray: this.state.actorsArray.filter(actor => actor.id !== index)});
    }

    render() {
        return (
            <div>
                <Paper className="modalSize">
                    <Typography style={{marginBottom:'30px', marginTop:'30px', textAlign:'center'}} variant="h5" component="h1">
                        Adding new film form
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
                            helperText={this.props.releaseDateErrors}
                            required
                            onChange={this.handleReleaseDate}
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
                                                <TableCell align="right"><img className="cursor" src={deleteIcon} onClick={() => this.handleRemoveGenre(row.id)}></img></TableCell>
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
                                                <TableCell align="right"><img className="cursor" src={deleteIcon} onClick={() => this.handleRemoveActor(row.id)}></img></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            }
                        </Paper>

                        <Button variant="contained" color="primary" onClick={() => this.props.insertMovie(this.state.name, this.state.releaseDate,
                            this.state.genresArray, this.state.actorsArray)}>Insert</Button>
                    </FormControl>
                </Paper>
            </div>
        );
    }
}