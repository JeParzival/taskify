import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import ProfileView from './views/ProfileView';
import TasksView from './views/TasksView';
import TeamsView from './views/TeamsView';
import TeamView from './views/TeamView';
import CreateTeamView from './views/CreateTeamView';
import Register from "./views/Register";
import Login from "./views/Login";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/user" element={<ProfileView />} />
      <Route path="/tasks" element={<TasksView />} />
      <Route path="/teams" element={<TeamsView />} />
      <Route path="/team" element={<TeamView />} />
      <Route path="/createTeam" element={<CreateTeamView />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
