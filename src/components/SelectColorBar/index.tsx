/* eslint-disable @next/next/no-img-element */
import getImageFromCloudinary from "@/helper/getImageCloudinary";
import { AdvancedImage } from "@cloudinary/react";
import { replaceColor } from "@cloudinary/url-gen/actions/adjust";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { v4 as uuidv4 } from "uuid";

export interface ISelectColorBar {
  setCustomColor: (color: string) => void;
}

export const SelectColorBar = ({ setCustomColor }: ISelectColorBar) => {
  const colorsArray = [
    "DDDDDD",
    "47E8D2",
    "DCA381",
    "702C3C",
    "E9C660",
    "A11D1F",
    "897115",
    "598DE6",
  ];

  return (
    <ul className="flex gap-1">
      {colorsArray.map((color: any) => {
        const img = getImageFromCloudinary().image("color-bar_unxecd");
        img
          .resize(scale().width(30).height(30))
          .adjust(replaceColor(`${color}`));
        return (
          <li
            key={uuidv4()}
            onClick={() => setCustomColor(`#${color}`)}
            className="hover:cursor-pointer"
          >
            <AdvancedImage cldImg={img} />
          </li>
        );
      })}
    </ul>
  );
};
