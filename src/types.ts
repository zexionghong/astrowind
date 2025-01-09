export interface Form {
  inputs?: Array<{
    type?: string;
    name: string;
    label?: string;
    autocomplete?: string;
    placeholder?: string;
    required?: boolean;
    containerClassName?: string;
    value?: string;
    disabled?: boolean;
  }>;
  textarea?: {
    name?: string;
    label?: string;
    placeholder?: string;
    rows?: number;
  };
  disclaimer?: {
    label: string;
  };
  button?: string | {
    text: string;
    className?: string;
    onclick?: string;
  };
  description?: string;
} 