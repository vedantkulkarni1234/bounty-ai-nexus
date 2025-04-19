
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Globe, Network, Database, Lock, Shield } from "lucide-react";

const Recon = () => {
  const [target, setTarget] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<null | { type: string }>(null);

  const handleScan = (scanType: string) => {
    setIsScanning(true);
    
    // Simulate API call
    setTimeout(() => {
      setScanResults({ type: scanType });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="container py-6 space-y-6">
      <header className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Reconnaissance</h1>
        <p className="text-muted-foreground">
          Advanced target reconnaissance powered by AI
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Target Configuration</CardTitle>
          <CardDescription>Enter target domain or IP to begin reconnaissance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="example.com or 192.168.1.1" 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
            <Button 
              disabled={!target || isScanning}
              onClick={() => handleScan("comprehensive")}
            >
              {isScanning ? "Scanning..." : "Scan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="subdomain">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="subdomain">
            <Globe className="w-4 h-4 mr-2" />
            Subdomains
          </TabsTrigger>
          <TabsTrigger value="ports">
            <Network className="w-4 h-4 mr-2" />
            Port Scan
          </TabsTrigger>
          <TabsTrigger value="tech">
            <Database className="w-4 h-4 mr-2" />
            Tech Stack
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="w-4 h-4 mr-2" />
            Security Headers
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Shield className="w-4 h-4 mr-2" />
            AI Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="subdomain">
          <Card>
            <CardHeader>
              <CardTitle>Subdomain Enumeration</CardTitle>
              <CardDescription>Discover all subdomains associated with the target</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleScan("passive")}
                  disabled={!target || isScanning}
                >
                  Passive Enumeration
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleScan("active")} 
                  disabled={!target || isScanning}
                >
                  Active Enumeration
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleScan("bruteforce")} 
                  disabled={!target || isScanning}
                >
                  Bruteforce Discovery
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleScan("permutation")} 
                  disabled={!target || isScanning}
                >
                  Permutation Scanning
                </Button>
              </div>
              
              <div className="h-[400px] bg-code rounded-md border border-border p-4 overflow-auto">
                <pre className="text-code-foreground text-sm font-mono">
                  {isScanning ? (
                    "Scanning in progress..."
                  ) : scanResults?.type ? (
                    `# Subdomain scan results for ${target} using ${scanResults.type} method\n\nFound subdomains:\n- api.${target}\n- admin.${target}\n- dev.${target}\n- stage.${target}\n- mail.${target}\n- www.${target}\n- blog.${target}\n- shop.${target}\n- support.${target}\n\nAI Analysis: The subdomain pattern suggests a standard corporate structure with development, staging, and production environments. The 'admin' subdomain may be worth investigating for potential access control issues.`
                  ) : (
                    "Results will appear here after scanning."
                  )}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ports">
          <Card>
            <CardHeader>
              <CardTitle>Port Scanning</CardTitle>
              <CardDescription>Discover open ports and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleScan("top-ports")}
                    disabled={!target || isScanning}
                  >
                    Scan Top Ports
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleScan("full-scan")}
                    disabled={!target || isScanning}
                  >
                    Full Port Scan
                  </Button>
                </div>
                
                <div className="h-[400px] bg-code rounded-md border border-border p-4 overflow-auto">
                  <pre className="text-code-foreground text-sm font-mono">
                    {isScanning ? (
                      "Port scan in progress..."
                    ) : scanResults?.type ? (
                      `# Port scan results for ${target} using ${scanResults.type} method\n\nPORT     STATE    SERVICE\n22/tcp   open     ssh\n80/tcp   open     http\n443/tcp  open     https\n8080/tcp open     http-proxy\n8443/tcp open     https-alt\n\nService Details:\n- SSH: OpenSSH 8.9p1\n- HTTP: nginx 1.22.1\n- HTTPS: TLS 1.3\n\nAI Analysis: The open ports indicate a standard web server setup with SSH for remote administration. The presence of alternative HTTP/HTTPS ports (8080/8443) may indicate a proxy service or development environment.`
                    ) : (
                      "Results will appear here after scanning."
                    )}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tech">
          <Card>
            <CardHeader>
              <CardTitle>Technology Stack Analysis</CardTitle>
              <CardDescription>Identify technologies used by the target</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleScan("tech-stack")}
                disabled={!target || isScanning}
                className="mb-4"
              >
                Analyze Technology Stack
              </Button>
              
              <div className="h-[400px] bg-code rounded-md border border-border p-4 overflow-auto">
                <pre className="text-code-foreground text-sm font-mono">
                  {isScanning ? (
                    "Technology analysis in progress..."
                  ) : scanResults?.type ? (
                    `# Technology stack analysis for ${target}\n\nWeb Server: Nginx 1.22.1\nCMS: WordPress 6.2.3\nJavaScript Frameworks: React 18.2.0, jQuery 3.6.0\nAnalytics: Google Analytics\nCDN: Cloudflare\nProgramming Language: PHP 8.1\nDatabase: MySQL (inferred)\nSecurity: WAF detected (Cloudflare)\n\nAI Analysis: The technology stack reveals an up-to-date WordPress installation with React for frontend functionality. The Cloudflare WAF protection adds security but may be bypassed through specific techniques. The combination of WordPress plugins and PHP could present potential attack vectors worth exploring.`
                  ) : (
                    "Results will appear here after analysis."
                  )}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Headers Analysis</CardTitle>
              <CardDescription>Evaluate security headers implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleScan("security-headers")}
                disabled={!target || isScanning}
                className="mb-4"
              >
                Check Security Headers
              </Button>
              
              <div className="h-[400px] bg-code rounded-md border border-border p-4 overflow-auto">
                <pre className="text-code-foreground text-sm font-mono">
                  {isScanning ? (
                    "Security headers analysis in progress..."
                  ) : scanResults?.type ? (
                    `# Security headers analysis for ${target}\n\nContent-Security-Policy: ❌ Missing\nX-XSS-Protection: ✅ 1; mode=block\nX-Frame-Options: ✅ SAMEORIGIN\nX-Content-Type-Options: ✅ nosniff\nReferrer-Policy: ✅ strict-origin-when-cross-origin\nPermissions-Policy: ❌ Missing\nStrict-Transport-Security (HSTS): ❌ Missing\n\nSecurity Score: C (70/100)\n\nAI Analysis: The absence of Content-Security-Policy leaves the application vulnerable to XSS attacks despite the X-XSS-Protection header. The missing HSTS header indicates that the site does not force secure connections, potentially allowing connection downgrade attacks. Implementing the missing headers would significantly improve security posture.`
                  ) : (
                    "Results will appear here after analysis."
                  )}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Attack Surface Analysis</CardTitle>
              <CardDescription>Let the AI analyze the entire attack surface</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="default"
                onClick={() => handleScan("ai-analysis")}
                disabled={!target || isScanning}
                className="mb-4"
              >
                Run AI Analysis
              </Button>
              
              <div className="h-[400px] bg-code rounded-md border border-border p-4 overflow-auto">
                <pre className="text-code-foreground text-sm font-mono">
                  {isScanning ? (
                    "AI analysis in progress..."
                  ) : scanResults?.type ? (
                    `# AI Attack Surface Analysis for ${target}\n\nHIGH PRIORITY FINDINGS:\n\n1. WordPress version 6.2.3 detected with potentially vulnerable plugins\n   - Contact Form 7 < 5.7.2 (XSS vulnerability)\n   - WooCommerce < 7.1.0 (SQL injection)\n   Recommendation: Update all plugins to latest versions\n\n2. Exposed .git directory at ${target}/.git/\n   Risk: Source code disclosure\n   Recommendation: Remove or restrict access to .git directory\n\n3. Subdomain Takeover Opportunity\n   - Subdomain: legacy.${target} points to unregistered AWS S3 bucket\n   Risk: Complete subdomain control\n   Recommendation: Remove DNS record or secure the resource\n\nMEDIUM PRIORITY:\n\n1. Missing security headers (CSP, HSTS)\n   Risk: XSS and connection downgrade attacks\n\n2. Open ports: 22 (SSH), 80, 443, 8080\n   Risk: Increased attack surface\n   Note: SSH version appears up-to-date\n\nLOW PRIORITY:\n\n1. Information disclosure in HTTP headers\n   - Server version exposed\n   - X-Powered-By header reveals PHP version\n\nRECOMMENDED NEXT STEPS:\n\n1. Focus on the WordPress plugin vulnerabilities first\n2. Investigate the exposed .git directory\n3. Address subdomain takeover opportunity immediately`
                  ) : (
                    "AI analysis results will appear here."
                  )}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Recon;
