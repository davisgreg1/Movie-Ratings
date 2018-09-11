import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table from "material-ui/Table/Table";
import TableBody from "material-ui/Table/TableBody";
import TableCell from "material-ui/Table/TableCell";
import TableHead from "material-ui/Table/TableHead";
import TableRow from "material-ui/Table/TableRow";
import Paper from "material-ui/Paper";
import { addCommas } from "../../utils/movieData";
import "../../Views/App.css";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  phoneTable:{
    minWidth: 100,
    height: "90vh"
  },
  table: {
    minWidth: 500,
    height: "88vh"
  }
});

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { getLeaderBoard } = this.props;
    getLeaderBoard();
  }

  render() {
    const { classes, data } = this.props;
    const mobileScreen = window.innerWidth <= 768;

    return (
      <Paper className={classes.root} id="leaderboards">
        {data ? (
          <Table className={mobileScreen ? classes.phoneTable : classes.table} >
            <TableHead className="leaderboard-data">
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell numeric>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((player, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {player.username}
                    </TableCell>
                    <TableCell numeric>{addCommas(player.points)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : null}
      </Paper>
    );
  }
}

LeaderBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeaderBoard);
