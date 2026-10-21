import { UserRoleType } from "@/features/user/types/user.type";

export interface AccessTokenPayload {
  readonly sub: string;
  readonly email: string;
  readonly name: string;
  readonly role: UserRoleType;
}
