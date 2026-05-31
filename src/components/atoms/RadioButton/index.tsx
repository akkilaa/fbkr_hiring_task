import Pressable from '@/components/atoms/Pressable'
import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import type { ReactNode } from 'react'
import { memo } from 'react'
import { StyleSheet, View } from 'react-native'

interface RadioButtonProps {
  selected: boolean
  onPress: () => void
  label: string | ReactNode
  description?: string
  card?: boolean
}

const RadioButton = memo(({ selected, onPress, label, description, card }: RadioButtonProps) => {
  const theme = useTheme()

  return (
    <Pressable
      onPress={onPress}
      style={[
        card ? styles.radioCard : styles.radioOption,
        card && {
          borderColor: selected ? theme.brand : theme.backgroundSelected,
          backgroundColor: selected ? `${theme.brand}0D` : theme.backgroundElement,
        },
      ]}
    >
      <View
        style={[
          styles.radioCircle,
          { borderColor: selected ? theme.brand : theme.backgroundSelected },
        ]}
      >
        {selected && <View style={[styles.radioFill, { backgroundColor: theme.brand }]} />}
      </View>
      <View style={styles.radioContent}>
        {typeof label === 'string' ? <Typography variant="bodyMedium">{label}</Typography> : label}
        {description ? (
          <Typography variant="caption" style={{ color: theme.textSecondary }}>
            {description}
          </Typography>
        ) : null}
      </View>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioFill: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioContent: {
    flex: 1,
    gap: 3,
  },
})

export default RadioButton
export type { RadioButtonProps }
