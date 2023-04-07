import Link from "next/link";
import React from "react";

interface Props {
  width?: string;
  height?: string;
  circular?: boolean;
  image_url?: string;
  user_data?: any; // TODO
  route?: string;
}

function Avatar({
  width = "w-[45px]",
  height = "h-[45px]",
  circular = true,
  image_url = "",
  user_data = null,
  route,
}: Props) {
  return (
    <div
      className={`${width} ${height} ${
        circular && "rounded-full overflow-hidden"
      } transition ease-in-out delay-150 hover:opacity-80`}
    >
      {user_data ? (
        <Link href={user_data?.id}>
          <AvatarImage
            key={"user_data_image"}
            src={image_url === "" ? "" : image_url}
            alt={user_data?.user_name}
          />
        </Link>
      ) : route ? (
        <Link href={route}>
          <AvatarImage
            key={"avatar_noData_image"}
            src={image_url === "" ? "" : image_url}
            alt={"Avatar_image"}
          />
        </Link>
      ) : (
        <AvatarImage
          key={"avatar_noData_image"}
          src={image_url === "" ? "" : image_url}
          alt={"Avatar_image"}
        />
      )}
    </div>
  );
}

export default Avatar;

const AvatarImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return <img src={src} alt={alt} className={`${className}`} />;
};
