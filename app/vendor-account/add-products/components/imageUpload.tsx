'use client'

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useRef, useState } from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./formSchema";

type ImageUploadProps = {
  control: Control<z.infer<typeof formSchema>>;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ control }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormField
      control={control}
      name="image"
      render={({ field: { onChange, value } }) => (
        <FormItem>
          <FormLabel>Product Image</FormLabel>
          <FormControl>
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e, onChange)}
              />
              {previewUrl ? (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto h-auto max-h-48 max-w-full"
                  />
                </div>
              ) : (
                <div className="text-gray-500">
                  Drag & drop product image here
                  <br />
                  or
                </div>
              )}
              <Button
                type="button"
                variant="secondary"
                className="mt-2"
                onClick={() => fileInputRef.current?.click()}
              >
                Select files
              </Button>
              {value && (
                <p className="mt-2">Selected file: {(value as File).name}</p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageUpload;
