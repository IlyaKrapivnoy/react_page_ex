import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(!isLogged);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            SITE USERS
          </Typography>
          {isLogged ? (
            <Button color="inherit" onClick={handleLogin}>
              Log In
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
