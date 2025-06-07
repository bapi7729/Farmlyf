import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/50 w-full max-w-screen overflow-x-hidden">
      <div className="container py-12 mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Farmlyf</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Pure, Nutritious, and Delicious Dry Fruits
            </p>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold">{section.title}</h4>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Farmlyf. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
