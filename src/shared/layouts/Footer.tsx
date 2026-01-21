import { Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/amberLogo.png";

const faqs = [
  {
    q: "What qualifications will I gain?",
    a: "All our courses are Ofqual-regulated and FAA-approved. You'll receive a CPD-certified first aid qualification recognised across the UK for workplace compliance.",
  },
  {
    q: "Do I need any prior experience?",
    a: "No, all our courses are designed for beginners through to experienced professionals. Our expert trainers deliver practical, easy-to-follow instruction suitable for all skill levels.",
  },
  {
    q: "What's your refund and cancellation policy?",
    a: "We understand plans change. Contact us for details on our flexible cancellation policy. We're committed to working with you to find solutions that fit your needs.",
  },
  {
    q: "How long are the courses?",
    a: "Course duration varies depending on the type. First Aid at Work is typically 3 days, Emergency First Aid is 1 day, and Paediatric First Aid is 2 days. Check our courses page for specific details.",
  },
  // {
  //   q: "Can you deliver training at our workplace or school?",
  //   a: "Yes! We offer bespoke in-house training tailored to your organisation's needs. Whether you're a school, nursery, or workplace, we can deliver training onsite. Get in touch for a customised quote.",
  // },
  // {
  //   q: "What topics are covered in your courses?",
  //   a: "We cover a range of scenarios from CPR and choking to wound management and emergency response. Our sector-specific courses are tailored for healthcare, construction, warehousing, and childcare environments.",
  // },
];

export default function FooterSection() {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 mx-auto bg-[#F5F3F0]">
        <h2
          className="text-3xl md:text-4xl font-serif text-black text-center mb-12"
          data-aos="fade-up"
        >
          Frequently Asked Questions
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <h3 className="text-lg font-semibold text-[#FF7C22] mb-3">
                {faq.q}
              </h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <div className="px-6 md:px-12 py-12 max-w-7xl mx-auto grid lg:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="col-span-1" data-aos="fade-right">
          <Link to="/">
            <img
              className="h-auto w-[160px] lg:w-[200px]"
              src={Logo}
              alt="Logo"
            />
          </Link>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-black font-semibold mb-3">Contact</h4>
          <p className="text-gray-600 text-sm">Greater London, UK</p>
          <p className="text-gray-600 text-sm">suport@ambertraining.co.uk</p>
          <p className="text-gray-600 text-sm">+44 7763 658885</p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-black font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/ambertraining_/?hl=en"
              className="hover:text-[#FF7C22]"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/ambertraining/about/"
              className="hover:text-[#FF7C22]"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-black font-semibold mb-3">Stay Updated</h4>
          <p className="text-gray-600 text-sm mb-4">
            Subscribe to receive event updates and exclusive invitations.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7C22] w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF7C22] text-white font-medium hover:bg-[#3b452a] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 md:px-12 py-6 max-w-7xl mx-auto border-t border-gray-200 text-center text-gray-500 text-sm flex w-full justify-between">
        <span className="">
          © {new Date().getFullYear()} Amber Training. All rights reserved.
        </span>{" "}
        <br />{" "}
        <span className="">
          <a href="/terms" className="hover:text-[#FF7C22]">
            Terms
          </a>{" "}
          ·{" "}
          <a href="/privacy" className="hover:text-[#FF7C22]">
            Privacy
          </a>
        </span>
      </div>
    </footer>
  );
}
