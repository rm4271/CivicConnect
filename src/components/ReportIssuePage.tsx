import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { 
  Camera, 
  MapPin, 
  Upload, 
  Eye, 
  Shield, 
  Info, 
  CheckCircle,
  Trash2,
  Construction,
  Lightbulb,
  AlertTriangle,
  User,
  UserX,
  IdCard
} from 'lucide-react';

interface ReportIssuePageProps {
  onNavigate: (page: string) => void;
}

export function ReportIssuePage({ onNavigate }: ReportIssuePageProps) {
  const [formData, setFormData] = useState({
    issueType: '',
    description: '',
    location: '',
    image: null as File | null,
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [assignedUserId, setAssignedUserId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const issueTypes = [
    { value: 'garbage', label: 'Garbage/Waste Management', icon: Trash2, color: 'text-red-600' },
    { value: 'pothole', label: 'Pothole/Road Damage', icon: Construction, color: 'text-orange-600' },
    { value: 'streetlight', label: 'Streetlight/Public Lighting', icon: Lightbulb, color: 'text-yellow-600' },
    { value: 'other', label: 'Other Civic Issue', icon: AlertTriangle, color: 'text-blue-600' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const generateUserId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letter = letters.charAt(Math.floor(Math.random() * letters.length));
    const numbers = Math.floor(1000 + Math.random() * 9000);
    return `User#${letter}${numbers}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitProgress(0);

    // Generate User ID if anonymous
    let userId = null;
    if (formData.isAnonymous) {
      userId = generateUserId();
      setAssignedUserId(userId);
    }

    // Simulate upload progress
    const interval = setInterval(() => {
      setSubmitProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSubmitting(false);
          setShowSuccess(true);
          // Reset form after showing success
          setTimeout(() => {
            setFormData({ issueType: '', description: '', location: '', image: null, isAnonymous: false });
            setShowSuccess(false);
            setAssignedUserId(null);
            onNavigate('track');
          }, 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const isFormValid = formData.issueType && formData.location && formData.image;

  // Success message component
  if (showSuccess) {
    return (
      <div className="container px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-600">Issue Reported Successfully!</h2>
                {formData.isAnonymous && assignedUserId ? (
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Your issue has been posted anonymously as:
                    </p>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      <IdCard className="h-4 w-4 mr-2" />
                      {assignedUserId}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Save this ID to track your issue progress
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Your issue has been submitted and will be reviewed by the community.
                  </p>
                )}
                <div className="pt-4">
                  <Progress value={100} className="mb-2" />
                  <p className="text-sm text-muted-foreground">Redirecting to tracker...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Report a Civic Issue</h1>
          <p className="text-muted-foreground">
            Help improve your community by reporting civic issues. Your reports help authorities 
            prioritize and address problems faster.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Issue Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Issue Type Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="issueType">Issue Type *</Label>
                    <Select value={formData.issueType} onValueChange={(value) => setFormData(prev => ({ ...prev, issueType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of issue" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center">
                                <Icon className={`h-4 w-4 mr-2 ${type.color}`} />
                                {type.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        placeholder="Enter address or landmark"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Location will be automatically detected via GPS when you take a photo
                    </p>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Photo Evidence *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      {formData.image ? (
                        <div className="space-y-2">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                          <p className="font-medium">{formData.image.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(formData.image.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                          <div>
                            <p className="font-medium">Upload a clear photo of the issue</p>
                            <p className="text-sm text-muted-foreground">
                              JPG, PNG or HEIC up to 10MB
                            </p>
                          </div>
                          <label htmlFor="file-upload">
                            <Button type="button" variant="outline" asChild>
                              <span>
                                <Camera className="h-4 w-4 mr-2" />
                                Choose Photo
                              </span>
                            </Button>
                          </label>
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide any additional details about the issue..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  {/* Anonymous Reporting */}
                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="anonymous"
                        checked={formData.isAnonymous}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, isAnonymous: checked as boolean }))
                        }
                      />
                      <div className="space-y-1">
                        <Label htmlFor="anonymous" className="flex items-center cursor-pointer">
                          <UserX className="h-4 w-4 mr-2" />
                          Post Anonymously
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Your identity will be protected. A unique User ID will be assigned to track this issue.
                        </p>
                      </div>
                    </div>
                    
                    {formData.isAnonymous && (
                      <Alert>
                        <IdCard className="h-4 w-4" />
                        <AlertDescription>
                          You will receive a unique User ID (e.g., User#A1023) to track your anonymous submission.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Submit Progress */}
                  {isSubmitting && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading report...</span>
                        <span>{submitProgress}%</span>
                      </div>
                      <Progress value={submitProgress} />
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 mr-2" />
                        Submit Report
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Privacy Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Your reports are public and will be visible to other community members 
                    for validation. Personal information is protected.
                  </AlertDescription>
                </Alert>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Location data is anonymized
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Photos are reviewed for privacy
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    Reports follow community guidelines
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Clear Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Photo Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <Badge variant="secondary" className="text-xs">1</Badge>
                    <span>Take photos in good lighting conditions</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="secondary" className="text-xs">2</Badge>
                    <span>Show the full extent of the issue</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="secondary" className="text-xs">3</Badge>
                    <span>Include nearby landmarks for context</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="secondary" className="text-xs">4</Badge>
                    <span>Avoid including people's faces</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="secondary" className="text-xs">5</Badge>
                    <span>Multiple angles help validation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Today's Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Reports Submitted</span>
                  <Badge variant="secondary">23</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Issues Resolved</span>
                  <Badge variant="secondary">18</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average Response Time</span>
                  <Badge variant="secondary">2.4 hours</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}