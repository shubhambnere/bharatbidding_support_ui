import { Route, Switch, Redirect } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "./components/layout/Main";
import CustomLoader from "./components/CustomLoader";



// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Tables = lazy(() => import("./pages/Tables"));
const Items = lazy(() => import("./pages/Items"));
const DemoForm = lazy(() => import("./pages/Form"));
const Billing = lazy(() => import("./pages/Billing"));
const Rtl = lazy(() => import("./pages/Rtl"));
const Profile = lazy(() => import("./pages/Profile"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Page404 = lazy(() => import("./pages/Page404"));
const Page500 = lazy(() => import("./pages/Page500"));
const Page403 = lazy(() => import("./pages/Page403"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword  = lazy(() => import("./pages/auth/ResetPassword"));
const DynamicTable = lazy(() => import("./components/DynamicTable/DynamicTable"));
const NormalTable = lazy(() => import("./components/Table/NormalTable"));
const UserProfile = lazy(() => import("./components/User/userProfile"));



// Seller
const SellerListingTable = lazy(() => import("./components/SellerDetail/SellerListingTable"));
const SellerDetail = lazy(() => import("./components/SellerDetail/SellerDetail"));
const SellerProfile = lazy(() => import("./components/SellerDetail/SellerProfile"));




const Routes = () => {
  return (
    <Suspense fallback={<CustomLoader size="40px" color="#1890ff" tip="Loading Please Wait..." />}>
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route exact path="/page-404" component={Page404} />
        <Route exact path="/page-403" component={Page403} />
        <Route exact path="/page-500" component={Page500} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Main>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/items" component={Items} />
          <Route exact path="/DynamicTable" component={DynamicTable} />
          <Route exact path="/demoForm" component={DemoForm} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/normalTable" component={NormalTable} />
          <Route exact path="/ResetPassword" component={ResetPassword} />
          <Route exact path="/user-profile" component={UserProfile} />

       
     

          {/* Seller Routes */}
          <Route exact path="/seller-listing" component={SellerListingTable} />
          <Route exact path="/seller-detail" component={SellerDetail} />
          <Route exact path="/seller-profile/" component={SellerProfile} />
          <Route exact path="/seller-profile/:id" component={SellerProfile} />
         
          {/* <Route path="*" render={() => <Redirect to="/page-404" />} />  */}
          
          {/* <Redirect from="/" to="/dashboard" /> */}
        </Main>
      </Switch>
    </Suspense>
  );
};

export default Routes;
