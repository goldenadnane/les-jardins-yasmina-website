import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ReservationWidget() {
  const { t } = useTranslation();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState<number[]>([]);

  const handleChildAgeChange = (index: number, value: number) => {
    const newAges = [...childAges];
    newAges[index] = value;
    setChildAges(newAges);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dayCount =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);

    const searchObj = {
      checkin_date: checkIn,
      checkout_date: checkOut,
      day_count: dayCount,
      room_count: 1,
      total_adult: adults,
      total_child: children,
      rooms: [
        {
          adult_count: adults,
          guest_count: adults + children,
          child_count: children,
          child_ages: childAges,
        },
      ],
      guest_rooms: {
        "0": {
          adult_count: adults,
          guest_count: adults + children,
          child_count: children,
          child_ages: childAges,
        },
      },
    };

    const url = `https://les-jardins-yasmina.hotelrunner.com/bv3/search?search=${encodeURIComponent(
      JSON.stringify(searchObj)
    )}`;

    window.location.href = url;
  };

  return (
    <Card className="p-6 bg-foreground backdrop-blur-sm border-black shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <h3 className="text-2xl font-bold mb-6 text-primary font-montserrat">
        {t("reservation_widget.title")}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="check-in"
              className="flex items-center gap-2 mb-2 text-black"
            >
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-semibold">
                {t("reservation_widget.check_in")}
              </span>
            </Label>
            <Input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full bg-input text-black border-black hover:border-primary focus:border-primary transition-colors"
            />
          </div>

          <div>
            <Label
              htmlFor="check-out"
              className="flex items-center gap-2 mb-2 text-black"
            >
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-semibold">
                {t("reservation_widget.check_out")}
              </span>
            </Label>
            <Input
              id="check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full bg-input text-black border-black hover:border-primary focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Adultes et enfants */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="adults"
              className="flex items-center gap-2 mb-2 text-black"
            >
              <Users className="h-4 w-4 text-primary" />
              <span className="font-semibold">{t("common.adults")}</span>
            </Label>
            <Input
              id="adults"
              type="number"
              min={1}
              max={10}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              required
              className="bg-input text-black border-black hover:border-primary focus:border-primary transition-colors"
            />
          </div>

          <div>
            <Label
              htmlFor="children"
              className="mb-2 block text-black font-semibold"
            >
              {t("common.children")}
            </Label>
            <Input
              id="children"
              type="number"
              min={0}
              max={10}
              value={children}
              onChange={(e) => {
                const newVal = Number(e.target.value);
                setChildren(newVal);
                setChildAges(Array(newVal).fill(1));
              }}
              className="bg-input text-black border-black hover:border-primary focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Sélection de l'âge des enfants */}
        {children > 0 && (
          <div className="space-y-4">
            {Array.from({ length: children }, (_, i) => (
              <div key={i}>
                <Label className="mb-2 block text-black font-semibold">
                  {t("reservation_widget.child_age", { index: i + 1 })}
                </Label>
                <select
                  value={childAges[i]}
                  onChange={(e) =>
                    handleChildAgeChange(i, Number(e.target.value))
                  }
                  className="w-full rounded-md p-2 bg-input text-black border border-black hover:border-primary focus:border-primary transition-colors"
                  required
                >
                  {Array.from({ length: 10 }, (_, age) => (
                    <option key={age + 1} value={age + 1}>
                      {age + 1} {t("common.years")}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity font-semibold py-3"
          size="lg"
        >
          {t("common.book_now")}
        </Button>
      </form>
    </Card>
  );
}
