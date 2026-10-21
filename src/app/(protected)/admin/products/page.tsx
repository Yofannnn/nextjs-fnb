"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoadingDot } from "@/components/ui/loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductActionsDropdown } from "@/features/product/components/list/ProductActionsDropdown";
import { ProductSetStatus } from "@/features/product/components/list/ProductSetStatusDropdown";
import { useProductManagement } from "@/features/product/hooks/useProductManagement";
import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";
import { PlusIcon } from "lucide-react";

export default function AdminProductsOverviewPage() {
  const router = useRouter();

  const { products, isLoading, error, isFetchingNextPage, hasNextPage, loadMoreRef } = useProductManagement();

  return (
    <main className="w-full p-4 overflow-x-hidden">
      <div className="w-full flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">Products</h1>
        <Button onClick={() => router.push("/admin/products/create")}>
          <PlusIcon className="mr-1" /> Add Product
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image src={product.primaryImageUrl} alt={product.name} width={50} height={50} className="object-cover" />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="hidden md:table-cell">{formatCurrencyToIDR(product.price)}</TableCell>
              <TableCell>
                <ProductSetStatus id={product.id} status={product.status} />
              </TableCell>
              <TableCell>
                <ProductActionsDropdown />
              </TableCell>
            </TableRow>
          ))}
          {hasNextPage && (
            <TableRow>
              <TableCell colSpan={5}>
                <div ref={loadMoreRef} className="w-full flex justify-center items-center p-8">
                  {isFetchingNextPage && <LoadingDot />}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
