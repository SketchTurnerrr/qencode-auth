import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
});

export const Route = createLazyFileRoute('/forgot-password')({
  component: ForgotPassword,
});

export function ForgotPassword() {
  const { formState } = useForm();
  const navigate = useNavigate();

  const { isValid } = formState;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        'https://auth-qa.qencode.com/v1/auth/password-reset',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
          }),
        }
      );

      if (response.ok) {
        navigate({ to: '/create-new-password' });
      } else {
        const data = await response.json();
        toast.error(data.detail);
        console.error('Password reset request failed:', response.statusText);
      }
    } catch (error) {
      console.error('Password reset request failed:', error);
    }
  }

  return (
    <div className="flex flex-col w-[400px]">
      <h1 className="text-[30px] font-bold mb-[40px] text-center">
        Forgot Password?
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className="mb-[25px]"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!isValid}
            size={'lg'}
            className="w-full text-base bg-qencodePrimary"
          >
            Send
          </Button>

          <Link to="/">
            <Button
              size={'lg'}
              variant={'outline'}
              className="w-full text-base mt-[20px]"
            >
              Cancel
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
}
