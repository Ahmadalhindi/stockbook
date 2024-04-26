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
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
