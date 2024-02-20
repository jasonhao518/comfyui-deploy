'use client'
import React from 'react';
import { Icons } from '../shared/icons';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';
import { useTranslations } from 'next-intl';

const BackButton: React.FC = () => {
  const t = useTranslations()
  const goBack = () => {
    // Using window.history.back() to go to the previous page
    window.history.back();
  };

  return (
    <button
      onClick={goBack}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "absolute left-4 top-4 md:left-8 md:top-8"
      )}
    >
      <>
        <Icons.chevronLeft className="mr-2 size-4" />
        {t("back")}
      </>
    </button>
  );
};

export default BackButton;