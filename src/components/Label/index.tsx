import styles from './Label.module.scss';

type LabelProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function Label({ icon, children }: LabelProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      {icon}
      <span>{children}</span>
    </div>
  );
}
