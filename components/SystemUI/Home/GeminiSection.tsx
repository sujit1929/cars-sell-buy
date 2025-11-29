"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu, X, Search, MapPin,
    ArrowRight, Star, Shield, Zap, Flame, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ThemeToggle";

// --- Types & Interfaces ---
interface CarModel {
    id: string;
    name: string;
    category: "Sedan" | "SUV" | "Performance" | "Electric";
    price: string;
    power: string;
    acceleration: string;
    image: string;
    tags?: string[]; // Added tags for "New", "Best Seller"
}

interface NavItem {
    label: string;
    href: string;
}

// --- Mock Data ---
const NAV_LINKS: NavItem[] = [
    { label: "Models", href: "#models" },
    { label: "Electric", href: "#electric" },
    { label: "Buy Online", href: "#buy" },
    { label: "Consulting", href: "#consulting" },
    { label: "Services", href: "#services" },
];

const CAR_DATA: CarModel[] = [
    {
        id: "1",
        name: "L-Class Sedan",
        category: "Sedan",
        price: "From ₹ 55.00 Lakh",
        power: "190 kW",
        acceleration: "6.0s",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop",
        tags: ["Best Seller"]
    },
    {
        id: "2",
        name: "EQS Electric",
        category: "Electric",
        price: "From ₹ 1.60 Cr",
        power: "385 kW",
        acceleration: "4.3s",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop",
        tags: ["New Arrival", "Electric"]
    },
    {
        id: "3",
        name: "G-Wagon Beast",
        category: "SUV",
        price: "From ₹ 2.55 Cr",
        power: "430 kW",
        acceleration: "4.5s",
        image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=1000&auto=format&fit=crop",
        tags: ["Top Bought"]
    },
    {
        id: "4",
        name: "AMG GT",
        category: "Performance",
        price: "From ₹ 2.70 Cr",
        power: "470 kW",
        acceleration: "3.2s",
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop",
        tags: ["Performance"]
    },
    {
        id: "5",
        name: "GLS SUV",
        category: "SUV",
        price: "From ₹ 1.30 Cr",
        power: "243 kW",
        acceleration: "6.1s",
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop",
        tags: ["Family Choice"]
    }
];

// --- Utility Components ---

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-2">{title}</h2>
        {subtitle && <p className="text-slate-600 max-w-2xl text-sm md:text-base font-light">{subtitle}</p>}
    </div>
);

// --- Sub-Components ---

const CarCard = ({ car }: { car: CarModel }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="group relative bg-white min-w-[300px] md:min-w-[350px] rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
        {/* Image Area */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
            <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Tags Overlay */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
                {car.tags?.includes("New Arrival") && (
                    <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1">
                        <Clock size={10} /> Just Added
                    </span>
                )}
                {car.tags?.includes("Best Seller") && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1">
                        <Flame size={10} /> Top Choice
                    </span>
                )}
                {car.tags?.includes("Top Bought") && (
                    <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1">
                        <Star size={10} /> Most Popular
                    </span>
                )}
            </div>
        </div>

        {/* Content Area */}
        <div className="p-5">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#00adef] transition-colors">
                        {car.name}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{car.category}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">{car.price}</p>
                </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 my-4 py-3 border-t border-gray-100">
                <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#00adef]" /> {car.power}
                </span>
                <span className="flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-[#00adef]" /> {car.acceleration}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full text-xs h-9">Configure</Button>
                <Button className="w-full text-xs h-9 bg-black hover:bg-slate-800 text-white">Details</Button>
            </div>
        </div>
    </motion.div>
);

// --- Main Layout Components ---

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-black text-white py-4" : "bg-linear-to-b from-black/80 to-transparent text-white py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer z-50">
                    <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">
                        <span className="text-xs font-serif">M</span>
                    </div>
                    <span className="font-serif tracking-widest text-lg hidden sm:block">MERCEDES-BENZ</span>
                </div>

                <nav className="hidden lg:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a key={link.label} href={link.href} className="text-sm font-medium hover:text-[#00adef] transition-colors">
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-6">
                    <Search className="w-5 h-5 cursor-pointer hover:text-[#00adef]" />
                    <MapPin className="w-5 h-5 cursor-pointer hover:text-[#00adef]" />
                    <ThemeToggle/>
                </div>

                <button
                    className="lg:hidden z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-0 left-0 w-full h-screen bg-black flex flex-col pt-24 px-6 gap-6 lg:hidden"
                        >
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-2xl font-light border-b border-gray-800 pb-4"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

const HeroSlider = () => {
    return (
        <section className="relative w-full h-[90vh] overflow-hidden bg-black">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0"
            >
                <Image
                    src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1170&auto=format&fit=crop"
                    alt="Luxury Car Hero"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />
            </motion.div>

            <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6 container mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="text-white/80 uppercase tracking-[0.2em] text-sm mb-4 block">
                        World Premiere
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
                        The New Electric Concept.
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-xl mb-8 font-light">
                        Defined by luxury, driven by performance. Experience the future of automotive excellence today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">Discover More</Button>
                        <Button variant="default" className="bg-[#00adef] hover:bg-[#0090c5]">Configure Now</Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- REDESIGNED MODELS SECTION ---
const ModelsSection = () => {
    // 1. Filter for "Recently Added" (Simulated by taking specific items or checking tags)
    const recentCars = CAR_DATA.filter(car => car.tags?.includes("New Arrival") || car.id === "4" || car.id === "1");
    
    // 2. Filter for "Top Bought"
    const topCars = CAR_DATA.filter(car => car.tags?.includes("Top Bought") || car.tags?.includes("Best Seller") || car.category === "SUV");

    return (
        <section id="models" className="py-10 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-6">
                
                {/* --- Section 1: Recently Added --- */}
                <div className="">
                    <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                        <SectionTitle 
                            title="Recently Added" 
                            subtitle="The latest additions to our exclusive fleet." 
                        />
                        <a href="#" className="hidden md:flex items-center gap-2 text-sm font-semibold hover:text-[#00adef] mb-2">
                            View All <ArrowRight className="w-4 h-4"/>
                        </a>
                    </div>
                    
                    {/* Horizontal Scroll Container */}
                    <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide snap-x">
                        {recentCars.map((car) => (
                            <div key={car.id} className="snap-center">
                                <CarCard car={car} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Section 2: Top Bought --- */}
                <div>
                    <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                        <SectionTitle 
                            title="Top Bought Models" 
                            subtitle="Our most coveted vehicles, chosen by drivers like you." 
                        />
                        <a href="#" className="hidden md:flex items-center gap-2 text-sm font-semibold hover:text-[#00adef] mb-2">
                            View Ranking <ArrowRight className="w-4 h-4"/>
                        </a>
                    </div>

                    {/* Horizontal Scroll Container */}
                    <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide snap-x">
                        {topCars.map((car) => (
                            <div key={car.id} className="snap-center">
                                <CarCard car={car} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

const InnovationSection = () => {
    return (
        <section className="bg-neutral-900 text-white py-24">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-[#00adef] font-semibold tracking-wider uppercase mb-2 block">Innovation</span>
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">Digital Extras.</h2>
                    <p className="text-muted-foreground text-lg mb-8 font-light leading-relaxed">
                        Experience the interplay of digital and analog luxury. With MBUX (Mercedes-Benz User Experience),
                        you can intuitively control your vehicle with voice, touch, or gestures.
                    </p>

                    <ul className="space-y-6">
                        {[
                            { icon: Star, text: "Personalized User Profiles" },
                            { icon: Shield, text: "Advanced Driver Assistance" },
                            { icon: MapPin, text: "Live Traffic Navigation" }
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4">
                                <div className="p-2 bg-white/10 rounded-full">
                                    <item.icon className="w-5 h-5 text-[#00adef]" />
                                </div>
                                <span className="text-lg font-light">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative aspect-square md:aspect-video bg-neutral-800 rounded-xl overflow-hidden">
                    {/* 

[Image of Digital Dashboard]
 */}
                    <Image
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop"
                        alt="Interior Technology"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-black/90 text-white pt-20 pb-10 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <h4 className="font-bold mb-6">Purchase</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground font-light">
                            <li className="hover:text-white cursor-pointer">Build Your Car</li>
                            <li className="hover:text-white cursor-pointer">Book a Test Drive</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Owners</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground font-light">
                            <li className="hover:text-white cursor-pointer">Service Booking</li>
                            <li className="hover:text-white cursor-pointer">Roadside Assistance</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">About Us</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground font-light">
                            <li className="hover:text-white cursor-pointer">Sustainability</li>
                            <li className="hover:text-white cursor-pointer">Careers</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Stay Connected</h4>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email Address" className=" border border-muted-foreground rounded-2xl bg-transparent text-sm py-2 px-3 w-full text-white" />
                            <button className="bg-white text-black px-4 rounded-2xl text-sm font-bold">Go</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
                    <p>© 2024 Project Clone. For educational purposes only.</p>
                </div>
            </div>
        </footer>
    );
};

// --- Main Page Export ---

export default function HomeGemini() {
    return (
        <main className="min-h-screen  ">
            <Navbar />
            <HeroSlider />
            <ModelsSection />
            <InnovationSection />
            <Footer />
        </main>
    );
}