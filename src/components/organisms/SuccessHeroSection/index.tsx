import CheckmarkIcon from '@/assets/icons/checkmark.svg'
import Icon from '@/components/atoms/Icon'
import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import type { StyleProp, ViewStyle } from 'react-native'
import { Animated, StyleSheet, View } from 'react-native'

interface SuccessHeroSectionProps {
  circleScale: Animated.Value
  contentAnimStyle: StyleProp<ViewStyle>
}

const SuccessHeroSection = ({ circleScale, contentAnimStyle }: SuccessHeroSectionProps) => {
  const theme = useTheme()
  return (
    <View style={styles.hero}>
      <Animated.View
        style={[
          styles.successCircle,
          { backgroundColor: theme.brand },
          { transform: [{ scale: circleScale }] },
        ]}
      >
        <Icon icon={CheckmarkIcon} size={44} color="#ffffff" />
      </Animated.View>

      <Animated.View style={[styles.heroText, contentAnimStyle]}>
        <Typography variant="title1" style={[styles.centred, { color: theme.text }]}>
          Booking Confirmed!
        </Typography>
        <Typography variant="body" style={[styles.centred, { color: theme.textSecondary }]}>
          {"You're all set for your fishing trip"}
        </Typography>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    gap: 24,
  },
  successCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    alignItems: 'center',
    gap: 8,
  },
  centred: {
    textAlign: 'center',
  },
})

export default SuccessHeroSection
