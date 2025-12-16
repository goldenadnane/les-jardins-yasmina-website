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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t("contact_page.title")}
            </h1>
            <p className="text-lg text-gray-600">
              {t("contact_page.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name" className="mb-2">
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
                      <Label htmlFor="email" className="mb-2">
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
                    <Label htmlFor="phone" className="mb-2">
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

                  <div>
                    <Label htmlFor="message" className="mb-2">
                      {t("contact_page.message")}
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      placeholder={t("contact_page.message_placeholder")}
                      required
                      className="hover:border-primary focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-primary to-primary/80 text-white hover:scale-105 transition-transform duration-300 py-3"
                    size="lg"
                  >
                    {loading ? t("common.loading") : t("contact_page.send")}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Informations de contact */}
            <div className="space-y-6">
              <Card className="p-6 shadow-lg rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-6">
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
                      value: "+212 XXX XXX XXX",
                    },
                    {
                      icon: <Mail className="h-5 w-5 text-primary" />,
                      label: t("contact_page.email"),
                      value: "contact@jardinsyasmina.com",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-semibold mb-1">{item.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">
                  {t("services.reception")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("property.description").substring(0, 150)}...
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AnimatedLayout>
  );
}
