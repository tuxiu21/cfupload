import ToastProvider from '@/components/toast-provider';
import { ThemeProvider } from 'next-themes'


export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider themes={['dark','light','cupcake','sunset','cyberpunk']}
    enableSystem={true}
    // daisyui用的是data-theme
    attribute='data-theme'
    >
      {/* {children} */}
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}