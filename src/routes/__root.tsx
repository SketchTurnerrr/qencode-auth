import { Outlet, createRootRoute } from '@tanstack/react-router';
import QencodeLogo from '../assets/qencode.svg';
import { Toaster } from '@/components/ui/sonner';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex items-center justify-center bg-white min-h-svh">
      <div className="flex flex-col items-center">
        <img src={QencodeLogo} alt="" className="mb-[80px]" />
        <Outlet />
        <Toaster richColors toastOptions={{}} />
      </div>
    </div>
  );
}
