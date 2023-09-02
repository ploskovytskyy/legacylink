"use client";

import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FileEdit, Mail, PenSquare, Plus, Trash2 } from "lucide-react";

const Letters = () => {
  return (
    <div className="grid gap-5">
      <LetterCard id="1" name="Eth wallets" />
      <LetterCard id="1" name="Other wallets" />
      <LetterCard id="1" name="Social media passwords" />
      <LetterCard id="1" name="Other passwords" />

      <Button className="gap-2 justify-self-start" asChild>
        <Link href="/letter/create">
          <Plus className="w-4" />
          Create new
        </Link>
      </Button>
    </div>
  );
};

const LetterCard = ({ id, name }: { id: string; name: string }) => {
  const { toast } = useToast();

  const handleDelete = () => {
    toast({
      title: "Deleted",
      description: "Your letter has been deleted",
    });
  };

  return (
    <div className="glass-bg p-6 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <PenSquare className="w-6" />
        <span className="text-lg leading-snug">{name}</span>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleDelete}
          size="sm"
          className="gap-2"
          variant="ghost-destructive"
        >
          <Trash2 className="w-4" />
          Delete
        </Button>
        <Button size="sm" className="gap-2" variant="ghost" asChild>
          <Link href={`/letter/${id}`}>
            <FileEdit className="w-4" />
            Edit
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Letters;