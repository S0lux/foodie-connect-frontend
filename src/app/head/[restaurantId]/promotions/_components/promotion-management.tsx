"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PromotionDetailCard from "@/app/head/[restaurantId]/promotions/_components/promotion-detail-card";
import Link from "next/link";
import { useParams } from "next/navigation";
import usePromotion from "@/hooks/use-promotion";
import DeletePromotion from "@/app/head/[restaurantId]/promotions/_components/delete-promotion";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";

const PromotionManagement = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();

  const {
    data: promotions,
    isLoading,
    isError,
    refetch,
  } = usePromotion.useGetPromotions(restaurantId);

  const deletePromotion = usePromotion.useDeletePromotion();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter promotions based on search
  const filteredPromotions = promotions?.filter(
    (promo) =>
      promo.name.toLowerCase().includes(search.toLowerCase()) ||
      promo.description.toLowerCase().includes(search.toLowerCase()),
  );

  // Calculate pagination
  const totalPages = Math.ceil(
    (filteredPromotions?.length || 0) / itemsPerPage,
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPromotions = filteredPromotions?.slice(startIndex, endIndex);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeletePromotion = async (promotionId: string) => {
    if (isLoadingDelete) return;
    setIsLoadingDelete(true);
    try {
      await deletePromotion.mutateAsync({ restaurantId, promotionId });
      toast({
        title: "Success",
        description: "Promotion deleted successfully",
      });
      refetch();
    } catch (error) {
      console.error({ error });
      switch ((error as ErrorType).code) {
        case "NOT_AUTHENTICATED":
          toast({
            title: "Error",
            description: "You are not authenticated",
            variant: "destructive",
          });
          break;
        case "NOT_OWNER":
          toast({
            title: "Error",
            description: "You are not the owner of this promotion",
            variant: "destructive",
          });
        default:
          toast({
            title: "Error",
            description: "An error occurred",
            variant: "destructive",
          });
          break;
      }
    } finally {
      setIsLoadingDelete(false);
    }
  };

  if (isLoadingDelete) {
    return (
      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Promotions Management</CardTitle>
            <CardDescription>
              Manage your restaurant's promotional campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-muted-foreground">Deleting promotion...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Promotions Management</CardTitle>
            <CardDescription>
              Manage your restaurant's promotional campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-red-600">Error loading promotions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="space-y-2">
              <CardTitle className="text-xl sm:text-2xl">
                Promotions Management
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Manage your restaurant's promotional campaigns
              </CardDescription>
            </div>
            <Link href={`/head/${restaurantId}/promotions/add`}>
              <Button className="flex w-full items-center gap-2 sm:w-auto">
                <Plus size={16} />
                Add Promotion
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search promotions..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Promotions Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading promotions...
                  </TableCell>
                </TableRow>
              )}

              {currentPromotions?.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No promotions found
                  </TableCell>
                </TableRow>
              )}

              {currentPromotions?.map((promotion) => {
                const now = new Date();
                const beginDate = new Date(promotion.beginsAt);
                const endDate = new Date(promotion.endsAt);
                let status = "Upcoming";
                let statusColor = "bg-blue-100 text-blue-800";

                if (now >= beginDate && now <= endDate) {
                  status = "Active";
                  statusColor = "bg-green-100 text-green-800";
                } else if (now > endDate) {
                  status = "Expired";
                  statusColor = "bg-red-100 text-red-800";
                }

                return (
                  <TableRow key={promotion.promotionId}>
                    <TableCell className="font-medium">
                      {promotion.name}
                    </TableCell>
                    <TableCell className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {promotion.description}
                    </TableCell>
                    <TableCell>{formatDate(promotion.beginsAt)}</TableCell>
                    <TableCell>{formatDate(promotion.endsAt)}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}
                      >
                        {status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[90%] overflow-auto rounded-md">
                            <DialogHeader>
                              <DialogTitle className="text-center">
                                Promotion Details
                              </DialogTitle>
                            </DialogHeader>
                            <div className="">
                              <PromotionDetailCard
                                promotionId={promotion.promotionId}
                              />
                            </div>
                            <DialogFooter></DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <DeletePromotion
                          onDelete={() =>
                            handleDeletePromotion(promotion.promotionId)
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionManagement;
