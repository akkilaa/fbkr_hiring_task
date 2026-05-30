import type { IconName } from '@/constants/icons'
import { ICONS } from '@/constants/icons'
import { memo, useState } from 'react'
import { Image, View } from 'react-native'
import { SvgUri, SvgXml } from 'react-native-svg'

interface IconBaseProps {
  size?: number
  color?: string
}

interface IconByNameProps extends IconBaseProps {
  name: IconName
  xml?: never
  icon?: never
}

interface IconByXmlProps extends IconBaseProps {
  xml: string
  name?: never
  icon?: never
}

interface IconByIconProps extends IconBaseProps {
  icon: number | string // import X from '*.svg' or 'https://...'
  name?: never
  xml?: never
}

type IconProps = IconByNameProps | IconByXmlProps | IconByIconProps

/**
 * Renders an SVG icon from three possible sources (mutually exclusive):
 *
 * Local bundled file:
 *   import MapPinIcon from '@/assets/icons/map-pin.svg'
 *   <Icon icon={MapPinIcon} size={24} color="black" />
 *
 * Remote URL, always pull from ICONS constant, never inline strings:
 *   import { ICONS } from '@/constants/icons'
 *   <Icon icon={ICONS.logo.uri} size={32} />
 *
 * Named shorthand (looks up ICONS internally, same result as above):
 *   <Icon name="logo" size={32} />
 *
 * Raw XML string (one-off SVGs that won't be reused):
 *   <Icon xml={svgString} size={24} color="red" />
 */
const Icon = memo(({ size = 24, color, ...rest }: IconProps) => {
  const [hasError, setHasError] = useState(false)

  if ('xml' in rest && rest.xml) {
    return <SvgXml xml={rest.xml} width={size} height={size} color={color} />
  }

  if (hasError) {
    return <View style={{ width: size, height: size }} />
  }

  const resolvedUri =
    'icon' in rest && rest.icon != null
      ? typeof rest.icon === 'number'
        ? Image.resolveAssetSource(rest.icon).uri
        : rest.icon
      : ICONS[rest.name as IconName].uri

  return (
    <SvgUri
      uri={resolvedUri}
      width={size}
      height={size}
      color={color}
      onError={() => setHasError(true)}
    />
  )
})

export default Icon
