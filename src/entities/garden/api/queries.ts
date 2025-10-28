import { queryOptions } from "@tanstack/react-query";
import * as gardenService from "@/entities/garden/lib/garden-service";
import { GARDEN_QUERY_KEY } from "@/entities/garden/model/constants";
import type { IGarden } from "@/entities/garden/model/types";

export const gardenQuery = {
  getGarden: (userId: string, selectedYear: number) =>
    queryOptions<IGarden>({
      queryKey: GARDEN_QUERY_KEY.GARDEN(userId, selectedYear),
      queryFn: () => gardenService.getGarden({ userId, selectedYear }),
    }),
};
