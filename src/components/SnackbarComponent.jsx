import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


export default function SnackbarComponent({snackbarProps, setsnackbarProps}) {
const {type,message,open,duration,vertical,horizontal} = snackbarProps

  const handleClose= ()=> {
    setsnackbarProps({...snackbarProps,open:false});
  };
  return (
    <div>
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}  
      anchorOrigin={{ vertical:`${vertical}`, horizontal:`${horizontal}` }}
      >
        <Alert
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
