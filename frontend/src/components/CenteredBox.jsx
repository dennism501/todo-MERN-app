import React from "react";
import { Box } from "@material-ui/core";

const CenteredBox = ({ children }) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        style={{ width: "100%", margin: 20 }}
      >
        {children}
      </Box>
    </>
  );
};

export default CenteredBox;
