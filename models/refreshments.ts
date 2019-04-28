export interface RefreshmentType {
  id: number;
  name: string;
  icon: string;
}

export interface QuantityInfo {
  id: number;
  quantity: number;
}

export interface Order {
  refreshmentType: number;
  quantity: number;
}
