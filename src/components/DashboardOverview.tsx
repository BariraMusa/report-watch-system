import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Clock,
  Zap,
  Phone,
  MessageSquare,
  Radio,
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const statsCards = [
  {
    title: 'Reports Today',
    value: '127',
    change: '+12%',
    trend: 'up',
    icon: FileText,
    color: 'primary'
  },
  {
    title: 'Unresolved Reports',
    value: '23',
    change: '-8%',
    trend: 'down',
    icon: Clock,
    color: 'warning'
  },
  {
    title: 'Avg Response Time',
    value: '2.3m',
    change: '-15%',
    trend: 'down',
    icon: Zap,
    color: 'success'
  },
  {
    title: 'Active Channels',
    value: '3',
    change: '0%',
    trend: 'stable',
    icon: Radio,
    color: 'secondary'
  }
];

const channelStats = [
  { name: 'Voice Calls', count: 45, percentage: 35, icon: Phone },
  { name: 'SMS Reports', count: 62, percentage: 49, icon: MessageSquare },
  { name: 'USSD Reports', count: 20, percentage: 16, icon: Radio }
];

const recentReports = [
  {
    id: 'RPT-001',
    location: 'Lagos State, Ikeja',
    type: 'Flood Alert',
    time: '5 mins ago',
    status: 'pending',
    severity: 'high',
    channel: 'Voice'
  },
  {
    id: 'RPT-002',
    location: 'Kano State, Kano',
    type: 'Drought Warning',
    time: '12 mins ago',
    status: 'escalated',
    severity: 'medium',
    channel: 'SMS'
  },
  {
    id: 'RPT-003',
    location: 'Rivers State, Port Harcourt',
    type: 'Storm Alert',
    time: '18 mins ago',
    status: 'resolved',
    severity: 'high',
    channel: 'USSD'
  },
  {
    id: 'RPT-004',
    location: 'Kaduna State, Kaduna',
    type: 'Heat Wave',
    time: '25 mins ago',
    status: 'pending',
    severity: 'low',
    channel: 'SMS'
  },
  {
    id: 'RPT-005',
    location: 'Ogun State, Abeokuta',
    type: 'Landslide Risk',
    time: '32 mins ago',
    status: 'escalated',
    severity: 'high',
    channel: 'Voice'
  }
];

export function DashboardOverview() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'escalated': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'pending': return <Clock className="h-4 w-4 text-muted-foreground" />;
      default: return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dashboard-gradient-text">
            Climate Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay ahead of every storm — Real-time climate monitoring
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="dashboard-card hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className={`flex items-center text-xs ${
                        stat.trend === 'up' ? 'text-success' : 
                        stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {stat.trend !== 'stable' && <TrendIcon className="h-3 w-3" />}
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Map */}
        <Card className="lg:col-span-2 dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Live Incident Map
            </CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 border-dashed border-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary">Interactive Map</h3>
                <p className="text-muted-foreground">
                  Real-time incident visualization across Nigeria
                </p>
                <Button className="mt-4" variant="gradient">
                  View Full Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Channel Statistics */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-secondary" />
              Report Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelStats.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{channel.name}</span>
                    </div>
                    <span className="text-sm font-bold">{channel.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${channel.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="pt-4 border-t">
              <Button variant="secondary" className="w-full">
                <MessageSquare className="h-4 w-4" />
                Send Bulk Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports Table */}
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Latest Reports
          </CardTitle>
          <Button variant="outline" size="sm">
            View All Reports
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(report.status)}
                    <span className="font-mono text-sm text-muted-foreground">
                      {report.id}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{report.type}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {report.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(report.severity)}`}>
                    {report.severity.toUpperCase()}
                  </span>
                  <span className="text-xs px-2 py-1 bg-muted rounded">
                    {report.channel}
                  </span>
                  <span className="text-sm text-muted-foreground min-w-20">
                    {report.time}
                  </span>
                  <Button variant="ghost" size="sm" className="dashboard-icon-bounce">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}