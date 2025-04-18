import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";

export default function shop() {


    const { alldata, loading } = useFetchData('/api/shops');

    // Filter out shops with status 'publish'
    const publishData = alldata.filter(ab => ab?.status === 'Published');


    return <>

        <Head>
            <title>Talha - Certifications</title>
        </Head>
        <div className="shoppage">

            <div className="shoppage">
                <div className="shoppagetoptitle">
                    <div className="container" data-aos="fade-up">
                        <h2>My Certifications</h2>
                        
                    </div>
                </div>
                </div>

            <div className="shopproducts" data-aos="fade-down">
                <div className="container">
                    <div className="shopprocards">
                        {loading ? (
                            <Spinner />
                        ) : (
                            publishData.map((pro) => (
                                <Link href={`/shop/${pro.slug}`} key={pro._id} className="procard">
                                    <div className="spprocardimg">
                                        <img src={pro.images[0]} alt={pro.title} />
                                    </div>
                                    <div className="spprocinfo">
                                        <h2>{pro.title}</h2>
                                        
                                        {pro.tags && pro.tags.length > 0 && (
                                            <div className="procardtags">
                                                {pro.tags.map((tag, index) => (
                                                    <span key={index}>{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
    </>
}