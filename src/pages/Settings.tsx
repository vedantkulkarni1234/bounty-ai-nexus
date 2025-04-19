
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Code, Bot, Network, Shield, Terminal } from "lucide-react";

const Settings = () => {
  const [endpoint, setEndpoint] = useState("http://localhost:1234/v1");
  const [apiKey, setApiKey] = useState("");
  const [modelName, setModelName] = useState("llama-3.1-70b-instruct");
  const [connected, setConnected] = useState(false);
  const [testing, setTesting] = useState(false);

  const handleConnect = () => {
    if (!endpoint || !apiKey) return;
    
    setTesting(true);
    setTimeout(() => {
      setConnected(true);
      setTesting(false);
    }, 1500);
  };

  return (
    <div className="container py-6 space-y-6">
      <header className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your bug bounty platform and AI integration
        </p>
      </header>
      
      <Tabs defaultValue="llm-config">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="llm-config">
            <Bot className="w-4 h-4 mr-2" />
            LLM Configuration
          </TabsTrigger>
          <TabsTrigger value="tooling">
            <Terminal className="w-4 h-4 mr-2" />
            External Tools
          </TabsTrigger>
          <TabsTrigger value="scanning">
            <Shield className="w-4 h-4 mr-2" />
            Scanning Options
          </TabsTrigger>
          <TabsTrigger value="general">
            <SettingsIcon className="w-4 h-4 mr-2" />
            General Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="llm-config">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                <span>LM Studio Integration</span>
              </CardTitle>
              <CardDescription>
                Configure your local LLM endpoint to enable AI-powered features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">LM Studio API Endpoint</label>
                <Input 
                  placeholder="http://localhost:1234/v1" 
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The endpoint URL where your LM Studio server is running
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-2">API Key (if required)</label>
                <Input 
                  type="password" 
                  placeholder="Enter API key" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave blank if not using authentication
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-2">Model Name</label>
                <Input 
                  placeholder="model name" 
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The specific model name to use (e.g., llama-3.1-70b-instruct)
                </p>
              </div>

              <div className="border border-border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Parameter Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs block mb-1">Temperature</label>
                    <Input type="number" defaultValue="0.7" min="0" max="2" step="0.1" />
                  </div>
                  <div>
                    <label className="text-xs block mb-1">Max Tokens</label>
                    <Input type="number" defaultValue="4096" min="512" max="32768" />
                  </div>
                  <div>
                    <label className="text-xs block mb-1">Top P</label>
                    <Input type="number" defaultValue="0.9" min="0" max="1" step="0.1" />
                  </div>
                  <div>
                    <label className="text-xs block mb-1">Frequency Penalty</label>
                    <Input type="number" defaultValue="0" min="0" max="2" step="0.1" />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div>
                  <Button 
                    disabled={!endpoint || testing}
                    onClick={handleConnect}
                  >
                    {connected ? "Connected" : testing ? "Connecting..." : "Connect to LLM"}
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                    <span className="text-sm">{connected ? "Connected" : "Not Connected"}</span>
                  </div>
                  {connected && (
                    <p className="text-xs text-muted-foreground">
                      Successfully connected to LLM at {endpoint}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-secondary/20 flex flex-col items-start">
              <p className="text-sm mb-2">LM Studio Setup Guide</p>
              <ol className="text-xs text-muted-foreground space-y-1 list-decimal pl-4">
                <li>Download and install LM Studio from <a href="#" className="text-primary hover:underline">lmstudio.ai</a></li>
                <li>Load your preferred model in LM Studio</li>
                <li>Go to Local Server tab and start the server</li>
                <li>Copy the API endpoint URL from LM Studio</li>
                <li>Paste the endpoint URL here and click Connect</li>
              </ol>
            </CardFooter>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>LLM Test Console</CardTitle>
              <CardDescription>Test your LLM connection and functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter a test prompt for the LLM (e.g., 'Generate a POC for SQL injection')"
                className="min-h-[120px]"
              />
              <Button className="mt-4" disabled={!connected}>
                Test LLM
              </Button>
              
              <div className="mt-4 bg-code p-4 rounded-md border border-border">
                <pre className="text-code-foreground text-sm whitespace-pre-wrap">
                  {connected ? (
                    `# Test Response from LLM
                    
Your LLM is configured and ready to assist with bug bounty tasks including:

1. Reconnaissance analysis
2. Vulnerability verification
3. PoC code generation
4. Report writing assistance

The model (${modelName}) is properly connected and operational.`
                  ) : "LLM responses will appear here after connection"}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tooling">
          <Card>
            <CardHeader>
              <CardTitle>External Tools Configuration</CardTitle>
              <CardDescription>Configure integrations with external security tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-md border border-border">
                  <div className="flex items-center">
                    <Network className="h-10 w-10 mr-4 text-primary" />
                    <div>
                      <h3 className="font-medium">Nmap Integration</h3>
                      <p className="text-sm text-muted-foreground">Connect to local Nmap installation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked id="nmap" />
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-md border border-border">
                  <div className="flex items-center">
                    <Terminal className="h-10 w-10 mr-4 text-primary" />
                    <div>
                      <h3 className="font-medium">Burp Suite Integration</h3>
                      <p className="text-sm text-muted-foreground">Connect to Burp Suite API</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="burp" />
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-md border border-border">
                  <div className="flex items-center">
                    <Shield className="h-10 w-10 mr-4 text-primary" />
                    <div>
                      <h3 className="font-medium">OWASP ZAP Integration</h3>
                      <p className="text-sm text-muted-foreground">Connect to OWASP ZAP API</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="zap" />
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-md border border-border">
                  <div className="flex items-center">
                    <Code className="h-10 w-10 mr-4 text-primary" />
                    <div>
                      <h3 className="font-medium">Custom Script Directory</h3>
                      <p className="text-sm text-muted-foreground">Location of custom scripts and tools</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Input className="w-60" placeholder="/path/to/scripts" defaultValue="/usr/local/bin/scripts" />
                    <Button variant="outline" size="sm" className="ml-2">Browse</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scanning">
          <Card>
            <CardHeader>
              <CardTitle>Scanning Options</CardTitle>
              <CardDescription>Configure scanner behavior and risk thresholds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Scanner Aggressiveness</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="safe-mode" defaultChecked />
                        <label htmlFor="safe-mode" className="text-sm font-medium">Safe Mode</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Only perform non-intrusive tests</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="throttle" defaultChecked />
                        <label htmlFor="throttle" className="text-sm font-medium">Request Throttling</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Limit requests per second</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="auth-tests" />
                        <label htmlFor="auth-tests" className="text-sm font-medium">Authentication Tests</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Test for authentication bypasses</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Vulnerability Detection</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium block mb-2">Risk Threshold</label>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base">
                          <option>Low (All findings)</option>
                          <option>Medium</option>
                          <option selected>High</option>
                          <option>Critical Only</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">False Positive Filter</label>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base">
                          <option>Off</option>
                          <option>Low</option>
                          <option selected>Medium</option>
                          <option>High (Strict)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">AI Assistance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="ai-verification" defaultChecked />
                        <label htmlFor="ai-verification" className="text-sm font-medium">AI Verification</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Use AI to verify findings</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="ai-poc" defaultChecked />
                        <label htmlFor="ai-poc" className="text-sm font-medium">Auto-generate PoCs</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Automatically create proof of concept code</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="ai-report" defaultChecked />
                        <label htmlFor="ai-report" className="text-sm font-medium">Report Enhancement</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Use AI to improve report quality</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="mt-6">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure application appearance and behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Appearance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="dark-mode" defaultChecked />
                        <label htmlFor="dark-mode" className="text-sm font-medium">Dark Mode</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Toggle light/dark theme</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="compact" />
                        <label htmlFor="compact" className="text-sm font-medium">Compact Mode</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Use more compact UI elements</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="task-notifications" defaultChecked />
                        <label htmlFor="task-notifications" className="text-sm font-medium">Task Notifications</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Notify when tasks complete</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="vulnerability-notifications" defaultChecked />
                        <label htmlFor="vulnerability-notifications" className="text-sm font-medium">Vulnerability Alerts</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Notify when vulnerabilities are found</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Data Management</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-2">Data Storage Location</label>
                      <div className="flex gap-2">
                        <Input className="flex-1" defaultValue="./data" />
                        <Button variant="outline">Browse</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch id="auto-backup" defaultChecked />
                        <label htmlFor="auto-backup" className="text-sm font-medium">Automatic Backups</label>
                      </div>
                      <p className="text-xs text-muted-foreground">Backup data every 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">Export All Data</Button>
                    <Button variant="outline" size="sm">Import Data</Button>
                    <Button variant="destructive" size="sm">Clear All Data</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
