
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { BarChart3, Package, ShoppingCart, Boxes, Warehouse, Users, ClipboardList, RefreshCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { toast } = useToast();

  const refreshData = () => {
    toast({
      title: 'Refreshing dashboard',
      description: 'Your dashboard data is being updated...',
    });
    
    // Simulate refresh
    setTimeout(() => {
      toast({
        title: 'Dashboard updated',
        description: 'Your dashboard has been refreshed with the latest data.',
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
              Overview
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back to your ERP system overview.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button onClick={refreshData} variant="outline" size="sm" className="flex items-center gap-1">
              <RefreshCcw className="h-4 w-4" />
              <span>Refresh Data</span>
            </Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Materials"
            value="1,284"
            icon={<Package className="h-5 w-5" />}
            change={{ value: 12, type: 'increase' }}
            description="vs. last month"
          />
          
          <StatCard
            title="Inventory Value"
            value="$429,234"
            icon={<Boxes className="h-5 w-5" />}
            change={{ value: 3.2, type: 'increase' }}
            description="vs. last month"
          />
          
          <StatCard
            title="Open Purchase Orders"
            value="23"
            icon={<ShoppingCart className="h-5 w-5" />}
            change={{ value: 6, type: 'decrease' }}
            description="vs. last month"
          />
          
          <StatCard
            title="Warehousing Capacity"
            value="76%"
            icon={<Warehouse className="h-5 w-5" />}
            change={{ value: 2, type: 'increase' }}
            description="vs. last month"
          />
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <DashboardCard 
            title="Recent Activity"
            className="lg:col-span-2"
            action={<Button variant="link" size="sm">See all</Button>}
          >
            <div className="space-y-4">
              {[
                {
                  title: "Purchase Order #1234 Approved",
                  time: "Today, 10:30 AM",
                  user: "John Smith",
                  avatar: "https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff",
                },
                {
                  title: "New Material Added: Industrial Motor X200",
                  time: "Yesterday, 3:45 PM",
                  user: "Emily Johnson",
                  avatar: "https://ui-avatars.com/api/?name=Emily+Johnson&background=7988EC&color=fff",
                },
                {
                  title: "Inventory Check Completed: Warehouse A",
                  time: "Yesterday, 11:15 AM",
                  user: "Robert Davis",
                  avatar: "https://ui-avatars.com/api/?name=Robert+Davis&background=13CE66&color=fff",
                },
                {
                  title: "Maintenance Schedule Updated",
                  time: "Apr 15, 2023",
                  user: "Laura Wilson",
                  avatar: "https://ui-avatars.com/api/?name=Laura+Wilson&background=FFCD56&color=fff",
                },
                {
                  title: "Low Stock Alert: Hydraulic Fluid HF-2000",
                  time: "Apr 14, 2023",
                  user: "System",
                  avatar: "https://ui-avatars.com/api/?name=System&background=FF5252&color=fff",
                },
              ].map((activity, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-none">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={activity.avatar} alt={activity.user} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{activity.title}</h4>
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{activity.time}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
          
          {/* Tasks Overview */}
          <Card>
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Tasks Overview</h3>
                  <Button variant="outline" size="sm" className="h-8">
                    <ClipboardList className="h-4 w-4 mr-1" />
                    <span>View All</span>
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Pending Approvals</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-erp-warning h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Inventory Checks</span>
                    <span className="font-medium">3/5</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-erp-blue h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Maintenance Tasks</span>
                    <span className="font-medium">12/20</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-erp-success h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-medium mb-4">Team Activity</h4>
                <div className="space-y-4">
                  {[
                    {
                      name: "John Smith",
                      role: "Warehouse Manager",
                      tasks: 8,
                      avatar: "https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff",
                    },
                    {
                      name: "Emily Johnson",
                      role: "Purchasing Agent",
                      tasks: 12,
                      avatar: "https://ui-avatars.com/api/?name=Emily+Johnson&background=7988EC&color=fff",
                    },
                    {
                      name: "Robert Davis",
                      role: "Inventory Specialist",
                      tasks: 5,
                      avatar: "https://ui-avatars.com/api/?name=Robert+Davis&background=13CE66&color=fff",
                    },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{member.role}</p>
                      </div>
                      <div className="flex-shrink-0 flex items-center">
                        <ClipboardList className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm">{member.tasks}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    <span>View Team</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
