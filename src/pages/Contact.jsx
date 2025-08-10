import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
    const [state, handleSubmit] = useForm("movlydky");

    return (
        <section className="bg-base-100 text-base-content  flex items-center py-20 lg:py-[120px] px-4 md:px-12" id="contact">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Contact Info */}
                <div>
                    <h2 className="text-4xl font-bold text-primary mb-6">Get in Touch</h2>
                    <p className="text-lg mb-8">
                        Have questions, feedback, or just want to say hello? We’d love to hear from you! Fill out the form or reach us directly.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <FaPhoneAlt className="text-primary" />
                            <span>+880 1234 567 890</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-primary" />
                            <span>support@FoodSaver.com</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaMapMarkerAlt className="text-primary" />
                            <span>Dhaka, Bangladesh</span>
                        </div>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="bg-base-200 p-8 rounded-lg shadow w-full max-w-xl">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <div className="form-control">
                            <label className="label mb-1">
                                <span className="label-text text-base-content">Name</span>
                            </label>
                            <input
                                name='name'
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full text-base-content placeholder:text-gray-400"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label mb-1">
                                <span className="label-text text-base-content">Email</span>
                            </label>
                            <input
                                name='email'
                                type="email"
                                placeholder="you@example.com"
                                className="input input-bordered w-full text-base-content placeholder:text-gray-400"
                            />
                            <ValidationError
                                prefix="Email"
                                field="email"
                                errors={state.errors}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label mb-1">
                                <span className="label-text text-base-content">Message</span>
                            </label>
                            <textarea
                                name='message'
                                rows="5"
                                placeholder="Type your message here..."
                                className="textarea textarea-bordered w-full text-base-content placeholder:text-gray-400"
                            ></textarea>
                            <ValidationError
                                prefix="Message"
                                field="message"
                                errors={state.errors}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn bg-[#00A86B] text-white hover:bg-[#00915e] border-none"
                            disabled={state.submitting}>
                            Send Message
                        </button>
                    </form>
                    {state.succeeded && (
                        <p className="text-green-500 mt-4">
                            Thank you for your message! We will get back to you soon.
                        </p>
                    )}

                </div>



            </div>
        </section>
    );
};

export default Contact;
