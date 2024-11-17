import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SocialIcon } from "react-social-icons";
import { SocialLinks, SocialLink } from "@/types/social.type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Delete, Edit, Plus } from "lucide-react";
import AddSocialForm from "@/app/head/[restaurantId]/_components/add-social-form";
import useSocials from "@/hooks/use-socials";
import { useParams } from "next/navigation";
import EditSocialForm from "@/app/head/[restaurantId]/_components/edit-social-form";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";
import DeleteSocial from "@/app/head/[restaurantId]/_components/delete-social";

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Facebook":
      return (
        <SocialIcon network="facebook" style={{ height: 20, width: 20 }} />
      );
    case "Twitter":
      return <SocialIcon network="twitter" style={{ height: 20, width: 20 }} />;
    case "Tiktok":
      return <SocialIcon network="tiktok" style={{ height: 20, width: 20 }} />;
    default:
      return null;
  }
};

const SocialOverview = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { data: socialLinks, refetch } = useSocials.useGetSocials(restaurantId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const deleteSocial = useSocials.useDeleteSocial();
  const handleDelete = async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await deleteSocial.mutateAsync({ restaurantId, socialId: id });
      toast({
        title: "Success",
        description: "Social deleted successfully",
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
            description: "You are not the owner of this restaurant",
            variant: "destructive",
          });
          break;
        case "SOCIAL_NOT_FOUND":
          toast({
            title: "Error",
            description: "Social not found",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Error",
            description: "An error occurred",
            variant: "destructive",
          });
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="mb-4 text-left text-2xl font-bold">
            Social Media Overview
          </h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full sm:w-auto"
                variant={"secondary"}
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus size={16} className="mr-2" />
                Add New Social
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] rounded-md sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Add New Social Media
                </DialogTitle>
                <DialogDescription className="text-center">
                  Add new social media account to your restaurant
                </DialogDescription>
              </DialogHeader>
              <AddSocialForm
                onSuccess={() => {
                  setIsDialogOpen(false);
                  refetch();
                }}
              />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {socialLinks && socialLinks.length > 0 ? (
            socialLinks.map((social: SocialLink) => (
              <div
                key={social.id}
                className="flex flex-col gap-4 rounded-md border p-4 transition-colors hover:bg-foreground/10 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  {getPlatformIcon(social.platformType)}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{social.platformType}</p>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-sm text-blue-600 hover:underline"
                    >
                      {social.url}
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="w-fit">Connected</Badge>
                  <Dialog
                    open={editingSocialId === social.id}
                    onOpenChange={(open) => {
                      if (!open) setEditingSocialId(null);
                      else setEditingSocialId(social.id);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => setEditingSocialId(social.id)}
                      >
                        <Edit size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] rounded-md sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Edit Social Media
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          Edit your social media
                        </DialogDescription>
                      </DialogHeader>
                      <EditSocialForm
                        social={social}
                        onSuccess={() => {
                          setEditingSocialId(null);
                          refetch();
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                  <DeleteSocial onDelete={() => handleDelete(social.id)} />
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-gray-500">
              No social media accounts connected
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialOverview;
