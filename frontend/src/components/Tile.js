import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    '@global': {

    },
    tile: {
        width: "3rem",
        backgroundColor: "white"
    }
}));

function Tile(props) {
    const classes = useStyles();
    const type = props.type;
    
    return (
        <img src={require(`../assets/mahjong-svgs/${type}.svg`)} alt="Img" className={classes.tile} />
    );
}

export default Tile;