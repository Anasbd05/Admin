// /* eslint-disable react-hooks/rules-of-hooks */
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from '@/components/ui/input'
import {supabase} from '@/lib/supabase'
import {LoaderCircle} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Sidebar from '@/constant/Sidebar'

type Products = {
    id: number
    title: string,
    quantity: number,
    price: number,
}


const ProductPage = () => {


    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState('')
    const [products,setProducts] = useState<Products[]>([]);

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
    useEffect(() => {

        getProducts();
    },[]);

    const DeleteProduct = async (id: number) => {

        const {error} = await supabase
            .from('admin')
            .delete()
            .eq('id',id);
        if(error) {
            console.log(error?.cause)
        } else {
            await getProducts()
        }

    };



    return (
        <div className='flex'>
            <Sidebar />
            <section className="h-screen w-4/5 px-5 ml-auto py-4">
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
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
                                .map((product) => (
                                    <TableRow key={product.id} >
                                        <TableCell className="font-medium">{product.id}</TableCell>
                                        <TableCell>{product.title} </TableCell>
                                        <TableCell>{product.quantity} </TableCell>
                                        <TableCell className="text-right">${product.price.toFixed(1)}</TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger className='cursor-pointer bg-red-500 text-white hover:opacity-75 py-1 px-4 rounded-md' >Delete</DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot be undone. This will permanently delete the product
                                                            and remove it from your products data.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <Button onClick={() => DeleteProduct(product.id)} variant={"destructive"} className='cursor-pointer hover:opacity-75 ' >Delete</Button>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                }
            </section>
        </div >
    )
}

export default ProductPage
