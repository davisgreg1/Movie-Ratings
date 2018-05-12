import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "material-ui/styles";
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const LeaderBoard = props => {
    console.log("props in LB", props)
  const { classes, data } = props;

  return (
    <Paper className={classes.root}>
    {data ? 
      (
      <Table className={classes.table}>
        <TableHead>
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
                <TableCell numeric>{player.points}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        </Table>) : null}
     </Paper>
  );
}

LeaderBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeaderBoard);