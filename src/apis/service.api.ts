import http from "@/lib/http";
import { CreateServiceBodyType, UpdateServiceBodyType } from "@/schema/service.schema";
import { ErrorType } from "@/types/error.type";
import { Service } from "@/types/service.type";
import axios from "axios";


const serviceAction = {
    getService: async (restaurantId: string) => {
        try {
            const response = await http.get<Service[]>(
                `v1/restaurants/${restaurantId}/services`,
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                const dishCategoriesError = error.response.data as ErrorType;
                console.error("Error during get restaurants:", dishCategoriesError);
                throw dishCategoriesError;
            } else {
                console.error("Unexpected error during get restaurants:", error);
                throw error;
            }
        }
    },

    createService: async (restaurantId: string, service: CreateServiceBodyType) => {
        try {
            const response = await http.post(
                `v1/restaurants/${restaurantId}/services
              `,
                service,
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                const dishCategoriesError = error.response.data as ErrorType;
                console.error("Error during add restaurant:", dishCategoriesError);
                throw dishCategoriesError;
            } else {
                console.error("Unexpected error during add restaurant:", error);
                throw error;
            }
        }
    },

    updateService: async (restaurantId: string, serviceName: string, service: UpdateServiceBodyType) => {
        try {
            const response = await http.put(
                `v1/restaurants/${restaurantId}/services/${serviceName}`,
                service,
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                const dishCategoriesError = error.response.data as ErrorType;
                console.error("Error during update restaurant:", dishCategoriesError);
                throw dishCategoriesError;
            } else {
                console.error("Unexpected error during update restaurant:", error);
                throw error;
            }
        }
    },

    deleteService: async (restaurantId: string, serviceName: string) => {
        try {
            const response = await http.delete(
                `v1/restaurants/${restaurantId}/services/${serviceName}`,
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                const dishCategoriesError = error.response.data as ErrorType;
                console.error("Error during delete restaurant:", dishCategoriesError);
                throw dishCategoriesError;
            } else {
                console.error("Unexpected error during delete restaurant:", error);
                throw error;
            }
        }
    },
}

export default serviceAction;