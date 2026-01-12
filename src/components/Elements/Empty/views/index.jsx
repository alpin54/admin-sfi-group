// -- libraries
import Image from 'next/image';

// -- assets
import EmptyImage from '@assets/image/illustration/empty.svg';

// -- styles
import style from '@elements/Empty/styles/style.module.scss';

const Empty = (props) => {
  const { icon, image, title, description, variant = 'default' } = props;

  return (
    <div className={`${style.empty} ${variant !== 'default' ? style[variant] : ''}`}>
      {image && (
        <div className={style.image}>
          <Image className={style.imageEl} src={image ? image : EmptyImage} alt='SFI Group' width={144} height={144} />
        </div>
      )}
      {icon && <div className={style.icon}>{icon}</div>}
      <h2 className={style.title}>{title}</h2>
      <p className={style.desc}>{description}</p>
    </div>
  );
};

export default Empty;
