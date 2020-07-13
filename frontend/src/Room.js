import React, { useState } from 'react';
import './Room.css';
import { useParams } from "react-router-dom";

function Room() {
    let { id } = useParams();
    return <div>Room {id}</div>;
}

export default Room;