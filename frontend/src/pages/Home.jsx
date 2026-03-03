import React, { useEffect, useState } from "react";
import {
  Building2,
  Wrench,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Shield,
  Clock,
  TrendingUp,
  Zap,
  Users,
} from "lucide-react";
import axios from "axios";
import logo from "../assets/logo.png";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    buildingName: "",
    numberOfFlats: "",
    location: "",
    preferredDate: "",
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (y > lastScrollY && y > 100) setShowNavbar(false);
      else setShowNavbar(true);

      setLastScrollY(y);
      setIsScrolled(y > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleInputChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        numberOfFlats: Number(formData.numberOfFlats),
      };

      const res = await axios.post(`${BACKEND_URL}/api/contact`, payload);

      alert(res.data?.message || "Submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        buildingName: "",
        numberOfFlats: "",
        location: "",
        preferredDate: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error?.response?.data?.detail || "Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="REVIVO Logo" className="h-16 w-auto" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-slate-700 hover:text-[#2B4C7E] transition-colors font-medium">
              About
            </a>
            <a href="#services" className="text-slate-700 hover:text-[#2B4C7E] transition-colors font-medium">
              Services
            </a>
            <a href="#pricing" className="text-slate-700 hover:text-[#2B4C7E] transition-colors font-medium">
              Pricing
            </a>
            <a href="#contact" className="text-slate-700 hover:text-[#2B4C7E] transition-colors font-medium">
              Contact
            </a>

            <button
              onClick={scrollToContact}
              className="bg-[#0D9488] hover:bg-[#0f766e] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
  src="https://images.unsplash.com/photo-1650160500393-4bbfa796a961?auto=format&fit=crop&w=1600&q=80"
  alt="Well-maintained Community"
  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B4C7E]/95 via-[#2B4C7E]/85 to-[#2B4C7E]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            We Manage,<br />
            <span className="text-[#0D9488]">You Relax.</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-gray-100 max-w-3xl mx-auto leading-relaxed">
            At REVIVO, we take care of your entire building — operations and maintenance —
            so residents and owners can live stress-free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToContact}
              className="bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold px-8 py-5 text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center"
            >
              Get a Free Quote
              <ArrowRight className="ml-2" />
            </button>

            <button
              onClick={scrollToContact}
              className="border-2 border-white text-white hover:bg-white hover:text-[#2B4C7E] font-bold px-8 py-5 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
            >
              Book a Site Visit
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </div>
      </section>

{/* ABOUT */}
<section id="about" className="py-24 bg-gradient-to-b from-white to-slate-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#2B4C7E] mb-6">
        Who We Are
      </h2>
      <div className="w-24 h-1 bg-[#0D9488] mx-auto" />
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <p className="text-lg text-slate-700 leading-relaxed">
          REVIVO is a modern facility management company focused on complete building care.
          We specialize in managing residential apartments and small to mid-sized communities
          with professionalism, transparency, and reliability.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#0D9488]">
          <h3 className="text-2xl font-bold text-[#2B4C7E] mb-4">
            Our Mission
          </h3>

          <div className="space-y-3">
            {["Smooth operations", "Well-maintained infrastructure", "Hassle-free living"].map(
              (t) => (
                <div key={t} className="flex items-center gap-3">
                  <CheckCircle className="text-[#0D9488] w-6 h-6" />
                  <span className="text-slate-700 font-medium">{t}</span>
                </div>
              )
            )}
          </div>
        </div>

        <p className="text-lg text-slate-700 font-semibold">
          We ensure your property runs efficiently every single day.
        </p>
      </div>

      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1650160500393-4bbfa796a961?auto=format&fit=crop&w=1600&q=80"
          alt="Well-maintained Community"
          className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
        />

        <div className="absolute -bottom-6 -right-6 bg-[#0D9488] text-white p-8 rounded-2xl shadow-xl">
          <Building2 className="w-12 h-12 mb-2" />
          <p className="font-bold text-2xl">Professional</p>
          <p className="text-sm">Management</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2B4C7E] mb-6">Our Services</h2>
            <div className="w-24 h-1 bg-[#0D9488] mx-auto mb-4" />
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive building management solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border-2 hover:border-[#0D9488] shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="bg-[#2B4C7E]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-[#2B4C7E]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2B4C7E] mb-4">Complete Building Management</h3>
              <ul className="space-y-3 text-slate-700">
                {[
                  "Day-to-day operations management",
                  "Vendor coordination",
                  "Utility monitoring (water, electricity, DG)",
                  "AMC tracking & compliance",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0D9488] mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-2xl border-2 hover:border-[#0D9488] shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="bg-[#2B4C7E]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8 text-[#2B4C7E]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2B4C7E] mb-4">Maintenance & Repairs</h3>
              <ul className="space-y-3 text-slate-700">
                {[
                  "Electrical maintenance coordination",
                  "Plumbing support",
                  "Lift coordination",
                  "Preventive maintenance scheduling",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0D9488] mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2B4C7E] mb-6">
              Transparent & Simple Pricing
            </h2>
            <div className="w-24 h-1 bg-[#0D9488] mx-auto" />
          </div>

          <div className="p-12 rounded-3xl shadow-2xl border-2 border-[#0D9488]/20 bg-white">
            <div className="text-center mb-8">
              <div className="text-5xl md:text-6xl font-black text-[#2B4C7E] mb-4">₹2,499 – ₹4,999</div>
              <p className="text-xl text-slate-600">per flat (monthly)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h4 className="font-bold text-[#2B4C7E] mb-3">Pricing depends on:</h4>
                <ul className="space-y-2 text-slate-700">
                  {["Total number of flats", "Building size & infrastructure", "Services required", "Maintenance complexity"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#0D9488] rounded-full" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0D9488]/10 p-6 rounded-2xl border-2 border-[#0D9488]">
                <h4 className="font-bold text-[#2B4C7E] mb-3">Our Promise:</h4>
                <ul className="space-y-2 text-slate-700">
                  {["No hidden charges", "Custom packages available", "Flexible payment terms"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0D9488]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={scrollToContact}
                className="bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold px-10 py-5 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Book a Free Inspection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24 bg-[#2B4C7E] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Why Choose REVIVO?</h2>
            <div className="w-24 h-1 bg-[#0D9488] mx-auto mb-4" />
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              We don't just manage buildings. We maintain standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Structured Management System", desc: "Organized processes for every aspect of building management" },
              { icon: TrendingUp, title: "Transparent Pricing", desc: "Clear, upfront costs with no hidden surprises" },
              { icon: Zap, title: "Quick Issue Resolution", desc: "Fast response times to keep your building running smoothly" },
              { icon: Users, title: "Dedicated Oversight", desc: "Committed team focused on your property’s needs" },
              { icon: Clock, title: "Preventive Maintenance", desc: "Proactive approach to avoid costly repairs" },
              { icon: TrendingUp, title: "Long-Term Property Value", desc: "Strategies to preserve and enhance your investment" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <item.icon className="w-12 h-12 text-[#0D9488] mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2B4C7E] mb-6">How It Works</h2>
            <div className="w-24 h-1 bg-[#0D9488] mx-auto mb-4" />
            <p className="text-xl text-slate-600">Get started immediately</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "1", title: "Book a Site Visit", desc: "Schedule a convenient time for our team to visit your property" },
              { num: "2", title: "Inspection & Proposal", desc: "We assess your needs and create a customized management plan" },
              { num: "3", title: "Agreement & Setup", desc: "Sign the agreement and we prepare for seamless transition" },
              { num: "4", title: "Full Management Begins", desc: "Your building is now professionally managed by REVIVO" },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#2B4C7E] to-[#0D9488] rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-[#2B4C7E] mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#0D9488] to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2B4C7E] mb-6">Book a Free Site Visit</h2>
            <div className="w-24 h-1 bg-[#0D9488] mx-auto mb-4" />
            <p className="text-xl text-slate-600">
              Let's discuss how REVIVO can transform your building management
            </p>
          </div>

          <div className="p-10 rounded-3xl shadow-2xl bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[#0D9488]/10 focus:border-[#0D9488]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Your contact number"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[#0D9488]/10 focus:border-[#0D9488]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[#0D9488]/10 focus:border-[#0D9488]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Building Name *</label>
                  <input
                    name="buildingName"
                    value={formData.buildingName}
                    onChange={handleInputChange}
                    required
                    placeholder="Building/Society name"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[#0D9488]/10 focus:border-[#0D9488]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Flats *</label>
                  <input
                    type="number"
                    name="numberOfFlats"
                    value={formData.numberOfFlats}
                    onChange={handleInputChange}
                    required
                    placeholder="Total flats"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[#0D9488]/10 focus:border-[#0D9488]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Location *</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="City/Area"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[#0D9488]/10 focus:border-[#0D9488]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Visit Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[#0D9488]/10 focus:border-[#0D9488]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0D9488] hover:bg-[#0f766e] text-white font-extrabold py-5 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
              >
                Submit Request
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-slate-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-semibold">Phone</p>
                    <a href="tel:6362533067" className="text-[#2B4C7E] font-bold hover:text-[#0D9488]">
                      6362533067
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0D9488]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-semibold">Email</p>
                    <a href="mailto:revivoFM@gmail.com" className="text-[#2B4C7E] font-bold hover:text-[#0D9488]">
                      revivoFM@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-4 bg-slate-50 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-[#0D9488]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#0D9488]" />
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-semibold mb-2">Office Address</p>
                  <p className="text-[#2B4C7E] font-extrabold mb-1">REVIVO FACILITY MANAGEMENT</p>
                  <p className="text-slate-700">18/7, Salaeh Center, Unit 201, 2nd Floor</p>
                  <p className="text-slate-700">Cunningham Road, Vasanthnagar</p>
                  <p className="text-slate-700">Bangalore - 560052</p>
                  <p className="text-[#0D9488] font-semibold mt-2">Landmark: 3rd Wave Cafe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (full, like original) */}
      <footer className="bg-[#2B4C7E] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={logo} alt="REVIVO Logo" className="h-24 w-auto mb-4" />
              <p className="text-gray-300 mb-3">Complete Facility Management Services</p>
              <div className="flex items-start gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-[#0D9488] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">REVIVO FACILITY MANAGEMENT</p>
                  <p>18/7, Salaeh Center, Unit 201, 2nd Floor</p>
                  <p>Cunningham Road, Vasanthnagar</p>
                  <p>Bangalore - 560052</p>
                  <p className="text-[#0D9488] mt-1">Landmark: 3rd Wave Cafe</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-300 hover:text-[#0D9488]">About Us</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-[#0D9488]">Services</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-[#0D9488]">Pricing</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-[#0D9488]">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#0D9488]" />
                  <a href="tel:6362533067" className="text-gray-300 hover:text-[#0D9488]">
                    6362533067
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#0D9488]" />
                  <a href="mailto:revivoFM@gmail.com" className="text-gray-300 hover:text-[#0D9488]">
                    revivoFM@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-gray-300">
            <p>&copy; 2024 REVIVO. All rights reserved. We Manage, You Relax.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}