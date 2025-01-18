import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { BookCoverSvg } from "./book-cover-svg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const varaintStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  coverColor: string;
  coverImage: string;
  className?: string;
  variant?: BookCoverVariant;
}

export const BookCover = ({
  coverColor = "#012b48",
  coverImage = "https://placeimg.com/400*600.png",
  className,
  variant = "regular",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300 ",
        varaintStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverImage}
          alt="book cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};
