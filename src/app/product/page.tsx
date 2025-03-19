/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React,{useEffect,useState} from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Input} from '@/components/ui/input'
import {supabase} from '@/lib/supabase'
import {LoaderCircle} from 'lucide-react'

type Products = {
    id: number
    title: string,
    quantity: number,
    price: number,
}


const page = () => {


    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState('')
    const [products,setProducts] = useState<Products[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const {data,error} = await supabase.from("admin").select("*");
                if(error) throw error;
                setProducts(data);
            } catch(error) {
                console.error("Error fetching products:",error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    },[]);


    return (
        <div className="my-10 w-3/5 mx-auto">
            <div className="flex w-full items-center justify-between">
                <h1 className='text-xl font-bold'>Products</h1>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by title...' className='w-2/4' />
            </div>
            {loading ? <div className='h-96 flex justify-center items-center w-full'>
                <LoaderCircle className='animate-spin h-20 w-20 ' />
            </div> :
                <Table className='my-4'>
                    <TableCaption className='py-10'>All products are here!</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
                            .map((product) => (
                                <TableRow key={product.id} >
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.title} </TableCell>
                                    <TableCell>{product.quantity} </TableCell>
                                    <TableCell className="text-right">{product.price.toFixed(1)}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            }
        </div>
    )
}

export default page
