import {
  createMuiTheme,
  CssBaseline,
  Theme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core";
import React, { Component, Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { PrivateRoute } from "../router/PrivateRoute";
import { privateRoutes, routes } from "../router/routes";
import Service from "../services/providers/Service";
import ServiceProviderFactory from "../services/ServiceProvicerFactory";
import { RootAction, RootState } from "../store";
import {
  subscribeAuthState,
  unsubscribeAuthState,
} from "../store/authentication/actions";
import { AuthenticationSelector } from "../store/authentication/reducer";
import { SettingsSelectors as SettingsSelector } from "../store/settings/reducer";

type IAppContainerProps = PropsFromRedux & {
  classes: any;
};

const styles = (theme: Theme) => ({});

class AppContainer extends Component<IAppContainerProps> {
  service: Service = ServiceProviderFactory.getInstance();

  componentDidMount() {
    this.props.subscribeAuthStateChange();
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

  componentWillUnmount() {
    this.props.unsubscribeAuthStateChange();
  }
}

const mapStateToProps = (store: RootState) => {
  return {
    activeUser: AuthenticationSelector.getCurrentUser(store),
    loginPhase: AuthenticationSelector.getLoginPhase(store),
    themeOptions: SettingsSelector.getTheme(store),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return {
    subscribeAuthStateChange: () => dispatch(subscribeAuthState()),
    unsubscribeAuthStateChange: () => dispatch(unsubscribeAuthState()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withStyles(styles)(AppContainer));
