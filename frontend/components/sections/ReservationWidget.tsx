import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ReservationWidget() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/reservation', {
      state: { checkIn, checkOut, adults, children }
    });
  };

  return (
    <Card className="p-6 bg-card/95 backdrop-blur-sm border-border shadow-xl">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        {t('reservation_widget.title')}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="check-in" className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              {t('reservation_widget.check_in')}
            </Label>
            <Input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="check-out" className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              {t('reservation_widget.check_out')}
            </Label>
            <Input
              id="check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="adults" className="flex items-center gap-2 mb-2">
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
              onChange={(e) => setChildren(Number(e.target.value))}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity"
          size="lg"
        >
          {t('common.book_now')}
        </Button>
      </form>
    </Card>
  );
}
