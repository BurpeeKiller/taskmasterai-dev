import React from 'react';
import { cn } from '../../lib/utils';
import { Switch } from '@headlessui/react';

const Toggle = ({ checked, onChange, label, className, disabled = false }) => {
  return (
    <Switch.Group>
      <div className="flex items-center">
        {label && (
          <Switch.Label className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </Switch.Label>
        )}
        <Switch
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            checked ? "bg-primary" : "bg-gray-300 dark:bg-gray-600",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
              checked ? "translate-x-6" : "translate-x-1"
            )}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export { Toggle };
