type AvatarType = {
  image: string;
  name: string;
  className?: string;
  children?: JSX.Element;
};

export const Avatar = ({ image, name, className, children }: AvatarType) => {
  return (
    <div className={`avatar-circle ${className} `}>
      <img src={image} alt={name} className={`bor-4`} />
      {children}
    </div>
  );
};
