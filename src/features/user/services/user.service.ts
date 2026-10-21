import { apiRequest } from "@/lib/api-request";
import { GetCurrentUserProfileApiResponse } from "@/features/user/types/user.dto";

export async function getCurrentUserProfile() {
  const response = await apiRequest<GetCurrentUserProfileApiResponse>("/users/me");
  return response.data;
}
