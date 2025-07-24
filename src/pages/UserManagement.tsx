import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Trash2, 
  ArrowLeft,
  User,
  Shield
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';
import { db } from '../lib/supabase';

interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    
    fetchUsers();
  }, [isAuthenticated, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await db.adminUsers.getAll();
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Błąd podczas pobierania użytkowników');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.email || !newUser.password) {
      toast.error('Wszystkie pola są wymagane');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await db.adminUsers.create({
        email: newUser.email,
        password_hash: newUser.password // W rzeczywistej aplikacji należy zahashować hasło
      });
      
      if (error) throw error;
      
      if (data) {
        setUsers(prev => [...prev, data]);
        setNewUser({ email: '', password: '' });
        setShowAddForm(false);
        toast.success('Użytkownik został dodany!');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Błąd podczas dodawania użytkownika');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string, email: string) => {
    if (window.confirm(`Czy na pewno chcesz usunąć użytkownika "${email}"?`)) {
      try {
        const { error } = await db.adminUsers.delete(id);
        if (error) throw error;
        
        setUsers(prev => prev.filter(user => user.id !== id));
        toast.success('Użytkownik został usunięty!');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Błąd podczas usuwania użytkownika');
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="dark:bg-white/5 light:bg-gray-100 dark:border-white/10 light:border-gray-200 border-b backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm" icon={ArrowLeft}>
                  Powrót
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold dark:text-white light:text-gray-900">Zarządzanie użytkownikami</h1>
                <p className="dark:text-gray-400 light:text-gray-600">Dodawaj, edytuj i zarządzaj użytkownikami administratora</p>
              </div>
            </div>
            <Button 
              variant="primary" 
              icon={Plus}
              onClick={() => setShowAddForm(true)}
            >
              Dodaj użytkownika
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Szukaj użytkowników..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              />
            </div>
            <div className="mt-4 text-sm dark:text-gray-400 light:text-gray-600">
              Znaleziono: {filteredUsers.length} użytkowników
            </div>
          </Card>
        </motion.div>

        {/* Add User Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold dark:text-white light:text-gray-900 mb-4">Dodaj nowego użytkownika</h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 light:text-gray-700 mb-2">
                      Hasło *
                    </label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-4 py-3 dark:bg-white/5 light:bg-white dark:border-white/10 light:border-gray-300 border rounded-lg dark:text-white light:text-gray-900 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="Wprowadź hasło"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="ghost"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewUser({ email: '', password: '' });
                    }}
                  >
                    Anuluj
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Dodawanie...' : 'Dodaj użytkownika'}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Users List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="dark:text-white light:text-gray-900">Ładowanie użytkowników...</div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Card className="p-12">
              <div className="dark:text-gray-400 light:text-gray-600 mb-4">
                {searchTerm 
                  ? 'Nie znaleziono użytkowników spełniających kryteria'
                  : 'Brak użytkowników'
                }
              </div>
              <Button 
                variant="primary" 
                icon={Plus}
                onClick={() => setShowAddForm(true)}
              >
                Dodaj pierwszego użytkownika
              </Button>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold dark:text-white light:text-gray-900">{user.email}</h3>
                        <p className="text-sm dark:text-gray-400 light:text-gray-600">
                          Utworzony: {new Date(user.created_at).toLocaleDateString('pl-PL')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                        <Shield className="w-3 h-3" />
                        Admin
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={Trash2}
                        onClick={() => handleDeleteUser(user.id, user.email)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Usuń
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;