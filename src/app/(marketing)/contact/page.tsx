import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container py-12 mx-auto px-2 md:px-8 lg:px-16 w-full max-w-screen overflow-x-hidden">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We'd love to hear from you! Reach out with questions, feedback, or
          just to say hello.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">Contact Address</h3>
                <p className="text-muted-foreground">
                  HIG-461,K-5 Subudhipur, Kalinga Nagar
                  <br />
                  Bhubaneswar, Khorda Nagar, Odisha-751019
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">Manufacturing Unit Address</h3>

                <p className="text-muted-foreground">
                  Kamal enterprises, Jhinkaragadi
                  <br />
                  Bhaliabol kateni, Dhenkanal-759015, Odisha
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">
                  <Link href="tel:+911234567890" className="hover:underline">
                    1800 890 8177
                  </Link>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  24/7 support services
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 mt-1 text-primary" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">
                  <Link
                    href="mailto:care@farmlyf.in"
                    className="hover:underline"
                  >
                    care@farmlyf.in
                  </Link>
                  <br />
                  <Link
                    href="mailto:sales@farmlyf.in"
                    className="hover:underline"
                  >
                    sales@farmlyf.in
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {/* Replace with your actual map embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.5301190144733!2d85.5177018745449!3d20.607238002124213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a18e0d553c1221f%3A0x3e0695a0033ae77c!2sKamal%20Enterprises%2CDhenkanal!5e0!3m2!1sen!2sin!4v1748498249968!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
        </div>
      </div>
    </div>
  );
}
