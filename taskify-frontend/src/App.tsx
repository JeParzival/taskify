// views
import ProfileView from './views/ProfileView';
import TasksView from './views/TasksView';
import TeamsView from './views/TeamsView';
import TeamView from './views/TeamView';
import CreateTeamView from './views/CreateTeamView';
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AuthProvider from './components/auth/AuthProvider';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  return <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<RequireAuth><ProfileView /></RequireAuth>} />
        <Route path="/tasks" element={<RequireAuth><TasksView /></RequireAuth>} />
        <Route path="/teams" element={<RequireAuth><TeamsView /></RequireAuth>} />
        <Route path="/team" element={<RequireAuth><TeamView /></RequireAuth>} />
        <Route path="/createTeam" element={<RequireAuth><CreateTeamView /></RequireAuth>} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/login" element={<LoginView />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
}

export default App;

