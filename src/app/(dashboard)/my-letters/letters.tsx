"use client";

import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FileEdit, PenSquare, Plus, Trash2 } from "lucide-react";
import { useMyLetters } from "./use-my-letters";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import useDeleteLetter from "./use-delete-letter";

const Letters = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  if (!isConnected) {
    router.push("/");
  }

  const { data, isLoading } = useMyLetters();

  if (isLoading) return <div>Loading...</div>;

  console.log(data);

  return (
    <div className="grid gap-5">
      {data?.length ? (
        <>
          {data.map(({ id, name }, index) => (
            <LetterCard key={index} id={id} name={name} />
          ))}
          <Button className="gap-2 justify-self-start" asChild>
            <Link href="/letter/create">
              <Plus className="w-4" />
              Create new
            </Link>
          </Button>
        </>
      ) : (
        <div className="glass-bg grid justify-center items-center p-8 rounded-xl h-[400px]">
          <div className="text-center">
            <p className="text-2xl font-bold mb-5">{`You don't have any letters yet`}</p>
            <Button className="gap-2 justify-self-center" asChild>
              <Link href="/letter/create">
                <Plus className="w-4" />
                Create new
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const LetterCard = ({ id, name }: { id: bigint; name: string }) => {
  const { toast } = useToast();
  const { write, isLoading } = useDeleteLetter();

  const handleDelete = () => {
    write({
      args: [id],
    });
  };

  return (
    <div className="glass-bg px-3 lg:px-6 py-3 lg:py-4 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3 max-w-sm">
        <PenSquare className="w-4 lg:w-5 flex-shrink-0" />
        <span className="leading-snug line-clamp-1">{name}</span>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleDelete}
          size="sm"
          className="gap-2"
          variant="ghost-destructive"
          disabled={isLoading}
        >
          <Trash2 className="w-4" />
          Delete
        </Button>
        <Button size="sm" className="gap-2" variant="ghost" asChild>
          <Link href={`/letter/${id.toString()}`}>
            <FileEdit className="w-4" />
            Edit
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Letters;
