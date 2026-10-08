import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, MessageSquare, Send, Calendar, Clock, Code2 } from 'lucide-react';
import { useContact } from '../context/ContactContext';

interface ProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const ProjectRequestModal: React.FC<ProjectRequestModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
}) => {
  const { getWhatsAppUrl, saveCustomerLogin } = useContact();

  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [course, setCourse] = useState('B.Tech CSE');
  const [topic, setTopic] = useState(initialTopic);
  const [deadline, setDeadline] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) return;

    saveCustomerLogin({
      name: studentName.trim(),
      phone: studentPhone.trim(),
      email: `${studentPhone.replace(/\D/g, '')}@student.a3tsolutions.com`,
      role: 'student',
      businessOrCollege: collegeName ? `${collegeName} (${course})` : course,
      projectTitle: topic || `College Project - ${course}`,
      notes: `Target Deadline: ${deadline || 'Flexible'}\nNotes: ${additionalNotes || 'N/A'}`,
    });

    setIsSubmitted(true);
  };

  const getWhatsAppSubmitUrl = () => {
    const text = `Hi A3T Solutions! I would like to request a college project:
- Name: ${studentName || 'Student'}
- Phone: ${studentPhone}
- College: ${collegeName || 'Engineering College'}
- Course: ${course}
- Topic: ${topic || 'Need suggestions from team'}
- Deadline: ${deadline || 'Flexible'}
- Notes: ${additionalNotes || 'Standard Code + Report + PPT'}
Please confirm availability!`;
    return getWhatsAppUrl(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl p-6 sm:p-8 text-left my-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">College Project Submission Desk</h3>
              <p className="text-xs text-slate-400">Directly reviewed by A3T software engineers</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Requirements Received!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                Aryan or one of our co-founders will review your project syllabus and message you within 15 minutes with topic structure and demo slots.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppSubmitUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Confirm on WhatsApp Now</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Contact Number</label>
                <input
                  type="tel"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  placeholder="+91 8976121102"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">College / University Name</label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g. Delhi Technical Campus"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Course & Branch</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="B.Tech CSE">B.Tech Computer Science (CSE)</option>
                  <option value="B.Tech IT">B.Tech Information Tech (IT)</option>
                  <option value="BCA">BCA (Bachelor Computer Apps)</option>
                  <option value="MCA">MCA (Master Computer Apps)</option>
                  <option value="Diploma CS">Polytechnic Diploma CS/IT</option>
                  <option value="BSc/MSc CS">B.Sc / M.Sc Computer Science</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Title / Topic (or Problem Statement)
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. AI-driven attendance or leave empty if you want recommendations"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Submission Deadline</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Next Monday, or 3 days"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Specific College Guidelines / Required Modules
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Mention any specific tech stack (React, Python, Flutter) or college report page count..."
                rows={2}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppSubmitUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-xs font-bold text-center text-white transition-all flex items-center justify-center gap-2 shadow"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Submit & Chat on WhatsApp</span>
              </a>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-center text-white transition-all flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Submit Form Directly</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
