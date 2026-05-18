import { motion } from "framer-motion";
import { Shield, Activity, AlertTriangle, BarChart3, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Simulated IoT Devices",
      description: "Fake endpoints that mimic real IoT devices to attract attackers",
    },
    {
      icon: Activity,
      title: "Real-time Logging",
      description: "Every interaction is recorded for forensic analysis",
    },
    {
      icon: AlertTriangle,
      title: "Brute-Force Detection",
      description: "Automatic alerts when ≥5 failed attempts detected",
    },
    {
      icon: BarChart3,
      title: "Attack Analytics",
      description: "Visualize attack patterns and trends over time",
    },
    {
      icon: Lock,
      title: "Safe & Isolated",
      description: "No risk to real systems - completely sandboxed",
    },
    {
      icon: Eye,
      title: "File Upload Monitoring",
      description: "Detect malware and fake firmware uploads instantly",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 cyber-grid" />
      
      {/* Glowing orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-destructive/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent animate-pulse-glow">
              IoT HONEYPOT SYSTEM
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Advanced Threat Detection & Analysis Platform
          </motion.p>
          
          <motion.p
            className="text-base md:text-lg text-muted-foreground/80 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A sophisticated security trap that mimics real IoT devices to attract and analyze cyber attacks. 
            Study hacker behavior safely while protecting your actual infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <Button
              variant="glow"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="text-base md:text-lg px-8 py-6 font-bold w-full sm:w-auto"
            >
              Launch Dashboard
            </Button>
            <Button
              variant="glowSecondary"
              size="lg"
              onClick={() => navigate("/analytics")}
              className="text-base md:text-lg px-8 py-6 font-bold w-full sm:w-auto"
            >
              View Analytics
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 bg-card/50 backdrop-blur border border-primary/20 rounded-lg hover:border-primary/40 transition-all cursor-pointer card-glow"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 glow-text">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "01", text: "Simulate IoT Devices" },
              { number: "02", text: "Attract Attackers" },
              { number: "03", text: "Log & Analyze" },
              { number: "04", text: "Generate Alerts" },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2 + index * 0.15 }}
                className="p-6 bg-secondary/20 border border-primary/10 rounded-lg hover:border-secondary/40 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{step.number}</div>
                <div className="text-sm text-muted-foreground">{step.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
