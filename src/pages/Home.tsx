import { Box } from "@mui/material";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <Box 
      sx={{ 
        position: 'relative', 
        top: 0, 
        left: 0,
      }}>
      <Hero />
    </Box>
  );
};