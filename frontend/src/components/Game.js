import React, { useState } from 'react';
// import './Game.css';
import Tile from './Tile';
// import io from "socket.io-client";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
    '@global': {

    },
    gamespace: {
        backgroundColor: "#d2b48c"
    },
    board: {
        height: "50vh",
        width: "75vw",
        backgroundColor: "white"
    }
}));

const numTiles = 18 * 2 * 4;
let tileTypes = ["wan", "bing", "tiao"];
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
        allTiles.push("word-" + word);
    }
}

tileTypes.push("flower");
for (let j = 1; j <= 8; j++) {
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
        return tile;
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
                    <Grid container item xs={12} justify="center">
                        { gameTiles.slice(0, tilesLeft) }
                    </Grid>
                    <Grid container item xs={12} justify="center">
                        <div className={classes.board}></div>
                    </Grid>
                    <Grid container item xs={12} justify="center">
                        { myGameTiles }
                        <Button href="#" color="primary" variant="contained"
                                onClick={() => { let tile = selectTile(); setMyGameTiles([...myGameTiles, tile]); }}>
                                get tile
                        </Button>
                    </Grid>
                </Grid>
                
            </Container>
        </>
    );
}

export default Game;