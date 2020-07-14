import React, { useState } from 'react';
// import './Game.css';
import Tile from './Tile';
// import io from "socket.io-client";
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
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
    '@global': {

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
    gamespace: {
        backgroundColor: "#d2b48c"
    }
}));

const numTiles = 18 * 2 * 4;
let tileTypes = ["wan", "ball", "stick"];
let allTiles = [];
for (let i = 1; i <= 9; i++) {
    for (const tileType of tileTypes) {
        for (let j = 1; j <= 4; j++) {
            allTiles.push(tileType + "-" + i.toString());
        }
    }
}

tileTypes.push("word");
const words = ["dong", "nan", "xi", "bei", "fa", "baiban", "zhong"];
for (const word of words) {
    for (let j = 1; j <= 4; j++) {
        allTiles.push(word);
    }
}

tileTypes.push("flower");
for (let j = 1; j <= 4; j++) {
    allTiles.push("flower-" + j.toString());
    allTiles.push("flower-" + j.toString());
}

const fisherYatesShuffle = (lst) => {
    for (let i = lst.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lst[i], lst[j]] = [lst[j], lst[i]];
    }
    return lst;
}

fisherYatesShuffle(allTiles);

const tileComponents = allTiles.map((tile, i) => <Tile key={i} type={tile} />);

function Game() {
    const classes = useStyles();

    const diceRoll = () => {
        return Math.floor(Math.random() * 6) + 1
             + Math.floor(Math.random() * 6) + 1
             + Math.floor(Math.random() * 6) + 1;
    };

    let roll = diceRoll();

    const [isDealer, setIsDealer] = useState(false);

    const [gameTiles, setGameTiles] = useState(() => tileComponents);
    const [tilesLeft, setTilesLeft] = useState(144);
    const [selectedTile, setSelectedTile] = useState("");

    const swapTile = (idx) => {
        setGameTiles(prevState => {
            let newGameState = prevState;
            newGameState[tilesLeft-1] = newGameState[idx];
            newGameState[idx] = newGameState[tilesLeft-1]
            return newGameState;
        });
    };

    const selectTile = () => {
        const tileIdx = Math.floor(Math.random() * tilesLeft);
        const tile = gameTiles[tileIdx];
        swapTile(tileIdx);
        setTilesLeft(tilesLeft - 1);
        setSelectedTile(tile);
    };


    const [myGameTiles, setMyGameTiles] = useState(() => {
        const numTilesToDraw = isDealer ? 17 : 16;
        let myTiles = [];
        for (let i = 1; i <= numTilesToDraw; i++) {
            myTiles.push(selectTile());
        }
        return myTiles;
    });

    return (
        <>
            <div>{ roll }</div>
            <CssBaseline />
            <Container className={classes.gamespace}>
                <Grid container>
                    <Grid container item xs={12}>
                        { gameTiles.slice(0, tilesLeft) }
                    </Grid>
                    <Grid container item xs={12}>
                        { myGameTiles }
                    </Grid>
                </Grid>
                <Button href="#" color="primary" variant="outlined" 
                        onClick={() => selectTile()}>get tile</Button>
                <div>{ selectedTile }</div>
            </Container>
        </>
    );
}

export default Game;