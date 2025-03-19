import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

export default function Home() {
  return (
    <section className="h-screen w-3/6 mx-auto py-10">
      <nav className="flex justify-between w-full items-center">
        <h1 className="font-bold text-xl">ADMIN MANAGEMENT</h1>
        <Button className="cursor-pointer" variant={"destructive"}>Sign Out</Button>
      </nav>
      <main className="flex my-10 gap-4 flex-col">
        <div className="flex flex-col">
          <label className="mx-1">Title</label>
          <Input required placeholder="Product title" />
        </div>
        <div className="flex flex-col">
          <label className="mx-1">Description</label>
          <Textarea required maxLength={200} className="h-40" minLength={10} placeholder="Product description" />
          <small className="place-self-end my-0.5 text-red-400 text-xs">Max length 200</small>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="mx-1">Price</label>
            <Input type="number" required placeholder="Product price" />
          </div>
          <div className="flex flex-col">
            <label className="mx-1">Quantity</label>
            <Input type="number" required min={1} placeholder="Product quantity" />
          </div>
        </div>
        <Button className="cursor-pointer">ADD PRODUCT</Button>
      </main>
    </section>
  );
}
