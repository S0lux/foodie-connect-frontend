import serviceAction from "@/apis/service.api";
import { CreateServiceBodyType, UpdateServiceBodyType } from "@/schema/service.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useServices = {
    useGetServices(restaurantId: string) {
        return useQuery({
            queryKey: ["services"],
            queryFn: async () => {
                try {
                    const result =
                        await serviceAction.getService(restaurantId);
                    return result;
                } catch (error) {
                    console.error("Error during session retrieval:", error);
                    throw error;
                }
            },
        });
    },

    useAddService() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({
                restaurantId,
                service,
            }: {
                restaurantId: string;
                service: CreateServiceBodyType;
            }) => serviceAction.createService(restaurantId, service),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["services"],
                });
            },
            onError: (error) => {
                console.error("Error during category creation:", error);
                throw error;
            },
        });
    },

    useUpdateService() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({
                restaurantId,
                serviceName,
                service,
            }: {
                restaurantId: string;
                serviceName: string;
                service: UpdateServiceBodyType;
            }) =>
                serviceAction.updateService(restaurantId, serviceName, service),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["services"],
                });
            },
            onError: (error) => {
                console.error("Error during category creation:", error);
                throw error;
            },
        });
    },

    useDeleteService() {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({
                restaurantId,
                serviceName,
            }: {
                restaurantId: string;
                serviceName: string;
            }) =>
                serviceAction.deleteService(restaurantId, serviceName),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["services"],
                });
            },
            onError: (error) => {
                console.error("Error during category deletion:", error);
                throw error;
            },
        });
    },
}

export default useServices;

