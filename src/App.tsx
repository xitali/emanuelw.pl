import { useEffect, Component } from 'react';
import type { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
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
import { useProjectStore } from './store/projectStore';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center text-center p-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Coś poszło nie tak</h2>
            <p className="text-gray-500 mb-6">Wystąpił nieoczekiwany błąd. Odśwież stronę, aby spróbować ponownie.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Odśwież stronę
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const { fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <ErrorBoundary>
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
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/projects" element={<ProtectedRoute><ProjectManagement /></ProtectedRoute>} />
            <Route path="/admin/projects/new" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
            <Route path="/admin/projects/:id/edit" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute><MessageManagement /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><ServiceManagement /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
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
    </ErrorBoundary>
  );
}

export default App;

