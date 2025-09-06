import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Camera, 
  MapPin, 
  Users, 
  CheckCircle, 
  TrendingUp,
  Award,
  Trash2,
  Construction,
  Lightbulb
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Camera,
      title: "Quick Reporting",
      description: "Snap a photo and report civic issues instantly with auto-location tagging"
    },
    {
      icon: Users,
      title: "Community Validation",
      description: "Citizens verify reports for accuracy and build stronger communities"
    },
    {
      icon: CheckCircle,
      title: "Real-time Tracking",
      description: "Monitor issue progress from submission to resolution with live updates"
    },
    {
      icon: Award,
      title: "Gamified Experience",
      description: "Earn points and badges for active civic participation and contributions"
    }
  ];

  const issueTypes = [
    { icon: Trash2, label: "Garbage", color: "bg-red-100 text-red-600" },
    { icon: Construction, label: "Potholes", color: "bg-orange-100 text-orange-600" },
    { icon: Lightbulb, label: "Streetlights", color: "bg-yellow-100 text-yellow-600" }
  ];

  const stats = [
    { value: "2,847", label: "Issues Reported", change: "+12%" },
    { value: "1,923", label: "Issues Resolved", change: "+8%" },
    { value: "15,642", label: "Active Citizens", change: "+24%" },
    { value: "89%", label: "Resolution Rate", change: "+5%" }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10">
        <div className="container px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Award className="h-3 w-3 mr-1" />
                  Smart India Hackathon 2025
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="text-primary">Spot it.</span>{" "}
                  <span className="text-foreground">Report it.</span>{" "}
                  <span className="text-primary">Resolve it.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Transform your city with CivicConnect. Report civic issues, engage with your community, 
                  and track real-time progress toward cleaner, safer neighborhoods.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate('report')}
                  className="group"
                >
                  <Camera className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Report an Issue
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate('track')}
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Track Issues
                </Button>
              </div>

              {/* Quick Issue Types */}
              <div className="flex flex-wrap gap-3 pt-4">
                {issueTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className={`${type.color} cursor-pointer hover:scale-105 transition-transform`}
                      onClick={() => onNavigate('report')}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {type.label}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1593643568059-89b46c7a5eed?w=600&h=400&fit=crop"
                  alt="Smart city with civic infrastructure"
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
              </div>
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg border z-20">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Issue Resolved!</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border z-20">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">15 Reports Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How CivicConnect Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines citizen reporting, community validation, and government action 
            to create a transparent, efficient civic engagement ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens already using CivicConnect to improve their communities. 
            Every report counts, every vote matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => onNavigate('report')}
            >
              <Camera className="h-5 w-5 mr-2" />
              Start Reporting
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              onClick={() => onNavigate('community')}
            >
              <Users className="h-5 w-5 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}