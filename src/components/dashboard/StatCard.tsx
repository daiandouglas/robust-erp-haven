
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  className?: string;
}

const StatCard = ({ title, value, icon, description, change, className }: StatCardProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-subtle card-hover",
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="mt-1 text-2xl font-semibold">
            {value}
          </h3>
          
          {change && (
            <div className="mt-1 flex items-center">
              <span 
                className={cn(
                  "text-xs font-medium mr-1",
                  change.type === 'increase' && "text-erp-success",
                  change.type === 'decrease' && "text-erp-error",
                  change.type === 'neutral' && "text-erp-gray"
                )}
              >
                {change.value > 0 && '+'}
                {change.value}%
              </span>
              
              {change.type === 'increase' && (
                <svg className="w-3 h-3 text-erp-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              
              {change.type === 'decrease' && (
                <svg className="w-3 h-3 text-erp-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              
              {description && (
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground">
          {icon}
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary/5 dark:bg-primary/10" />
    </div>
  );
};

export default StatCard;
