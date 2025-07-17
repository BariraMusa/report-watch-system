import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Phone,
  Radio,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const reports = [
  {
    id: 'RPT-2024-001',
    title: 'Severe Flooding in Victoria Island',
    location: 'Lagos State, Victoria Island',
    reporter: 'Community Member',
    phone: '+234-801-xxx-1234',
    type: 'Flood Alert',
    severity: 'high',
    status: 'pending',
    channel: 'voice',
    timestamp: '2024-01-15 09:23:45',
    description: 'Heavy rainfall causing severe flooding in residential areas...',
    coordinates: '6.4281, 3.4219'
  },
  {
    id: 'RPT-2024-002',
    title: 'Drought Conditions in Gwale LGA',
    location: 'Kano State, Gwale',
    reporter: 'Local Farmer',
    phone: '+234-802-xxx-5678',
    type: 'Drought Warning',
    severity: 'medium',
    status: 'escalated',
    channel: 'sms',
    timestamp: '2024-01-15 08:45:12',
    description: 'Prolonged dry conditions affecting crop yields...',
    coordinates: '12.0022, 8.5920'
  },
  {
    id: 'RPT-2024-003',
    title: 'Storm Warning Port Harcourt',
    location: 'Rivers State, Port Harcourt',
    reporter: 'Weather Observer',
    phone: '+234-803-xxx-9012',
    type: 'Storm Alert',
    severity: 'high',
    status: 'resolved',
    channel: 'ussd',
    timestamp: '2024-01-15 07:12:30',
    description: 'Strong winds and heavy rain approaching the area...',
    coordinates: '4.8156, 7.0498'
  },
  {
    id: 'RPT-2024-004',
    title: 'Heat Wave in Kaduna City',
    location: 'Kaduna State, Kaduna',
    reporter: 'Health Official',
    phone: '+234-804-xxx-3456',
    type: 'Heat Wave',
    severity: 'medium',
    status: 'pending',
    channel: 'voice',
    timestamp: '2024-01-15 06:30:15',
    description: 'Extremely high temperatures affecting public health...',
    coordinates: '10.5105, 7.4165'
  },
  {
    id: 'RPT-2024-005',
    title: 'Landslide Risk in Abeokuta',
    location: 'Ogun State, Abeokuta',
    reporter: 'Emergency Service',
    phone: '+234-805-xxx-7890',
    type: 'Landslide Risk',
    severity: 'high',
    status: 'escalated',
    channel: 'sms',
    timestamp: '2024-01-15 05:45:00',
    description: 'Unstable soil conditions following heavy rainfall...',
    coordinates: '7.1475, 3.3619'
  }
];

const statusFilters = ['All', 'Pending', 'Escalated', 'Resolved'];
const severityFilters = ['All', 'High', 'Medium', 'Low'];
const channelFilters = ['All', 'Voice', 'SMS', 'USSD'];

export function ReportsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'voice': return <Phone className="h-4 w-4" />;
      case 'sms': return <MessageSquare className="h-4 w-4" />;
      case 'ussd': return <Radio className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || report.status === statusFilter.toLowerCase();
    const matchesSeverity = severityFilter === 'All' || report.severity === severityFilter.toLowerCase();
    const matchesChannel = channelFilter === 'All' || report.channel === channelFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesSeverity && matchesChannel;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dashboard-gradient-text">
            Climate Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive view of all climate incident reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="gradient" size="sm">
            <MessageSquare className="h-4 w-4" />
            Bulk Response
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports, locations, or IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border rounded-lg bg-background"
              >
                {statusFilters.map(status => (
                  <option key={status} value={status}>{status} Status</option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full p-2 border rounded-lg bg-background"
              >
                {severityFilters.map(severity => (
                  <option key={severity} value={severity}>{severity} Severity</option>
                ))}
              </select>
            </div>

            {/* Channel Filter */}
            <div>
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="w-full p-2 border rounded-lg bg-background"
              >
                {channelFilters.map(channel => (
                  <option key={channel} value={channel}>{channel} Channel</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{filteredReports.length}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {filteredReports.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">
                {filteredReports.filter(r => r.severity === 'high').length}
              </div>
              <div className="text-sm text-muted-foreground">High Severity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {filteredReports.filter(r => r.status === 'resolved').length}
              </div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Reports Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentReports.map((report, index) => (
              <div 
                key={report.id}
                className="p-4 rounded-lg border hover:bg-muted/50 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                  {/* Report Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(report.status)}
                      <div>
                        <h4 className="font-semibold">{report.title}</h4>
                        <p className="text-sm text-muted-foreground font-mono">
                          {report.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{report.location}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.coordinates}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Type & Severity */}
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className="w-fit">
                      {report.type}
                    </Badge>
                    <Badge className={`w-fit ${getSeverityColor(report.severity)}`}>
                      {report.severity.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Channel & Time */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {getChannelIcon(report.channel)}
                      <span className="text-sm capitalize">{report.channel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(report.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedReport(report)}
                      className="dashboard-icon-bounce"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="dashboard-icon-bounce">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredReports.length)} of {filteredReports.length} reports
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}