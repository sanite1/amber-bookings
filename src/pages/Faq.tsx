import React, { useEffect, useState } from "react";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is the dress code for this event?",
      answer:
        "The dress code is black-tie – do not be afraid to come in your best attire and flair. The event is due to have cinematography arranged to capture the full experience.",
    },
    {
      question: "Will we receive a full view of the menu before the event?",
      answer:
        "Yes, confirmed guests will see the menu via email prior to the event.",
    },
    {
      question: "Are drinks included in the ticket price?",
      answer:
        "A selection of drink pairings will be included during the dinner. After dinner, bar service will be available in the lounge.",
    },
    {
      question:
        "If I have any allergies or dietary requirements, can these be considered?",
      answer:
        "Absolutely! When purchasing your tickets, please indicate any dietary restrictions or allergies, and our team will take note of these. However, please be aware that while we strive to accommodate all allergies, we cannot guarantee an allergen-free kitchen due to the shared kitchen environment.",
    },
    {
      question: "Can tickets be purchased on the door?",
      answer:
        "Unfortunately, tickets cannot be purchased at the door. They must be bought online in advance. Please note that ticket sales will close before December 6th.",
    },
    {
      question: "What time should I arrive?",
      answer:
        "Doors will open at 6:30pm for welcome drinks. We advise you to attend at this time to get the full experience of the night. Doors will close for the dinner at 7pm. If you arrive after service has begun, we can still welcome you. We’ll seat late arrivals between courses until the second course begins; after that, you’re welcome to join the lounge once dinner concludes.",
    },
    {
      question: "Where is the event being held?",
      answer:
        "The dinner is being held in an exclusive, prestigious venue located in Green Park, London. Detailed information will be sent to attendees as the event date approaches.",
    },
    {
      question: "Will there be a cloakroom?",
      answer:
        "Yes, there will be a complimentary manned cloakroom available throughout the evening.",
    },
    {
      question: "Are tickets refundable?",
      answer:
        "All tickets are non-refundable and will only be refunded in the event of cancellation. If you are unable to attend, you may transfer your ticket to someone else by emailing experiences@ambertraining.co.uk. This request will be subject to approval by our team.",
    },
    {
      question: "Can I resell my ticket?",
      answer:
        "Tickets cannot be resold or transferred without prior approval and consent from the team. Please email experiences@ambertraining.co.uk if any enquiries around this.",
    },
    {
      question: "Will there be cinematography on the day?",
      answer:
        "Yes, please anticipate for there to be photography and videography during the event to capture the essence of the evening. By attending, you agree to be part of the cinematography on the day. If there are any issues or concerns, please feel free to email experiences@ambertraining.co.uk.",
    },
    {
      question: "Are there any accessibility restrictions?",
      answer:
        "The event will be located on the 3rd floor, accessible via lifts or stairs. If there are any specific accessibility requirements, please email experiences@ambertraining.co.uk.",
    },
    {
      question: "For the drinks included, are there non-alcoholic options?",
      answer:
        "We would be happy to accommodate this preference subject to prior notice to the team by emailing experiences@ambertraining.co.uk. Please note that the ticket price will remain unchanged.",
    },
    {
      question: "What is the conduct policy for the event?",
      answer:
        "We expect all guests to adhere to a standard of respectful behavior during the event. We reserve the right to remove any guests whose conduct disrupts the experience for others, and please be aware that no refunds will be issued in such cases.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <section className="relative bg-[#F5F3F0] text-black min-h-screen py-28 px-6 md:px-12 lg:px-24">
      <div
        className="relative max-w-4xl mx-auto text-center mb-10"
        data-aos="fade-up"
      >
        <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-tight favela">
          A Tailored Taste FAQ
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Everything you need to know before the evening begins.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl px-6 py-4 transition-all duration-300 hover:shadow-md"
            data-aos="fade-up"
            // data-aos-delay={idx * 70}
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left flex justify-between items-center focus:outline-none"
            >
              <h3 className="text-lg md:text-xl font-medium pr-6">
                {faq.question}
              </h3>
              <span className="text-2xl text-gray-500 transition-transform duration-300">
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>

            <div
              className={` text-gray-700 text-base leading-relaxed transition-all duration-500 overflow-hidden ${
                openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
