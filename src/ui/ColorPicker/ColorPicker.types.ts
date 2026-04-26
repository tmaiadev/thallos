export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  ref?: React.Ref<HTMLDivElement>;
  label?: string;
}
