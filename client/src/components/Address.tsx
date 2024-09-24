// src/components/Address.tsx

import { useCallback, useEffect, useState } from 'react';
import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
} from '../api/api';
import { AddressType, AddressProps } from '@/types/type';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';



const initalAddress: AddressType = { id: '', street: '', city: '', state: '', zip: '' };
const Address: React.FC<AddressProps> = ({ token }) => {
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    const [address, setAddress] = useState<AddressType>(initalAddress);
    const [editing, setEditing] = useState<AddressType | null>(null);
    const [isAddressLoading, setIsAddressLoading] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const fetchAddresses = useCallback(async () => {
        setIsAddressLoading(true)
        const response = await getAddresses(token);
        setAddresses(response.data);
        setIsAddressLoading(false)
    }, [token]);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses, token]);



    const handleSubmit = async (e: React.FormEvent) => {
        setIsSubmiting(true)
        e.preventDefault();
        if (editing) {
            await updateAddress(editing.id, address, token);
            setEditing(null);
        } else {
            await createAddress(address, token);
        }
        setAddress(initalAddress);
        fetchAddresses();
        toast({
            variant: "successs",
            title: "Address Added Successfully"
        })
        setIsSubmiting(false)
    };

    const handleEdit = (addr: AddressType) => {
        setEditing(addr);
        setAddress(addr);
    };

    const handleDelete = async (id: string) => {

        await deleteAddress(id, token);
        fetchAddresses();
        toast({
            variant: "successs",
            title: "Address Deleted"
        })
    };

    return (
        <div className="max-w-2xl mx-auto my-5">
            <h2 className="text-2xl font-bold mb-4">Manage Addresses</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="Street"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    required
                    className="w-full"
                />
                <Input
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                    className="w-full"
                />
                <Input
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                    className="w-full"
                />
                <Input
                    placeholder="Zip"
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    required
                    className="w-full"
                />
                <Button type="submit" disabled={isSubmiting} className="w-full">{editing ? 'Update' : 'Add'} {isSubmiting && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}</Button>
                {editing && <Button onClick={() => { setEditing(null); setAddress(initalAddress); }} className="mt-2">Cancel </Button>}
            </form>
            <ul className="mt-4">
                {
                    isAddressLoading ?
                        <div className="flex flex-col space-y-3">

                            {[1, 2, 3,].map(
                                (_, index: number) => <div key={index} className="flex justify-between gap-2 items-center border-b py-2">
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                    <div className='flex items-center gap-5'>
                                        <Skeleton className="h-10 w-[70px]" />
                                        <Skeleton className="h-10 w-[70px]" />
                                    </div>
                                </div>
                            )}

                        </div> : addresses.map((addr) => (
                            <li key={addr.id} className="flex justify-between items-center border-b py-2">
                                <span>
                                    {addr.street}, {addr.city}, {addr.state}, {addr.zip}
                                </span>
                                <div>
                                    <Button onClick={() => handleEdit(addr)} className="mr-2">Edit </Button>
                                    <Button onClick={() => handleDelete(addr.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </li>
                        ))
                }
            </ul>
        </div>
    );
};

export default Address;
