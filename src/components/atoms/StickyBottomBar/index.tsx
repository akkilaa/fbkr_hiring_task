import { useTheme } from '@/hooks/use-theme'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface StickyBottomBarProps {
  children: React.ReactNode
}

const StickyBottomBar = ({ children }: StickyBottomBarProps) => {
  const theme = useTheme()
  const { bottom } = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: bottom + 12,
          borderTopColor: theme.backgroundSelected,
          backgroundColor: theme.background,
        },
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
})

export default StickyBottomBar
