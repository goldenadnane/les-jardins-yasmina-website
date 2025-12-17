import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useSupabaseInsert } from "../hooks/useSupabase";
import type { ContactMessage } from "../types";
import { AnimatedLayout } from "@/components/layout/AnimatedLayout";

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { insert, loading } =
    useSupabaseInsert<ContactMessage>("contact_messages");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insert({ name, email, phone, message });

      toast({
        title: t("common.success"),
        description: t("contact_page.success_message"),
      });

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: t("common.error"),
        description: t("common.error"),
        variant: "destructive",
      });
    }
  };

  return (
    <AnimatedLayout pageType="contact">
      <div className="min-h-screen pt-32 pb-20 px-4 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          {/* Titre */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-primary/90 bg-clip-text text-transparent">
              {t("contact_page.title")}
            </h1>
            <p className="text-lg text-gray-600">
              {t("contact_page.subtitle")}
            </p>
          </div>

          {/* Grid principale */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Colonne gauche : Formulaire */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <Card className="p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl flex flex-col h-full">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 flex-1 flex flex-col"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name" className="mb-2 text-primary">
                        {t("contact_page.name")}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("contact_page.name_placeholder")}
                        required
                        className="hover:border-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2 text-primary">
                        {t("contact_page.email")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("contact_page.email_placeholder")}
                        required
                        className="hover:border-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="mb-2 text-primary">
                      {t("contact_page.phone")}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t("contact_page.phone_placeholder")}
                      className="hover:border-primary focus:border-primary"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <Label htmlFor="message" className="mb-2 text-primary">
                      {t("contact_page.message")}
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      placeholder={t("contact_page.message_placeholder")}
                      required
                      className="hover:border-primary focus:border-primary resize-none flex-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-auto w-full bg-linear-to-r from-primary to-primary/80 text-white hover:scale-105 transition-transform duration-300 py-3"
                    size="lg"
                  >
                    {loading ? t("common.loading") : t("contact_page.send")}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Colonne droite : Infos + Réception */}
            <div className="space-y-6 flex flex-col h-full">
              <Card className="p-6 shadow-lg rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {t("contact_page.info_title")}
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      icon: <MapPin className="h-5 w-5 text-primary" />,
                      label: t("contact_page.address"),
                      value: t("contact_page.address_value"),
                    },
                    {
                      icon: <Phone className="h-5 w-5 text-primary" />,
                      label: t("contact_page.phone"),
                      value: "+ 212 662170223 / + 212 661089226",
                    },
                    {
                      icon: <Mail className="h-5 w-5 text-primary" />,
                      label: t("contact_page.email"),
                      value: "lesjardinsyasmina@gmail.com",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-semibold mb-1 text-primary">
                          {item.label}
                        </p>
                        <p className="text-sm text-white">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl shadow-sm flex-1">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {t("services.reception")}
                </h3>
                <p className="text-sm text-white">
                  {t("property.description").substring(0, 150)}...
                </p>
              </Card>
            </div>
          </div>

          {/* Map en bas */}
          <Card className="mt-12 overflow-hidden rounded-2xl shadow-2xl border border-primary/20">
            <div className="px-6 py-4 bg-linear-to-r from-primary to-primary/80">
              <h3 className="text-lg font-semibold text-white tracking-wide">
                📍 Localisation
              </h3>
              <p className="text-sm text-white/80">Les Jardins Yasmina</p>
            </div>

            <div className="relative h-96">
              <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition duration-500 pointer-events-none z-10" />

              <iframe
                title="Localisation Les Jardins Yasmina"
                src="https://www.google.com/maps?q=Les%20Jardins%20Yasmina&output=embed"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition duration-700"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="px-6 py-4 bg-white flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Voir l’emplacement exact
              </span>
              <a
                href="https://www.google.com/maps?q=Les+Jardins+Yasmina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Ouvrir sur Google Maps →
              </a>
            </div>
          </Card>
        </div>
      </div>
    </AnimatedLayout>
  );
}
