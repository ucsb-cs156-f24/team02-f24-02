import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import ProfilePage from "main/pages/ProfilePage";
import AdminUsersPage from "main/pages/AdminUsersPage";

import UCSBDatesIndexPage from "main/pages/UCSBDates/UCSBDatesIndexPage";
import UCSBDatesCreatePage from "main/pages/UCSBDates/UCSBDatesCreatePage";
import UCSBDatesEditPage from "main/pages/UCSBDates/UCSBDatesEditPage";

import RestaurantIndexPage from "main/pages/Restaurants/RestaurantIndexPage";
import RestaurantCreatePage from "main/pages/Restaurants/RestaurantCreatePage";
import RestaurantEditPage from "main/pages/Restaurants/RestaurantEditPage";

import ArticleIndexPage from "main/pages/Articles/ArticlesIndexPage";
import ArticleCreatePage from "main/pages/Articles/ArticlesCreatePage";
import ArticleEditPage from "main/pages/Articles/ArticlesEditPage";

import PlaceholderIndexPage from "main/pages/Placeholder/PlaceholderIndexPage";
import PlaceholderCreatePage from "main/pages/Placeholder/PlaceholderCreatePage";
import PlaceholderEditPage from "main/pages/Placeholder/PlaceholderEditPage";

import HelpRequestIndexPage from "main/pages/HelpRequest/HelpRequestIndexPage";
import HelpRequestCreatePage from "main/pages/HelpRequest/HelpRequestCreatePage";
import HelpRequestEditPage from "main/pages/HelpRequest/HelpRequestEditPage";

import UCSBDiningCommonsMenuItemsIndexPage from "main/pages/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemsIndexPage";
import UCSBDiningCommonsMenuItemsCreatePage from "main/pages/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemsCreatePage";
import UCSBDiningCommonsMenuItemsEditPage from "main/pages/UCSBDiningCommonsMenuItems/UCSBDiningCommonsMenuItemsEditPage";

import UCSBOrganizationIndexPage from "main/pages/UCSBOrganization/UCSBOrganizationIndexPage";
import UCSBOrganizationCreatePage from "main/pages/UCSBOrganization/UCSBOrganizationCreatePage";
import UCSBOrganizationEditPage from "main/pages/UCSBOrganization/UCSBOrganizationEditPage";

import RecommendationRequestIndexPage from "main/pages/RecommendationRequests/RecommendationRequestIndexPage";
import RecommendationRequestCreatePage from "main/pages/RecommendationRequests/RecommendationRequestCreatePage";
import RecommendationRequestEditPage from "main/pages/RecommendationRequests/RecommendationRequestEditPage";

import MenuItemReviewIndexPage from "main/pages/MenuItemReview/MenuItemReviewIndexPage";
import MenuItemReviewCreatePage from "main/pages/MenuItemReview/MenuItemReviewCreatePage";
import MenuItemReviewEditPage from "main/pages/MenuItemReview/MenuItemReviewEditPage";

import { hasRole, useCurrentUser } from "main/utils/currentUser";

import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { data: currentUser } = useCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        {hasRole(currentUser, "ROLE_USER") && (
          <>
            <Route
              exact
              path="/ucsborganizations"
              element={<UCSBOrganizationIndexPage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_ADMIN") && (
          <>
            <Route
              exact
              path="/ucsborganizations/edit/:orgCode"
              element={<UCSBOrganizationEditPage />}
            />
            <Route
              exact
              path="/ucsborganizations/create"
              element={<UCSBOrganizationCreatePage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_ADMIN") && (
          <Route exact path="/admin/users" element={<AdminUsersPage />} />
        )}
        {hasRole(currentUser, "ROLE_USER") && (
          <>
            <Route exact path="/ucsbdates" element={<UCSBDatesIndexPage />} />
          </>
        )}
        {hasRole(currentUser, "ROLE_ADMIN") && (
          <>
            <Route
              exact
              path="/ucsbdates/edit/:id"
              element={<UCSBDatesEditPage />}
            />
            <Route
              exact
              path="/ucsbdates/create"
              element={<UCSBDatesCreatePage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_USER") && (
          <>
            <Route
              exact
              path="/restaurants"
              element={<RestaurantIndexPage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_ADMIN") && (
          <>
            <Route
              exact
              path="/restaurants/edit/:id"
              element={<RestaurantEditPage />}
            />
            <Route
              exact
              path="/restaurants/create"
              element={<RestaurantCreatePage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_USER") && (
          <>
            <Route
              exact
              path="/helprequests"
              element={<HelpRequestIndexPage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_ADMIN") && (
          <>
            <Route
              exact
              path="/helprequests/edit/:id"
              element={<HelpRequestEditPage />}
            />
            <Route
              exact
              path="/helprequests/create"
              element={<HelpRequestCreatePage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_USER") && (
          <>
            <Route
              exact
              path="/recommendationrequests"
              element={<RecommendationRequestIndexPage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_ADMIN") && (
          <>
            <Route
              exact
              path="/recommendationrequests/edit/:id"
              element={<RecommendationRequestEditPage />}
            />
            <Route
              exact
              path="/recommendationrequests/create"
              element={<RecommendationRequestCreatePage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_USER") && (
          <>
            <Route
              exact
              path="/placeholder"
              element={<PlaceholderIndexPage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_ADMIN") && (
          <>
            <Route
              exact
              path="/placeholder/edit/:id"
              element={<PlaceholderEditPage />}
            />
            <Route
              exact
              path="/placeholder/create"
              element={<PlaceholderCreatePage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_USER") && (
          <>
            <Route exact path="/articles" element={<ArticleIndexPage />} />
          </>
        )}
        {hasRole(currentUser, "ROLE_ADMIN") && (
          <>
            <Route
              exact
              path="/articles/edit/:id"
              element={<ArticleEditPage />}
            />
            <Route
              exact
              path="/articles/create"
              element={<ArticleCreatePage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_USER") && (
          <>
            <Route
              exact
              path="/ucsbdiningcommonsmenuitems"
              element={<UCSBDiningCommonsMenuItemsIndexPage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_ADMIN") && (
          <>
            <Route
              exact
              path="/ucsbdiningcommonsmenuitems/edit/:id"
              element={<UCSBDiningCommonsMenuItemsEditPage />}
            />
            <Route
              exact
              path="/ucsbdiningcommonsmenuitems/create"
              element={<UCSBDiningCommonsMenuItemsCreatePage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_USER") && (
          <>
            <Route
              exact
              path="/menuitemreviews"
              element={<MenuItemReviewIndexPage />}
            />
          </>
        )}
        {hasRole(currentUser, "ROLE_ADMIN") && (
          <>
            <Route
              exact
              path="/menuitemreviews/edit/:id"
              element={<MenuItemReviewEditPage />}
            />
            <Route
              exact
              path="/menuitemreviews/create"
              element={<MenuItemReviewCreatePage />}
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
