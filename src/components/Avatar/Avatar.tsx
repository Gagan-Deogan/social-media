type AvatarType = {
  image: string;
  name: string;
  className?: string;
};

export const Avatar = ({ image, name, className }: AvatarType) => {
  return (
    <div className={`avatar-circle ${className} `}>
      <img src={image} alt={name} />
    </div>
  );
};
