import ChevronLeftIcon from '@/assets/icons/chevron-left.svg'
import Icon from '@/components/atoms/Icon'
import IconButton from '@/components/atoms/IconButton'
import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'

interface NavigationHeaderProps {
  title: string
  onBack?: () => void
}

const NavigationHeader = ({ title, onBack }: NavigationHeaderProps) => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <View style={[styles.container, { borderBottomColor: theme.backgroundSelected }]}>
      <IconButton
        accessibilityLabel="Go back"
        icon={<Icon icon={ChevronLeftIcon} size={22} color={theme.text} />}
        onPress={onBack ?? (() => router.back())}
      />
      <Typography variant="callout" style={[styles.title, { color: theme.text }]}>
        {title}
      </Typography>
      {/* Spacer keeps title centred */}
      <View style={styles.spacer} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#ffffff',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
  spacer: {
    width: 40,
  },
})

export default NavigationHeader
