import React from 'react';

function Tile(props) {
    const type = props.type;
    // const number = props.number ? props.number : 0;
    return (
        <div>{ type }</div>
    );
}

export default Tile;