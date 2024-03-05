import { Separator } from '@radix-ui/react-separator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PasswordInput } from './ui/passwordInput';
import GoogleLogo from '../assets/google-logo.svg';
import GithubLogo from '../assets/github-logo.svg';
import { Link } from '@tanstack/react-router';
import { toast } from 'sonner';
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

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(42),
});

export function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        'https://auth-qa.qencode.com/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.detail);
      }

      const data = await response.json();

      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;

      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-center text-[30px] font-bold mb-[40px]">
        Log in to your account
      </h1>
      <div className="flex gap-4">
        <Button size={'lg'} variant={'outline'}>
          <img className="mr-4" src={GoogleLogo} alt="google logo" />
          Google
        </Button>
        <Button size={'lg'} variant={'outline'}>
          <img className="mr-4" src={GithubLogo} alt="github logo" />
          Github
        </Button>
      </div>
      <Separator className="relative my-[30px]">
        <span className="bg-white px-2 text-xs font-bold text-gray-300 absolute -top-[9px] left-[46%]">
          OR
        </span>
      </Separator>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className="mb-[25px]"
                    placeholder="Work email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
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
            className="w-full mb-1 text-base bg-qencodePrimary"
            size={'lg'}
          >
            Log in to Qencode
          </Button>
        </form>
      </Form>

      <Link
        to="/forgot-password"
        activeOptions={{ exact: true }}
        className="self-end"
      >
        <Button className=" mb-[30px] p-0 text-[#316FEA]" variant={'link'}>
          Forgot your password?
        </Button>
      </Link>

      <div className="">
        <p className="text-center">
          Is your company new to Qencode?{' '}
          <Button className="p-0 text-qencodePrimary" variant={'link'}>
            Sign up
          </Button>
        </p>
      </div>
    </div>
  );
}
