import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderOpen, 
  Mail, 
  Eye, 
  TrendingUp, 
  Plus, 
  Settings, 
  LogOut,
  Globe 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useProjectStore } from '../store/projectStore';
import { useContactStore } from '../store/contactStore';
import { useVisitStats } from '../store/visitsStore';
import VisitStats from '../components/VisitStats';
import { DashboardStats } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { projects, fetchProjects } = useProjectStore();
  const { messages, fetchMessages } = useContactStore();
  const { stats: visitStats, fetchStats } = useVisitStats();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Pobierz dane z bazy danych
    fetchProjects();
    fetchMessages();
    fetchStats();
  }, [isAuthenticated, navigate, fetchProjects, fetchMessages, fetchStats]);

  useEffect(() => {
    // Oblicz statystyki po pobraniu danych
    const unreadMessages = messages.filter(m => m.status === 'unread').length;
    const recentProjects = projects.slice(0, 5);
    const recentMessages = messages.slice(0, 5);

    setStats({
      totalProjects: projects.length,
      totalMessages: messages.length,
      unreadMessages,
      recentProjects,
      recentMessages,
    });
  }, [projects, messages]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white dark:text-white light:text-gray-900">Ładowanie...</div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Projekty',
      value: stats.totalProjects,
      icon: FolderOpen,
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/5',
      change: '+12%',
    },
    {
      title: 'Wiadomości',
      value: stats.totalMessages,
      icon: Mail,
      color: 'text-secondary',
      bgColor: 'from-secondary/20 to-secondary/5',
      change: '+8%',
    },
    {
      title: 'Nieprzeczytane',
      value: stats.unreadMessages,
      icon: Eye,
      color: 'text-accent',
      bgColor: 'from-accent/20 to-accent/5',
      change: stats.unreadMessages > 0 ? 'Nowe!' : 'Brak',
    },
    {
      title: 'Odwiedziny',
      value: visitStats ? visitStats.totalVisits.toLocaleString() : '0',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'from-green-400/20 to-green-400/5',
      change: visitStats ? `${visitStats.todayVisits} dzisiaj` : 'Ładowanie...',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-sm dark:bg-white/5 dark:border-white/10 light:bg-white light:border-gray-200 light:shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Dashboard</h1>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Witaj, {user?.email}</p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              {/* Desktop buttons */}
              <div className="hidden md:flex items-center gap-4">
                <Link to="/">
                  <Button variant="outline" size="sm">
                    Zobacz stronę
                  </Button>
                </Link>
                <Link to="/admin/settings">
                  <Button variant="outline" size="sm" icon={Settings}>
                    Ustawienia
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon={LogOut}
                  onClick={handleLogout}
                >
                  Wyloguj
                </Button>
              </div>
              
              {/* Mobile buttons */}
              <div className="flex md:hidden items-center gap-2">
                <Link to="/">
                  <Button variant="outline" size="sm" className="px-2">
                    <Globe className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/admin/settings">
                  <Button variant="outline" size="sm" className="px-2">
                    <Settings className="w-4 h-4" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`p-6 bg-gradient-to-br ${stat.bgColor} border-white/10`}>
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <span className={`text-sm font-medium ${stat.color}`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">{stat.title}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white dark:text-white light:text-gray-900">Najnowsze projekty</h2>
                <Link to="/admin/projects">
                  <Button variant="outline" size="sm" icon={Plus}>
                    Dodaj projekt
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {stats.recentProjects.length > 0 ? (
                  stats.recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg dark:bg-white/5 light:bg-gray-50">
                      <div>
                        <h3 className="font-medium text-white dark:text-white light:text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">{project.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                            Wyróżniony
                          </span>
                        )}
                        <Link to={`/admin/projects/${project.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            Edytuj
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-center py-8">Brak projektów</p>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white dark:text-white light:text-gray-900">Najnowsze wiadomości</h2>
                <Link to="/admin/messages">
                  <Button variant="outline" size="sm" icon={Mail}>
                    Zobacz wszystkie
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {stats.recentMessages.length > 0 ? (
                  stats.recentMessages.map((message) => (
                    <div key={message.id} className="p-3 bg-white/5 rounded-lg dark:bg-white/5 light:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white dark:text-white light:text-gray-900">{message.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded ${
                          message.status === 'unread' 
                            ? 'bg-accent/20 text-accent' 
                            : 'bg-gray-600/20 text-gray-400'
                        }`}>
                          {message.status === 'unread' ? 'Nowa' : 'Przeczytana'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 mb-2">{message.subject}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 light:text-gray-500 truncate">{message.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-center py-8">Brak wiadomości</p>
                )}
              </div>
            </Card>
          </motion.div>
        </div>



        {/* Szczegółowe statystyki odwiedzin */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Statystyki odwiedzin</h2>
          <VisitStats />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;