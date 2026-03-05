import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Trash2, Plus, Edit2, X } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const API_URL = 'http://localhost:5000/tasks';

// Utility for clean tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingTask) {
        const res = await axios.put(`${API_URL}/${editingTask._id}`, { title, description });
        setTasks(tasks.map(t => t._id === editingTask._id ? res.data : t));
      } else {
        const res = await axios.post(API_URL, { title, description });
        setTasks([res.data, ...tasks]);
      }
      closeForm();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      const res = await axios.put(`${API_URL}/${task._id}`, { status: newStatus });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
    setTitle('');
    setDescription('');
  };

  // UI rendering
  return (
    <div className="min-h-screen relative p-4 md:p-8 flex flex-col items-center overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 md:rounded-b-[100px] shadow-2xl opacity-90 z-0"></div>

      <div className="w-full max-w-3xl z-10">
        <header className="flex justify-between items-center mb-10 mt-8 text-white">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md">TaskFlow</h1>
            <p className="opacity-90 mt-1 font-medium">Manage your daily goals elegantly.</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="group flex items-center gap-2 bg-white text-indigo-600 px-5 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">New Task</span>
          </button>
        </header>

        <main className="bg-white/80 backdrop-blur-xl border border-white flex flex-col shadow-2xl rounded-3xl p-6 md:p-8 min-h-[500px]">
          {loading ? (
            <div className="flex flex-1 justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center h-64 text-slate-400">
              <div className="w-24 h-24 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <CheckCircle2 size={48} className="text-slate-300" />
              </div>
              <p className="text-lg font-medium text-slate-500">No tasks yet.</p>
              <p className="text-sm mt-1">Click "New Task" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {tasks.map((task) => (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    layout
                    className={cn(
                      "group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300",
                      task.status === 'Completed'
                        ? "bg-slate-50/60 border-slate-200"
                        : "bg-white border-slate-100 shadow-sm hover:shadow-md"
                    )}
                  >
                    <button
                      onClick={() => toggleStatus(task)}
                      className="mt-1 flex-shrink-0 text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                    >
                      {task.status === 'Completed' ? (
                        <CheckCircle2 size={26} className="text-emerald-500 drop-shadow-sm" fill="#ecfdf5" />
                      ) : (
                        <Circle size={26} className="text-slate-300 hover:text-indigo-500" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <h3 className={cn(
                        "text-lg font-semibold transition-all duration-300",
                        task.status === 'Completed' ? "text-slate-400 line-through" : "text-slate-800"
                      )}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={cn(
                          "mt-1 text-sm line-clamp-3",
                          task.status === 'Completed' ? "text-slate-400 line-through" : "text-slate-500"
                        )}>
                          {task.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-3 text-xs font-medium text-slate-400">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full border",
                          task.status === 'Completed' ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-amber-50 border-amber-200 text-amber-700"
                        )}>
                          {task.status}
                        </span>
                        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditForm(task)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                        aria-label="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>
                <button
                  onClick={closeForm}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1.5">Task Title *</label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., Finish the presentation"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                    autoFocus
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1.5">Description (Optional)</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add more details about this task..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-800 placeholder:text-slate-400 resize-none"
                  />
                </div>

                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="flex-1 px-5 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!title.trim()}
                    className="flex-1 px-5 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-600/20"
                  >
                    {editingTask ? 'Save Changes' : 'Create Task'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
