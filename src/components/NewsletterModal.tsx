import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import newsletterModel from "@/assets/newsletter-model.jpg";
import { motion } from "framer-motion";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal = ({ isOpen, onClose }: NewsletterModalProps) => {
  const [email, setEmail] = useState("");
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to Shades!",
        description:
          "You've successfully subscribed to our newsletter. Check your email for a special discount code!",
      });

      if (dontShowAgain) {
        localStorage.setItem("newsletter-dismissed", "true");
      }

      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("newsletter-dismissed", "true");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 bg-white overflow-hidden">
        {/* 👇 نلف الكونتنت كله بمotion.div */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.9 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.6,
          }}
          className="grid md:grid-cols-2"
        >
          {/* Image Section */}
          <div className="relative bg-gradient-primary p-8 flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <img
                src={newsletterModel}
                alt="Beautiful woman with golden under-eye patches"
                className="w-full h-auto rounded-lg shadow-elegant"
              />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-rose-gold/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 relative">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl font-bold text-center mb-2">
                NEWSLETTER
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground leading-relaxed">
                Subscribe to the Shades mailing list to receive updates on new
                arrivals, special offers, and other discount information
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your mail..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 text-center border-2 border-muted focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 btn-gradient text-white font-semibold text-lg"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>

              {/* Coupon Code Display */}
              <div className="border border-dashed border-muted p-4 rounded-lg bg-accent/20">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Your Coupon code shown here
                  </p>
                  <div className="font-mono text-lg font-bold text-primary bg-white px-4 py-2 rounded border-2 border-dashed border-primary/30">
                    SHADES20
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dont-show"
                  checked={dontShowAgain}
                  onCheckedChange={(checked) =>
                    setDontShowAgain(checked as boolean)
                  }
                />
                <label
                  htmlFor="dont-show"
                  className="text-sm text-muted-foreground"
                >
                  Do not show this popup again
                </label>
              </div>
            </form>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterModal;
