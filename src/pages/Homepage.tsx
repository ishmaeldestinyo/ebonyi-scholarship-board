import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Menu, X, ArrowRight, GraduationCap, Users, Award, FileText, BookOpen, Calendar, CheckCircle, Clock, Building2, Banknote, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner' // or your toast library
import axiosInstance from '../api/axiosConfig'

function Homepage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isScholarshipOpen, setIsScholarshipOpen] = useState(false)
    const [currentSession, setCurrentSession] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetch scholarship status
    useEffect(() => {
        const fetchCurrentSession = async () => {
            setLoading(true)
            try {
                const res = await axiosInstance.get(`/applications`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })

                const session = res.data?.data
                setCurrentSession(session)
                setIsScholarshipOpen(!!session) // true if session exists
            } catch (error) {
                setIsScholarshipOpen(false)
                console.error('No active scholarship session:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCurrentSession()
    }, [])

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const slides = [
        {
            title: "Empowering Education in Ebonyi State",
            subtitle: "Building a brighter future through quality education and scholarship opportunities",
            gradient: "from-emerald-400 via-green-500 to-teal-600",
        },
        {
            title: "Apply for 2026 Scholarship Programs",
            subtitle: "Financial support for outstanding students pursuing academic excellence",
            gradient: "from-lime-400 via-green-500 to-emerald-600",
        },
        {
            title: "Join Thousands of Scholars",
            subtitle: "Be part of Ebonyi's success story in educational development",
            gradient: "from-teal-400 via-emerald-500 to-green-600",
        }
    ]

    const scholarshipTypes = [
        {
            title: "Undergraduate Scholarship",
            description: "Full tuition support for undergraduate students in accredited Nigerian universities",
            icon: GraduationCap,
            color: "from-lime-400 to-green-500",
            delay: "0",
        },
        {
            title: "Postgraduate Scholarship",
            description: "Financial assistance for Masters and PhD programs in priority fields",
            icon: BookOpen,
            color: "from-emerald-400 to-teal-600",
            delay: "100",
        },
        {
            title: "Merit Award",
            description: "Special recognition for students with exceptional academic performance",
            icon: Award,
            color: "from-green-400 to-emerald-600",
            delay: "200",
        }
    ]

    const stats = [
        { value: "2,000+", label: "Beneficiaries", icon: Users, color: "from-blue-500 to-cyan-500" },
        { value: "8+", label: "Years Active", icon: Clock, color: "from-purple-500 to-pink-500" },
        { value: "13", label: "LGAs Covered", icon: Building2, color: "from-orange-500 to-red-500" },
        { value: "₦2.5B+", label: "Disbursed", icon: Banknote, color: "from-emerald-500 to-green-500" }
    ]

    const applicationSteps = [
        {
            step: "1",
            title: "Check Eligibility",
            description: "Review requirements and ensure you qualify for the scholarship program"
        },
        {
            step: "2",
            title: "Prepare Documents",
            description: "Gather all necessary documents including academic records and certificates"
        },
        {
            step: "3",
            title: "Submit Application",
            description: "Complete the online application form with accurate information"
        },
        {
            step: "4",
            title: "Await Selection",
            description: "Successful candidates will be notified via email and SMS"
        }
    ]

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, url: '#' },
        { name: 'Twitter', icon: Twitter, url: '#' },
        { name: 'Instagram', icon: Instagram, url: '#' }
    ]

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
            {/* Animated Background - Polymorphic Shapes */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Organic blob shapes */}
                <div
                    className="absolute w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-3xl animate-pulse"
                    style={{
                        left: `${mousePosition.x / 30}px`,
                        top: `${mousePosition.y / 30}px`,
                        transition: 'all 0.5s ease-out',
                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                    }}
                ></div>
                <div
                    className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-teal-300/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse delay-500"
                    style={{
                        clipPath: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)'
                    }}
                ></div>
                <div
                    className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-lime-300/15 to-green-400/15 rounded-full blur-3xl animate-pulse delay-1000"
                    style={{
                        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                    }}
                ></div>

                {/* Additional floating shapes */}
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-emerald-300/10 rounded-full blur-2xl animate-float-slow"></div>
                <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-green-400/10 blur-2xl animate-float-slower"
                    style={{ clipPath: 'circle(50% at 50% 50%)' }}></div>
            </div>

            {/* Header */}
            <header className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-emerald-500/5' : 'bg-white/80 backdrop-blur-sm'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center group cursor-pointer">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl blur opacity-40 group-hover:opacity-60 transition"></div>
                                <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 w-fit rounded-full  transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    < img src="/images/logo.png" alt="Ebonyi Scholarship Board Logo" className="w-8 h-8 rounded-xl" />
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    Ebonyi Scholarship Board
                                </div>
                                <div className="text-xs text-gray-600">Ebonyi State Government</div>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {['Home', 'Scholarships', 'How to Apply', 'Contact'].map((item, idx) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                                    className="relative text-gray-700 hover:text-emerald-600 transition group font-medium"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            ))}
                            <Link to={"/signup"}>
                                <button
                                    disabled={!isScholarshipOpen}
                                    className={`px-6 py-2.5 rounded-full font-semibold transform transition-all duration-300 ${isScholarshipOpen
                                            ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {loading ? 'Loading...' : isScholarshipOpen ? 'Apply Now' : 'Applications Closed'}
                                </button>
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition text-gray-700"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-4 pt-2 pb-6 space-y-3 bg-white border-t border-gray-100">
                        {['Home', 'Scholarships', 'How to Apply', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                                className="block px-4 py-3 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition text-gray-700 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                        <Link to={"/login"}>
                            <button
                                disabled={!isScholarshipOpen}
                                className={`w-full px-4 py-3 rounded-lg font-semibold ${isScholarshipOpen
                                        ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {loading ? 'Loading...' : isScholarshipOpen ? 'Apply Now' : 'Applications Closed'}
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Slider */}
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Decorative polymorphic elements */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 30 + 10}px`,
                                height: `${Math.random() * 30 + 10}px`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${8 + Math.random() * 12}s`,
                                opacity: Math.random() * 0.4 + 0.1,
                            }}
                        ></div>
                    ))}
                </div>

                {/* Slide Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
                    <div
                        key={currentSlide}
                        className="animate-fadeIn"
                    >
                        <div className={`inline-block mb-6 px-4 py-2 backdrop-blur-sm rounded-full border ${isScholarshipOpen
                                ? 'bg-emerald-50 border-emerald-200'
                                : 'bg-red-50 border-red-200'
                            } animate-slideDown shadow-sm`}>
                            <span className={`text-sm font-semibold flex items-center gap-2 ${isScholarshipOpen
                                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent'
                                    : 'text-red-600'
                                }`}>
                                <Calendar className={`w-4 h-4 ${isScholarshipOpen ? 'text-emerald-600' : 'text-red-600'}`} />
                                {loading ? 'Checking Status...' : isScholarshipOpen ? `${currentSession?.title || '2026 Application'} Now Open` : 'Applications Currently Closed'}
                            </span>
                        </div>

                        <h1 className={`text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent animate-slideUp leading-tight`}>
                            {slides[currentSlide].title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto animate-slideUp delay-100">
                            {slides[currentSlide].subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideUp delay-200">
                            <Link to={isScholarshipOpen ? "/login" : "#"}>
                                <button
                                    disabled={!isScholarshipOpen}
                                    className={`group px-8 py-4 rounded-full font-bold text-lg transform transition-all duration-300 flex items-center gap-2 ${isScholarshipOpen
                                            ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-105'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {isScholarshipOpen ? 'Apply for Scholarship' : 'Applications Closed'}
                                    {isScholarshipOpen && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </Link>
                            <a href='#how-to-apply'>
                                <button className="px-8 py-4 bg-white border-2 border-emerald-500 text-emerald-600 rounded-full font-bold text-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 shadow-sm">
                                    View Requirements
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Slider Navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full border border-emerald-200 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20 group z-20"
                >
                    <ChevronLeft className="w-6 h-6 text-emerald-600 group-hover:-translate-x-1 transition-transform" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full border border-emerald-200 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20 group z-20"
                >
                    <ChevronRight className="w-6 h-6 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === index
                                ? 'w-12 bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/40'
                                : 'w-2.5 bg-emerald-200 hover:bg-emerald-300'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20 bg-gradient-to-b from-emerald-50/50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon
                            return (
                                <div
                                    key={idx}
                                    className="text-center group cursor-pointer animate-fadeInUp bg-white rounded-2xl p-6 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 border border-emerald-100"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Scholarship Types Section */}
            <section id="scholarships" className="relative py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fadeInUp">
                        <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                            Scholarship Programs
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Choose from our range of scholarship opportunities designed to support your academic journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {scholarshipTypes.map((scholarship, idx) => {
                            const Icon = scholarship.icon
                            return (
                                <div
                                    key={idx}
                                    className="group relative animate-fadeInUp"
                                    style={{ animationDelay: `${scholarship.delay}ms` }}
                                >
                                    {/* Glow effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${scholarship.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                                    {/* Card */}
                                    <div className="relative bg-white rounded-3xl p-8 border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-500 transform group-hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 h-full">
                                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${scholarship.color} mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-emerald-600 transition-all duration-300">
                                            {scholarship.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            {scholarship.description}
                                        </p>


                                        {/* Hover arrow */}
                                        <Link to={isScholarshipOpen ? "/" : "#"}>
                                            <div className={`mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isScholarshipOpen ? 'text-emerald-600' : 'text-gray-400'
                                                }`}>
                                                {isScholarshipOpen ? 'Apply now' : 'Applications closed'}
                                                {isScholarshipOpen && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Application Process Section */}
            <section id="how-to-apply" className="relative py-24 bg-gradient-to-b from-emerald-50/30 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                            How to Apply
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Follow these simple steps to complete your scholarship application
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {applicationSteps.map((item, idx) => (
                            <div
                                key={idx}
                                className="relative group"
                            >
                                <div className="relative bg-white rounded-2xl p-6 border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-500 h-full hover:shadow-xl hover:shadow-emerald-500/10">
                                    <div className="w-16 h-16 mb-4 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                                {idx < applicationSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                        <ArrowRight className="w-6 h-6 text-emerald-400" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link to={isScholarshipOpen ? "/" : "#"}>
                            <button
                                disabled={!isScholarshipOpen}
                                className={`group px-10 py-5 rounded-full font-bold text-lg transform transition-all duration-300 inline-flex items-center gap-3 ${isScholarshipOpen
                                        ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {isScholarshipOpen ? 'Start Your Application' : 'Applications Closed'}
                                {isScholarshipOpen && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Eligibility Section */}
            <section className="relative py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12 border-2 border-emerald-200 shadow-xl shadow-emerald-500/10">
                        <h3 className="text-3xl md:text-4xl font-black mb-8 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent text-center">
                            Eligibility Requirements
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                "Must be an indigene of Ebonyi State",
                                "Minimum of 5 O'level credits including English & Mathematics",
                                "Admitted into an accredited Nigerian institution",
                                "CGPA of 3.0 and above (for continuing students)",
                                "Age between 16-30 years",
                                "Not currently benefiting from another scholarship"
                            ].map((requirement, idx) => (
                                <div key={idx} className="flex items-start gap-3 group">
                                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform" />
                                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{requirement}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-white border-2 border-emerald-300 rounded-xl">
                            <p className="text-sm text-gray-700 text-center">
                                <strong className="text-emerald-600">Note:</strong> All applications must be submitted before the deadline. Incomplete applications will not be considered.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="relative border-t-2 border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center mb-4">
                                <div className="bg-gradient-to-br from-emerald-500 to-green-600 w-fit rounded-full shadow-lg">
                                    < img src="/images/logo.png" alt="Ebonyi Scholarship Board Logo" className="w-8 h-8 rounded-xl" />
                                </div>
                                <div className="ml-3">
                                    <h4 className="font-bold text-emerald-600">Ebonyi Scholarship Board</h4>
                                    <p className="text-sm text-gray-600">Ebonyi State Government</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                                Empowering the next generation of leaders through quality education and scholarship opportunities.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-emerald-600">Quick Links</h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                <li><a href="#home" className="hover:text-emerald-600 transition">Home</a></li>
                                <li><a href="#scholarships" className="hover:text-emerald-600 transition">Scholarships</a></li>
                                <li><a href="#how-to-apply" className="hover:text-emerald-600 transition">How to Apply</a></li>
                                <li><a href="#" className="hover:text-emerald-600 transition">FAQs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-emerald-600">Contact Us</h4>
                            <ul className="space-y-3 text-gray-600 text-sm">
                                <li className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span>Abakaliki, Ebonyi State</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <span>+234 902 758 5555</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <span>support@ebsscholarshipboard.org</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t-2 border-emerald-100 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex flex-col items-center md:items-start gap-2">
                                <p className="text-gray-600 text-sm">
                                    © 2026 Ebonyi State Scholarship Board. All rights reserved.
                                </p>
                                <div className="flex items-center gap-2 group">
                                    <span className="text-xs text-gray-500">Powered by</span>
                                    <a href='tel:+2348168667064'>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200 group-hover:border-emerald-400 transition-all duration-300">
                                            <div className="w-5 h-5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-md flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                                                <span className="text-white text-xs font-bold">IO</span>
                                            </div>
                                            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                                Ishmael Onwe
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {socialLinks.map((social) => {
                                    const SocialIcon = social.icon
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            className="w-10 h-10 bg-emerald-100 hover:bg-emerald-600 rounded-full flex items-center justify-center text-emerald-600 hover:text-white transition-all duration-300 transform hover:scale-110 group"
                                            aria-label={social.name}
                                        >
                                            <SocialIcon className="w-5 h-5" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes float-slower {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, -40px) scale(1.1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
          animation-fill-mode: both;
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
        </div>
    )
}

export default Homepage