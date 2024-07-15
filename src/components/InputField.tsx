import { TextField } from "@mui/material";

type Props = {
  id: string;
  label: string;
  setFunction:(value: string) => void;
  value: string;
  sx?: any;
}

export default function InputField(props: Props) {
  const { id, label, setFunction, value, sx } = props;
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      sx={{
        '& .MuiFormLabel-root': {
          color: "#403D39",
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: "#EB5E28",
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: "#403D39",
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: "#EB5E28",
        },
        ...sx
      }}
      onChange={(e) => {setFunction(e.target.value)}}
      value={value}
      required
    />
  );
};