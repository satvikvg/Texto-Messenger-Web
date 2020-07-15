import React, { useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  IconButton,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { searchContacts } from "../../store/contacts/actions";
import { searchConversations } from "../../store/conversation/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#f8f8f8",
      padding: "4px 8px 4px 8px",
      boxShadow: "0.5px 0px 1.5px 0px #888888",
    },
    searchContainer: {
      backgroundColor: "#ffffff",
      borderRadius: theme.spacing(3),
    },
    inputRoot: {
      color: "inherit",
      width: "80%",
    },
  })
);

interface ISearchProps {}

export const SideSearch: React.FC<ISearchProps> = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchText(event.target.value);

    if (searchText.length > 4) {
      dispatch(searchContacts.request(searchText.trim()));
      dispatch(searchConversations.request(searchText.trim()));
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <IconButton color="default">
          <SearchIcon color="inherit" />
        </IconButton>
        <InputBase
          value={searchText}
          onChange={handleChange}
          placeholder="Search or start new chat"
          classes={{ root: classes.inputRoot }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </div>
  );
};
