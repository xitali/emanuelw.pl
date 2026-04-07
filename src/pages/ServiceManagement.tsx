import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Settings,
  DollarSign,
  Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';
import { db } from '../lib/turso';

interface Service {
  id: string;
  title: string;
  description: string;
  short_description: string;
  icon: string;
  features: string[];
  price_from?: number;
  price_currency: string;
  active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface ServiceFormData {
  title: string;
  description: string;
  short_description: string;
  icon: string;
  features: string;
  price_from: string;
  price_currency: string;
  active: boolean;
  order_index: string;
}

const ServiceManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    short_description: '',
    icon: '',
    features: '',
    price_from: '',
    price_currency: 'PLN',
    active: true,
    order_index: '0'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    
    fetchServices();
  }, [isAuthenticated, navigate]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await db.services.getAll();
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Błąd podczas pobierania usług');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      short_description: '',
      icon: '',
      features: '',
      price_from: '',
      price_currency: 'PLN',
      active: true,
      order_index: '0'
    });
    setEditingService(null);
    setShowAddForm(false);
  };

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      short_description: service.short_description,
      icon: service.icon,
      features: service.features.join('\n'),
      price_from: (service.price_from ?? 0).toString(),
      price_currency: service.price_currency,
      active: service.active,
      order_index: service.order_index.toString()
    });
    setEditingService(service);
    setShowAddForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Tytuł i opis są wymagane');
      return;
    }

    setIsSubmitting(true);
    try {
      const serviceData = {
        title: formData.title,
        description: formData.description,
        short_description: formData.short_description,
        icon: formData.icon,
        features: formData.features.split('\n').filter(f => f.trim() !== ''),
        price_from: parseFloat(formData.price_from) || 0,
        price_currency: formData.price_currency,
        active: formData.active,
        order_index: parseInt(formData.order_index) || 0
      };

      if (editingService) {
        const { error } = await db.services.update(editingService.id, serviceData);
        if (error) throw error;
        
        // Refresh services list after update
        const { data: updatedServices, error: fetchError } = await db.services.getAll();
        if (fetchError) throw fetchError;
        setServices(updatedServices || []);
        toast.success('Usługa została zaktualizowana!');
      } else {
        const { data, error } = await db.services.create(serviceData);
        if (error) throw error;
        
        if (data) {
          setServices(prev => [...prev, data]);
          toast.success('Usługa została dodana!');
        }
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Błąd podczas zapisywania usługi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Czy na pewno chcesz usunąć usługę "${title}"?`)) {
      try {
        const { error } = await db.services.delete(id);
        if (error) throw error;
        
        setServices(prev => prev.filter(service => service.id !== id));
        toast.success('Usługa została usunięta!');
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Błąd podczas usuwania usługi');
      }
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await db.services.update(id, { active: !currentActive });
      if (error) throw error;
      
      setServices(prev => prev.map(s => 
        s.id === id ? { ...s, active: !currentActive, updated_at: new Date().toISOString() } : s
      ));
      toast.success(`Usługa została ${!currentActive ? 'aktywowana' : 'dezaktywowana'}!`);
    } catch (error) {
      console.error('Error toggling service status:', error);
      toast.error('Błąd podczas zmiany statusu usługi');
    }
  };

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.short_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/5 dark:bg-white/5 light:bg-white border-b border-white/10 dark:border-white/10 light:border-gray-200 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm" icon={ArrowLeft}>
                  Powrót
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Zarządzanie usługami</h1>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Dodawaj, edytuj i zarządzaj swoimi usługami</p>
              </div>
            </div>
            <Button 
              variant="primary" 
              icon={Plus}
              onClick={() => setShowAddForm(true)}
            >
              Dodaj usługę
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 light:text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Szukaj usług..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              />
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
              <span>Znaleziono: {filteredServices.length} usług</span>
              <span>•</span>
              <span>Aktywne: {filteredServices.filter(s => s.active).length}</span>
            </div>
          </Card>
        </motion.div>

        {/* Add/Edit Service Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-4">
                {editingService ? 'Edytuj usługę' : 'Dodaj nową usługę'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                      Tytuł *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="Nazwa usługi"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                      Ikona
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="Nazwa ikony Lucide (np. Code)"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                    Krótki opis
                  </label>
                  <input
                    type="text"
                    value={formData.short_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="Krótki opis usługi"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                    Opis *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                    placeholder="Szczegółowy opis usługi"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                    Funkcje (jedna na linię)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                    placeholder="Responsywny design\nOptymalizacja SEO\nIntegracja z API"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                      Cena od
                    </label>
                    <input
                      type="number"
                      value={formData.price_from}
                      onChange={(e) => setFormData(prev => ({ ...prev, price_from: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="1000"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                      Waluta
                    </label>
                    <select
                      value={formData.price_currency}
                      onChange={(e) => setFormData(prev => ({ ...prev, price_currency: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    >
                      <option value="PLN" className="bg-gray-800 dark:bg-gray-800 light:bg-white">PLN</option>
                      <option value="EUR" className="bg-gray-800 dark:bg-gray-800 light:bg-white">EUR</option>
                      <option value="USD" className="bg-gray-800 dark:bg-gray-800 light:bg-white">USD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                      Kolejność
                    </label>
                    <input
                      type="number"
                      value={formData.order_index}
                      onChange={(e) => setFormData(prev => ({ ...prev, order_index: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                      className="w-4 h-4 text-primary bg-white/5 border-white/10 rounded focus:ring-primary/50 focus:ring-2"
                    />
                    <span className="text-white dark:text-white light:text-gray-900">Usługa aktywna</span>
                  </label>
                </div>
                
                <div className="flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="ghost"
                    onClick={resetForm}
                  >
                    Anuluj
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Zapisywanie...' : editingService ? 'Zaktualizuj' : 'Dodaj usługę'}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Services List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-white dark:text-white light:text-gray-900">Ładowanie usług...</div>
          </div>
        ) : filteredServices.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Card className="p-12">
              <div className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">
                {searchTerm 
                  ? 'Nie znaleziono usług spełniających kryteria'
                  : 'Brak usług'
                }
              </div>
              <Button 
                variant="primary" 
                icon={Plus}
                onClick={() => setShowAddForm(true)}
              >
                Dodaj pierwszą usługę
              </Button>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{service.title}</h3>
                        <p className="text-sm text-gray-400">{service.short_description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-1 text-xs rounded ${
                        service.active 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {service.active ? 'Aktywna' : 'Nieaktywna'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{service.description}</p>
                  
                  {service.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-white mb-2">Funkcje:</h4>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                        {service.features.length > 3 && (
                          <li>• i {service.features.length - 3} więcej...</li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-primary">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">
                        od {service.price_from} {service.price_currency}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>#{service.order_index}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      icon={Edit}
                      onClick={() => handleEdit(service)}
                    >
                      Edytuj
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleToggleActive(service.id, service.active)}
                      className={service.active ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}
                    >
                      {service.active ? 'Dezaktywuj' : 'Aktywuj'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={Trash2}
                      onClick={() => handleDelete(service.id, service.title)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Usuń
                    </Button>
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

export default ServiceManagement;