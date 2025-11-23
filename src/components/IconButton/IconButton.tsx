import styles from './IconButton.module.css';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
  square?: boolean;
}

export const IconButton = ({
  icon,
  onClick,
  disabled = false,
  square = true,
}: IconButtonProps) => {
  return (
    <button
      className={`${styles.button} ${square && styles.square}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {icon}
    </button>
  );
};
