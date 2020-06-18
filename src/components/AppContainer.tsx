import React, { Component, Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  Theme,
  withStyles,
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
} from "@material-ui/core";
import { PrivateRoute } from "../router/PrivateRoute";
import { routes, privateRoutes } from "../router/routes";
import Service from "../services/providers/Service";
import ServiceProviderFactory from "../services/ServiceProvicerFactory";
import IUser from "../interfaces/modals/User";
import { RootState, RootAction } from "../store";
import { setAuthUser } from "../store/authentication/actions";

type IAppContainerProps = PropsFromRedux & {
  classes: any;
};

const styles = (theme: Theme) => ({});

class AppContainer extends Component<IAppContainerProps> {
  service: Service = ServiceProviderFactory.getInstance();

  componentDidMount() {
    // Check how to unsubscribe it.
    this.service.userService().onAuthStateChanged(this.handleAuthStateChanged);
  }

  render() {
    const { activeUser, loginPhase } = this.props;
    const theme = createMuiTheme(this.props.themeOptions);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {activeUser && loginPhase === "enter-phone-number" && (
            <Redirect to="/" />
          )}
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
            {privateRoutes.map((privateRoute, i) => (
              <PrivateRoute key={i} {...privateRoute} />
            ))}
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }

  handleAuthStateChanged = (user: IUser | null, error?: Error | null) => {
    this.props.setAuthUserId(user);

    if (error) {
      console.error(error);
    }
  };
}

const mapStateToProps = (store: RootState) => {
  return {
    activeUser: store.authentication.activeUser,
    loginPhase: store.authentication.loginPhase,
    themeOptions: store.settings.theme,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return {
    setAuthUserId: (user: IUser | null) => dispatch(setAuthUser(user)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withStyles(styles)(AppContainer));
