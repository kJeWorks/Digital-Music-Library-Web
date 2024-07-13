import { TextField } from "@mui/material";

type Props = {
  setQuery: (query: string) => void;
  label: string;
}

export default function SearchBox(props: Props) {
  const { setQuery, label } = props;
  
  return (
    <TextField
      id="standard-basic" 
      label={label} 
      variant="standard"
      sx={{
        mt: 5,
        '& .MuiFormLabel-root': {
          color: "#403D39",
        },
        '& .MuiInput-root .MuiInput-input': {
          color: "#403D39",
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: "#EB5E28",
        },
        '& .MuiInput-underline:before': {
          borderColor: "#403D39",
        },
        '& .MuiInput-underline:after': {
          borderColor: "#EB5E28",
        },
      }}
      fullWidth
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};