import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate with Zod
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: "Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to send message");
      }

      if (data?.error) {
        throw new Error(data.error);
      }
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          I'm always open to new opportunities and collaborations.
        </p>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <div>
            {/* Contact Information */}
            <h2 className="text-sm font-semibold mb-6">
              <span className="text-muted-foreground">//</span> Contact Information
            </h2>

            <div className="space-y-4 mb-10">
              {/* Email */}
              <div className="flex items-center gap-4">
                <a
                  href="mailto:diini@st.snu.edu.so"
                  className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                </a>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <a
                    href="mailto:diini@st.snu.edu.so"
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    diini@st.snu.edu.so
                  </a>
                </div>
              </div>

              {/* Phone - WhatsApp */}
              <div className="flex items-center gap-4">
                <a
                  href="https://wa.me/252612039107"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                </a>
                <div>
                  <div className="text-xs text-muted-foreground">WhatsApp</div>
                  <a
                    href="https://wa.me/252612039107"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    +252 612 039 107
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="text-sm text-foreground">Mogadishu, Somalia</div>
                </div>
              </div>
            </div>

            {/* Find me on */}
            <h2 className="text-sm font-semibold mb-4">
              <span className="text-muted-foreground">//</span> Find me on
            </h2>

            <div className="flex gap-3 mb-8">
              <a
                href="https://github.com/Diini03"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/diinikahiye/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Availability */}
            <div className="terminal-card p-4">
              <div className="text-sm text-muted-foreground mb-1">
                <span className="text-primary">$</span> check_availability
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-foreground">
                  Available for freelance & full-time
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="terminal-card p-6">
            <h2 className="text-sm font-semibold mb-6">
              <span className="text-muted-foreground">//</span> Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  maxLength={100}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  maxLength={255}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  maxLength={1000}
                  rows={4}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-primary-foreground rounded font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}