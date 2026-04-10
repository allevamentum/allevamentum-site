"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section className="sec sec-cta" id="contact">
      <div className="container">
        <div className="cta-grid">
          <div className="cta-left">
            <span className="label" data-anim="blur">Start Building</span>
            <h2 className="heading-xxl" data-anim="blur">
              Have an idea?<br />Let&apos;s make it <em>real</em>.
            </h2>
            <p className="cta-desc" data-anim="fade">
              Tell us about your application. We&apos;ll map the fastest path
              from concept to launch.
            </p>
            <div className="cta-info" data-anim="fade">
              <div>
                <span className="cta-info-l">Email</span>
                <a href="mailto:hello@allevamentum.com">hello@allevamentum.com</a>
              </div>
              <div>
                <span className="cta-info-l">Availability</span>
                <span>Accepting new projects for Q2 2026</span>
              </div>
            </div>
          </div>
          <div className="cta-right" data-anim="scale">
            <div className="form-card glass-card" data-glow>
              <div className="glass-shine" />
              <form className="av-form" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="text"
                  placeholder="Your Name"
                  required
                  aria-label="Your name"
                  className="h-auto border-[var(--av-glass-border)] bg-[var(--av-bg-glass)] text-[var(--av-text)] placeholder:text-[var(--av-text3)] backdrop-blur-[20px] rounded-[var(--av-radius-sm)] px-5 py-4 text-sm focus:border-[var(--av-accent)] focus:shadow-[0_0_0_4px_var(--av-accent-soft),0_0_30px_rgba(79,125,247,0.1)] focus:scale-[1.01] focus:bg-[var(--av-bg-glass-vivid)] transition-all duration-500"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  required
                  aria-label="Email address"
                  className="h-auto border-[var(--av-glass-border)] bg-[var(--av-bg-glass)] text-[var(--av-text)] placeholder:text-[var(--av-text3)] backdrop-blur-[20px] rounded-[var(--av-radius-sm)] px-5 py-4 text-sm focus:border-[var(--av-accent)] focus:shadow-[0_0_0_4px_var(--av-accent-soft),0_0_30px_rgba(79,125,247,0.1)] focus:scale-[1.01] focus:bg-[var(--av-bg-glass-vivid)] transition-all duration-500"
                />
                <Select required>
                  <SelectTrigger
                    className="h-auto border-[var(--av-glass-border)] bg-[var(--av-bg-glass)] text-[var(--av-text3)] backdrop-blur-[20px] rounded-[var(--av-radius-sm)] px-5 py-4 text-sm focus:border-[var(--av-accent)] focus:shadow-[0_0_0_4px_var(--av-accent-soft)] transition-all duration-500"
                    aria-label="Service type"
                  >
                    <SelectValue placeholder="What are you building?" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--av-bg2)] border-[var(--av-glass-border)] text-[var(--av-text)]">
                    <SelectItem value="mobile">Mobile Application</SelectItem>
                    <SelectItem value="ai">AI-Powered Solution</SelectItem>
                    <SelectItem value="cloud">Cloud Platform / SaaS</SelectItem>
                    <SelectItem value="iot">IoT / Connected System</SelectItem>
                    <SelectItem value="full">Full Product — Idea to Launch</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  rows={4}
                  placeholder="Describe your application idea and timeline"
                  required
                  aria-label="Project details"
                  className="border-[var(--av-glass-border)] bg-[var(--av-bg-glass)] text-[var(--av-text)] placeholder:text-[var(--av-text3)] backdrop-blur-[20px] rounded-[var(--av-radius-sm)] px-5 py-4 text-sm resize-y min-h-[100px] focus:border-[var(--av-accent)] focus:shadow-[0_0_0_4px_var(--av-accent-soft),0_0_30px_rgba(79,125,247,0.1)] focus:scale-[1.01] focus:bg-[var(--av-bg-glass-vivid)] transition-all duration-500"
                />
                <Button
                  type="submit"
                  className="btn-av"
                  data-magnetic
                >
                  <span>Send Message</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
