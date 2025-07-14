import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/Not_Found/NotFound";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import KanBanTasks from "./pages/Tasks/Kanban";
import TasksList from "./pages/Tasks/List";
import Calendar from "./pages/Calendar";
import ScrollToTop from "./components/common/ScrollToTop";
import UserProfile from "./pages/UserProfiles";
import Users from "./pages/Users/users";

const App = () => {
  const token: any = localStorage.getItem("auth_token");
  const userDataString = localStorage.getItem("user_data");
  const userData = userDataString ? JSON.parse(userDataString) : {};

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {!token || token.length < 1 ? <Route path="*" element={<NotFound />} /> : 
            <Route element={<AppLayout />}>
              <Route index path="/dashboard" element={<Home />} />
              <Route path="/list-taks" element={<TasksList />} />
              <Route path="/kanban-tasks" element={<KanBanTasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          }

          {userData.role !== "admin" ? <Route path="*" element={<NotFound />} /> : 
            <Route element={<AppLayout />}>
               <Route path="/users" element={<Users />} />
            </Route>
          }

          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;