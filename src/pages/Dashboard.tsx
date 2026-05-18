import { motion } from "framer-motion";
import { Shield, Activity, AlertTriangle, Server, Users, Clock, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { fetchAttackLogs, formatTime, type AttackLog } from "@/lib/attackData";

export default function Dashboard() {
  const navigate = useNavigate();
  const [attackLogs, setAttackLogs] = useState<AttackLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      const logs = await fetchAttackLogs();
      setAttackLogs(logs);
      setIsLoading(false);
    };
    
    loadLogs();
    
    // Refresh every 5 seconds
    const interval = setInterval(loadLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Activity,
      label: "Active Honeypots",
      value: "12",
      change: "+3 from last hour",
      color: "text-primary",
    },
    {
      icon: AlertTriangle,
      label: "Attacks Detected",
      value: "847",
      change: "+127 today",
      color: "text-destructive",
    },
    {
      icon: Users,
      label: "Unique Attackers",
      value: "234",
      change: "+18 this week",
      color: "text-secondary",
    },
    {
      icon: Server,
      label: "Data Captured",
      value: "2.4 GB",
      change: "+420 MB today",
      color: "text-accent",
    },
  ];

  const recentAttacks = [
    { time: "2 min ago", ip: "192.168.1.45", type: "Brute Force", severity: "high" },
    { time: "5 min ago", ip: "10.0.0.123", type: "Port Scan", severity: "medium" },
    { time: "12 min ago", ip: "172.16.0.99", type: "Malware Upload", severity: "critical" },
    { time: "18 min ago", ip: "192.168.2.87", type: "SQL Injection", severity: "high" },
    { time: "25 min ago", ip: "10.10.10.55", type: "XSS Attempt", severity: "low" },
  ];

  const getSeverityBadgeVariant = (severity: string): "default" | "secondary" | "destructive" => {
    switch (severity.toUpperCase()) {
      case "CRITICAL":
        return "destructive";
      case "MEDIUM":
      case "HIGH":
        return "default";
      case "LOW":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-secondary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground glow-text">
                IoT Lure Guard
              </h1>
              <p className="text-secondary text-sm">
                Real-time Honeypot Monitoring
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="border-secondary/30 text-secondary hover:bg-secondary/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button 
              variant="glow"
              className="bg-secondary/20 border-secondary/50 text-secondary hover:bg-secondary/30"
            >
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse mr-2" />
              Live
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <Card className="border-primary/20 bg-card/50 backdrop-blur card-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Attack Logs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6"
        >
          <Card className="border-secondary/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  Recent Attack Logs
                </CardTitle>
                <div className="flex items-center gap-2 text-secondary text-sm">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Real-time
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading attack logs...</div>
              ) : attackLogs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No attack logs available</div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    {/* Header */}
                    <div className="grid grid-cols-5 gap-4 p-4 bg-muted/20 rounded-t-lg border border-border/30 text-muted-foreground text-sm font-medium">
                      <div>Source IP</div>
                      <div>Attack Type</div>
                      <div>Protocol</div>
                      <div>Severity</div>
                      <div className="text-right">Time</div>
                    </div>
                    
                    {/* Rows */}
                    <div className="space-y-0">
                      {attackLogs.map((log, index) => (
                        <motion.div
                          key={`${log.source_ip}-${log.timestamp}-${index}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="grid grid-cols-5 gap-4 p-4 border-x border-b border-border/30 hover:bg-muted/20 transition-colors"
                        >
                          <div className="text-foreground font-mono text-sm">
                            {log.source_ip}
                          </div>
                          <div className="text-foreground text-sm">
                            {log.attack_type}
                          </div>
                          <div className="text-foreground font-mono text-sm">
                            {log.protocol}
                          </div>
                          <div>
                            <Badge 
                              variant={getSeverityBadgeVariant(log.severity)}
                              className="font-semibold"
                            >
                              {log.severity}
                            </Badge>
                          </div>
                          <div className="text-secondary text-sm text-right font-mono">
                            {formatTime(log.timestamp)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats and System Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats - takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <Card className="border-primary/20 bg-card/50 backdrop-blur card-glow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </CardTitle>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  System Status
                </CardTitle>
                <CardDescription>All systems operational</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Honeypot Network", status: "Online", color: "bg-secondary" },
                  { name: "Log Collection", status: "Active", color: "bg-secondary" },
                  { name: "Alert System", status: "Armed", color: "bg-primary" },
                  { name: "Database", status: "Healthy", color: "bg-secondary" },
                ].map((system, index) => (
                  <motion.div
                    key={system.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-foreground">{system.name}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${system.color} animate-pulse`} />
                      <span className="text-xs text-muted-foreground">{system.status}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
