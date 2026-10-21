import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProductStatus } from "@/features/product/types/product.type";
import { ProductStatusBadge } from "@/features/product/components/shared/ProductStatusBadge";
import { formatProductStatus } from "@/features/product/utils/product.formatter";
import { useSetProductStatus } from "@/features/product/hooks/useProductMutations";

const productStatus = Object.values(ProductStatus);

export function ProductSetStatus({ id, status }: { id: string; status: ProductStatus }) {
  const mutation = useSetProductStatus();

  async function handleSetStatus(status: ProductStatus) {
    await mutation.mutateAsync({ id, status });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="link">
            <ProductStatusBadge status={status} />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Product Status</DropdownMenuLabel>
            {productStatus.map((status) => (
              <DropdownMenuItem key={status} onClick={() => handleSetStatus(status)}>
                {formatProductStatus(status)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
