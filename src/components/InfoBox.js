import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Modal, Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useAuth } from "../App";
import { useNavigate } from "react-router-dom";

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

export default function InfoBox({ job }) {
  const [show, setShow] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (auth.user) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <Card sx={{ maxWidth: 370, minHeight: 280 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {job.title}
        </Typography>
        <Divider sx={{ mb: "10spx" }} />
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
          {job.skills.map((skill, index) => (
            <Chip key={index} size="small" label={skill} />
          ))}
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {job.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>
          Learn More
        </Button>
      </CardActions>
      <Modal open={show} onClose={() => setShow(false)}>
        <Box sx={style}>
          <Typography sx={{ mb: "30px" }} variant="h6">
            {job.title}
          </Typography>
          <Typography sx={{ mb: "30px" }}>{job.description}</Typography>
          <Typography sx={{ textAlign: "center", mb: "30px" }}>
            <strong>
              Skill
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap", rowGap: 1 }}
              >
                {job.skills.map((skill, index) => (
                  <Chip key={index} size="small" label={skill} />
                ))}
              </Stack>
            </strong>
          </Typography>
          <Typography>
            <strong>City:</strong> {job.city}
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
}
