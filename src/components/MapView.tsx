import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MapPin,
  Filter,
  Search,
  Calendar,
  AlertTriangle,
  Droplets,
  Sun,
  Wind,
  Thermometer,
  Layers,
  Maximize,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mapFilters = [
  { name: 'All Reports', count: 127, active: true },
  { name: 'Floods', count: 45, active: false, color: 'bg-blue-500' },
  { name: 'Droughts', count: 23, active: false, color: 'bg-orange-500' },
  { name: 'Storms', count: 34, active: false, color: 'bg-purple-500' },
  { name: 'Heat Waves', count: 25, active: false, color: 'bg-red-500' }
];

const recentPins = [
  {
    id: 1,
    title: 'Severe Flooding',
    location: 'Lagos, Victoria Island',
    severity: 'high',
    time: '2 mins ago',
    type: 'flood',
    coordinates: { lat: 6.4281, lng: 3.4219 }
  },
  {
    id: 2,
    title: 'Drought Conditions',
    location: 'Kano, Gwale LGA',
    severity: 'medium',
    time: '15 mins ago',
    type: 'drought',
    coordinates: { lat: 12.0022, lng: 8.5920 }
  },
  {
    id: 3,
    title: 'Storm Warning',
    location: 'Rivers, Port Harcourt',
    severity: 'high',
    time: '23 mins ago',
    type: 'storm',
    coordinates: { lat: 4.8156, lng: 7.0498 }
  }
];

export function MapView() {
  const [selectedFilter, setSelectedFilter] = useState('All Reports');
  const [searchTerm, setSearchTerm] = useState('');

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'flood': return <Droplets className="h-4 w-4 text-blue-500" />;
      case 'drought': return <Sun className="h-4 w-4 text-orange-500" />;
      case 'storm': return <Wind className="h-4 w-4 text-purple-500" />;
      case 'heatwave': return <Thermometer className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dashboard-gradient-text">
            Live Incident Map
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time climate incidents across Nigeria
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4" />
            Map Layers
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Map Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Date Range */}
            <div>
              <label className="text-sm font-medium">Date Range</label>
              <Button variant="outline" className="w-full justify-start mt-2">
                <Calendar className="h-4 w-4" />
                Last 24 hours
              </Button>
            </div>

            {/* Report Types */}
            <div>
              <label className="text-sm font-medium mb-3 block">Report Types</label>
              <div className="space-y-2">
                {mapFilters.map((filter) => (
                  <Button
                    key={filter.name}
                    variant={filter.active ? "default" : "outline"}
                    className="w-full justify-between"
                    onClick={() => setSelectedFilter(filter.name)}
                  >
                    <div className="flex items-center gap-2">
                      {filter.color && (
                        <div className={`w-3 h-3 rounded-full ${filter.color}`} />
                      )}
                      {filter.name}
                    </div>
                    <Badge variant="secondary">{filter.count}</Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Recent Incidents */}
            <div>
              <label className="text-sm font-medium mb-3 block">Recent Incidents</label>
              <div className="space-y-3">
                {recentPins.map((incident) => (
                  <div
                    key={incident.id}
                    className="p-3 rounded-lg border hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        {getIncidentIcon(incident.type)}
                        <div>
                          <h4 className="text-sm font-medium">{incident.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {incident.location}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {incident.time}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs ${getSeverityColor(incident.severity)}`}
                      >
                        {incident.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Map */}
        <Card className="lg:col-span-3 dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Nigeria Climate Incidents Map
            </CardTitle>
            <Button variant="outline" size="sm">
              <Maximize className="h-4 w-4" />
              Fullscreen
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-lg border-2 border-dashed border-muted relative overflow-hidden">
              {/* Map Placeholder */}
              <div className="absolute inset-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
                {/* Simulated Map Pins */}
                <div className="absolute top-1/4 left-1/3 animate-pulse">
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute top-4 left-1 animate-ping"></div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 animate-pulse">
                  <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full absolute top-4 left-1 animate-ping"></div>
                </div>
                
                <div className="absolute bottom-1/3 right-1/3 animate-pulse">
                  <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full absolute top-4 left-1 animate-ping"></div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h4 className="font-semibold text-sm mb-2">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>High Severity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>Medium Severity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Low Severity</span>
                    </div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button size="icon" variant="outline" className="bg-white/90 backdrop-blur-sm">
                    +
                  </Button>
                  <Button size="icon" variant="outline" className="bg-white/90 backdrop-blur-sm">
                    -
                  </Button>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4 animate-bounce" />
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Interactive Climate Map
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Real-time incident tracking across all Nigerian states
                  </p>
                  <Button variant="gradient" size="lg">
                    <MapPin className="h-5 w-5" />
                    Initialize Live Map
                  </Button>
                </div>
              </div>
            </div>

            {/* Map Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-red-500">12</div>
                <div className="text-xs text-muted-foreground">Active Floods</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-orange-500">8</div>
                <div className="text-xs text-muted-foreground">Drought Areas</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-purple-500">5</div>
                <div className="text-xs text-muted-foreground">Storm Zones</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-primary">36</div>
                <div className="text-xs text-muted-foreground">Total States</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}