import Hero from "@/components/home/Hero";
import EventManagement from "@/components/home/EventManagement";
import Experience from "@/components/home/Experience";
import CateringTransportation from "@/components/home/CateringTransportation";
import OurTeam from "@/components/home/OurTeam";
import OurActivities from "@/components/home/OurActivities";
import AudioVisualServices from "@/components/home/AudioVisualServices";
import OurClients from "@/components/home/OurClients";
import ContactUs from "@/components/home/ContactUs";

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground font-montserrat overflow-hidden">
      <Hero />
      <EventManagement />
      <Experience />
      <CateringTransportation />
      <OurTeam />
      <OurActivities />
      <AudioVisualServices />
      <OurClients />
      <ContactUs />
    </main>
  );
}

