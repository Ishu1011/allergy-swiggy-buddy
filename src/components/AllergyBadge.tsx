import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { AllergenCheckResult, formatAllergenName, formatProbability } from '@/utils/allergenUtils';
import { cn } from '@/lib/utils';

interface AllergyBadgeProps {
  checkResult: AllergenCheckResult;
  showDetails?: boolean;
  className?: string;
}

const AllergyBadge: React.FC<AllergyBadgeProps> = ({
  checkResult,
  showDetails = true,
  className,
}) => {
  if (checkResult.isSafe) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <span className="badge-safe flex items-center gap-1">
          <Check className="w-3 h-3" />
          Safe
        </span>
      </div>
    );
  }

  const { highestRisk } = checkResult;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="badge-unsafe flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        Unsafe
      </span>
      {showDetails && highestRisk && (
        <p className="text-xs text-destructive font-medium">
          {formatProbability(highestRisk.probability)} chance of{' '}
          {formatAllergenName(highestRisk.name)}
        </p>
      )}
    </div>
  );
};

export default AllergyBadge;
