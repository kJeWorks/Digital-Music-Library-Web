import { Typography } from "@mui/material";

type Props = {
  pathname: string;
}

export default function Logo(props: Props) {
  const { pathname } = props;

  return (
    <>
      <Typography 
        variant='h4' 
        sx={{ 
          fontWeight: 700,
          color: pathname==="/" ? "#FFFCF2" : "#403D39"
        }}
      >
        V
      </Typography>
      <Typography
        variant="h5"
        noWrap
        sx={{
          fontFamily: 'monospace',
          fontWeight: 400,
          letterSpacing: '.3rem',
          textDecoration: 'none',
          alignSelf: 'center',
          color: pathname==="/" ? "#FFFCF2" : "#403D39"
        }}
      >
        ibe
      </Typography>
      <Typography 
        variant='h4'
        sx={{ 
          fontWeight: 700,
          color: '#EB5E28'
        }}
      >
        V
      </Typography>
      <Typography
        variant="h5"
        noWrap
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 400,
          letterSpacing: '.3rem',
          color: '#EB5E28',
          textDecoration: 'none',
          alignSelf: 'center',
        }}
      >
        ault
      </Typography>
    </>
  )
};