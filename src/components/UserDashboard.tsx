import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  Medal,
  Crown,
  Star, 
  Award, 
  TrendingUp,
  Calendar,
  Target,
  Users,
  CheckCircle,
  Eye,
  ThumbsUp,
  MessageCircle,
  Flame,
  Zap,
  IdCard,
  BarChart3,
  Clock,
  MapPin
} from 'lucide-react';

interface UserDashboardProps {
  onNavigate: (page: string) => void;
}

export function UserDashboard({ onNavigate }: UserDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  const userProfile = {
    userId: 'User#C2156',
    joinDate: '2024-11-15',
    currentRank: 3,
    totalPoints: 185,
    level: 4,
    nextLevelPoints: 250,
    badges: ['Bronze Contributor', 'Community Validator', 'Early Reporter', 'Streak Master'],
    streak: 12,
    issuesReported: 12,
    validationsCompleted: 25,
    commentsPosted: 18,
    upvotesReceived: 47
  };

  const leaderboard = [
    { 
      rank: 1,
      userId: 'User#B2047', 
      points: 425, 
      issuesReported: 28, 
      validations: 45,
      badge: 'Gold',
      icon: Crown,
      color: 'text-yellow-600'
    },
    { 
      rank: 2,
      userId: 'User#A1023', 
      points: 298, 
      issuesReported: 19, 
      validations: 30,
      badge: 'Silver',
      icon: Medal,
      color: 'text-gray-500'
    },
    { 
      rank: 3,
      userId: 'You (User#C2156)', 
      points: 185, 
      issuesReported: 12, 
      validations: 25,
      badge: 'Bronze',
      icon: Award,
      color: 'text-orange-600',
      isUser: true
    },
    { 
      rank: 4,
      userId: 'User#D3789', 
      points: 156, 
      issuesReported: 8, 
      validations: 18,
      badge: '',
      icon: Star,
      color: 'text-muted-foreground'
    },
    { 
      rank: 5,
      userId: 'User#E4521', 
      points: 134, 
      issuesReported: 6, 
      validations: 22,
      badge: '',
      icon: Star,
      color: 'text-muted-foreground'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'validation',
      description: 'Validated issue: Pothole near Central Park',
      points: 5,
      timeAgo: '2 hours ago',
      icon: CheckCircle
    },
    {
      id: '2',
      type: 'report',
      description: 'Reported streetlight issue in Sector 12',
      points: 10,
      timeAgo: '1 day ago',
      icon: Target
    },
    {
      id: '3',
      type: 'comment',
      description: 'Added helpful comment on garbage issue',
      points: 3,
      timeAgo: '2 days ago',
      icon: MessageCircle
    },
    {
      id: '4',
      type: 'upvote',
      description: 'Your report received 5 new upvotes',
      points: 5,
      timeAgo: '3 days ago',
      icon: ThumbsUp
    }
  ];

  const achievements = [
    {
      name: 'Bronze Contributor',
      description: 'Reported 10+ civic issues',
      icon: Award,
      color: 'text-orange-600',
      unlocked: true,
      progress: 100
    },
    {
      name: 'Community Validator',
      description: 'Validated 20+ community reports',
      icon: CheckCircle,
      color: 'text-green-600',
      unlocked: true,
      progress: 100
    },
    {
      name: 'Early Reporter',
      description: 'First to report an issue in your area',
      icon: Zap,
      color: 'text-blue-600',
      unlocked: true,
      progress: 100
    },
    {
      name: 'Streak Master',
      description: 'Active for 7+ consecutive days',
      icon: Flame,
      color: 'text-red-600',
      unlocked: true,
      progress: 100
    },
    {
      name: 'Silver Contributor',
      description: 'Report 20+ civic issues',
      icon: Medal,
      color: 'text-gray-500',
      unlocked: false,
      progress: 60
    },
    {
      name: 'Top Validator',
      description: 'Validate 50+ community reports',
      icon: Trophy,
      color: 'text-yellow-600',
      unlocked: false,
      progress: 50
    }
  ];

  const weeklyStats = [
    { day: 'Mon', reports: 2, validations: 3 },
    { day: 'Tue', reports: 1, validations: 5 },
    { day: 'Wed', reports: 0, validations: 4 },
    { day: 'Thu', reports: 3, validations: 2 },
    { day: 'Fri', reports: 1, validations: 6 },
    { day: 'Sat', reports: 2, validations: 3 },
    { day: 'Sun', reports: 1, validations: 2 }
  ];

  return (
    <div className="container px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with Motivational Banner */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">User Dashboard</h1>
              <p className="text-muted-foreground">Track your civic engagement and community impact</p>
            </div>
            <div className="flex items-center space-x-2">
              <IdCard className="h-5 w-5 text-primary" />
              <span className="font-medium">{userProfile.userId}</span>
            </div>
          </div>

          {/* Motivational Banner */}
          <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">You're ranked #{userProfile.currentRank} this week!</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep contributing to climb higher on the leaderboard
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15 points this week
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    <Flame className="h-3 w-3 mr-1" />
                    {userProfile.streak} day streak
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold text-primary">{userProfile.totalPoints}</p>
                </div>
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Progress 
                  value={(userProfile.totalPoints / userProfile.nextLevelPoints) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {userProfile.nextLevelPoints - userProfile.totalPoints} points to Level {userProfile.level + 1}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Issues Reported</p>
                  <p className="text-2xl font-bold">{userProfile.issuesReported}</p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+2 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Validations</p>
                  <p className="text-2xl font-bold">{userProfile.validationsCompleted}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+8 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Rank</p>
                  <p className="text-2xl font-bold text-orange-600">#{userProfile.currentRank}</p>
                </div>
                <Trophy className="h-8 w-8 text-orange-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">Moved up 2 ranks</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium w-8">{stat.day}</span>
                        <div className="flex-1 mx-4">
                          <div className="flex space-x-2">
                            <div className="flex-1">
                              <div className="h-2 bg-blue-100 rounded">
                                <div 
                                  className="h-2 bg-blue-500 rounded"
                                  style={{ width: `${(stat.reports / 3) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="h-2 bg-green-100 rounded">
                                <div 
                                  className="h-2 bg-green-500 rounded"
                                  style={{ width: `${(stat.validations / 6) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-3 text-xs">
                          <span className="text-blue-600">{stat.reports} reports</span>
                          <span className="text-green-600">{stat.validations} validations</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-6 mt-4 pt-4 border-t">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                      <span className="text-sm">Reports</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                      <span className="text-sm">Validations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start"
                    onClick={() => onNavigate('report')}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Report New Issue
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => onNavigate('community')}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Validate Issues
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => onNavigate('track')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Track My Reports
                  </Button>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Daily Goal Progress</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Validations (3/5)</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Community Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => {
                    const IconComponent = user.icon;
                    return (
                      <div 
                        key={user.rank} 
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          user.isUser ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`text-xl font-bold ${user.isUser ? 'text-primary' : ''}`}>
                            #{user.rank}
                          </div>
                          <IconComponent className={`h-5 w-5 ${user.color}`} />
                          <div>
                            <div className={`font-medium ${user.isUser ? 'text-primary' : ''}`}>
                              {user.userId}
                              {user.isUser && (
                                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                                  You
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {user.issuesReported} reports • {user.validations} validations
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{user.points} pts</div>
                          {user.badge && (
                            <Badge 
                              variant="secondary"
                              className={`text-xs ${
                                user.badge === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                                user.badge === 'Silver' ? 'bg-gray-100 text-gray-700' :
                                'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {user.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <Card key={index} className={achievement.unlocked ? 'border-primary/20' : 'opacity-75'}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                          achievement.unlocked ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <IconComponent className={`h-6 w-6 ${
                            achievement.unlocked ? achievement.color : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{achievement.name}</h3>
                            {achievement.unlocked && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {achievement.description}
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress 
                              value={achievement.progress} 
                              className={`h-2 ${achievement.unlocked ? '' : 'opacity-50'}`}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{activity.timeAgo}</span>
                            <Badge variant="secondary" className="text-xs">
                              +{activity.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}