import { Check, Copy } from 'lucide-react';
import type { FC, HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';

import { Button } from './ui/Button';

type CopyButtonProps = HTMLAttributes<HTMLButtonElement> & {
  value: string;
};

const CopyButton: FC<CopyButtonProps> = ({ value }) => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHasCopied(false), 2000);

    return () => clearTimeout(timeout);
  }, [hasCopied]);

  const copyToClipboard = (valueToCopy: string): void => {
    navigator.clipboard.writeText(valueToCopy);
    setHasCopied(true);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-fit rounded-sm p-0 hover:bg-background"
      onClick={() => copyToClipboard(value)}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  );
};

export default CopyButton;
