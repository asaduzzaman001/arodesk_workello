import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginWithGoogle } from "@/app/actions/auth/login";

export function Form() {
  return (
    <Card className="w-full max-w-sm mx-auto mt-20 shadow-lg shadow-primary/50">
      <CardHeader>
        <CardTitle className="text-center">Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
              <a
                href="#"
                className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center mt-1 text-sm text-muted-foreground">
          <span>Dont have an account? </span>
          <CardAction>
            <Button variant="link" className="text-xs">
              Sign Up
            </Button>
          </CardAction>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-primary">
          Login
        </Button>
        <Button variant="outline" className="w-full" onClick={loginWithGoogle}>
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
