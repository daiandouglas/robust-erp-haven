
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const DashboardCard = ({ title, children, className, action }: DashboardCardProps) => {
  return (
    <div className={cn(
      "rounded-xl bg-white dark:bg-gray-800 shadow-subtle overflow-hidden",
      className
    )}>
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-medium">{title}</h3>
        {action && (
          <div>
            {action}
          </div>
        )}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
