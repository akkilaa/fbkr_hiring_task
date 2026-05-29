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
  uri?: never
  module?: never
}

interface IconByXmlProps extends IconBaseProps {
  xml: string
  name?: never
  uri?: never
  module?: never
}

interface IconByUriProps extends IconBaseProps {
  uri: string
  name?: never
  xml?: never
  module?: never
}

interface IconByModuleProps extends IconBaseProps {
  module: number // require('@/assets/icons/someIcon.svg')
  name?: never
  xml?: never
  uri?: never
}

type IconProps = IconByNameProps | IconByXmlProps | IconByUriProps | IconByModuleProps

const Icon = memo(({ size = 24, color, ...rest }: IconProps) => {
  const [hasError, setHasError] = useState(false)

  if ('xml' in rest && rest.xml) {
    return <SvgXml xml={rest.xml} width={size} height={size} color={color} />
  }

  if (hasError) {
    return <View style={{ width: size, height: size }} />
  }

  const resolvedUri =
    'module' in rest && rest.module != null
      ? Image.resolveAssetSource(rest.module).uri
      : 'uri' in rest && rest.uri
        ? rest.uri
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
