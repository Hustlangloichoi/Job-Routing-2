import "./App.css";
import { useState, useContext, createContext } from "react";
import SearchAppBar from "./components/SearchAppBar";
import InfoBox from "./components/InfoBox";
import BasicPagination from "./components/BasicPagination";
import { Container, Grid, Modal } from "@mui/material";
import jobs from "./jobs.json";
import { fakeAuthProvider } from "./Auth";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { FormProvider, FCheckBox, FTextField } from "./components/form";
import {
  Box,
  Stack,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/job/:id" element={<InfoBox />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <SearchAppBar />
      <Container maxWidth="lg" sx={{ mt: "10px" }}>
        <Grid container spacing={2}>
          {jobs.slice(0, 5).map((job, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <InfoBox job={job} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Outlet />
      <BasicPagination />
    </div>
  );
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const defaultValues = {
    email: "minhhc@gmail.com",
    Password: "123",
    remember: true,
  };
  const methods = useForm({ defaultValues });
  const {
    // reset,
    // setError,
    handleSubmit,
    // control,
    formState: { errors, isSubmitting },
  } = methods;

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    auth.signin(data.username, () => {
      navigate(from, { replace: true });
    });
    // setError('afterSubmit', {message:"Sever Response Error"}) -> set error chỗ này
  };

  return (
    <Modal
      open={true}
      onClose={() => navigate("/")}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {!!errors.afterSubmit && (
                <Alert severity="error">{errors.afterSubmit.message}</Alert>
              )}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Login page
              </Typography>
              <FTextField name="username" label="Username" />
              <FTextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FCheckBox name="remember" label="Remember me" />
              <LoadingButton
                fullWidth
                size="lg"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Sign in
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      }
    </Modal>
  );
}

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

// requireAuth bọc quanh chữ learn more ?????
export function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
