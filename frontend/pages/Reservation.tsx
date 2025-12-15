import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Calendar, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useSupabaseInsert } from '../hooks/useSupabase';
import type { Reservation } from '../types';

export default function ReservationPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { insert, loading } = useSupabaseInsert<Reservation>('reservations');

  const initialState = location.state || {};
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState(initialState.checkIn || '');
  const [checkOut, setCheckOut] = useState(initialState.checkOut || '');
  const [adults, setAdults] = useState(initialState.adults || 2);
  const [children, setChildren] = useState(initialState.children || 0);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      await insert({
        check_in: checkIn,
        check_out: checkOut,
        adults,
        children,
        room_id: '1',
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone,
        special_requests: specialRequests
      });

      setConfirmed(true);
      setStep(3);

      toast({
        title: t('common.success'),
        description: t('reservation_page.confirmation_message')
      });
    } catch (error) {
      console.error('Reservation error:', error);
      toast({
        title: t('common.error'),
        description: t('common.error'),
        variant: 'destructive'
      });
    }
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const pricePerNight = 120;
  const total = nights * pricePerNight;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('reservation_page.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('reservation_page.subtitle')}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s < 3 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    s <= step
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      s < step ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm">{t('reservation_page.step1')}</span>
            <span className="text-sm">{t('reservation_page.step2')}</span>
            <span className="text-sm">{t('reservation_page.step3')}</span>
          </div>
        </div>

        {confirmed ? (
          <Card className="p-8 md:p-12 text-center">
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 text-primary mx-auto" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {t('reservation_page.booking_confirmed')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('reservation_page.confirmation_message')}
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-primary to-primary/80"
            >
              {t('reservation_page.back_to_home')}
            </Button>
          </Card>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="p-6 md:p-8">
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="check-in"
                            className="flex items-center gap-2 mb-2"
                          >
                            <Calendar className="h-4 w-4" />
                            {t('reservation_widget.check_in')}
                          </Label>
                          <Input
                            id="check-in"
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="check-out"
                            className="flex items-center gap-2 mb-2"
                          >
                            <Calendar className="h-4 w-4" />
                            {t('reservation_widget.check_out')}
                          </Label>
                          <Input
                            id="check-out"
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="adults"
                            className="flex items-center gap-2 mb-2"
                          >
                            <Users className="h-4 w-4" />
                            {t('common.adults')}
                          </Label>
                          <Input
                            id="adults"
                            type="number"
                            min="1"
                            max="10"
                            value={adults}
                            onChange={(e) => setAdults(Number(e.target.value))}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="children" className="mb-2 block">
                            {t('common.children')}
                          </Label>
                          <Input
                            id="children"
                            type="number"
                            min="0"
                            max="10"
                            value={children}
                            onChange={(e) =>
                              setChildren(Number(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold">
                        {t('reservation_page.guest_info')}
                      </h3>

                      <div>
                        <Label htmlFor="name">
                          {t('reservation_page.name')}
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">
                          {t('reservation_page.email')}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">
                          {t('reservation_page.phone')}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="requests">
                          {t('reservation_page.special_requests')}
                        </Label>
                        <Textarea
                          id="requests"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 mt-8">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                        className="flex-1"
                      >
                        {t('common.back')}
                      </Button>
                    )}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80"
                    >
                      {step === 1
                        ? t('common.continue')
                        : loading
                          ? t('common.loading')
                          : t('reservation_page.confirm_booking')}
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-6">
                    {t('reservation_widget.title')}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t('reservation_widget.check_in')}
                      </span>
                      <span className="font-medium">
                        {checkIn
                          ? format(new Date(checkIn), 'MMM dd, yyyy')
                          : '-'}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t('reservation_widget.check_out')}
                      </span>
                      <span className="font-medium">
                        {checkOut
                          ? format(new Date(checkOut), 'MMM dd, yyyy')
                          : '-'}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t('common.guests')}
                      </span>
                      <span className="font-medium">
                        {adults + children}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {nights} {t('reservation_widget.nights')}
                      </span>
                      <span className="font-medium">
                        €{pricePerNight} × {nights}
                      </span>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>{t('reservation_widget.total')}</span>
                        <span className="text-primary">€{total}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
