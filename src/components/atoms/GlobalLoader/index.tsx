import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { useLoaderStore } from '@/store/loaderStore'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'

const GlobalLoader = () => {
  const visible = useLoaderStore((s) => s.visible)
  const message = useLoaderStore((s) => s.message)
  const theme = useTheme()

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: theme.background }]}>
          <ActivityIndicator size="large" color={theme.brand} />
          {message ? (
            <Typography variant="label" style={{ color: theme.textSecondary, textAlign: 'center' }}>
              {message}
            </Typography>
          ) : null}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 36,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
})

export default GlobalLoader
