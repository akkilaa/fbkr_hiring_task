import { useBottomSheet } from '@/bottom-sheet/BottomSheetProvider'
import Pressable from '@/components/atoms/Pressable'
import RadioButton from '@/components/atoms/RadioButton'
import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import {
  BRAND_COLORS,
  BRAND_LABELS,
  type CreditCard,
  useCreditCardStore,
} from '@/store/creditCardStore'
import { StyleSheet, View } from 'react-native'

const CardRow = ({ card }: { card: CreditCard }) => {
  const theme = useTheme()
  return (
    <View style={styles.cardRow}>
      <View style={[styles.brandBadge, { backgroundColor: BRAND_COLORS[card.brand] }]}>
        <Typography variant="caption" style={styles.brandLabel}>
          {BRAND_LABELS[card.brand]}
        </Typography>
      </View>
      <View style={styles.cardInfo}>
        <Typography variant="bodyMedium">•••• {card.last4}</Typography>
        <Typography variant="caption" style={{ color: theme.textSecondary }}>
          Expires {card.expiry}
        </Typography>
      </View>
    </View>
  )
}

const NewCreditCardButton = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme()

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.addCardRow,
        { borderColor: theme.brand, backgroundColor: theme.backgroundElement },
      ]}
    >
      <View style={[styles.addIcon, { backgroundColor: theme.brand }]}>
        <Typography variant="label" style={styles.addIconText}>
          +
        </Typography>
      </View>
      <Typography variant="bodyMedium" style={{ color: theme.brand }}>
        New credit card
      </Typography>
    </Pressable>
  )
}

const ListAvailableCreditCards = ({
  cards,
  selectedCardId,
  onSelectCard,
  onAddAnotherCard,
}: {
  cards: CreditCard[]
  selectedCardId: string | null
  onSelectCard: (cardId: string) => void
  onAddAnotherCard: () => void
}) => {
  const theme = useTheme()

  return (
    <View style={styles.cardList}>
      {cards.map((card) => (
        <RadioButton
          key={card.id}
          card
          selected={card.id === selectedCardId}
          onPress={() => onSelectCard(card.id)}
          label={<CardRow card={card} />}
        />
      ))}

      <Pressable onPress={onAddAnotherCard} style={styles.addAnotherRow}>
        <Typography variant="label" style={{ color: theme.brand }}>
          + Add another card
        </Typography>
      </Pressable>
    </View>
  )
}

const CreditCardSection = () => {
  const theme = useTheme()
  const { present } = useBottomSheet()
  const { cards, selectedCardId, selectCard } = useCreditCardStore()

  const openAddSheet = () => present('addCreditCard', {})

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Typography variant="title3" style={styles.title}>
        Payment card
      </Typography>

      {cards.length === 0 ? (
        <NewCreditCardButton onPress={openAddSheet} />
      ) : (
        <ListAvailableCreditCards
          cards={cards}
          selectedCardId={selectedCardId}
          onSelectCard={selectCard}
          onAddAnotherCard={openAddSheet}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
  },
  title: {},
  addCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderRadius: 10,
    borderStyle: 'dashed',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  addIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconText: {
    color: '#ffffff',
    lineHeight: 16,
  },
  cardList: {
    gap: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  brandLabel: {
    color: '#ffffff',
    fontWeight: '700',
  },
  cardInfo: {
    gap: 2,
  },
  addAnotherRow: {
    alignItems: 'center',
    paddingVertical: 10,
  },
})

export default CreditCardSection
