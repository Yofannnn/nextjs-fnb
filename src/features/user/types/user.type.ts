export enum UserRoleType {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CASHIER = "CASHIER",
  KITCHEN = "KITCHEN",
  BAR = "BAR",
  MEMBER = "MEMBER",
}

export interface UserProfileView {
  id: string;
  name: string;
  address: string | null;
  email: string;
  role: UserRoleType;
  emailVerifiedAt: Date | null;
  createdAt: Date;
}
