import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import { Button, Modal, InputAdornment, IconButton, Stack, Alert,} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import {FormProvider, FCheckBox, FTextField} from "./form";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function SearchAppBar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const defaultValues = {
    email: "minhhc@gmail.com",
    Password:"123",
    remember: true,
  };
  const methods = useForm ({defaultValues});
  const {
    reset,
    setError,
    handleSubmit,
    control,
    formState: {errors, isSubmitting},
  } = methods;
  const onSubmit = (data) => {
    console.log(data);
    // setError('afterSubmit', {message:"Sever Response Error"}) -> set error chỗ này
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, marginLeft:"15%", fontSize:"100%" }}
          > 
            Job Routing
          </Typography>
          <Search sx={{flexGrow:"1", marginRight: '35%' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button sx={{marginRight:"10%"}} color="inherit" variant='outline' startIcon={<LoginIcon></LoginIcon>} onClick={handleOpen}>Sign in</Button>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.afterSubmit && (<Alert severity='error'>{errors.afterSubmit.message}</Alert>)}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login page
          </Typography>
            <FTextField name="username" label='Username'/>
            <FTextField name='password' label='Password' type={showPassword ? 'text': 'password'}
                         endadornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                              }
                              onClick={()=> setShowPassword(!showPassword)}
                              onMouseDown={(e)=> e.preventDefault()}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }/>
          <FCheckBox name='remember' label='Remember me' />
          <LoadingButton
          fullWidth
          size='lg'
          type='submit'
          variant='contained'
          loading={isSubmitting}
          >
            Login
          </LoadingButton>
          </Stack>
          </FormProvider>
        </Box>
        }
      </Modal>
    </Box>
  );
};