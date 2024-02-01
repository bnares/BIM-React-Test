import React from 'react'
import * as Router from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';

function Sidebar() {
  return (
    <IconButton color="secondary" aria-label="add an alarm" onClick={()=>console.log("clicked button")}>
        <AlarmIcon />
    </IconButton>
  )
}

export default Sidebar