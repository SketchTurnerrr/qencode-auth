import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/passwordInput';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/create-new-password')({
  component: CreateNewPassword,
});

const formSchema = z
  .object({
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(42),
    confirmPassword: z.string(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export function CreateNewPassword() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        'https://auth-qa.qencode.com/v1/auth/password-set',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: 'reset-token',
            secret: 'secret',
            password: values.password,
            password_confirm: values.confirmPassword,
          }),
        }
      );

      if (response.ok) {
        navigate({ to: '/' });
      } else {
        const data = await response.json();
        toast.error(data.detail[0].error);
      }
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  }

  return (
    <div className="flex flex-col w-[400px]">
      <h1 className="text-[30px] font-bold mb-[40px] text-center">
        Create new Password?
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    className=""
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    className=""
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size={'lg'}
            className="w-full mb-[20px] text-base bg-qencodePrimary"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
