import styles from './PostBanner.module.scss';

type PostBannerProps = {
  imageUrl: string;
  alt: string;
};
export function PostBanner({ imageUrl, alt }: PostBannerProps): JSX.Element {
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={styles.wrapper}
      aria-label={alt}
    />
  );
}
