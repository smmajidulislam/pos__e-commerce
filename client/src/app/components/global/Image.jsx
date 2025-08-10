import config from "../../../actions/config";
import Image from "next/image";
const ImageComponent = (props) => {
  let fullSrc = "";
  if (props?.isBase) {
    fullSrc = `${props.src}`;
  } else {
    fullSrc = `${config?.image_base_path}${props.src}`;
  }

  return (
    <>
      <Image
        className={props?.className}
        src={fullSrc}
        height={props?.height}
        alt={props?.alt || "image"}
        width={props?.width}
      />
    </>
  );
};

export default ImageComponent;
