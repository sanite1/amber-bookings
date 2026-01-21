import faw from "../assets/images/faw.jpeg";
import efaw from "../assets/images/efaw.jpeg";
import bls from "../assets/images/bls.jpeg";
import pbls from "../assets/images/pbls.jpeg";
import pfa from "../assets/images/pfa.jpeg";
import epfa from "../assets/images/epfa.jpeg";
import FirstaidImg from "../assets/images/firstaidImg.jpg";

export const trainings = [
  {
    id: 1,
    name: "First Aid at Work (FAW)",
    link: "first-aid-at-work",
    image: faw,
    desc: "Comprehensive 1-day certification for workplace first aid. Learn CPR, wound management, and emergency response protocols.",
    duration: "3 Days",
    level: "Level 3",
    certification: "Ofqual Regulated",
    price: "£2,250",
    idealFor:
      "Mandatory for workplaces with 50+ employees, high-risk environments (construction, manufacturing), and care homes.",
    originalPrice: "£3,060",
    discount: "£810",
    highlights: [
      "Comprehensive curriculum including CPR/AED",
      "Fractures and burns",
      "Cardiac events, strokes and seizures",
      "Major injuries",
    ],
  },
  {
    id: 2,
    name: "Emergency First Aid at Work (EFAW)",
    link: "emergency-first-aid-at-work",
    image: efaw,
    desc: "Intensive 1-day course covering essential emergency response and life-saving techniques for the workplace.",
    duration: "1 Day",
    level: "Entry Level",
    certification: "Ofqual Regulated",
    price: "£750",
    idealFor:
      "Ideal for low-risk workplaces, offices, restaurants, retail shops, and small care homes.",
    originalPrice: "£1,020",
    discount: "£270",
    highlights: [
      "Essential life-saving skills including CPR",
      "Defibrillator (AED) use",
      "Choking, bleeding, shock, and minor injuries.",
    ],
  },
  {
    id: 3,
    name: "First Aid at Work Requalification",
    link: "first-aid-at-work-requalification",
    image: pbls,
    desc: "3-day refresher course to maintain your FAW certification and update skills with latest first aid practices.",
    duration: "2 Days",
    level: "Renewal",
    certification: "Ofqual Regulated",
    price: "£1,500",
    idealFor:
      "Mandatory for individuals who have previously completed the 3-day FAW course and need to renew their certification every 3 years.",
    originalPrice: "£2,040",
    discount: "£540",
    highlights: [
      "Updates to first aid protocols",
      "Refresher on practical skills (CPR, AED, wounds)",
      "Re-certification assessment",
      "Certification renewal",
    ],
  },
  {
    id: 4,
    name: "Paediatric First Aid (PFA)",
    link: "paediatric-first-aid",
    image: pfa,
    desc: "2-day specialist course for childcare professionals. Learn to handle pediatric emergencies and injuries in children.",
    duration: "2 Days",
    level: "Level 3",
    certification: "Ofqual Regulated",
    price: "£1,500",
    idealFor:
      "Essential for nurseries, pre-schools, childminders, and nannies requiring full EYFS & Ofsted compliance.",
    originalPrice: "£2,040",
    discount: "£540",
    highlights: [
      "Extensive coverage including CPR",
      "Choking, seizures and meningitis",
      "Anaphylaxis, fractures and head injuries",
      "Childhood illnesses",
    ],
  },
  {
    id: 5,
    name: "Emergency Paediatric First Aid (EPFA)",
    link: "emergency-paediatric-first-aid",
    image: epfa,
    desc: "1-day intensive course for urgent pediatric first aid situations. Perfect for carers and parents.",
    duration: "1 Day",
    level: "Entry Level",
    certification: "Ofqual Regulated",
    price: "£750",
    idealFor:
      "Nurseries, preschools, childminders, primary schools, and nannies requiring EYFS compliance.",
    originalPrice: "£1,020",
    discount: "£270",
    highlights: [
      "Infant & child CPR",
      "Choking protocols",
      "Anaphylaxis (allergies), bleeding",
      "Common childhood injuries",
    ],
  },
  {
    id: 6,
    name: "Basic Life Support (BLS)",
    link: "basic-life-support",
    image: bls,
    desc: "Half-day course, focused course on CPR and AED use. Ideal for healthcare professionals and the general public.",
    duration: "1/2 Day",
    level: "Essential",
    certification: "FAA Approved",
    price: "£375",
    idealFor:
      "Essential for care homes, healthcare professionals, gyms, GP/Dental practices, and office teams.",
    originalPrice: "£510",
    discount: "£135",
    highlights: [
      "CPR techniques",
      "AED operation",
      "Choking response",
      "Primary survey",
    ],
  },
  {
    id: 7,
    name: "Annual Refresher",
    link: "annual-refresher",
    image: FirstaidImg,
    desc: "Half-day refresher to keep your first aid skills current and meet annual training requirements.",
    duration: "1/2 Day",
    level: "Renewal",
    certification: "CPD Certified",
    price: "£375",
    idealFor:
      "Ideally booked between 3-year certification cycles to prevent skill fade and maintain compliance confidence.",
    originalPrice: "£510",
    discount: "£135",
    highlights: [
      "Skills maintenance",
      "Latest techniques",
      "Practical updates",
      "Compliance assured",
    ],
  },
];
