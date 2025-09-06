import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  MapPin,
  Search,
  Filter,
  Calendar,
  BarChart3,
  Activity,
  Target,
  Zap,
  Brain,
  Download
} from 'lucide-react';

interface AuthorityDashboardProps {
  onNavigate: (page: string) => void;
}

export function AuthorityDashboard({ onNavigate }: AuthorityDashboardProps) {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const dashboardStats = {
    totalIssues: 2847,
    pendingIssues: 156,
    resolvedToday: 23,
    avgResolutionTime: '2.4 hours',
    escalatedIssues: 8,
    aiAccuracy: 94.2,
    activeReporters: 1543,
    communityEngagement: 87
  };

  const recentIssues = [
    {
      id: 'ISS-2847',
      type: 'garbage',
      title: 'Overflowing bins at Central Market',
      location: 'Sector 17, Chandigarh',
      priority: 'high',
      status: 'pending',
      timeAgo: '15 min ago',
      aiConfidence: 96,
      communityVotes: 18
    },
    {
      id: 'ISS-2846',
      type: 'pothole',
      title: 'Deep pothole causing accidents',
      location: 'MG Road, Bangalore',
      priority: 'high',
      status: 'in-progress',
      timeAgo: '1 hour ago',
      aiConfidence: 89,
      communityVotes: 32
    },
    {
      id: 'ISS-2845',
      type: 'streetlight',
      title: 'Multiple street lights not working',
      location: 'Residency Road, Bangalore',
      priority: 'medium',
      status: 'verified',
      timeAgo: '2 hours ago',
      aiConfidence: 92,
      communityVotes: 15
    }
  ];

  const regionData = [
    { name: 'Central District', pending: 45, resolved: 123, efficiency: 89 },
    { name: 'North Zone', pending: 32, resolved: 98, efficiency: 92 },
    { name: 'South Zone', pending: 28, resolved: 87, efficiency: 85 },
    { name: 'East District', pending: 51, resolved: 134, efficiency: 91 }
  ];

  const escalationAlerts = [
    {
      id: 'ESC-001',
      issue: 'Major road blockage reported',
      location: 'Highway 24, Delhi',
      timeOverdue: '6 hours',
      severity: 'critical'
    },
    {
      id: 'ESC-002',
      issue: 'Water pipeline burst affecting residents',
      location: 'Koramangala, Bangalore',
      timeOverdue: '4 hours',
      severity: 'high'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'verified': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-purple-100 text-purple-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="container px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Authority Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage civic issues across your jurisdiction
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Live Monitoring
            </Button>
          </div>
        </div>

        {/* Escalation Alerts */}
        {escalationAlerts.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {escalationAlerts.length} issues require immediate attention
                </span>
                <Button variant="destructive" size="sm">
                  View Escalations
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold">{dashboardStats.totalIssues.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Issues</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardStats.pendingIssues}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <div className="flex items-center mt-2">
                <span className="text-xs text-muted-foreground">8 require escalation</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold text-green-600">{dashboardStats.resolvedToday}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2">
                <span className="text-xs text-muted-foreground">Avg: {dashboardStats.avgResolutionTime}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Detection Accuracy</p>
                  <p className="text-2xl font-bold text-blue-600">{dashboardStats.aiAccuracy}%</p>
                </div>
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
              <div className="flex items-center mt-2">
                <Zap className="h-3 w-3 text-blue-500 mr-1" />
                <span className="text-xs text-blue-600">+2.1% improvement</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="central">Central District</SelectItem>
                    <SelectItem value="north">North Zone</SelectItem>
                    <SelectItem value="south">South Zone</SelectItem>
                    <SelectItem value="east">East District</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Timeframe</label>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search issues..." className="pl-8" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Issues */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{issue.id}</Badge>
                        <Badge className={getStatusColor(issue.status)}>
                          {issue.status}
                        </Badge>
                        <Badge className={`border ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{issue.timeAgo}</span>
                    </div>

                    <div>
                      <h4 className="font-medium">{issue.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {issue.location}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">AI Confidence:</span>
                        <div className="flex items-center mt-1">
                          <Progress value={issue.aiConfidence} className="flex-1 h-2 mr-2" />
                          <span className="font-medium">{issue.aiConfidence}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Community Votes:</span>
                        <div className="flex items-center mt-1">
                          <Users className="h-3 w-3 mr-1" />
                          <span className="font-medium">{issue.communityVotes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Assign Team</Button>
                      {issue.status === 'pending' && (
                        <Button size="sm">Mark Verified</Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Regional Performance */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {regionData.map((region, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{region.name}</span>
                      <Badge variant="secondary">{region.efficiency}% efficiency</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <span>Pending: {region.pending}</span>
                      <span>Resolved: {region.resolved}</span>
                    </div>
                    <Progress value={region.efficiency} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  Escalation Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {escalationAlerts.map((alert) => (
                  <div key={alert.id} className="border-l-4 border-red-500 pl-3 space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm">{alert.issue}</span>
                      <Badge variant="destructive" className="text-xs">
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {alert.location}
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        Overdue by {alert.timeOverdue}
                      </div>
                    </div>
                    <Button variant="destructive" size="sm" className="w-full mt-2">
                      Take Action
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Bulk Assignment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Maintenance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Team Performance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}