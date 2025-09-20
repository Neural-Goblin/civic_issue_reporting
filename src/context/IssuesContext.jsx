// src/context/IssuesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const IssuesContext = createContext();

// Custom hook to use the issues context
export const useIssues = () => {
  const context = useContext(IssuesContext);
  if (!context) {
    throw new Error('useIssues must be used within an IssuesProvider');
  }
  return context;
};

// Issues Provider Component
export const IssuesProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load issues from localStorage on component mount
  useEffect(() => {
    const savedIssues = localStorage.getItem('civic-issues');
    if (savedIssues) {
      try {
        setIssues(JSON.parse(savedIssues));
      } catch (error) {
        console.error('Error parsing saved issues:', error);
        setIssues([]);
      }
    }
    setIsLoading(false);
  }, []);

  // Save issues to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('civic-issues', JSON.stringify(issues));
    }
  }, [issues, isLoading]);

  const addIssue = (newIssue) => {
    const issueWithId = {
      ...newIssue,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setIssues(prevIssues => [issueWithId, ...prevIssues]);
    return issueWithId;
  };

  const updateIssueStatus = (issueId, newStatus) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
  };

  const deleteIssue = (issueId) => {
    setIssues(prevIssues => prevIssues.filter(issue => issue.id !== issueId));
  };

  const getIssueById = (issueId) => {
    return issues.find(issue => issue.id === issueId);
  };

  const value = {
    issues,
    isLoading,
    addIssue,
    updateIssueStatus,
    deleteIssue,
    getIssueById
  };

  return (
    <IssuesContext.Provider value={value}>
      {children}
    </IssuesContext.Provider>
  );
};

// Export the context itself as well (optional)
export default IssuesContext;