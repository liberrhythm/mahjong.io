import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Game from './components/Game';

function Room() {
    let { id } = useParams();
    let username = "bleeby";

    const socket = io("http://localhost:3000", { query: { room: id, username }});
    
    socket.on("connect", () => {
        console.log("socket connected");
    });

    socket.on("disconnect", () => {
        console.log("socket disconnected");
    });

    return (
        <div>
            Room {id}
            <Game />
        </div>);
}

export default Room;