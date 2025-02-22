import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function InfoBox({job}) {
  return (
    <Card sx={{ maxWidth: 370, minHeight: 280 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {job.title}
        </Typography>
        <Divider sx={{mb:'10px'}}/>
        <Stack direction='row' spacing={1} sx={{flexWrap:'wrap', rowGap:1}}>
          {job.skills.map((skill, index)=>(<Chip size='small' label={skill} />))}
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {job.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}