
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, FilePlus, FileCheck, Download, Send, Share2 } from "lucide-react";

const Reports = () => {
  return (
    <div className="container py-6 space-y-6">
      <header className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Vulnerability Reports</h1>
        <p className="text-muted-foreground">
          Generate, manage, and submit professional vulnerability reports
        </p>
      </header>
      
      <div className="flex justify-between items-center">
        <Input
          className="max-w-xs"
          placeholder="Search reports..."
        />
        <Button>
          <FilePlus className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </div>
      
      <Tabs defaultValue="draft">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="draft">
            <FileText className="w-4 h-4 mr-2" />
            Draft Reports
          </TabsTrigger>
          <TabsTrigger value="submitted">
            <FileCheck className="w-4 h-4 mr-2" />
            Submitted Reports
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Share2 className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="draft">
          <Card>
            <CardHeader>
              <CardTitle>Draft Reports</CardTitle>
              <CardDescription>Reports in progress, not yet submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "RPT-001",
                    title: "SQL Injection in Login Form",
                    target: "example.com",
                    severity: "Critical",
                    lastModified: "2025-04-15",
                    status: "In Progress"
                  },
                  {
                    id: "RPT-002",
                    title: "XSS Vulnerability in Search Function",
                    target: "example.com",
                    severity: "High",
                    lastModified: "2025-04-17",
                    status: "AI Enhanced"
                  },
                  {
                    id: "RPT-003",
                    title: "CSRF in User Settings",
                    target: "testsite.com",
                    severity: "Medium",
                    lastModified: "2025-04-18",
                    status: "Ready to Submit"
                  }
                ].map(report => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {report.id} | {report.target} | {report.severity}
                      </div>
                      <div className="text-xs text-muted-foreground">Last modified: {report.lastModified}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-medium bg-secondary py-1 px-2 rounded">
                        {report.status}
                      </div>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="default">
                        <Send className="w-3 h-3 mr-1" />
                        Submit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="submitted">
          <Card>
            <CardHeader>
              <CardTitle>Submitted Reports</CardTitle>
              <CardDescription>Reports you've submitted to vendors or platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "RPT-998",
                    title: "Authentication Bypass in Admin Portal",
                    target: "redacted.com",
                    severity: "Critical",
                    submittedDate: "2025-04-01",
                    status: "Accepted",
                    reward: "$2,500"
                  },
                  {
                    id: "RPT-999",
                    title: "Directory Traversal Vulnerability",
                    target: "redacted.org",
                    severity: "High",
                    submittedDate: "2025-04-05",
                    status: "Pending Review",
                    reward: "-"
                  },
                  {
                    id: "RPT-1000",
                    title: "Rate Limiting Bypass in API",
                    target: "api.example.com",
                    severity: "Medium",
                    submittedDate: "2025-04-10",
                    status: "Fixed",
                    reward: "$750"
                  }
                ].map(report => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {report.id} | {report.target} | {report.severity}
                      </div>
                      <div className="text-xs text-muted-foreground">Submitted: {report.submittedDate}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-xs font-medium bg-secondary py-1 px-2 rounded text-center">
                          {report.status}
                        </div>
                        <div className="text-xs text-center mt-1">
                          {report.reward !== "-" && "Reward: "}
                          {report.reward}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Standardized templates to speed up report creation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Standard Vulnerability Report",
                    description: "Comprehensive template suitable for most vulnerabilities",
                    sections: ["Executive Summary", "Technical Details", "Impact Assessment", "Reproduction Steps", "Remediation"]
                  },
                  {
                    title: "HackerOne Format",
                    description: "Formatted specifically for HackerOne submissions",
                    sections: ["Summary", "Description", "Reproduction", "Impact", "Mitigation"]
                  },
                  {
                    title: "Bugcrowd Format",
                    description: "Formatted specifically for Bugcrowd submissions",
                    sections: ["Overview", "Steps to Reproduce", "Supporting Material", "Impact", "Suggested Fix"]
                  },
                  {
                    title: "Web Vulnerability",
                    description: "Specialized for web-based vulnerabilities",
                    sections: ["Summary", "Technical Analysis", "Attack Vector", "Payload Details", "Mitigation Steps"]
                  },
                  {
                    title: "API Vulnerability",
                    description: "Focused on API security issues",
                    sections: ["API Endpoint", "Request Details", "Response Analysis", "Authentication Bypass", "Fix Recommendation"]
                  },
                  {
                    title: "Mobile App Vulnerability",
                    description: "Structure for mobile application vulnerabilities",
                    sections: ["Application Info", "Device Environment", "Vulnerability Details", "Exploit Code", "Patch Suggestions"]
                  }
                ].map((template, i) => (
                  <Card key={i} className="hover:bg-secondary/20 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{template.title}</CardTitle>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="space-y-1">
                        {template.sections.map((section, j) => (
                          <div key={j} className="text-xs flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                            <span>{section}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
