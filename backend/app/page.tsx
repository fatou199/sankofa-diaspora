import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />

    </main>
  );
}
