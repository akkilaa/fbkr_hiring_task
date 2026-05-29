export type IconName = keyof typeof ICONS

export const ICONS = {
  // Brand
  logo: {
    uri: 'https://static.fishingbooker.com/public/images/icons/logo.svg',
  },
  logoWhite: {
    uri: 'https://static.fishingbooker.com/public/images/blog/logo-white.svg',
  },
  logoBlue: {
    uri: 'https://s3.amazonaws.com/static.fishingbooker.com/public/images/blog/blue-logo.svg',
  },

  // UI
  hamburger: {
    uri: 'https://s3.amazonaws.com/static.fishingbooker.com/public/images/blog/icons/bar.svg',
  },
  close: {
    uri: 'https://s3.amazonaws.com/static.fishingbooker.com/public/images/blog/icons/x.svg',
  },
  search: {
    uri: 'https://s3.amazonaws.com/static.fishingbooker.com/public/images/blog/icons/search-loupe.svg',
  },
  date: {
    uri: 'https://s3.amazonaws.com/static.fishingbooker.com/public/images/blog/icons/date.svg',
  },
  clock: {
    uri: 'https://s3.amazonaws.com/static.fishingbooker.com/public/images/blog/icons/clock.svg',
  },

  // Flags
  flagCa: {
    uri: 'https://static.fishingbooker.com/public/images/square-flags/ca.svg',
  },
  flagRs: {
    uri: 'https://static.fishingbooker.com/public/images/square-flags/rs.svg',
  },
  flagBg: {
    uri: 'https://static.fishingbooker.com/public/images/square-flags/bg.svg',
  },
  flagMe: {
    uri: 'https://static.fishingbooker.com/public/images/square-flags/me.svg',
  },
} as const
