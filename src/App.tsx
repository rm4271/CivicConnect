import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { ReportIssuePage } from './components/ReportIssuePage';
import { CommunityValidationPage } from './components/CommunityValidationPage';
import { AuthorityDashboard } from './components/AuthorityDashboard';
import { CitizenTrackerPage } from './components/CitizenTrackerPage';
import { UserDashboard } from './components/UserDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'report':
        return <ReportIssuePage onNavigate={handleNavigate} />;
      case 'community':
        return <CommunityValidationPage onNavigate={handleNavigate} />;
      case 'track':
        return <CitizenTrackerPage onNavigate={handleNavigate} />;
      case 'user-dashboard':
        return <UserDashboard onNavigate={handleNavigate} />;
      case 'dashboard':
        return <AuthorityDashboard onNavigate={handleNavigate} />;
      case 'login':
        return (
          <div className="container px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Login / Sign Up</h1>
            <p className="text-muted-foreground">
              Authentication system would be implemented here with secure login options.
            </p>
          </div>
        );
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}