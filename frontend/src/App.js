import React, { useState } from 'react';
import './App.css';
// import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouteLink,
  useRouteMatch,
  useParams
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function App() {
  const classes = useStyles();

  const generateRandomRoomNumber = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  };

  const [username, setUsername] = useState("");
  const [joinUsername, setJoinUsername] = useState("");
  const [roomNumber, setRoomNumber] = useState(generateRandomRoomNumber());
  const [joinRoomNumber, setJoinRoomNumber] = useState("");

  const onUsernameChange = (username) => { console.log(username); setUsername(username) };
  const onJoinUsernameChange = (username) => { setJoinUsername(username) };
  const onJoinRoomNumberChange = (roomNumber) => { setJoinRoomNumber(roomNumber) };

  const onCreateSubmit = () => {

  };

  const onJoinSubmit = () => {

  };

  return (
    <Router>
      <div className="App"></div>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            mahjong.io
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Rules
            </Link>
          </nav>
          <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item key={"create"} xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader
                title={"create a room"}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}
              />
              <CardContent>
                <form noValidate autoComplete="off">
                  <TextField fullWidth margin="dense" label="username" variant="outlined"
                             onChange={(e) => onUsernameChange(e.target.value)} />
                  <TextField fullWidth disabled margin="dense" label="room #" variant="outlined"
                             value={roomNumber} />
                </form>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" color="primary" onSubmit={onCreateSubmit}>
                  CREATE
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item key={"join"} xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader
                title={"join a room"}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}
              />
              <CardContent>
                <form noValidate autoComplete="off">
                  <TextField fullWidth margin="dense" label="username" variant="outlined"
                             onChange={(e) => onJoinUsernameChange(e.target.value)} />
                  <TextField fullWidth margin="dense" label="room #" variant="outlined"
                             onChange={(e) => onJoinRoomNumberChange(e.target.value)} />
                </form>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" color="primary" onSubmit={onJoinSubmit}>
                  JOIN
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          copyright of liberrhythm.github.io
        </Box>
      </Container>

      <Switch>
        <Route path="/about">
        </Route>
        <Route path="/users">
        </Route>
        <Route path="/">
        </Route>
      </Switch>
    </Router>
  );
}

const About = () => {
  return <h2>About</h2>;
};

export default App;

// <FormControl fullWidth margin="dense" variant="outlined">
// <InputLabel htmlFor="input-username">username</InputLabel>
// <OutlinedInput id="input-username" label="username" />
// </FormControl>
// <FormControl fullWidth margin="dense" variant="outlined">
// <InputLabel htmlFor="input-room-number">room #</InputLabel>
// <OutlinedInput id="input-room-number" label="room #" />
// </FormControl>
