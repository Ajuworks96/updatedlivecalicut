'use client';

import React from 'react';
import Link from 'next/link';
import { useRequireAuth, stashPendingAuthAction, type PendingAuthAction } from '@/hooks/use-require-auth';
import { useAuthPrompt } from '@/components/auth/auth-prompt-provider';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

interface AuthGateLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  loginMessage?: string;
  pending?: PendingAuthAction;
  requireVerified?: boolean;
}

/**
 * Link for authenticated users. Guests get a login popup instead of a hard redirect.
 */
export const AuthGateLink: React.FC<AuthGateLinkProps> = ({
  href,
  children,
  className,
  loginMessage,
  pending,
  requireVerified = false,
}) => {
  const { isAuthenticated, isLoading, emailUnconfirmed } = useRequireAuth();
  const { promptLogin } = useAuthPrompt();

  if (isAuthenticated && !isLoading) {
    if (requireVerified && emailUnconfirmed) {
      return (
        <span
          role="button"
          tabIndex={0}
          className={cn('inline-flex cursor-pointer', className)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toast.warning(
                'Verify your email',
                'Confirm your email address before continuing. Check your inbox for the link.'
              );
            }
          }}
          onClick={() =>
            toast.warning(
              'Verify your email',
              'Confirm your email address before continuing. Check your inbox for the link.'
            )
          }
        >
          {children}
        </span>
      );
    }

    return (
      <Link href={href} className={cn('inline-flex', className)}>
        {children}
      </Link>
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      className={cn('inline-flex cursor-pointer', className)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (pending) stashPendingAuthAction(pending);
          else stashPendingAuthAction({ type: 'custom', href });
          promptLogin({
            next: href,
            message: loginMessage || 'Sign in to continue with this action.',
          });
        }
      }}
      onClick={() => {
        if (pending) stashPendingAuthAction(pending);
        else stashPendingAuthAction({ type: 'custom', href });
        promptLogin({
          next: href,
          message: loginMessage || 'Sign in to continue with this action.',
        });
      }}
    >
      {children}
    </span>
  );
};
