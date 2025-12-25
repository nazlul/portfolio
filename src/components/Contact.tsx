"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formState.name.trim() ||
      !formState.email.trim() ||
      !formState.subject.trim() ||
      !formState.message.trim()
    ) {
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      name: formState.name,
      email: formState.email,
      subject: formState.subject,
      message: formState.message,
      time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        "service_d3sfjbk",
        "template_nlmku1l",
        templateParams,
        "CPHO9ZN9gKtGPH9ml"
      );

      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      alert("Failed to send email. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      scale: 1.04,
      boxShadow: "0 6px 20px rgba(169,23,10,0.25)",
      color: "#a9170a",
      transition: { duration: 0.25 },
    },
  };

  return (
    <section id="contact" className="py-20 px-4 relative bg-[#a9170a] noise-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#fffde8]">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#fffde8] to-[#B8B1A8] mx-auto mb-6" />
          <p className="text-[#fffde8] max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out
            and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="md:col-span-1"
          >
            {[
              {
                Icon: MailIcon,
                label: "Email",
                value: "eng.nazrizan@gmail.com",
                isEmail: true,
              },
              { Icon: PhoneIcon, label: "Phone", value: "+91 9539665011" },
              {
                Icon: MapPinIcon,
                label: "Location",
                value: "Kozhikode, Kerala, India",
              },
            ].map(({ Icon, label, value, isEmail }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover="hover"
                className="bg-[#fffde8] p-6 rounded-xl shadow-lg mb-6"
              >
                <div className="flex text-[#a9170a] items-start">
                  <div className="bg-[#a9170a]/20 p-3 rounded-lg mr-4">
                    <Icon className="text-[#a9170a]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">{label}</h3>
                    {isEmail ? (
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${value}`}
                        className="text-[#a9170a] underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-[#a9170a]">{value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="md:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#fffde8] p-8 rounded-xl shadow-lg"
            >
              {isSubmitted ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["name", "email", "subject"].map((field) => (
                    <div
                      key={field}
                      className={field === "subject" ? "md:col-span-2" : ""}
                    >
                      <label className="block text-sm font-medium text-[#a9170a] mb-1 capitalize">
                        {field}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={(formState as any)[field]}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#dbd5ce] border border-[#a9170a] rounded-lg text-black"
                      />
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#a9170a] mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-[#dbd5ce] border border-[#a9170a] rounded-lg text-black resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-[#a9170a] text-[#fffde8] font-medium rounded-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Sending..." : <><SendIcon size={20} />Send Message</>}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
