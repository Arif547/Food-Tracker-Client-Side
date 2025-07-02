import React from "react";
import { Heart, MapPin, Users, Clock, ExternalLink, Phone, Mail, Lightbulb, LightbulbIcon, Calendar, DollarSign } from 'lucide-react';

const donationOptions = [
    {
        icon: MapPin,
        title: "Local Food Banks",
        description: "Find nearby food banks that accept surplus food donations",
        link: "https://www.feedingamerica.org/find-your-local-foodbank",
        linkText: "Find Food Banks",
        color: "bg-red-50 border-red-200 text-red-600"
    },
    {
        icon: Users,
        title: "Food Pantries",
        description: "Connect with community food pantries in your neighborhood",
        link: "https://www.foodpantries.org/",
        linkText: "Locate Pantries",
        color: "bg-blue-50 border-blue-200 text-blue-600"
    },
    {
        icon: Heart,
        title: "Community Fridges",
        description: "Drop off items at local community refrigerators and food sharing spots",
        link: "#",
        linkText: "Find Near You",
        color: "bg-green-50 border-green-200 text-green-600"
    }
];

const donationTips = [
    { icon: Clock, text: "Check expiration dates - items should have at least 2-3 days remaining" },
    { icon: Heart, text: "Ensure all items are unopened and in original packaging" },
    { icon: Users, text: "Call ahead to confirm what items are currently needed" },
    { icon: MapPin, text: "Consider donating non-perishables like canned goods and dry goods" }
];

const upcomingEvents = [
    {
        title: "Community Food Drive",
        date: "March 15, 2024",
        location: "Central Community Center",
        description: "Join us for our monthly food collection drive"
    },
    {
        title: "Volunteer Training",
        date: "March 20, 2024",
        location: "Food Bank HQ",
        description: "Learn how to help sort and distribute donations"
    }
];

const Donation = () => (
    <div className="py-24 px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 rounded-full"></div>
            <div className="absolute bottom-40 right-16 w-24 h-24 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-60 right-40 w-16 h-16 bg-amber-400 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            {/* Header Section */}
            <div className="text-center mb-16">                
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-6 py-3 rounded-full font-semibold mb-6">
                    <Heart className="w-5 h-5" />
                    <span>Donate Food</span>
                </div>
                <h2 className="text-5xl font-bold text-gray-800 mb-6">
                    Share the Love
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    Transform your surplus food into hope for others. Every donation helps fight hunger in your community
                    while reducing food waste – <span className="font-semibold text-violet-600"> helping to make a difference in someone's life. </span>
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                {/* Image Section */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                            alt="People volunteering at food bank"
                            className="rounded-2xl w-full h-96 object-cover shadow-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-8">
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-violet-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <Heart className="w-6 h-6 text-violet-500 mr-3" />
                            Why Donate Your Surplus Food?
                        </h3>
                        <div className="space-y-4 text-gray-700">
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-violet-400 rounded-full mt-3 flex-shrink-0"></div>
                                <p>Help feed families in need while preventing perfectly good food from going to waste</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-violet-400 rounded-full mt-3 flex-shrink-0"></div>
                                <p>Reduce your environmental impact by diverting food from landfills</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-violet-400 rounded-full mt-3 flex-shrink-0"></div>
                                <p>Strengthen your local community through acts of kindness and sharing</p>
                            </div>
                        </div>
                    </div>

                    {/* Donation Tips */}
                    <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-2xl p-6 border border-violet-200">
                        <h4 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                            <LightbulbIcon className="w-6 h-6 text-violet-500 mr-3"/> 
                            Donation Guidelines
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                            {donationTips.map((tip, index) => {
                                const IconComponent = tip.icon;
                                return (
                                    <div key={index} className="flex items-start space-x-3">
                                        <IconComponent className="w-4 h-4 text-violet-800 mt-1 flex-shrink-0" />
                                        <p className="text-sm text-gray-700">{tip.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Donation Options */}
            <div className="mb-16">
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Where to Donate</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {donationOptions.map((option, index) => {
                        const IconComponent = option.icon;
                        return (
                            <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-orange-200 hover:scale-105">
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${option.color}`}>
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-3">{option.title}</h4>
                                <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                                <a
                                    href={option.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors group-hover:underline"
                                >
                                    {option.linkText}
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="mb-16 bg-gradient-to-r from-purple-50 to-violet-50 rounded-3xl p-12">
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Upcoming Events</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    {upcomingEvents.map((event, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="bg-violet-100 rounded-lg p-3">
                                    <Calendar className="w-6 h-6 text-violet-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-800">{event.title}</h4>
                                    <p className="text-violet-600 font-medium">{event.date}</p>
                                    <p className="text-gray-600 mt-2">{event.location}</p>
                                    <p className="text-gray-500 mt-1">{event.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-orange-100">
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Impact Matters</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">Every donation counts toward building a stronger, more caring community</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-orange-600 mb-2">38M</div>
                        <div className="text-gray-600">Americans face food insecurity</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-600 mb-2">80B</div>
                        <div className="text-gray-600">Pounds of food wasted annually</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-orange-600 mb-2">1 in 8</div>
                        <div className="text-gray-600">Children experience hunger</div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="grid md:grid-cols-2 gap-8 my-16">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-violet-600" />
                            <span className="text-gray-700">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-violet-600" />
                            <span className="text-gray-700">donations@foodbank.org</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Make a Financial Contribution</h3>
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-violet-600" />
                        <span className="text-gray-700">Support our mission with a monetary donation</span>
                    </div>
                    <button className="mt-4 bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 transition-colors">
                        Donate Now
                    </button>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
                <div className="bg-gradient-to-r from-violet-500 to-violet-500 rounded-3xl p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
                        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                            Start your food donation journey today and help create a world where no good food goes to waste.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-violet-600 px-8 py-4 rounded-xl font-semibold hover:bg-violet-50 transition-colors duration-300 shadow-lg">
                                Find Donation Centers
                            </button>
                            <button className="bg-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-700 transition-colors duration-300 border-2 border-violet-400">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Donation;