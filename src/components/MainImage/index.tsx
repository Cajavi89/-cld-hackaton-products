/* eslint-disable @next/next/no-img-element */
import { AdvancedImage } from '@cloudinary/react'
import { Transformation } from '@cloudinary/url-gen'
import { scale, thumbnail } from '@cloudinary/url-gen/actions/resize'
import {
  brightness,
  opacity,
  replaceColor,
} from '@cloudinary/url-gen/actions/adjust'
import { source } from '@cloudinary/url-gen/actions/overlay'
import { image, text } from '@cloudinary/url-gen/qualifiers/source'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import getImageFromCloudinary from '@/helper/getImageCloudinary'
import ReactImageMagnify from 'react-image-magnify'
import { outline } from '@cloudinary/url-gen/actions/effect'

export interface IMainImageProps {
  color: string
  customText: string
  selectedManImage: string
  addLogo: string
}

export const MainImage = ({
  color,
  customText,
  selectedManImage,
  addLogo,
}: IMainImageProps) => {
  const myImage = getImageFromCloudinary().image(selectedManImage)

  const imageLarge = getImageFromCloudinary().image(selectedManImage)

  const handlerOnload = () => {}

  //main image
  myImage
    .resize(scale().height('500')) //image size
    .backgroundColor('#fff') //background color
    .adjust(replaceColor(`${color}`).tolerance(100)) //replace color of Main Image
  // .effect(colorize().level(60).color(color));

  customText
    ? myImage.overlay(
        //layer of text
        source(
          text(
            `${customText}`, //user's text
            new TextStyle('Montserrat', 40).fontWeight('bold').fontHinting('10') //text style
          )
            .textColor('#33333370') //text color
            .transformation(
              new Transformation().resize(
                scale().width(
                  selectedManImage === 'tshirt-only_pddgyw' ? 150 : 190
                )
              )
            )
        )
          .position(
            new Position()
              .offsetY(addLogo ? 50 : -50)
              .offsetX(selectedManImage === 't-shirt1_z8hyax' ? 0 : -10)
          )
          .blendMode('anti_removal') //text position
      )
    : null

  addLogo
    ? myImage.overlay(
        source(
          image(addLogo).transformation(
            new Transformation()
              .resize(scale().width(100))
              .adjust(opacity(70))
              .adjust(brightness().level(10))
          )
        )
          .position(new Position().offsetX(-5).offsetY(-20))
          .blendMode('anti_removal')
      )
    : null

  selectedManImage === 'tshirt-only_pddgyw'
    ? myImage.resize(thumbnail().zoom(2))
    : null //image size

  return (
    <div>
      <AdvancedImage cldImg={myImage} />;
    </div>
  )
}
