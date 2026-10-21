import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthToggleLink } from "./AuthToggleLink";
import { AuthOperationMode } from "@/features/auth/types/auth.dto";

interface AuthFormCardProps {
  children: React.ReactNode;
  page: AuthOperationMode;
  title: string;
  description: string;
}

export function AuthFormCard({ children, page, title, description }: AuthFormCardProps) {
  return (
    <Card className="max-w-md w-full mx-4 my-10 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <AuthToggleLink page={page} />
    </Card>
  );
}
