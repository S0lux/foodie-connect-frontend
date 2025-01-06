import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useServices from '@/hooks/use-services';
import { Service } from '@/types/service.type';

const ServiceManagement = ({ restaurantId }: { restaurantId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedService, setSelectedService] = useState<Service>();
    const [formData, setFormData] = useState({
        newName: '',
    });

    const {
        data: services,
        isLoading,
        refetch
    } = useServices.useGetServices(restaurantId);

    const addService = useServices.useAddService();
    const updateService = useServices.useUpdateService();
    const deleteService = useServices.useDeleteService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing && selectedService) {
                await updateService.mutateAsync({
                    restaurantId,
                    serviceName: selectedService.name.replace(/\s+/g, '-'),
                    service: { newName: formData.newName }
                });
                toast({
                    title: "Success",
                    description: "Service updated successfully",
                });
            } else {
                await addService.mutateAsync({
                    restaurantId,
                    service: { name: formData.newName }
                });
                toast({
                    title: "Success",
                    description: "Service added successfully",
                });
            }

            await refetch();
            setIsOpen(false);
            setFormData({ newName: '' });
            setIsEditing(false);
            setSelectedService(undefined);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save service",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (service: Service) => {
        console.log(service);
        try {
            await deleteService.mutateAsync({
                restaurantId,
                serviceName: service.name.replace(/\s+/g, '-')
            });
            toast({
                title: "Success",
                description: "Service deleted successfully",
            });
            await refetch();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete service",
                variant: "destructive",
            });
        }
    };

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setFormData({ newName: service.name });
        setIsEditing(true);
        setIsOpen(true);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className='text-xl font-bold sm:text-2xl'>Services Management</CardTitle>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                setIsEditing(false);
                                setFormData({ newName: '' });
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {isEditing ? 'Edit Service' : 'Add New Service'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="newName">Service Name</Label>
                                <Input
                                    id="newName"
                                    value={formData.newName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, newName: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {isEditing ? 'Update' : 'Add'} Service
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center p-4">
                        <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                ) : services && services.length > 0 ? (
                    <div className="space-y-4">
                        {services.map((service) => (
                            <div
                                key={service.name}
                                className="flex items-center justify-between rounded-md border p-4"
                            >
                                <div>
                                    <h3 className="font-medium">{service.name}</h3>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEdit(service)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(service)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-4">
                        No services available.
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ServiceManagement;