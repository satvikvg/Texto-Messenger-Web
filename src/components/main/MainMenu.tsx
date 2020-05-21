import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  IconButton,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem
} from "@material-ui/core";

interface IMainMenuProps {}
export const MainMenu: React.FC<IMainMenuProps> = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
  }, [open]);

  return (
    <React.Fragment>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "side-menu-list-grow" : undefined}
        aria-haspopup="true"
        color="default"
        aria-label="Menu"
        component="span"
        onClick={handleToggle}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 1000 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "left top" : "left bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="main-menu-list-grow">
                  <MenuItem onClick={handleClose}>Contact info</MenuItem>
                  <MenuItem onClick={handleClose}>Select messages</MenuItem>
                  <MenuItem onClick={handleClose}>Mute notifications</MenuItem>
                  <MenuItem onClick={handleClose}>Clear messages</MenuItem>
                  <MenuItem onClick={handleClose}>Delete chat</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};
