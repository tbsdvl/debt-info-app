import { Box } from '@mui/material';

const Section = ({ id, component }) => {
  return (
    <section
      id={id}
      className="bg-gray-900 text-lime-400 text-lg p-2 font-sans"
    >
      <Box className="bg-gray-800 rounded p-2">
        {component}
      </Box>
    </section>
  );
}

export default Section;