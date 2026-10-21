import { ApiResponse } from "@/lib/types/api-response.type";
import { UserProfileView } from "./user.type";

export type GetCurrentUserProfileApiResponse = ApiResponse<UserProfileView>;
