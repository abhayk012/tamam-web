import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/home/Hero";
import EventManagement from "@/components/home/EventManagement";
import Experience from "@/components/home/Experience";
import CateringTransportation from "@/components/home/CateringTransportation";
import OurTeam from "@/components/home/OurTeam";
import OurActivities from "@/components/home/OurActivities";
import AudioVisualServices from "@/components/home/AudioVisualServices";
import OurClients from "@/components/home/OurClients";
import ContactUs from "@/components/home/ContactUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground font-montserrat overflow-hidden relative selection:bg-primary selection:text-black">
      <Navbar />
      <CustomCursor />
      <Hero />
      <EventManagement />
      <Experience />
      <CateringTransportation />
      <OurTeam />
      <OurActivities />
      <AudioVisualServices />
      <OurClients />
      <ContactUs />
      <Footer />
    </main>
  );
}
