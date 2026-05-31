# fbkr Hiring Task

## Installation & Running

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run on iOS simulator (macOS required):

   ```bash
   npm run ios
   ```

3. Run on Android device: Download [Expo Go](https://expo.dev/go) from the Play Store, then start the dev server and scan the QR code:

   ```bash
   npx expo start
   ```

## Developer's Notes

### Configuration-Driven Development (CDD)

I hope the checkout implementation doesn't come across as overcomplicated. Since the app was recently refactored toward a CDD approach, I wanted the checkout to fully embrace that pattern. The configuration in `appConfiguration.ts` is currently hardcoded, but it can easily be swapped out for a backend response at the right time, enabling proper A/B testing with no structural changes required.

**Two checkout modes:**

1. **Multi-step** — After selecting a package, the user moves through a two step checkout: the first step collects personal details, the second handles payment and booking confirmation.
2. **Single-step** — Both steps are combined into a single screen.

**Configuration example — payment mode:**

I demonstrated how the payment mode UI can be driven entirely by configuration: button labels, titles, and field labels can all be swapped through `appConfiguration.ts`. I would have liked to extend this pattern further across the app, but ran out of time.

### Image Gallery

The `ImageGallery` component initially renders 3 photos and preloads a batch of 30 in the background so that swiping feels instant from the start. As the user scrolls toward the end of a batch, the next one is preloaded automatically, ensuring a consistently smooth experience throughout.

### Architecture & Scalability

I tried to configure as many components as possible for a scalable, production-ready solution:

- **Bottom Sheet** — has a registry and a clean pattern for managing many sheets without coupling.
- **Icon component** — supports both remote SVGs loaded from a URL and local assets from the project.
- **Project structure** — follows Atomic Design, splitting reusable components into atoms, molecules, and organisms for better reusability and discoverability.
- **State management** — React Query for server state, Zustand for client state.
