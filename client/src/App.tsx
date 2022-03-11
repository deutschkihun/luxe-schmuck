import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LandingPage } from "./pages/LandingPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { SearchPage } from "./pages/SearchPage";
import { NewletterPage } from "./pages/NewletterPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ErrorPage } from "./pages/ErrorPage";
import { ProductPage } from "./pages/ProductPage";
import { ForgotPage } from "./pages/ForgotPage";
import { ForgotEmailPage } from "./pages/ForgotEmailPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { SuccessPage } from "./pages/SuccessPage";
import { ProfilePage } from "./pages/ProfilePage";

function App(): JSX.Element {
  return (
    <Router>
      <Route
        path="/"
        render={({ location }) =>
          location.pathname !== "/login" &&
          location.pathname !== "/register" &&
          location.pathname !== "/profile" &&
          location.pathname !== "/success" &&
          location.pathname !== "/forgot" &&
          location.pathname !== "/forgot/password" &&
          location.pathname !== "/forgot/email" && <Header />
        }
      />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/shop/search" component={SearchPage} />
        <Route exact path="/newletter" component={NewletterPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/product" component={ProductPage} />
        <Route exact path="/forgot" component={ForgotPage} />
        <Route exact path="/forgot/email" component={ForgotEmailPage} />
        <Route exact path="/forgot/password" component={ForgotPasswordPage} />
        <Route exact path="/success" component={SuccessPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route path="*" component={ErrorPage} />
      </Switch>
      <Route
        path="/"
        render={({ location }) =>
          location.pathname !== "/login" &&
          location.pathname !== "/register" &&
          location.pathname !== "/profile" &&
          location.pathname !== "/success" &&
          location.pathname !== "/forgot" &&
          location.pathname !== "/forgot/password" &&
          location.pathname !== "/forgot/email" && <Footer />
        }
      />
    </Router>
  );
}

export default App;
