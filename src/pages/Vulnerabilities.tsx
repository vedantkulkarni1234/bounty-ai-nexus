
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Bug, Zap, AlertTriangle, FileText, AlertCircle } from "lucide-react";

const Vulnerabilities = () => {
  const [scanning, setScanning] = useState(false);
  const [target, setTarget] = useState("");
  
  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
  };

  const vulnerabilities = [
    {
      id: "VUL-001",
      name: "SQL Injection",
      severity: "Critical",
      path: "/search.php?id=1",
      description: "Input parameter 'id' is vulnerable to SQL injection attacks, allowing extraction of database contents.",
      status: "Verified",
    },
    {
      id: "VUL-002",
      name: "Cross-Site Scripting (XSS)",
      severity: "High",
      path: "/profile?name=test",
      description: "The 'name' parameter is reflected without sanitization, allowing arbitrary JavaScript execution.",
      status: "Verified",
    },
    {
      id: "VUL-003",
      name: "Broken Authentication",
      severity: "High",
      path: "/reset-password",
      description: "Password reset functionality doesn't properly validate reset tokens, allowing account takeover.",
      status: "Verified",
    },
    {
      id: "VUL-004",
      name: "Information Disclosure",
      severity: "Medium",
      path: "/api/users",
      description: "API endpoint exposes sensitive user information without proper authorization checks.",
      status: "Needs Verification",
    },
    {
      id: "VUL-005",
      name: "Server Misconfiguration",
      severity: "Medium",
      path: "/.git/config",
      description: "Git repository is publicly accessible, potentially exposing source code and sensitive information.",
      status: "Verified",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-500 hover:bg-red-600";
      case "High": return "bg-orange-500 hover:bg-orange-600";
      case "Medium": return "bg-yellow-500 hover:bg-yellow-600";
      case "Low": return "bg-blue-500 hover:bg-blue-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <header className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Vulnerability Management</h1>
        <p className="text-muted-foreground">
          Discover, verify, and manage vulnerabilities with AI assistance
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            <span>AI-Powered Scanner</span>
          </CardTitle>
          <CardDescription>Let the AI detect vulnerabilities in your target</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter target URL (e.g., https://example.com)" 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleScan} disabled={!target || scanning}>
              {scanning ? "Scanning..." : "Scan for Vulnerabilities"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="list">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">
            <Bug className="w-4 h-4 mr-2" />
            Vulnerability List
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <FileText className="w-4 h-4 mr-2" />
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="categories">
            <AlertCircle className="w-4 h-4 mr-2" />
            Categories
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Detected Vulnerabilities</CardTitle>
              <CardDescription>Verified and potential security issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="border border-border rounded-md p-4 hover:bg-secondary/40 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{vuln.name}</h3>
                          <Badge className={getSeverityColor(vuln.severity)}>
                            {vuln.severity}
                          </Badge>
                          <Badge variant="outline">{vuln.status}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">ID: {vuln.id}</p>
                        <p className="text-sm mt-1">Path: <code className="bg-code px-1 py-0.5 rounded text-code-foreground">{vuln.path}</code></p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Verify</Button>
                        <Button size="sm" variant="outline">Generate PoC</Button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{vuln.description}</p>
                    
                    <div className="mt-2 pt-2 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">AI Analysis:</span> This vulnerability appears to be {vuln.severity.toLowerCase()} risk based on CVSS scoring. Exploitation complexity is moderate. Recommend immediate remediation.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>AI Vulnerability Analysis</CardTitle>
              <CardDescription>In-depth analysis of detected vulnerabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-code p-4 rounded-md border border-border">
                <pre className="text-code-foreground text-sm font-mono">
{`# AI Vulnerability Analysis
> Timestamp: ${new Date().toISOString()}
> Target: example.com
> Total Vulnerabilities: 5 (Critical: 1, High: 2, Medium: 2, Low: 0)

## Executive Summary

The target application suffers from multiple critical and high-severity vulnerabilities
that could lead to complete system compromise. The most concerning issue is the SQL
injection vulnerability which provides direct access to the database.

## Risk Assessment

- Business Impact: HIGH
  * Data breach risk affecting customer data
  * Potential regulatory compliance issues
  * Possible service disruption
  
- Exploitation Likelihood: MEDIUM
  * Some vulnerabilities require authenticated access
  * Public-facing vulnerabilities present immediate risk

## Recommended Remediation

1. SQL Injection (CRITICAL):
   - Implement parameterized queries
   - Apply proper input validation
   - Consider using an ORM
   
2. XSS Vulnerability (HIGH):
   - Implement output encoding
   - Use Content-Security-Policy headers
   - Sanitize user inputs
   
3. Authentication Issues (HIGH):
   - Implement proper token validation
   - Add rate limiting on authentication endpoints
   - Enforce strong password policies

## Attack Chain Analysis

The vulnerabilities could be chained to achieve full compromise:
1. Exploit XSS to steal user cookies
2. Use captured sessions to access admin functionality
3. Leverage SQL injection to extract database contents
4. Extract credentials and escalate privileges
5. Access sensitive data or establish persistence

## Time to Fix Estimation
- Critical issues: 1-2 days
- High issues: 3-5 days
- Medium issues: 1-2 weeks`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Categories</CardTitle>
              <CardDescription>Breakdown by vulnerability type and severity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">By Severity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { label: "Critical", count: 1, color: "bg-red-500" },
                        { label: "High", count: 2, color: "bg-orange-500" },
                        { label: "Medium", count: 2, color: "bg-yellow-500" },
                        { label: "Low", count: 0, color: "bg-blue-500" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center">
                          <div className="w-full flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.label}</span>
                              <span>{item.count}</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${item.color}`}
                                style={{ width: `${(item.count / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">By Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { label: "Injection", count: 1, color: "bg-red-500" },
                        { label: "XSS", count: 1, color: "bg-orange-500" },
                        { label: "Authentication", count: 1, color: "bg-yellow-500" },
                        { label: "Information Disclosure", count: 1, color: "bg-blue-500" },
                        { label: "Misconfiguration", count: 1, color: "bg-green-500" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center">
                          <div className="w-full flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.label}</span>
                              <span>{item.count}</span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${item.color}`}
                                style={{ width: `${(item.count / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Vulnerabilities;
