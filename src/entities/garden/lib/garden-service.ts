import type { SupabaseClient } from "@supabase/supabase-js";
import * as gardenApi from "@/entities/garden/api/garden-api";
import type { IGetGarden } from "@/entities/garden/api/dtos";

/**
 * 주어진 유저와 주어진 날짜의 대한 잔디밭 정보 가져오기
 */
export const getGarden = (params: IGetGarden, supabase?: SupabaseClient) => {
  return gardenApi.getGarden(params, supabase);
};
