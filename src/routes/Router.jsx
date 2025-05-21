import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HtmlPage from "../pages/HtmlPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import MemberPage from "../pages/Members/MemberPage";
import MemberView from "../pages/Members/MemberView";
import AddMemberPage from "../pages/Members/AddMemberPage";
import BusinessPage from "../pages/Activity/BusinessPage";
import AddActivityPage from "../pages/Activity/AddActivityPage";
import LevelPage from "../pages/Level/LevelPage";
import AddLevelPage from "../pages/Level/AddLevel";
import EventsListPage from "../pages/Events/EventsListPage";
import EventSinglePage from "../pages/Events/EventSinglePage";
import MediaPage from "../pages/Events/MediaPage";
import EditEvent from "../pages/Events/EditEvent";
import AddEventPage from "../pages/Events/AddEventPage";
import ApprovalPage from "../pages/Approvals/ApprovalPage";
import ReportPage from "../pages/Reports/ReportPage";
import PromotionPage from "../pages/Promotions/PromotionPage";
import Createpromotion from "../pages/Promotions/CreatePromotion";
import EditPromotion from "../pages/Promotions/EditPromotion";
import PaymentPage from "../pages/payments/PaymentPage";
import AddProductPage from "../pages/Members/AddProductPage";
import NotificationPage from "../pages/Notifications/NotificationPage";
import NewsPage from "../pages/News/NewsPage";
import GroupPage from "../pages/Group/GroupPage";
import AddGroupPage from "../pages/Group/AddGroupPage";
import CreateNews from "../pages/News/CreateNews";
import EditNews from "../pages/News/EditNews";
import SettingPage from "../pages/Settings/SettingPage";
import AddAdminPage from "../pages/Settings/AddAdminPage";
import AddRolePage from "../pages/Settings/AddRolePage";
import LogoutPage from "../pages/Logout/LogoutPage";
import { ProtectedLayout } from "./PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/user/:id",
    element: <HtmlPage />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/members", element: <MemberPage /> },
      { path: "/members/:id", element: <MemberView /> },
      { path: "/members/member", element: <AddMemberPage /> },
      { path: "/activity", element: <BusinessPage /> },
      { path: "/activity/activity", element: <AddActivityPage /> },
      { path: "/levels", element: <LevelPage /> },
      { path: "/levels/level", element: <AddLevelPage /> },
      { path: "/events/list", element: <EventsListPage /> },
      { path: "/events/:id", element: <EventSinglePage /> },
      { path: "/event/media/:id", element: <MediaPage /> },
      { path: "/events/edit/:id", element: <EditEvent /> },
      { path: "/events/add", element: <AddEventPage /> },
      { path: "/approvals", element: <ApprovalPage /> },
      { path: "/reports", element: <ReportPage /> },
      { path: "/promotions", element: <PromotionPage /> },
      { path: "/promotions/promotion", element: <Createpromotion /> },
      { path: "/promotions/edit/:id", element: <EditPromotion /> },
      { path: "/subscriptions", element: <PaymentPage /> },
      { path: "/products/:id", element: <AddProductPage /> },
      { path: "/notifications", element: <NotificationPage /> },
      { path: "/news", element: <NewsPage /> },
      { path: "/groups", element: <GroupPage /> },
      { path: "/groups/group", element: <AddGroupPage /> },
      { path: "/news/add", element: <CreateNews /> },
      { path: "/news/edit/:id", element: <EditNews /> },
      { path: "/settings", element: <SettingPage /> },
      { path: "/settings/add-admin", element: <AddAdminPage /> },
      { path: "/settings/add-role", element: <AddRolePage /> },
      { path: "/logout", element: <LogoutPage /> },
    ],
  },
]);

export default router;
