import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Video, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import Button from './Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState(user?.user_metadata?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!isOpen) return null;

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = date.getDay();
    return date >= today && day !== 0 && day !== 6;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !name || !email) {
      return;
    }

    setLoading(true);

    try {
      const bookingDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      bookingDateTime.setHours(parseInt(hours), parseInt(minutes));

      const { error } = await supabase
        .from('consultation_bookings')
        .insert({
          user_id: user?.id || null,
          name,
          email,
          phone,
          booking_date: bookingDateTime.toISOString(),
          duration_minutes: 30,
          message,
          status: 'pending'
        });

      if (error) throw error;

      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setSelectedDate(null);
        setSelectedTime('');
        setName(user?.user_metadata?.name || '');
        setEmail(user?.email || '');
        setPhone('');
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Erreur lors de la réservation. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {submitted ? (
          <div className="p-8 text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Réservation confirmée !
            </h2>
            <p className="text-gray-600 mb-2">
              Votre consultation de 30 minutes a été réservée pour :
            </p>
            <p className="text-lg font-semibold text-brand-green mb-4">
              {selectedDate?.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} à {selectedTime}
            </p>
            <p className="text-gray-600">
              Un lien Google Meet vous sera envoyé par email avant le rendez-vous.
            </p>
          </div>
        ) : (
          <>
            <div className="relative bg-gradient-to-r from-brand-green to-brand-sage p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                  <Video className="h-8 w-8 text-brand-green" />
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  Consultation gratuite (30 min)
                </h2>
                <p className="text-green-100">
                  Réservez votre créneau avec un expert via Google Meet
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-brand-green" />
                    Choisir une date
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        onClick={handlePreviousMonth}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        ←
                      </button>
                      <h4 className="font-semibold text-gray-900">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </h4>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        →
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {dayNames.map(day => (
                        <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square" />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1;
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        const available = isDateAvailable(date);
                        const selected = selectedDate?.getDate() === day &&
                          selectedDate?.getMonth() === currentMonth.getMonth() &&
                          selectedDate?.getFullYear() === currentMonth.getFullYear();

                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => handleDateSelect(day)}
                            disabled={!available}
                            className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                              selected
                                ? 'bg-brand-green text-white'
                                : available
                                ? 'bg-white hover:bg-brand-green/10 text-gray-900'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                      Les consultations sont disponibles du lundi au vendredi
                    </p>
                  </div>

                  {selectedDate && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-brand-green" />
                        Choisir un horaire
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                              selectedTime === time
                                ? 'bg-brand-green text-white'
                                : 'bg-white border border-gray-300 hover:border-brand-green text-gray-700'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Vos informations
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet de la consultation
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        placeholder="Décrivez brièvement ce que vous souhaitez aborder..."
                      />
                    </div>

                    {selectedDate && selectedTime && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">
                          Récapitulatif
                        </h4>
                        <p className="text-sm text-green-800">
                          <strong>Date :</strong> {selectedDate.toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-green-800">
                          <strong>Heure :</strong> {selectedTime}
                        </p>
                        <p className="text-sm text-green-800">
                          <strong>Durée :</strong> 30 minutes
                        </p>
                        <p className="text-sm text-green-800">
                          <strong>Format :</strong> Google Meet (lien envoyé par email)
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      loading={loading}
                      disabled={!selectedDate || !selectedTime || !name || !email}
                    >
                      <Video className="h-5 w-5 mr-2" />
                      Confirmer la réservation
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
