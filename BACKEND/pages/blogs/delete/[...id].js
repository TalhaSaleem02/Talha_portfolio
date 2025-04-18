import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Head from "next/head";
import { BsPostcard } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { toast} from 'react-hot-toast';


export default function DeleteProduct() {

    const router = useRouter();

    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {

            axios.get(`/api/blogs/?id=` + id)
                .then((response) => {
                    setProductInfo(response.data);
                })
                .catch((error) => {
                    console.log("ello", id);
                });

        }
    }, [id]);

    function goBack() {
        router.push('/blogs')
    }

    async function deleteBlog() {
        await axios.delete(`/api/blogs/?id=` + id);
        toast.success('deleted successfully')
        goBack();

    }


    return <>

        <Head>
            <title>Delete</title>
        </Head>

        <div className="blogpage">

            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span> {productInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard /> <span>/</span> <span>Edit Blog</span>
                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">

                <div className="deletecard">
                    <svg
                        
                        viewBox="0 0 24 24"
                        fill="red"
                        height="6em"
                        width="6em"
                        
                    >
                        <path d="M4 4 L20 20">  </path>
                        <MdDeleteForever />
                        
                    </svg>

                    <p className="cookieHeading"> Are you sure? </p>
                    <div className= "buttonContainer">
                        <button onClick={deleteBlog} className="acceptButton"> Delete </button>
                        <button onClick = {goBack} className="declineButton">Cancel </button>

                    </div>


                </div>

            </div>
        </div>

    </>
}