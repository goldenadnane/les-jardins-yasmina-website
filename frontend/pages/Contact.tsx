import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useSupabaseInsert } from '../hooks/useSupabase';
import type { ContactMessage } from '../types';

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { insert, loading } = useSupabaseInsert<ContactMessage>('contact_messages');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await insert({
        name,
        email,
        phone,
        message
      });

      toast({
        title: t('common.success'),
        description: t('contact_page.success_message')
      });

      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: t('common.error'),
        description: t('common.error'),
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('contact_page.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('contact_page.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{t('contact_page.name')}</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t('contact_page.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t('contact_page.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t('contact_page.message')}</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-primary/80"
                  size="lg"
                >
                  {loading ? t('common.loading') : t('contact_page.send')}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">
                {t('contact_page.info_title')}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">
                      {t('contact_page.address')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('contact_page.address_value')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">
                      {t('contact_page.phone')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +212 XXX XXX XXX
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">
                      {t('contact_page.email')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      contact@jardinsyasmina.com
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h3 className="text-xl font-bold mb-4">
                {t('services.reception')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('property.description').substring(0, 150)}...
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
