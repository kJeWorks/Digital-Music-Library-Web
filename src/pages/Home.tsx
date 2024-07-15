import { Box } from "@mui/material";
import Hero from "../components/Hero";
import { PageType } from "../types/PageType";

type Props = {
  pages: Array<PageType>;
  setPages(pages: Array<PageType>): void;
};

export default function Home(props: Props) {
  const { pages, setPages } = props;

  return (
    <Box>
      <Hero pages={pages} setPages={setPages} />
    </Box>
  );
};