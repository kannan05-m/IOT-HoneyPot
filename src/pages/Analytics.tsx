import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  const navigate = useNavigate();

  const topAttackTypes = [
    { type: "Brute Force", count: 342, percentage: 40 },
    { type: "Port Scanning", count: 256, percentage: 30 },
    { type: "Malware Upload", count: 171, percentage: 20 },
    { type: "SQL Injection", count: 78, percentage: 10 },
  ];

  const topCountries = [
    { country: "United States", count: 234, flag: "🇺🇸" },
    { country: "China", count: 189, flag: "🇨🇳" },
    { country: "Russia", count: 156, flag: "🇷🇺" },
    { country: "Germany", count: 98, flag: "🇩🇪" },
    { country: "Brazil", count: 76, flag: "🇧🇷" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 glow-text">
              Attack Analytics
            </h1>
            <p className="text-muted-foreground">Comprehensive threat intelligence overview</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Zap, label: "Avg Response Time", value: "127ms", color: "text-primary" },
            { icon: TrendingUp, label: "Attack Trend", value: "+23%", color: "text-destructive" },
            { icon: Globe, label: "Countries", value: "47", color: "text-secondary" },
            { icon: BarChart3, label: "Success Rate", value: "0.03%", color: "text-accent" },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <Card className="border-primary/20 bg-card/50 backdrop-blur card-glow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                    <div className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Attack Types */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Top Attack Types</CardTitle>
                <CardDescription>Most common attack vectors detected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topAttackTypes.map((attack, index) => (
                  <motion.div
                    key={attack.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-medium">{attack.type}</span>
                      <span className="text-muted-foreground">{attack.count} attacks</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${attack.percentage}%` }}
                        transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Geographic Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Geographic Distribution</CardTitle>
                <CardDescription>Attack origins by country</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCountries.map((country, index) => (
                  <motion.div
                    key={country.country}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="text-sm font-medium text-foreground">
                        {country.country}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">{country.count}</div>
                      <div className="text-xs text-muted-foreground">attacks</div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Weekly Trend Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-6"
        >
          <Card className="border-primary/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-primary">Attack Trends (7 Days)</CardTitle>
              <CardDescription>Daily attack volume over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-around gap-4">
                {[65, 85, 45, 95, 78, 88, 92].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-primary to-primary-glow rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-primary/20 px-2 py-1 rounded text-xs whitespace-nowrap">
                      {Math.floor(height * 8)} attacks
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-around mt-4 text-xs text-muted-foreground">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
