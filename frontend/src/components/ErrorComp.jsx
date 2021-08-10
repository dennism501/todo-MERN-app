import React from "react";
import { Box, Typography, Icon } from "@material-ui/core";
import ErrorImage from "../../src/assets/images/error.png";

const ErrorComp = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        marginTop={10}
      >
        <img width="15%" height="15%" src={ErrorImage} />
        <Typography variant="h6">No Todos found! </Typography>
      </Box>
    </>
  );
};

export default ErrorComp;
