import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import Users from "./pages/Users";
import Admins from "./pages/Admins";
import KanBanTasks from "./pages/Tasks/Kanban";
import TasksList from "./pages/Tasks/List";
import Calendar from "./pages/Calendar";
import ScrollToTop from "./components/common/ScrollToTop";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/list-taks" element={<TasksList />} />
            <Route path="/kanban-tasks" element={<KanBanTasks />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/calendar" element={<Calendar />} />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
