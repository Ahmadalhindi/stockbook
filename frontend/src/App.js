import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import StockCreateForm from "./pages/stocks/StockCreateForm";
import StockPage from "./pages/stocks/StockPage";
import StocksPage from "./pages/stocks/StocksPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import StockEditForm from "./pages/stocks/StockEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import EarningCreateForm from "./pages/earnings/EarningCreateForm";
import EarningPage from "./pages/earnings/EarningPage";
import EarningsPage from "./pages/earnings/EarningsPage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <StocksPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/earnings"
            render={() => (
              <EarningsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <StocksPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/bulled"
            render={() => (
              <StocksPage
                message="No results found. Adjust the search keyword or bulled a stock."
                filter={`bulls__owner__profile=${profile_id}&ordering=-bulls__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/beared"
            render={() => (
              <StocksPage
                message="No results found. Adjust the search keyword or beared a stock."
                filter={`bears__owner__profile=${profile_id}&ordering=-bears__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/stocks/create"
            render={() => <StockCreateForm />}
          />
          <Route exact path="/stocks/:id" render={() => <StockPage />} />
          <Route exact path="/stocks/:id/edit" render={() => <StockEditForm />} />
          <Route
            exact
            path="/earnings/create"
            render={() => <EarningCreateForm />}
          />
          <Route exact path="/earnings/:id" render={() => <EarningPage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
