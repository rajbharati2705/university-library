import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVarient = "extraSmall" | "small" | "medium" | "wide" | "regular";
const varientStyles: Record<BookCoverVarient, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};
interface Props {
  className?: string;
  varient?: BookCoverVarient;
  coverColor: string;
  coverUrl: string;
}
const BookCover = ({
  className,
  varient = "regular",
  coverColor = "#012B48",
  coverUrl = "https://placehold.co/400*600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        varientStyles[varient],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor}></BookCoverSvg>
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverUrl}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
        ></Image>
      </div>
    </div>
  );
};

export default BookCover;
