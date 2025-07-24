import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectDetails from './components/ProjectDetails';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectManagement from './pages/ProjectManagement';
import MessageManagement from './pages/MessageManagement';
import ProjectForm from './pages/ProjectForm';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';
import ServiceManagement from './pages/ServiceManagement';
import { useAuthStore } from './store/authStore';
import { useProjectStore } from './store/projectStore';
import { useSettingsStore } from './store/settingsStore';

function App() {
  const { initializeAuth } = useAuthStore();
  const { fetchProjects } = useProjectStore();
  const { fetchSettings } = useSettingsStore();

  useEffect(() => {
    initializeAuth();
    fetchProjects();
    fetchSettings();
  }, [initializeAuth, fetchProjects, fetchSettings]);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<ProjectDetails />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/projects" element={<ProjectManagement />} />
            <Route path="/admin/projects/new" element={<ProjectForm />} />
            <Route path="/admin/projects/:id/edit" element={<ProjectForm />} />
            <Route path="/admin/messages" element={<MessageManagement />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/services" element={<ServiceManagement />} />
            <Route path="/admin/settings" element={<Settings />} />
        </Routes>
      </Layout>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'dark:bg-slate-800 dark:text-white light:bg-white light:text-gray-900 light:border light:border-gray-200',
        }}
      />
    </Router>
  );
}

export default App;
