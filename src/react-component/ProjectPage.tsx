import React from 'react'
import { IFCViewer } from './IFCViewer'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import App from '../App';
import AppBimBar from './AppBimBar';
function ProjectPage() {
  return (
    <>
        <Grid container spacing={2} >
            <Grid item xs={12}>
              <AppBimBar />
            </Grid>
            
            <Grid item xs={10}>
                <IFCViewer />
            </Grid>
            <Grid item xs={2}>
                <Button variant='contained' onClick={()=>console.log("clicked button grom MUI")}>OPEN DIALOG</Button>
            </Grid>
        </Grid>
    </>
    
  )
}

export default ProjectPage