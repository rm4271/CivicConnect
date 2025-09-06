import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
  TrendingUp,
  Calendar,
  Users,
  Filter,
  Eye,
  ThumbsUp,
  Trash2,
  Construction,
  Lightbulb
} from 'lucide-react';

interface CitizenTrackerPageProps {
  onNavigate: (page: string) => void;
}

interface TrackedIssue {
  id: string;
  title: string;
  type: 'garbage' | 'pothole' | 'streetlight';
  location: string;
  image: string;
  status: 'submitted' | 'verified' | 'in-progress' | 'resolved' | 'escalated';
  submittedDate: string;
  lastUpdate: string;
  estimatedResolution: string;
  description: string;
  upvotes: number;
  views: number;
  reportedBy: string;
  assignedTeam?: string;
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  id: string;
  type: 'submitted' | 'verified' | 'assigned' | 'in-progress' | 'resolved' | 'escalated' | 'comment';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  automated?: boolean;
}

export function CitizenTrackerPage({ onNavigate }: CitizenTrackerPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState<string | null>('1');

  const trackedIssues: TrackedIssue[] = [
    {
      id: '1',
      title: 'Overflowing garbage bin near Metro Station',
      type: 'garbage',
      location: 'Connaught Place Metro Station, New Delhi',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      status: 'in-progress',
      submittedDate: '2025-01-15',
      lastUpdate: '2 hours ago',
      estimatedResolution: 'Tomorrow',
      description: 'Large amount of waste scattered around the bin, creating hygiene issues and attracting stray animals.',
      upvotes: 23,
      views: 156,
      reportedBy: 'You',
      assignedTeam: 'Sanitation Team Alpha',
      timeline: [
        {
          id: '1',
          type: 'submitted',
          title: 'Issue Reported',
          description: 'Issue submitted with photo evidence and GPS location',
          timestamp: '2025-01-15T09:30:00Z',
          user: 'You'
        },
        {
          id: '2',
          type: 'verified',
          title: 'Community Verified',
          description: 'Issue verified by community members (23 upvotes)',
          timestamp: '2025-01-15T11:45:00Z',
          automated: true
        },
        {
          id: '3',
          type: 'assigned',
          title: 'Team Assigned',
          description: 'Assigned to Sanitation Team Alpha for resolution',
          timestamp: '2025-01-15T14:20:00Z',
          user: 'Municipal Authority'
        },
        {
          id: '4',
          type: 'in-progress',
          title: 'Work in Progress',
          description: 'Team has arrived on site and started cleanup operations',
          timestamp: '2025-01-16T08:15:00Z',
          user: 'Sanitation Team Alpha'
        }
      ]
    },
    {
      id: '2',
      title: 'Broken streetlight in residential area',
      type: 'streetlight',
      location: 'Sector 15, Gurgaon',
      image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=400&h=300&fit=crop',
      status: 'resolved',
      submittedDate: '2025-01-10',
      lastUpdate: '3 days ago',
      estimatedResolution: 'Completed',
      description: 'Street light pole damaged and not functioning, creating safety concerns.',
      upvotes: 15,
      views: 89,
      reportedBy: 'You',
      assignedTeam: 'Electrical Maintenance',
      timeline: [
        {
          id: '1',
          type: 'submitted',
          title: 'Issue Reported',
          description: 'Issue submitted with detailed location information',
          timestamp: '2025-01-10T18:45:00Z',
          user: 'You'
        },
        {
          id: '2',
          type: 'verified',
          title: 'Authority Verified',
          description: 'Verified by local authority inspection team',
          timestamp: '2025-01-11T10:30:00Z',
          user: 'Authority Inspector'
        },
        {
          id: '3',
          type: 'assigned',
          title: 'Team Assigned',
          description: 'Assigned to Electrical Maintenance team',
          timestamp: '2025-01-11T15:20:00Z',
          user: 'Municipal Authority'
        },
        {
          id: '4',
          type: 'resolved',
          title: 'Issue Resolved',
          description: 'Streetlight repaired and functioning normally',
          timestamp: '2025-01-13T16:45:00Z',
          user: 'Electrical Maintenance'
        }
      ]
    }
  ];

  const getIssueIcon = (type: TrackedIssue['type']) => {
    switch (type) {
      case 'garbage': return Trash2;
      case 'pothole': return Construction;
      case 'streetlight': return Lightbulb;
    }
  };

  const getStatusColor = (status: TrackedIssue['status']) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'verified': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-emerald-100 text-emerald-700';
      case 'escalated': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTimelineIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'submitted': return Clock;
      case 'verified': return CheckCircle;
      case 'assigned': return Users;
      case 'in-progress': return TrendingUp;
      case 'resolved': return CheckCircle;
      case 'escalated': return AlertCircle;
      case 'comment': return MessageCircle;
    }
  };

  const handleShare = (platform: string, issue: TrackedIssue) => {
    const url = `${window.location.origin}/issue/${issue.id}`;
    const text = `Check out this civic issue: ${issue.title} - ${issue.location}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
    }
  };

  const selectedIssueData = trackedIssues.find(issue => issue.id === selectedIssue);

  return (
    <div className="container px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Issues</h1>
          <p className="text-muted-foreground">
            Monitor the progress of civic issues you've reported and see how your community is making a difference.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your reported issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus('all')}
                >
                  All
                </Button>
                <Button
                  variant={selectedStatus === 'in-progress' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus('in-progress')}
                >
                  In Progress
                </Button>
                <Button
                  variant={selectedStatus === 'resolved' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus('resolved')}
                >
                  Resolved
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Issues List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-semibold">Your Reported Issues</h2>
            {trackedIssues.map((issue) => {
              const IssueIcon = getIssueIcon(issue.type);
              return (
                <Card 
                  key={issue.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedIssue === issue.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedIssue(issue.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <IssueIcon className="h-4 w-4 text-muted-foreground" />
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{issue.lastUpdate}</span>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm leading-tight">{issue.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {issue.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {issue.upvotes}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {issue.views}
                          </div>
                        </div>
                        <span>Est: {issue.estimatedResolution}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate('report')}
            >
              Report New Issue
            </Button>
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-2">
            {selectedIssueData ? (
              <div className="space-y-6">
                {/* Issue Header */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <ImageWithFallback
                          src={selectedIssueData.image}
                          alt={selectedIssueData.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(selectedIssueData.status)}>
                              {selectedIssueData.status.replace('-', ' ')}
                            </Badge>
                            <Badge variant="outline">
                              ID: {selectedIssueData.id}
                            </Badge>
                          </div>
                          <h2 className="text-xl font-bold">{selectedIssueData.title}</h2>
                          <div className="flex items-center text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {selectedIssueData.location}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {selectedIssueData.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Submitted:</span>
                            <div className="font-medium">{new Date(selectedIssueData.submittedDate).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Last Update:</span>
                            <div className="font-medium">{selectedIssueData.lastUpdate}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Est. Resolution:</span>
                            <div className="font-medium">{selectedIssueData.estimatedResolution}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Community Support:</span>
                            <div className="font-medium">{selectedIssueData.upvotes} upvotes</div>
                          </div>
                        </div>

                        {selectedIssueData.assignedTeam && (
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Assigned to:</span>
                              <div className="font-medium">{selectedIssueData.assignedTeam}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Sharing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share This Issue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('twitter', selectedIssueData)}
                        className="flex items-center"
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('facebook', selectedIssueData)}
                        className="flex items-center"
                      >
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('whatsapp', selectedIssueData)}
                        className="flex items-center"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(`${window.location.origin}/issue/${selectedIssueData.id}`)}
                      >
                        Copy Link
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Share this issue to raise awareness and get more community support for faster resolution.
                    </p>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Progress Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {selectedIssueData.timeline.map((event, index) => {
                        const TimelineIcon = getTimelineIcon(event.type);
                        const isLast = index === selectedIssueData.timeline.length - 1;
                        
                        return (
                          <div key={event.id} className="relative">
                            {!isLast && (
                              <div className="absolute left-6 top-12 w-0.5 h-8 bg-border"></div>
                            )}
                            
                            <div className="flex items-start space-x-4">
                              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                                <TimelineIcon className="h-5 w-5 text-primary" />
                              </div>
                              
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{event.title}</h4>
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(event.timestamp).toLocaleDateString()} {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                
                                <p className="text-sm text-muted-foreground">
                                  {event.description}
                                </p>
                                
                                {event.user && (
                                  <div className="flex items-center space-x-2 mt-2">
                                    <Avatar className="h-5 w-5">
                                      <AvatarFallback className="text-xs">
                                        {event.user.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">
                                      {event.user}
                                    </span>
                                    {event.automated && (
                                      <Badge variant="secondary" className="text-xs">
                                        Automated
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select an Issue</h3>
                    <p>Choose an issue from the list to view its detailed progress and timeline.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}