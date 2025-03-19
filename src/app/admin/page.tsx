"use client"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {supabase} from "@/lib/supabase";
import {useState} from "react";
import {toast} from "sonner";

export default function PageAdmin() {

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [quantity,setQuantity] = useState('')

    const [loading,setLoading] = useState(false)


    const addProduct = async () => {
        setLoading(true)
        const {error} = await supabase
            .from("admin")
            .insert({
                title: title,
                description: description,
                price: price,
                quantity: quantity
            })
        if(error) {
            toast.error("Error",{
                description: error.message
            })
        }
        else {
            toast.success("Success",{
                description: "Product have been created successfully"
            })
        }
        setLoading(false)
        setTitle('')
        setDescription('')
        setPrice('')
        setQuantity("")
    }


    return (
        <section className="h-screen w-3/6 mx-auto py-10">
            <nav className="flex justify-between w-full items-center">
                <h1 className="font-bold text-xl">ADMIN MANAGEMENT</h1>
                <Button className="cursor-pointer" variant={"destructive"}>Sign Out</Button>
            </nav>
            <main className="flex my-10 gap-4 flex-col">
                <div className="flex flex-col">
                    <label className="mx-1">Title</label>
                    <Input value={title} onChange={(e) => {setTitle(e.target.value)}} required placeholder="Product title" />
                </div>
                <div className="flex flex-col">
                    <label className="mx-1">Description</label>
                    <Textarea value={description} onChange={(e) => {setDescription(e.target.value)}} required maxLength={200} className="h-40" placeholder="Product description" />
                    <small className="place-self-end my-0.5 text-red-400 text-xs">Max length 200</small>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <label className="mx-1">Price</label>
                        <Input value={price} onChange={(e) => {setPrice(e.target.value)}} type="number" required placeholder="Product price" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mx-1">Quantity</label>
                        <Input value={quantity} onChange={(e) => {setQuantity(e.target.value)}} type="number" required min={1} placeholder="Product quantity" />
                    </div>
                </div>
                <Button onClick={addProduct} className="cursor-pointer">
                    {loading ? "Adding..." : "ADD PRODUCT"}</Button>
            </main>
        </section>
    );
}
