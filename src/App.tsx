import React from "react";
import { Switch, Route, matchPath, useLocation, useHistory } from 'react-router-dom';
import authAtom from "atoms/auth";
import layoutAtom from "atoms/layout";
import { useRecoilState } from "recoil";
import api from "api";
import routes from "./routes";
import NoMatch from "pages/NoMatch";

const App: React.FC = () => {

  const location = useLocation();
  const history = useHistory();
  const [authState, setAuthState] = useRecoilState(authAtom);
  const [layoutState, setLayoutState] = useRecoilState(layoutAtom);

  React.useEffect(() => {
    if (!authState.init) {
      const checkToken = async () => {

        // url scope
        let routeMatched = null;
        for (let i = 0; i < routes.length; i++) {
          if (matchPath(location.pathname, routes[i])) {
            routeMatched = routes[i];
            break;
          }
        }

        const response = await api.post('/auth/check');

        if (response.status === 201) {
          const user = response.data;

          // user role
          let userRole = user.role;
          if (user.role === 'kid' || user.role === 'teacher') {
            userRole = 'user';
          }

          // check url
          if (!routeMatched || routeMatched.scope !== userRole) {
            if (userRole === 'admin') {
              history.push("/admin/home");
            } else {
              history.push("/user/home");
            }
          }

          // set login status
          setTimeout(() => {
            setAuthState({
              init: true,
              user,
            });
          }, 1000);
        } else {

          setAuthState({
            ...authState,
            init: true,
          });

          // check url 
          if (!routeMatched) {
            history.push("/login");
          }
        }

      };
      checkToken();
    }
  }, [authState, setAuthState, history, location]);

  React.useEffect(() => {
    if (!layoutState.init) {
      window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
          setLayoutState({
            ...layoutState,
            init: true,
            isMobile: false
          });
        }
      });
    }
  }, [layoutState, setLayoutState]);

  return (
    <div>
      {authState.init ?
        <Switch>
          {routes.map(route =>
            <Route path={route.path} exact key={route.path}>
              <route.component />
            </Route>
          )}
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
        : <div className="w-screen h-screen flex justify-center items-center">loading...</div>
      }
    </div>
  );
};

export default App;
