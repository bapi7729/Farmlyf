import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface FooterSection {
  title: string;
  links: NavLink[];
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const Products: Product[] = [
  {
    id: "1",
    title: "Plain Cashew",
    description:
      "Handpicked, premium-quality cashews with a natural creamy taste.",
    price: 499,
    rating: 4.8,
    image: "farmlyf/fgo3wqhfbhomi7objlii",
    category: "nuts",
  },
  {
    id: "2",
    title: "Salted Cashew",
    description:
      "Deliciously roasted cashews with a light touch of salt for the perfect snack.",
    price: 549,
    rating: 4.6,
    image: "farmlyf/we8lymvzn7vkgle2pail",
    category: "nuts",
  },
  {
    id: "3",
    title: "Spicy Masala Cashew",
    description:
      "Crunchy cashews coated with a bold blend of aromatic spices for a flavorful, zesty snack.",
    price: 549,
    rating: 4.6,
    image: "farmlyf/xy8tende8zknja5quia4",
    category: "nuts",
  },
  // Add more products...
];

export const FOOTER_LINKS: FooterSection[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { label: "FAQs", href: "/faq" },

      { label: "Contact Support", href: "/contact" },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/people/Farmlyf-India/pfbid03561i3gVp8WKWtsLSVfDwZXy3Fsp63yemAzvZ9f8ZnEhpTZgFkYACTSMsL1wnU1B2l/",
    icon: Facebook,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/farmlyfindia/",
    icon: Instagram,
  },
  { name: "Twitter", url: "#", icon: Twitter },
  { name: "LinkedIn", url: "#", icon: Linkedin },
];
