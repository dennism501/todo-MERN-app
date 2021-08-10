import { Button, Box, Icon } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const Filter = ({ filterTodos, setFilterTodayDate, filterTodayDate }) => {
  return (
    <>
      <Box margin={1} display="flex" justifyContent="flex-end">
        <Button
          endIcon={<Icon>filter_list</Icon>}
          onClick={() => filterTodos(new Date())}
        >
          Filter Today
        </Button>
        {filterTodayDate && (
          <Button
            endIcon={<Icon>close</Icon>}
            onClick={() => setFilterTodayDate("")}
          >
            Clear filter
          </Button>
        )}
      </Box>
    </>
  );
};

Filter.propTypes = {
  filterTodos: PropTypes.func.isRequired,
  setFilterTodayDate: PropTypes.func.isRequired,
  filterTodayDate: PropTypes.string.isRequired,
};

export default Filter;
