import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formRef.current) return;

    emailjs.sendForm('service_id', 'template_id', formRef.current, 'public_key')
      .then(() => {
        setStatusMessage('Message sent successfully.');
        event.target.reset();
      })
      .catch(() => {
        setStatusMessage('Something went wrong. Please try again later.');
      });
  };

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">Contact</h2>
        <div className="bg-primary rounded-3xl p-8 shadow-2xl border border-white/10">
          <p className="text-dimText text-center mb-8">Send a message and let&apos;s build something great together.</p>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <input type="text" name="from_name" placeholder="Your Name" required className="w-full rounded-2xl bg-secondary border border-white/10 px-4 py-3 text-lightText outline-none focus:border-accent" />
              <input type="email" name="reply_to" placeholder="Your Email" required className="w-full rounded-2xl bg-secondary border border-white/10 px-4 py-3 text-lightText outline-none focus:border-accent" />
            </div>
            <input type="text" name="subject" placeholder="Subject" required className="w-full rounded-2xl bg-secondary border border-white/10 px-4 py-3 text-lightText outline-none focus:border-accent" />
            <textarea name="message" rows="6" placeholder="Your Message" required className="w-full rounded-2xl bg-secondary border border-white/10 px-4 py-3 text-lightText outline-none focus:border-accent"></textarea>
            <button type="submit" className="w-full px-8 py-3 bg-accent text-primary rounded-full font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all">
              Send Message
            </button>
          </form>
          {statusMessage && <p className="mt-4 text-center text-dimText">{statusMessage}</p>}
        </div>
      </div>
    </section>
  );
};

export default Contact;
