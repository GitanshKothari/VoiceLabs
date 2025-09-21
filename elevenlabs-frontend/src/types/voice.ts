import type { ServiceType } from "./services";

export interface Voice {
    id: string;
    name: string;
    gradientColors: string;
    service: ServiceType;
  }