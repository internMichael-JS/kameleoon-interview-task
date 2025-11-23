import { useEffect, useRef, useState } from 'react';
import styles from './SelectField.module.css';
import { ArrowIcon } from '@/assets/icons';

import { type Option } from '@/utils/types';

interface Props {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const SelectField = ({ value, options, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  const toggleOpen = () => setOpen(o => !o);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={styles.control} onClick={toggleOpen} type="button">
        <span>{selectedOption ? selectedOption.label : value}</span>
        <span className={styles.arrow}>
          <ArrowIcon className={styles.arrowIcon} />
        </span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {options.map(o => (
            <div
              key={o.value}
              className={styles.option}
              onClick={() => handleSelect(o.value)}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
