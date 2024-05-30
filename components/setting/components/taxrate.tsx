'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { taxSchema } from '@/schema';
import { ZodError } from 'zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import eventBus from '@/lib/even';

interface TaxrateCardProps {
  tax: number | 0;
  storeId: string | null;
}
const TaxrateCard: React.FC<TaxrateCardProps> = ({ tax, storeId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editableTaxrate, setEditableTaxrate] = useState('');
  const taxNumber = parseFloat(editableTaxrate) || 0;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTaxrate(e.target.value);
  };
  useEffect(() => {
    setEditableTaxrate(tax?.toString() ?? '');
  }, [tax]);

  const handleSave = async () => {
    // Check if the user is online
    const isOnline = navigator.onLine;

    if (!isOnline) {
      toast.error('You are offline. Please check your internet connection.');
      return;
    }

    if (!storeId) {
      toast.error('Store ID is required to save the store name.');
      return;
    }

    if (taxNumber === tax) {
      toast.info('No changes to save.');
      return;
    }
    setIsLoading(true);
    try {
      const validatedData = taxSchema.parse({
        tax: taxNumber,
      });

      await axios.patch(`/api/shopdata/${storeId}`, validatedData);

      toast.success('Tax updated successfully.');
      eventBus.emit('fetchStoreData');
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle ZodError
        const fieldErrors = error.errors.map((err) => err.message);
        toast.error(`${fieldErrors.join(', ')}`);
      } else {
        toast.error('Failed to update store tax.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card x-chunk="dashboard-04-chunk-1" className="my-5">
        <CardHeader>
          <CardTitle>Tax Rate</CardTitle>
          <CardDescription>Use to set tax for your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input
              type="number"
              value={editableTaxrate}
              onChange={handleInputChange}
            />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button
            className="text-white"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Save'
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default TaxrateCard;
