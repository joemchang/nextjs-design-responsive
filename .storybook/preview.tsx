import type { Preview } from '@storybook/nextjs-vite'
import { Geist, Instrument_Serif, VT323 } from 'next/font/google'
import '../app/globals.css'

// Mirrors app/layout.tsx so the font CSS variables resolve in stories.
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
})
const vt323 = VT323({ variable: '--font-vt323', weight: '400', subsets: ['latin'] })

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme
      return (
        <div
          className={`${geistSans.variable} ${instrumentSerif.variable} ${vt323.variable} bg-background text-foreground font-sans`}
        >
          <Story />
        </div>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
