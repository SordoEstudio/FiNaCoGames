import * as React from 'react';
import {Alert,Stack,Collapse} from '@mui/material';


export default function AlertComponent({type, message,open}) {
  return (
    <Collapse in={open}>

    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">This is a success Alert.</Alert>
      <Alert severity="info">This is an info Alert.</Alert>
      <Alert severity="warning">This is a warning Alert.</Alert>
      <Alert severity="error">This is an error Alert.</Alert>
    </Stack>
    </Collapse>
  );
}
