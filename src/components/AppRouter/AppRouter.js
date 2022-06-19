import {
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "~components/Layout/Layout";
// import ScrollToTop from "@components/ScrollToTop/ScrollToTop";
import routes from '~shared/routes'


export default function AppRouter() {

  console.log('ROUTE', routes)

  return (
    <>
      {/*<ScrollToTop />*/}
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route} element={
            route.redirect ?
              (<Navigate to={route.redirect} />) :
              (<Layout InnerComponent={route.component} />)
          } />
        ))}
      </Switch>
    </>
  );
}
