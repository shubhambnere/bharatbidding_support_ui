import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;

// import { Switch, Route, Redirect } from "react-router-dom";
// import { Suspense, lazy } from "react";
// import Main from "./components/layout/Main";
// import "antd/dist/antd.css";
// import "./assets/styles/main.css";
// import "./assets/styles/responsive.css";

// // Lazy-loaded components
// const Home = lazy(() => import("./pages/Home"));
// const Tables = lazy(() => import("./pages/Tables"));
// const Items = lazy(() => import("./pages/Items"));
// const DemoForm = lazy(() => import("./pages/Form"));
// const Billing = lazy(() => import("./pages/Billing"));
// const Rtl = lazy(() => import("./pages/Rtl"));
// const Profile = lazy(() => import("./pages/Profile"));
// const SignUp = lazy(() => import("./pages/SignUp"));
// const SignIn = lazy(() => import("./pages/SignIn"));

// function App() {
//   return (
//     <div className="App">
//       <Suspense fallback={<div>Loading...</div>}>
//         <Switch>
//           <Route path="/sign-up" exact component={SignUp} />
//           <Route path="/sign-in" exact component={SignIn} />
//           <Main>
//             <Route exact path="/dashboard" component={Home} />
//             <Route exact path="/tables" component={Tables} />
//             <Route exact path="/items" component={Items} />
//             <Route exact path="/demoForm" component={DemoForm} />
//             <Route exact path="/billing" component={Billing} />
//             <Route exact path="/rtl" component={Rtl} />
//             <Route exact path="/profile" component={Profile} />
//             <Redirect from="*" to="/dashboard" />
//           </Main>
//         </Switch>
//       </Suspense>
//     </div>
//   );
// }

// export default App;
