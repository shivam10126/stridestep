import React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

export function Progress({ value, className, ...props }) {
  return (
    <ProgressPrimitive.Root
      className={`relative overflow-hidden bg-gray-200 rounded-full w-full h-2 ${className}`}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-[#eb432f] transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  )
}