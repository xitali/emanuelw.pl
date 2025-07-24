import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Search,

  Mail,
  MailOpen,
  Trash2,

  Calendar,
  User,
  MessageSquare
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useContactStore, useFilteredMessages } from '../store/contactStore';
import { ContactMessage } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';

type FilterType = 'all' | 'unread' | 'read';

const MessageManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { 
    fetchMessages, 
    markAsRead, 
    markAsUnread, 
    deleteMessage, 
    loading 
  } = useContactStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  
  const filteredMessages = useFilteredMessages(filter);
  
  const searchedMessages = filteredMessages.filter(message => 
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchMessages();
  }, [isAuthenticated, navigate, fetchMessages]);

  const handleMessageClick = async (message: ContactMessage) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      await markAsRead(message.id);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Czy na pewno chcesz usunąć wiadomość od ${name}?`)) {
      await deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleToggleStatus = async (message: ContactMessage) => {
    if (message.status === 'read') {
      await markAsUnread(message.id);
    } else {
      await markAsRead(message.id);
    }
  };

  const filterOptions = [
    { value: 'all', label: 'Wszystkie', count: filteredMessages.length },
    { value: 'unread', label: 'Nieprzeczytane', count: filteredMessages.filter(m => m.status === 'unread').length },
    { value: 'read', label: 'Przeczytane', count: filteredMessages.filter(m => m.status === 'read').length },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm" icon={ArrowLeft}>
                  Powrót
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Zarządzanie wiadomościami</h1>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Przeglądaj i zarządzaj wiadomościami kontaktowymi</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1">
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <Card className="p-4">
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 light:text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Szukaj wiadomości..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-col gap-1">
                  {filterOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFilter(option.value as FilterType)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        filter === option.value
                          ? 'bg-primary/20 text-primary'
                          : 'text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-gray-100'
                      }`}
                    >
                      <span>{option.label}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        filter === option.value
                          ? 'bg-primary/30 text-primary'
                          : 'bg-gray-600/30 text-gray-400'
                      }`}>
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Messages List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-4">
                {loading ? (
                  <div className="text-center py-8 text-gray-400 dark:text-gray-400 light:text-gray-600">Ładowanie wiadomości...</div>
                ) : searchedMessages.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 dark:text-gray-400 light:text-gray-600">
                    {searchTerm ? 'Nie znaleziono wiadomości' : 'Brak wiadomości'}
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {searchedMessages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => handleMessageClick(message)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                          selectedMessage?.id === message.id
                            ? 'bg-primary/10 border-primary/30'
                            : message.status === 'unread'
                            ? 'bg-white/5 border-white/10 hover:bg-white/10'
                            : 'bg-white/2 border-white/5 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {message.status === 'unread' ? (
                              <Mail className="w-4 h-4 text-accent" />
                            ) : (
                              <MailOpen className="w-4 h-4 text-gray-400" />
                            )}
                            <span className={`font-medium text-sm ${
                              message.status === 'unread' ? 'text-white dark:text-white light:text-gray-900' : 'text-gray-300 dark:text-gray-300 light:text-gray-700'
                            }`}>
                              {message.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500">
                            {formatDistanceToNow(new Date(message.created_at), { 
                              addSuffix: true, 
                              locale: pl 
                            })}
                          </span>
                        </div>
                        <p className={`text-sm mb-1 ${
                          message.status === 'unread' ? 'text-gray-300 dark:text-gray-300 light:text-gray-700' : 'text-gray-400 dark:text-gray-400 light:text-gray-600'
                        }`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-500 truncate">
                          {message.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {selectedMessage ? (
                <Card className="p-6">
                  {/* Message Header */}
                  <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-xl font-semibold text-white dark:text-white light:text-gray-900 mb-2">
                        {selectedMessage.subject}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{selectedMessage.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{selectedMessage.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDistanceToNow(new Date(selectedMessage.created_at), { 
                              addSuffix: true, 
                              locale: pl 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded text-sm ${
                        selectedMessage.status === 'unread'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-gray-600/20 text-gray-400'
                      }`}>
                        {selectedMessage.status === 'unread' ? 'Nieprzeczytana' : 'Przeczytana'}
                      </span>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700">Treść wiadomości:</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <Button
                      variant="outline"
                      icon={selectedMessage.status === 'unread' ? MailOpen : Mail}
                      onClick={() => handleToggleStatus(selectedMessage)}
                    >
                      {selectedMessage.status === 'unread' ? 'Oznacz jako przeczytaną' : 'Oznacz jako nieprzeczytaną'}
                    </Button>
                    <Button
                      variant="ghost"
                      icon={Trash2}
                      onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Usuń wiadomość
                    </Button>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      className="ml-auto"
                    >
                      <Button variant="primary">
                        Odpowiedz
                      </Button>
                    </a>
                  </div>
                </Card>
              ) : (
                <Card className="p-12 text-center">
                  <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white dark:text-white light:text-gray-900 mb-2">Wybierz wiadomość</h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                    Kliknij na wiadomość z listy, aby wyświetlić jej szczegóły
                  </p>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageManagement;