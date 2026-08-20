import { ErpDashboard } from "./ErpDashboard";
import { VanSalesDashboard, VanSalesPhone } from "./VanSalesDashboard";
import { DistributorDashboard } from "./DistributorDashboard";
import { MerchandiserDashboard } from "./MerchandiserDashboard";
import { AssetDashboard } from "./AssetDashboard";

export {
  ErpDashboard,
  VanSalesDashboard,
  VanSalesPhone,
  DistributorDashboard,
  MerchandiserDashboard,
  AssetDashboard,
};

/**
 * Ordered to match `solutions` in lib/site.ts, so a product's index picks its
 * own dashboard rather than a generic illustration.
 */
export const DASHBOARDS = [
  ErpDashboard, // Custom ERP
  VanSalesDashboard, // Van Sales System
  DistributorDashboard, // Distributor Management
  MerchandiserDashboard, // Merchandiser Management
  AssetDashboard, // Asset Management
] as const;
