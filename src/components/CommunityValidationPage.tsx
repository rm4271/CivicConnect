import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Award, 
  Star,
  Trash2,
  Construction,
  Lightbulb,
  Filter,
  TrendingUp,
  Users,
  CheckCircle,
  Trophy,
  Medal,
  Crown,
  IdCard
} from 'lucide-react';

interface CommunityValidationPageProps {
  onNavigate: (page: string) => void;
}

interface Issue {
  id: string;
  type: 'garbage' | 'pothole' | 'streetlight';
  title: string;
  description: string;
  location: string;
  image: string;
  status: 'pending' | 'verified' | 'resolved';
  upvotes: number;
  downvotes: number;
  comments: number;
  timeAgo: string;
  reportedBy: string;
  userVote?: 'up' | 'down' | null;
  priority: 'low' | 'medium' | 'high';
}

export function CommunityValidationPage({ onNavigate }: CommunityValidationPageProps) {
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: '1',
      type: 'garbage',
      title: 'Overflowing garbage bin near Metro Station',
      description: 'Large amount of waste scattered around the bin, creating hygiene issues.',
      location: 'Connaught Place Metro Station, New Delhi',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      status: 'pending',
      upvotes: 15,
      downvotes: 2,
      comments: 8,
      timeAgo: '2 hours ago',
      reportedBy: 'User#A1023',
      userVote: null,
      priority: 'high'
    },
    {
      id: '2',
      type: 'pothole',
      title: 'Deep pothole causing vehicle damage',
      description: 'Large pothole on main road causing accidents and vehicle damage.',
      location: 'MG Road, Bangalore',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      status: 'verified',
      upvotes: 32,
      downvotes: 1,
      comments: 12,
      timeAgo: '5 hours ago',
      reportedBy: 'User#B2047',
      userVote: 'up',
      priority: 'high'
    },
    {
      id: '3',
      type: 'streetlight',
      title: 'Non-functional street light in residential area',
      description: 'Street light has been out for a week, making the area unsafe at night.',
      location: 'Sector 15, Gurgaon',
      image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=400&h=300&fit=crop',
      status: 'pending',
      upvotes: 8,
      downvotes: 0,
      comments: 3,
      timeAgo: '1 day ago',
      reportedBy: 'User#C5891',
      userVote: null,
      priority: 'medium'
    }
  ]);

  const [userStats] = useState({
    points: 125,
    level: 3,
    badge: 'Community Validator',
    validationsToday: 5,
    streak: 7
  });

  const [newComment, setNewComment] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const getIssueIcon = (type: Issue['type']) => {
    switch (type) {
      case 'garbage': return Trash2;
      case 'pothole': return Construction;
      case 'streetlight': return Lightbulb;
      default: return Construction;
    }
  };

  const getIssueColor = (type: Issue['type']) => {
    switch (type) {
      case 'garbage': return 'bg-red-100 text-red-700';
      case 'pothole': return 'bg-orange-100 text-orange-700';
      case 'streetlight': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleVote = (issueId: string, voteType: 'up' | 'down') => {
    setIssues(prevIssues =>
      prevIssues.map(issue => {
        if (issue.id === issueId) {
          const currentVote = issue.userVote;
          let newUpvotes = issue.upvotes;
          let newDownvotes = issue.downvotes;
          let newUserVote: 'up' | 'down' | null = voteType;

          // Remove previous vote if exists
          if (currentVote === 'up') newUpvotes--;
          if (currentVote === 'down') newDownvotes--;

          // Add new vote if different from current
          if (currentVote === voteType) {
            newUserVote = null; // Remove vote if clicking same button
          } else {
            if (voteType === 'up') newUpvotes++;
            if (voteType === 'down') newDownvotes++;
          }

          return {
            ...issue,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote
          };
        }
        return issue;
      })
    );
  };

  const handleComment = (issueId: string) => {
    if (newComment.trim()) {
      setIssues(prevIssues =>
        prevIssues.map(issue =>
          issue.id === issueId
            ? { ...issue, comments: issue.comments + 1 }
            : issue
        )
      );
      setNewComment('');
      setSelectedIssue(null);
    }
  };

  return (
    <div className="container px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Validation</h1>
          <p className="text-muted-foreground">
            Help verify and prioritize civic issues reported by fellow citizens. 
            Earn points and build a stronger community together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Gamification Banner */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Earn points for validating issues!</h3>
                      <p className="text-sm text-muted-foreground">
                        Each validation earns 5 points. Quality comments earn bonus points.
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    +5 Points per validation
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Sample Success Stories */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Recent Success Stories
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>
                      <IdCard className="h-3 w-3 inline mr-1" />
                      <strong>User#A1023</strong> reported a pothole near Sector 5
                    </span>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      Verified by 12 users
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>
                      <IdCard className="h-3 w-3 inline mr-1" />
                      <strong>User#B2047</strong> flagged garbage overflow near Metro Station
                    </span>
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      Resolved in 3 hours
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                All Issues
              </Button>
              <Button variant="ghost" size="sm">Pending</Button>
              <Button variant="ghost" size="sm">High Priority</Button>
              <Button variant="ghost" size="sm">Near Me</Button>
            </div>

            {/* Issues List */}
            <div className="space-y-6">
              {issues.map((issue) => {
                const IssueIcon = getIssueIcon(issue.type);
                return (
                  <Card key={issue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        {/* Image */}
                        <div className="relative">
                          <ImageWithFallback
                            src={issue.image}
                            alt={issue.title}
                            className="w-full h-48 md:h-32 object-cover rounded-lg"
                          />
                          <Badge 
                            className={`absolute top-2 left-2 ${getIssueColor(issue.type)}`}
                          >
                            <IssueIcon className="h-3 w-3 mr-1" />
                            {issue.type}
                          </Badge>
                          <Badge 
                            className={`absolute top-2 right-2 border ${getPriorityColor(issue.priority)}`}
                          >
                            {issue.priority} priority
                          </Badge>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-2 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">{issue.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {issue.description}
                            </p>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {issue.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {issue.timeAgo}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">Reported by</span>
                              <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full">
                                <IdCard className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-sm font-medium">{issue.reportedBy}</span>
                              {issue.status === 'verified' && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>

                            <Badge 
                              variant={issue.status === 'resolved' ? 'default' : 'secondary'}
                              className={issue.status === 'verified' ? 'bg-green-100 text-green-700' : ''}
                            >
                              {issue.status}
                            </Badge>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant={issue.userVote === 'up' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleVote(issue.id, 'up')}
                                className="h-8"
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {issue.upvotes}
                              </Button>
                              <Button
                                variant={issue.userVote === 'down' ? 'destructive' : 'outline'}
                                size="sm"
                                onClick={() => handleVote(issue.id, 'down')}
                                className="h-8"
                              >
                                <ThumbsDown className="h-3 w-3 mr-1" />
                                {issue.downvotes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                                className="h-8"
                              >
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {issue.comments}
                              </Button>
                            </div>
                          </div>

                          {/* Comment Section */}
                          {selectedIssue === issue.id && (
                            <div className="space-y-4 pt-3 border-t">
                              {/* Existing Comments */}
                              <div className="space-y-3">
                                <h4 className="font-medium text-sm">Community Comments</h4>
                                {[
                                  {
                                    userId: 'User#D4521',
                                    comment: 'I can confirm this issue. Walked by this morning and it\'s gotten worse.',
                                    timeAgo: '1 hour ago',
                                    helpful: 8
                                  },
                                  {
                                    userId: 'User#E6789',
                                    comment: 'Reported this to local authorities. They said they\'ll address it within 48 hours.',
                                    timeAgo: '3 hours ago',
                                    helpful: 5
                                  }
                                ].map((comment, index) => (
                                  <div key={index} className="bg-muted/30 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center space-x-2">
                                        <IdCard className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-sm font-medium">{comment.userId}</span>
                                        <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <ThumbsUp className="h-3 w-3 text-green-600" />
                                        <span className="text-xs text-green-600">{comment.helpful}</span>
                                      </div>
                                    </div>
                                    <p className="text-sm">{comment.comment}</p>
                                  </div>
                                ))}
                              </div>

                              {/* Add Comment */}
                              <div className="space-y-3">
                                <Textarea
                                  placeholder="Add a helpful comment about this issue..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  rows={2}
                                />
                                <div className="flex justify-between items-center">
                                  <p className="text-xs text-muted-foreground">
                                    Posting as: <strong>User#C2156</strong>
                                  </p>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => setSelectedIssue(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      size="sm"
                                      onClick={() => handleComment(issue.id)}
                                      disabled={!newComment.trim()}
                                    >
                                      <MessageCircle className="h-3 w-3 mr-1" />
                                      Comment (+3 pts)
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Award className="h-4 w-4 mr-2" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.points}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Level {userStats.level}</span>
                    <span>85/100 XP</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center">
                    <Star className="h-3 w-3 mr-1" />
                    {userStats.badge}
                  </Badge>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="font-semibold">{userStats.validationsToday}</div>
                      <div className="text-muted-foreground">Today</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="font-semibold">{userStats.streak}</div>
                      <div className="text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Trophy className="h-4 w-4 mr-2" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    userId: 'User#B2047', 
                    issuesReported: 28, 
                    validations: 45, 
                    badge: 'Gold',
                    icon: Crown,
                    color: 'text-yellow-600'
                  },
                  { 
                    userId: 'User#A1023', 
                    issuesReported: 19, 
                    validations: 30, 
                    badge: 'Silver',
                    icon: Medal,
                    color: 'text-gray-500'
                  },
                  { 
                    userId: 'You (User#C2156)', 
                    issuesReported: 12, 
                    validations: 25, 
                    badge: 'Bronze',
                    icon: Award,
                    color: 'text-orange-600'
                  },
                  { 
                    userId: 'User#D3789', 
                    issuesReported: 8, 
                    validations: 18, 
                    badge: '',
                    icon: Star,
                    color: 'text-muted-foreground'
                  },
                ].map((contributor, index) => {
                  const IconComponent = contributor.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">{index + 1}.</span>
                          <IconComponent className={`h-4 w-4 ${contributor.color}`} />
                          <span className={`text-sm ${contributor.userId.includes('You') ? 'font-semibold' : ''}`}>
                            {contributor.userId}
                          </span>
                          {contributor.badge && (
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                contributor.badge === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                                contributor.badge === 'Silver' ? 'bg-gray-100 text-gray-700' :
                                'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {contributor.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground ml-6">
                        <span>{contributor.issuesReported} issues reported</span>
                        <span>{contributor.validations} validations</span>
                      </div>
                    </div>
                  );
                })}
                
                <div className="pt-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onNavigate('dashboard')}
                  >
                    <Trophy className="h-3 w-3 mr-1" />
                    View Full Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Issues Validated Today</span>
                    <Badge variant="secondary">47</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Community Accuracy</span>
                    <Badge variant="secondary">94%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Validators</span>
                    <Badge variant="secondary">156</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}