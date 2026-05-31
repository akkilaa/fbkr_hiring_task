import Typography from '@/components/atoms/Typography'
import { CHECKOUT_STEPS, type CheckoutVariant } from '@/constants/checkout'
import { useTheme } from '@/hooks/use-theme'
import { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

const CIRCLE_SIZE = 22

interface CheckoutBreadcrumbProps {
  variant: CheckoutVariant
  currentStep: number
}

const CheckoutBreadcrumb = ({ variant, currentStep }: CheckoutBreadcrumbProps) => {
  const theme = useTheme()
  const steps = CHECKOUT_STEPS[variant]

  return (
    <View style={styles.container}>
      {steps.map((label, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep
        const isLast = index === steps.length - 1

        const circleColor = isCompleted || isActive ? theme.brand : theme.backgroundSelected
        const labelColor = isActive ? theme.text : isCompleted ? theme.brand : theme.textSecondary
        const lineColor = isCompleted ? theme.brand : theme.backgroundSelected

        return (
          <Fragment key={label}>
            <View style={styles.step}>
              <View style={[styles.circle, { backgroundColor: circleColor }]}>
                {isCompleted ? (
                  <Typography variant="caption" style={styles.circleText}>
                    ✓
                  </Typography>
                ) : (
                  <Typography variant="caption" style={styles.circleText}>
                    {index + 1}
                  </Typography>
                )}
              </View>
              <Typography
                variant="caption"
                numberOfLines={2}
                style={[styles.label, { color: labelColor }]}
              >
                {label}
              </Typography>
            </View>
            {!isLast && (
              <View
                style={[
                  styles.line,
                  { backgroundColor: lineColor, marginTop: CIRCLE_SIZE / 2 - 0.75 },
                ]}
              />
            )}
          </Fragment>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  step: {
    alignItems: 'center',
    width: 72,
    gap: 5,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: '#ffffff',
    fontWeight: '600',
    lineHeight: CIRCLE_SIZE,
  },
  label: {
    textAlign: 'center',
  },
  line: {
    flex: 1,
    height: 1.5,
  },
})

export default CheckoutBreadcrumb
