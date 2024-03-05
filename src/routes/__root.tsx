import { Outlet, createRootRoute } from '@tanstack/react-router';
import QencodeLogo from '../assets/qencode.svg';
import { Toaster } from '@/components/ui/sonner';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex justify-center items-center min-h-svh min-w-[350px] bg-white">
      <div className="max-w-[400px] flex flex-col items-center ">
        <img src={QencodeLogo} alt="" className="mb-[80px]" />
        <Outlet />
        <Toaster richColors toastOptions={{}} />
      </div>
    </div>
  );
}
