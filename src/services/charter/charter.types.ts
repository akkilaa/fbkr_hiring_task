import type { NullableStringBool, StringBool } from '@/types/api'

/** Clean domain model with proper TypeScript types */
export interface Charter {
  id: number
  title: string
  description: string
  shortdesc: string
  longdesc: string
  thumbpath: string
  city: string
  street: string
  postalcode: string
  directions: string
  timezone: string
  geopoint: CharterGeopoint
  currency: string
  deposit: number
  capacity: number
  boatType: string
  manufacturer: string
  yearBuilt: string
  engineHorsepower: string
  engineNumber: string
  cancellation: string
  freeCancellationDaysInAdvance: number
  isBookable: boolean
  isPublic: boolean
  hasBoat: boolean
  clientsKeepCatch: boolean
  childrenAllowed: boolean
  packageMinPriceGroupUsd: number | null
}

/**
 * Raw API response shape — inherits shared fields from Charter,
 * overrides fields whose name or type differ from the wire format.
 */
export interface CharterDTO extends Omit<
  Charter,
  | 'id'
  | 'capacity'
  | 'boatType'
  | 'yearBuilt'
  | 'engineHorsepower'
  | 'engineNumber'
  | 'freeCancellationDaysInAdvance'
  | 'isBookable'
  | 'isPublic'
  | 'hasBoat'
  | 'clientsKeepCatch'
  | 'childrenAllowed'
  | 'packageMinPriceGroupUsd'
> {
  // Overrides
  id: string
  capacity: string
  boat_type: string
  year_built: string
  engine_horsepower: string
  engine_number: string
  free_cancellation_days_in_advance: string
  bookable: boolean
  public: boolean
  has_boat: boolean
  clients_keep_catch: StringBool
  children_allowed: StringBool
  package_min_price_group_usd: string
  // DTO-only fields
  user_id: string
  location_idlocation: number
  state_idstate: number
  country_idcountry: number
  listing_type: string
  guide: string
  urltitle: string
  seo_url: boolean | string
  cover_photo_id: string
  visible: StringBool
  published: StringBool
  unpublish_reason: string | null
  linked: boolean
  date_created: string
  date_updated: string
  date_published: string
  snooze_active: StringBool
  snooze_start_date: string | null
  snooze_end_date: string | null
  pipedrive_companyid: string
  credit_card_fee: string
  license_status: string
  license_flag: string
  min_deposit: number
  custom_deposit_active: StringBool
  terms_accepted: StringBool
  length: string
  boat_media_photo_id: number
  boat_media_photo_verified: boolean
  last_restored: string
  engine_manufacturer: string
  max_speed: string
  // Navigation equipment
  gps: StringBool
  fishfinder: StringBool
  vhf_radio: StringBool
  sonar: StringBool
  radar: StringBool
  // Safety equipment
  life_jackets: StringBool
  liferaft: StringBool
  fire_extinguishers: StringBool
  first_aid_equipment: StringBool
  cpr_trained_crew: StringBool
  epirb: StringBool
  flares: StringBool
  // Boat amenities
  flybridge: StringBool
  toilet: StringBool
  shower: StringBool
  kitchen: StringBool
  microwave: StringBool
  refrigerator: StringBool
  oven: StringBool
  stove: StringBool
  dining_table: StringBool
  bed: StringBool
  bedroom: StringBool
  couch: StringBool
  ac: StringBool
  multimedia: StringBool
  radio: StringBool
  cd: StringBool
  dvd: StringBool
  tv: StringBool
  wtm: StringBool
  anchor: StringBool
  // Fishing techniques
  big_game_fishing: StringBool
  bottom_fishing: StringBool
  light_tackle: StringBool
  heavy_tackle: StringBool
  trolling: StringBool
  fly_fishing: StringBool
  drift_fishing: StringBool
  jigging: StringBool
  popping: StringBool
  handline: StringBool
  kite_fishing: StringBool
  bow_fishing: StringBool
  ice_fishing: NullableStringBool
  gigging: StringBool
  spinning: StringBool
  spearfishing: StringBool
  // Water types
  fishing_type_river: StringBool
  fishing_type_lake: StringBool
  fishing_type_inshore: StringBool
  fishing_type_nearshore: StringBool
  fishing_type_offshore: StringBool
  fishing_type_reef: StringBool
  fishing_type_wreck: StringBool
  fishing_type_flats: StringBool
  fishing_type_backcountry: StringBool
  // Policies
  no_smoking: StringBool
  no_alcohol: StringBool
  crew_keeps_catch: StringBool
  catch_guarantee: NullableStringBool
  catch_and_release_allowed: StringBool
  catch_and_release_strict: StringBool
  disabled_accessible: StringBool
  // Gear & services
  fighting_chair: StringBool
  first_mate: NullableStringBool
  livewell: StringBool
  outriggers: StringBool
  downriggers: StringBool
  centerrigger: StringBool
  tuna_tubes: StringBool
  spearfishing_equipment: StringBool
  snorkeling_equipment: StringBool
  fly_fishing_equipment: NullableStringBool
  rods_reels_tackle: StringBool
  live_bait: StringBool
  lures: StringBool
  catch_cleaning_filleting: StringBool
  snacks: StringBool
  drinks: StringBool
  lunch: StringBool
  insurance: StringBool
  fishing_licence: StringBool
  ice_box: StringBool
  // Payment
  cash: StringBool
  visa: StringBool
  master_card: StringBool
  payment_check: StringBool
  bank_transfer: StringBool
  american_express: StringBool
  paypal: StringBool
  // Booking
  pickup: string
  package_min_price_person_usd: string | null
  package_min_num_persons: string
  is_pricing_tax_inclusive: boolean
  should_charge_taxes: boolean
  // Media
  wistia_id: string
  // Flags
  anglers_choice: boolean
  flag_new: boolean
  flag_new_badge: boolean
  // Calendar
  calendar_activity: CharterCalendarActivity
  availability_last_updated: string
  availability_last_updated_admin: string
  availability_last_modified_captain: string
}

interface CharterGeopoint {
  latitude: number
  longitude: number
}

interface CharterCalendarActivity {
  id: number
  date_created: string
  date_updated: string
}
